import { createHash, randomUUID } from "node:crypto";
import {
  CONSENT_VERSION,
  MARKETING_CONSENT_TEXT,
  validateSubmission,
  type ContactSubmission,
} from "./funnel";
import {
  consentNonce,
  readConsentToken,
  signConsentToken,
} from "./consent-token";

export const CONSENT_PROPERTIES = [
  "md_consent_version",
  "md_consent_source",
  "md_confirmed_at",
] as const;

type Contact = {
  id: string;
  email: string;
  unsubscribed: boolean;
  properties?: Record<string, { value: string | null; type: string }>;
};

export type ContactConfig = {
  apiKey: string;
  from: string;
  to: string;
  secret: string;
  baseUrl: string;
  redisUrl: string;
  redisToken: string;
  segmentId: string;
  allowedOrigins?: string[];
  deadlineAt?: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
};

type Email = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to: string;
  tags: { name: string; value: string }[];
};

export class ProviderError extends Error {
  status: number;
  constructor(status: number) {
    super("Email provider request failed");
    this.status = status;
  }
}

function configReady(config: ContactConfig, marketing = false) {
  return Boolean(
    config.apiKey &&
    config.from &&
    config.to &&
    config.redisUrl &&
    config.redisToken &&
    (!marketing || (config.secret.length >= 32 && config.segmentId)),
  );
}

export function contactConfig(): ContactConfig {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.CONTACT_FROM_EMAIL || "",
    to: process.env.CONTACT_TO_EMAIL || "info@mediadustry.com",
    secret: process.env.CONTACT_TOKEN_SECRET || "",
    baseUrl: process.env.CONTACT_SITE_URL || "https://www.mediadustry.com",
    redisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    segmentId: process.env.RESEND_SEGMENT_ID || "",
    allowedOrigins: [
      "https://www.mediadustry.com",
      "https://mediadustry.com",
      ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
      ...(process.env.VERCEL_BRANCH_URL
        ? [`https://${process.env.VERCEL_BRANCH_URL}`]
        : []),
      ...(process.env.CONTACT_ALLOWED_ORIGINS || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
      ...(process.env.NODE_ENV === "development"
        ? ["http://localhost:3000", "http://127.0.0.1:3000"]
        : []),
    ],
  };
}

async function resend<T>(
  config: ContactConfig,
  path: string,
  init: RequestInit = {},
  idempotencyKey?: string,
): Promise<T> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const remaining = (config.deadlineAt || Date.now() + 8000) - Date.now();
    if (remaining < 500) throw new ProviderError(504);
    const response = await (config.fetchImpl || fetch)(
      `https://api.resend.com${path}`,
      {
        ...init,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
        },
        signal: AbortSignal.timeout(Math.min(8000, remaining)),
        cache: "no-store",
      },
    );
    if (!response.ok) {
      if ((response.status === 429 || response.status >= 500) && attempt < 2) {
        const retryAfter = response.headers.get("retry-after");
        const parsed = retryAfter
          ? Number(retryAfter) * 1000
          : 600 * 2 ** attempt;
        const delay = Number.isFinite(parsed) ? Math.max(200, parsed) : 1000;
        if (
          delay <= 3000 &&
          (!config.deadlineAt || config.deadlineAt - Date.now() > delay + 500)
        ) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
      throw new ProviderError(response.status);
    }
    return (await response.json()) as T;
  }
  throw new ProviderError(502);
}

async function getContact(
  config: ContactConfig,
  email: string,
): Promise<Contact | null> {
  try {
    return await resend<Contact>(
      config,
      `/contacts/${encodeURIComponent(email)}`,
    );
  } catch (error) {
    if (error instanceof ProviderError && error.status === 404) return null;
    throw error;
  }
}

type ConsentState = {
  state: "pending" | "confirmed" | "unsubscribed";
  nonce: string | null;
  requestedAt: string;
  confirmedAt?: string;
  confirmedNonce?: string;
  unsubscribedAt?: string;
  source: string;
  version: string;
};

const STORE_PREFIX = "mediadustry:funnel:v1:";
function contactKey(email: string) {
  return `${STORE_PREFIX}consent:${createHash("sha256").update(email).digest("hex")}`;
}

