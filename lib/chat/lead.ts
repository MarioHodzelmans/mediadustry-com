import { createRateLimiter } from "./rate-limit";
import { LEAD_RATE_LIMIT, LEAD_RATE_WINDOW_MS } from "./limits";
import { siteFacts } from "./site-facts";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const leadLimiter = createRateLimiter({
  limit: LEAD_RATE_LIMIT,
  windowMs: LEAD_RATE_WINDOW_MS,
});
const recentLeads = new Map<string, number>();

export function resetLeadDeliveryForTests(): void {
  recentLeads.clear();
}

export type LeadInput = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  need?: string;
  budget?: string;
  timeline?: string;
};

export type LeadResult = {
  ok: boolean;
  delivered: boolean;
  duplicate?: boolean;
  visitorMessage: string;
};

export type LeadFieldError = { ok: false; visitorMessage: string };

const MAIL_FALLBACK = `Dat lukt hier niet automatisch. Mail ${siteFacts.email} of gebruik de contactpagina ${siteFacts.url}${siteFacts.contactPath}. Er wordt niets opgeslagen.`;

function text(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

export function normalizeLead(
  input: LeadInput,
):
  | { lead: Required<Pick<LeadInput, "name" | "need">> & LeadInput }
  | LeadFieldError {
  const name = text(input.name, 120);
  const need = text(input.need, 2000);
  const email = text(input.email, 200);
  const phone = text(input.phone, 40);
  const company = text(input.company, 160);
  const budget = text(input.budget, 160);
  const timeline = text(input.timeline, 160);

  if (!name) {
    return {
      ok: false,
      visitorMessage:
        "Er ontbreekt een naam. Vraag daar om en roep dit hulpmiddel daarna opnieuw aan.",
    };
  }
  if (!need) {
    return {
      ok: false,
      visitorMessage:
        "Er ontbreekt een omschrijving van de vraag. Vraag daar om.",
    };
  }
  if (!email && !phone) {
    return {
      ok: false,
      visitorMessage:
        "Er is nog geen e-mailadres of telefoonnummer. Vraag om één van beide. Verzin ze niet.",
    };
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      visitorMessage:
        "Het e-mailadres lijkt ongeldig. Vraag om het adres te controleren.",
    };
  }
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (phone && digits.length < 6) {
    return {
      ok: false,
      visitorMessage:
        "Het telefoonnummer lijkt onvolledig. Vraag om het te controleren.",
    };
  }

  return { lead: { name, need, email, phone, company, budget, timeline } };
}

function leadKey(lead: LeadInput): string {
  return [lead.email, lead.phone, lead.name, lead.need]
    .map((part) => (part ?? "").toLowerCase())
    .join("|");
}

export async function deliverLead(
  input: LeadInput,
  options: {
    ip?: string;
    now?: number;
    fetchImpl?: typeof fetch;
    accessKey?: string | null;
  } = {},
): Promise<LeadResult> {
  const normalized = normalizeLead(input);
  if ("ok" in normalized)
    return {
      ok: false,
      delivered: false,
      visitorMessage: normalized.visitorMessage,
    };

  const { lead } = normalized;
  const now = options.now ?? Date.now();
  const limit = leadLimiter.check(options.ip || "unknown", now);
  if (!limit.ok) {
    return {
      ok: false,
      delivered: false,
      visitorMessage: `Er zijn net al enkele aanvragen gedaan. Mail ${siteFacts.email} als het dringend is.`,
    };
  }

  if (recentLeads.size > 500) {
    for (const [storedKey, storedAt] of recentLeads) {
      if (now - storedAt > 30 * 60 * 1000) recentLeads.delete(storedKey);
    }
  }

  const key = leadKey(lead);
  const previous = recentLeads.get(key);
  if (previous && now - previous < 30 * 60 * 1000) {
    return {
      ok: true,
      delivered: true,
      duplicate: true,
      visitorMessage:
        "Deze gegevens zijn net al doorgegeven. Een teamlid neemt contact op voor een kennismakingsgesprek.",
    };
  }

  const accessKey =
    options.accessKey === undefined
      ? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      : options.accessKey;
  if (!accessKey) {
    // TODO(mario): het contactformulier levert aan via Web3Forms met
    // NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY. Zonder die sleutel slaan we niets op.
    // Zet de sleutel in Vercel, of kies later een andere server-side inbox.
    // Resend staat al in het project voor offertes, maar die afzender is een
    // aparte configuratie en is hier bewust niet aangesloten.
    return { ok: false, delivered: false, visitorMessage: MAIL_FALLBACK };
  }

  const lines = [
    "Nieuwe lead via de websitechat.",
    `Naam: ${lead.name}`,
    `Bedrijf: ${lead.company || "niet genoemd"}`,
    `E-mail: ${lead.email || "niet genoemd"}`,
    `Telefoon: ${lead.phone || "niet genoemd"}`,
    `Vraag: ${lead.need}`,
    `Budget (alleen als de bezoeker het noemde): ${lead.budget || "niet genoemd"}`,
    `Planning (alleen als de bezoeker het noemde): ${lead.timeline || "niet genoemd"}`,
  ];
  if (!lead.email) {
    lines.push(
      "Let op: er is geen e-mailadres van de bezoeker. Gebruik het telefoonnummer.",
    );
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "Nieuwe chatlead via mediadustry.com",
        from_name: "MEDIADUSTRY websitechat",
        name: lead.name,
        email: lead.email || siteFacts.email,
        message: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await response.json()) as { success?: boolean };
    if (!response.ok || data.success !== true) {
      return { ok: false, delivered: false, visitorMessage: MAIL_FALLBACK };
    }
  } catch {
    return { ok: false, delivered: false, visitorMessage: MAIL_FALLBACK };
  }

  recentLeads.set(key, now);
  return {
    ok: true,
    delivered: true,
    visitorMessage:
      "De gegevens zijn doorgegeven. Een teamlid neemt contact op voor een kennismakingsgesprek.",
  };
}