async function redis<T>(
  config: ContactConfig,
  command: (string | number)[],
): Promise<T> {
  const remaining = (config.deadlineAt || Date.now() + 5000) - Date.now();
  if (remaining < 500) throw new ProviderError(504);
  const response = await (config.fetchImpl || fetch)(config.redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(Math.min(5000, remaining)),
    cache: "no-store",
  });
  if (!response.ok) throw new ProviderError(response.status);
  const result = (await response.json()) as { result: T; error?: string };
  if (result.error) throw new ProviderError(503);
  return result.result;
}

async function locked<T>(
  config: ContactConfig,
  key: string,
  action: () => Promise<T>,
): Promise<T> {
  const owner = randomUUID();
  const lockKey = `${key}:lock`;
  const acquired = await redis<string | null>(config, [
    "SET",
    lockKey,
    owner,
    "NX",
    "PX",
    90_000,
  ]);
  if (acquired !== "OK") throw new ProviderError(409);
  try {
    return await action();
  } finally {
    try {
      await redis(config, [
        "EVAL",
        "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end",
        1,
        lockKey,
        owner,
      ]);
    } catch {
      /* The lease expires automatically after a failed release. */
    }
  }
}

async function readState(
  config: ContactConfig,
  email: string,
): Promise<ConsentState | null> {
  const value = await redis<string | null>(config, ["GET", contactKey(email)]);
  return value ? (JSON.parse(value) as ConsentState) : null;
}

async function writeState(
  config: ContactConfig,
  email: string,
  value: ConsentState,
) {
  await redis(config, [
    "SET",
    contactKey(email),
    JSON.stringify(value),
    ...(value.state === "pending" ? ["EX", 86_400] : []),
  ]);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

function emailHtml(
  title: string,
  paragraphs: string[],
  action?: { label: string; url: string },
) {
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#e9eceb;color:#101722;font-family:Arial,sans-serif"><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:32px 20px"><table role="presentation" style="max-width:580px;margin:auto;width:100%;background:#fff;border-collapse:collapse"><tr><td style="padding:36px"><p style="font-size:13px;letter-spacing:2px;font-weight:700">MEDIADUSTRY</p><h1 style="font-size:28px;line-height:1.2">${escapeHtml(title)}</h1>${paragraphs.map((paragraph) => `<p style="font-size:16px;line-height:1.65;white-space:pre-line">${escapeHtml(paragraph)}</p>`).join("")}${action ? `<p style="margin:28px 0"><a href="${escapeHtml(action.url)}" style="display:inline-block;padding:16px 22px;background:#345bd6;color:#fff;text-decoration:none;font-weight:700">${escapeHtml(action.label)}</a></p><p style="font-size:13px;line-height:1.6;word-break:break-all">Werkt de knop niet? Open deze link:<br><a href="${escapeHtml(action.url)}">${escapeHtml(action.url)}</a></p>` : ""}<p style="font-size:13px;line-height:1.6;border-top:1px solid #ddd;padding-top:20px">Mario Hodzelmans · MEDIADUSTRY<br><a href="mailto:info@mediadustry.com">info@mediadustry.com</a><br>KVK 54271932 · <a href="https://www.mediadustry.com/privacy">Privacyverklaring</a></p></td></tr></table></td></tr></table></body></html>`;
}

function makeEmail(
  config: ContactConfig,
  to: string,
  title: string,
  paragraphs: string[],
  source: string,
  action?: { label: string; url: string },
): Email {
  return {
    from: config.from,
    to: [to],
    subject: title,
    reply_to: config.to,
    text: `${paragraphs.join("\n\n")}${action ? `\n\n${action.label}: ${action.url}` : ""}\n\nMario Hodzelmans · MEDIADUSTRY\ninfo@mediadustry.com\nKVK 54271932\nPrivacy: https://www.mediadustry.com/privacy`,
    html: emailHtml(title, paragraphs, action),
    tags: [{ name: "source", value: source }],
  };
}

async function requestConsent(
  config: ContactConfig,
  data: ContactSubmission,
  receivedAt: number,
) {
  return locked(config, contactKey(data.email), async () => {
    const current = await readState(config, data.email);
    if (current?.state === "confirmed") {
      const contact = await getContact(config, data.email);
      if (contact && !contact.unsubscribed) {
        const segments = await resend<{ data: { id: string }[] }>(
          config,
          `/contacts/${contact.id}/segments`,
        );
        if (segments.data.some((segment) => segment.id === config.segmentId))
          return null;
      }
    }
    const nonce = consentNonce(data.requestId, data.email, config.secret);
    await writeState(config, data.email, {
      state: "pending",
      nonce,
      source: data.source,
      version: CONSENT_VERSION,
      requestedAt: new Date(receivedAt).toISOString(),
      ...(current?.confirmedAt ? { confirmedAt: current.confirmedAt } : {}),
    });
    // Pending contacts stay outside the marketing segment until explicit confirmation.
    const token = signConsentToken(
      {
        purpose: "confirm",
        email: data.email,
        nonce,
        issuedAt: receivedAt,
        expiresAt: receivedAt + 24 * 60 * 60 * 1000,
      },
      config.secret,
    );
    return `${config.baseUrl}/opt-in?token=${encodeURIComponent(token)}`;
  });
}

function sameOrigin(request: Request, config: ContactConfig) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return (
      origin === new URL(config.baseUrl).origin ||
      Boolean(config.allowedOrigins?.includes(origin))
    );
  } catch {
    return false;
  }
}

function json(value: object, status = 200) {
  return Response.json(value, {
    status,
    headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
}

async function rateLimited(
  request: Request,
  config: ContactConfig,
  purpose = "submission",
) {
  const address =
    (
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for")
    )
      ?.split(",")[0]
      .trim() || "local";
  const key = `${STORE_PREFIX}limit:${purpose}:${createHash("sha256").update(address).digest("hex")}`;
  const count = await redis<number>(config, [
    "EVAL",
    "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 600) end; return n",
    1,
    key,
  ]);
  return count > (purpose === "submission" ? 5 : 20);
}

export async function submitContact(
  request: Request,
  config: ContactConfig,
): Promise<Response> {
  config = { ...config, deadlineAt: Date.now() + 48_000 };
  if (!sameOrigin(request, config))
    return json(
      { success: false, message: "Vernieuw de pagina en probeer opnieuw." },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ success: false, message: "Ongeldig formulier." }, 415);
  const now = (config.now || Date.now)();
  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 16_000)
      return json(
        {
          success: false,
          message: "Je aanvraag is te lang. Maak je bericht iets korter.",
        },
        413,
      );
    raw = JSON.parse(body);
  } catch {
    return json(
      { success: false, message: "Controleer je aanvraag en probeer opnieuw." },
      400,
    );
  }
  const validated = validateSubmission(raw);
  if (!validated.ok)
    return json(
      {
        success: false,
        errors: validated.errors,
        message: "Controleer de aangegeven velden.",
      },
      400,
    );
  const data = validated.data;
  if (
    now - data.startedAt < 1500 ||
    now - data.startedAt > 24 * 60 * 60 * 1000
  ) {
    return json(
      {
        success: false,
        message: "Vernieuw de pagina, vul je aanvraag in en probeer opnieuw.",
      },
      400,
    );
  }
  if (!configReady(config))
    return json(
      {
        success: false,
        message:
          "Online versturen is tijdelijk niet beschikbaar. Je gegevens blijven staan. Verstuur je aanvraag via de e-maillink hieronder.",
      },
      503,
    );

  try {
    if (await rateLimited(request, config))
      return json(
        {
          success: false,
          message:
            "Je hebt meerdere aanvragen verstuurd. Probeer het over tien minuten opnieuw of mail info@mediadustry.com.",
        },
        429,
      );
  } catch {
    return json(
      {
        success: false,
        message:
          "Online versturen is tijdelijk niet beschikbaar. Je gegevens blijven staan. Gebruik de e-maillink hieronder.",
      },
      503,
    );
  }

  const submissionKey = `${STORE_PREFIX}submission:${data.requestId}`;
  const digest = createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
  try {
    return await locked(config, submissionKey, async () => {
      const previous = await redis<string | null>(config, [
        "GET",
        submissionKey,
      ]);
      const saved = previous
        ? (JSON.parse(previous) as {
            digest: string;
            result?: object;
            receivedAt: number;
          })
        : null;
      if (saved && saved.digest !== digest)
        return json(
          {
            success: false,
            message:
              "Je aanvraag is gewijzigd. Vernieuw de pagina en verstuur opnieuw.",
          },
          409,
        );
      if (saved?.result) return json(saved.result);
      const receivedAt = saved?.receivedAt || now;
      if (!saved)
        await redis(config, [
          "SET",
          submissionKey,
          JSON.stringify({ digest, receivedAt }),
          "EX",
          86_400,
        ]);
      const result = await deliverSubmission(config, data, receivedAt);
      if (result.status === 200) {
        const responseValue = await result.clone().json();
        // If caching fails after provider acceptance, return the truthful received result.
        // Provider idempotency still protects a retry with the same request ID.
        try {
          await redis(config, [
            "SET",
            submissionKey,
            JSON.stringify({ digest, receivedAt, result: responseValue }),
            "EX",
            86_400,
          ]);
        } catch {
          /* No extra notification is sent without the same provider idempotency key. */
        }
      }
      return result;
    });
  } catch (error) {
    return json(
      {
        success: false,
        message:
          error instanceof ProviderError && error.status === 409
            ? "Deze aanvraag wordt al verwerkt. Wacht even en probeer opnieuw."
            : "De verwerking kon niet worden bevestigd. Je gegevens blijven staan. Probeer opnieuw of mail info@mediadustry.com.",
      },
      503,
    );
  }
}

async function deliverSubmission(
  config: ContactConfig,
  data: ContactSubmission,
  receivedAt: number,
) {
  const title =
    data.source === "website-check"
      ? "Nieuwe aanvraag persoonlijke website-check"
      : "Nieuwe kennismakingsaanvraag";
  const details = [
    `Naam: ${data.name}\nE-mail: ${data.email}\nBedrijf: ${data.company || "—"}\nTelefoon: ${data.phone || "—"}\nWebsite: ${data.website || "—"}\nHulpvraag: ${data.service || "—"}\nBudget: ${data.budget || "—"}`,
    data.message || "Geen aanvullende vraag ingevuld.",
    `Bron: /${data.source}\nAanvraagreferentie: ${data.requestId}`,
    data.marketingConsent
      ? `Marketingtoestemming aangevraagd, nog niet bevestigd.\nTekst: ${MARKETING_CONSENT_TEXT}\nVersie: ${CONSENT_VERSION}\nAangevraagd op: ${new Date(receivedAt).toISOString()}`
      : "Geen marketingtoestemming aangevraagd.",
  ];
  const notice = makeEmail(config, config.to, title, details, data.source);
  notice.reply_to = data.email;
  try {
    // The owner notification is the receipt boundary: never report success before it is accepted.
    const sent = await resend<{ id: string }>(
      config,
      "/emails",
      { method: "POST", body: JSON.stringify(notice) },
      `lead-${data.requestId}`,
    );
    if (!sent.id) throw new ProviderError(502);
  } catch {
    return json(
      {
        success: false,
        message:
          "We konden je aanvraag niet bevestigen. Je gegevens blijven staan. Probeer opnieuw of gebruik de e-maillink hieronder.",
      },
      502,
    );
  }

  let confirmationUrl: string | null = null;
  let marketingStatus = data.marketingConsent ? "pending" : "not-requested";
  if (data.marketingConsent) {
    try {
      if (!configReady(config, true)) throw new ProviderError(503);
      confirmationUrl = await requestConsent(config, data, receivedAt);
      if (!confirmationUrl) marketingStatus = "already-confirmed";
    } catch {
      marketingStatus = "unavailable";
    }
  }
  const paragraphs = [
    `Hoi ${data.name},`,
    data.source === "website-check"
      ? `Bedankt voor je aanvraag. Mario bekijkt ${data.website} persoonlijk en neemt via dit e-mailadres contact met je op met een eerste beeld van de verbeterkansen. Dit is een persoonlijke beoordeling; er wordt geen automatisch scanrapport gegenereerd.`
      : "Bedankt voor je bericht. Mario bekijkt je vraag en neemt persoonlijk contact met je op om de mogelijkheden en een passende vervolgstap te bespreken.",
    data.message ? `Je bericht:\n${data.message}` : "",
    confirmationUrl
      ? "Je hebt ook gekozen voor website- en groeitips per e-mail. Bevestig die keuze via de onderstaande knop. Je staat pas na die bevestiging actief op de lijst. De link is 24 uur geldig. Je aanvraag wordt ook zonder deze bevestiging behandeld."
      : marketingStatus === "already-confirmed"
        ? "Je bent al aangemeld voor website- en groeitips. Je e-mailvoorkeur blijft behouden."
        : marketingStatus === "unavailable"
          ? "Je aanvraag is ontvangen. Je aanmelding voor website- en groeitips kon nog niet worden verwerkt; je bent hierdoor niet aangemeld."
          : "Je bent niet aangemeld voor marketingmails.",
    "Heb je nog iets toe te voegen? Antwoord gerust op deze e-mail.",
  ].filter(Boolean);
  let receiptSent = false;
  try {
    const receipt = await resend<{ id: string }>(
      config,
      "/emails",
      {
        method: "POST",
        body: JSON.stringify(
          makeEmail(
            config,
            data.email,
            "Je aanvraag bij MEDIADUSTRY",
            paragraphs,
            data.source,
            confirmationUrl
              ? {
                  label: "Bevestig mijn e-mailaanmelding",
                  url: confirmationUrl,
                }
              : undefined,
          ),
        ),
      },
      `receipt-${data.requestId}-${marketingStatus}`,
    );
    receiptSent = Boolean(receipt.id);
  } catch {
    /* The request is received; disclose the separate receipt failure below. */
  }
  return json({
    success: true,
    source: data.source,
    receiptSent,
    marketingStatus:
      !receiptSent && marketingStatus === "pending"
        ? "unavailable"
        : marketingStatus,
  });
}

export async function changeConsent(
  request: Request,
  purpose: "confirm" | "unsubscribe",
  config: ContactConfig,
): Promise<Response> {
  config = { ...config, deadlineAt: Date.now() + 48_000 };
  if (!sameOrigin(request, config))
    return json(
      { success: false, message: "Vernieuw de pagina en probeer opnieuw." },
      403,
    );
  if (!configReady(config, true))
    return json(
      {
        success: false,
        message:
          "Je e-mailvoorkeur kan op dit moment niet worden verwerkt. Mail info@mediadustry.com voor hulp.",
      },
      503,
    );
  let token: string;
  try {
    const body = await request.text();
    if (body.length > 2500) throw new Error("Too large");
    const payload = JSON.parse(body);
    if (typeof payload.token !== "string") throw new Error("Invalid");
    token = payload.token;
  } catch {
    return json({ success: false, message: "Deze link is ongeldig." }, 400);
  }
  const now = (config.now || Date.now)();
  const value = readConsentToken(token, purpose, config.secret, now);
  if (!value)
    return json(
      {
        success: false,
        message:
          purpose === "confirm"
            ? "Deze bevestigingslink is verlopen of ongeldig. Vraag via het contactformulier een nieuwe link aan."
            : "Deze afmeldlink is ongeldig. Mail info@mediadustry.com om je af te melden.",
      },
      400,
    );
  try {
    if (await rateLimited(request, config, purpose))
      return json(
        {
          success: false,
          message:
            "Probeer het over tien minuten opnieuw of mail info@mediadustry.com.",
        },
        429,
      );
    return await locked(config, contactKey(value.email), async () => {
      const current = await readState(config, value.email);
      const contact = await getContact(config, value.email);
      if (purpose === "unsubscribe") {
        // Persist revocation first so a failed provider call cannot leave a reusable confirmation token.
        await writeState(config, value.email, {
          ...(current || {
            nonce: null,
            requestedAt: new Date(value.issuedAt).toISOString(),
            source: "email",
            version: CONSENT_VERSION,
          }),
          state: "unsubscribed",
          nonce: null,
          unsubscribedAt: new Date(now).toISOString(),
        });
        if (contact) {
          // Removing only our segment preserves consent for other projects in this Resend account.
          try {
            await resend(
              config,
              `/contacts/${contact.id}/segments/${config.segmentId}`,
              { method: "DELETE" },
            );
          } catch (error) {
            if (!(error instanceof ProviderError && error.status === 404))
              throw error;
          }
        }
        return json({
          success: true,
          message:
            "Je bent afgemeld voor website- en groeitips van MEDIADUSTRY.",
        });
      }
      if (
        current?.state === "confirmed" &&
        current.confirmedNonce === value.nonce
      ) {
        return json({
          success: true,
          message:
            "Deze aanmelding is al bevestigd. Je huidige e-mailvoorkeur is niet gewijzigd.",
        });
      }
      if (
        !current ||
        current.state !== "pending" ||
        current.nonce !== value.nonce
      ) {
        return json(
          {
            success: false,
            message:
              "Deze link is al gebruikt of vervangen. Je e-mailvoorkeur is niet gewijzigd.",
          },
          409,
        );
      }
      if (contact?.unsubscribed)
        return json(
          {
            success: false,
            message:
              "Dit e-mailadres is al afgemeld bij onze e-maildienst. Mail info@mediadustry.com als je opnieuw tips wilt ontvangen.",
          },
          409,
        );
      const properties = {
        md_consent_version: current.version,
        md_consent_source: current.source,
        md_confirmed_at: new Date(now).toISOString(),
      };
      let contactId: string;
      if (contact) {
        await resend(config, `/contacts/${contact.id}`, {
          method: "PATCH",
          body: JSON.stringify({ properties }),
        });
        await resend(
          config,
          `/contacts/${contact.id}/segments/${config.segmentId}`,
          { method: "POST" },
        );
        contactId = contact.id;
      } else {
        const created = await resend<{ id: string }>(config, "/contacts", {
          method: "POST",
          body: JSON.stringify({
            email: value.email,
            unsubscribed: false,
            properties,
            segments: [{ id: config.segmentId }],
          }),
        });
        if (!created.id) throw new ProviderError(502);
        contactId = created.id;
      }
      try {
        await writeState(config, value.email, {
          ...current,
          state: "confirmed",
          nonce: null,
          confirmedNonce: value.nonce,
          confirmedAt: new Date(now).toISOString(),
          unsubscribedAt: undefined,
        });
      } catch (error) {
        // Compensate an interrupted state write: keep the contact outside this project's marketing segment.
        await resend(
          config,
          `/contacts/${contactId}/segments/${config.segmentId}`,
          { method: "DELETE" },
        );
        throw error;
      }
      const unsubscribeToken = signConsentToken(
        {
          ...value,
          purpose: "unsubscribe",
          expiresAt: now + 10 * 365 * 24 * 60 * 60 * 1000,
        },
        config.secret,
      );
      const url = `${config.baseUrl}/afmelden?token=${encodeURIComponent(unsubscribeToken)}`;
      try {
        await resend(
          config,
          "/emails",
          {
            method: "POST",
            body: JSON.stringify(
              makeEmail(
                config,
                value.email,
                "Je e-mailaanmelding is bevestigd",
                [
                  "Je aanmelding voor de website- en groeitips van MEDIADUSTRY is bevestigd.",
                  "Een sterke website begint bij drie vragen: is voor bezoekers direct duidelijk wat je aanbiedt, werkt de belangrijkste actie op mobiel en sluit je inhoud aan op hun vraag? Die drie punten zijn een goed begin voor je volgende verbetering.",
                  "Je ontvangt af en toe een praktische tip. Wil je ze niet meer ontvangen? Afmelden kan via de onderstaande knop of door te antwoorden op deze e-mail.",
                ],
                "marketing-confirmed",
                { label: "Afmelden voor website- en groeitips", url },
              ),
            ),
          },
          `welcome-${contactId}-${value.nonce}`,
        );
      } catch {
        /* Consent was persisted before the optional welcome email. */
      }
      return json({
        success: true,
        message:
          "Je aanmelding is bevestigd. Je ontvangt voortaan af en toe website- en groeitips van MEDIADUSTRY.",
      });
    });
  } catch (error) {
    return json(
      {
        success: false,
        message:
          error instanceof ProviderError && error.status === 409
            ? "Je e-mailvoorkeur wordt al verwerkt. Wacht even en probeer opnieuw."
            : "Je e-mailvoorkeur kon niet worden verwerkt. Probeer opnieuw of mail info@mediadustry.com.",
      },
      error instanceof ProviderError && error.status === 409 ? 409 : 502,
    );
  }
}
