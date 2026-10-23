/**
 * Owner notification used by the earlier `/api/contact` service
 * (`deliverSubmission` in the removed `lib/contact-service.ts`).
 * Production still has `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and
 * `CONTACT_TO_EMAIL`. The live contact page does not call this anymore;
 * chat leads do, with the same Resend request.
 */

export type ContactMailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export function readContactMailConfig(
  env: Record<string, string | undefined> = process.env,
): ContactMailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  const from = env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const to = env.CONTACT_TO_EMAIL?.trim() || "info@mediadustry.com";
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

export type ContactNotice = {
  subject: string;
  paragraphs: string[];
  replyTo?: string;
  source: string;
  idempotencyKey: string;
};

export async function sendContactNotice(
  config: ContactMailConfig,
  notice: ContactNotice,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const text = `${notice.paragraphs.join("\n\n")}\n\nMario Hodzelmans · MEDIADUSTRY\ninfo@mediadustry.com`;
  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#e9eceb;color:#101722;font-family:Arial,sans-serif"><table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:32px 20px"><table role="presentation" style="max-width:580px;margin:auto;width:100%;background:#fff;border-collapse:collapse"><tr><td style="padding:36px"><p style="font-size:13px;letter-spacing:2px;font-weight:700">MEDIADUSTRY</p><h1 style="font-size:28px;line-height:1.2">${escapeHtml(notice.subject)}</h1>${notice.paragraphs.map((paragraph) => `<p style="font-size:16px;line-height:1.65;white-space:pre-line">${escapeHtml(paragraph)}</p>`).join("")}<p style="font-size:13px;line-height:1.6;border-top:1px solid #ddd;padding-top:20px">Mario Hodzelmans · MEDIADUSTRY<br><a href="mailto:info@mediadustry.com">info@mediadustry.com</a></p></td></tr></table></td></tr></table></body></html>`;
  const payload: Record<string, unknown> = {
    from: config.from,
    to: [config.to],
    subject: notice.subject,
    text,
    html,
    tags: [{ name: "source", value: notice.source }],
  };
  if (notice.replyTo) payload.reply_to = notice.replyTo;

  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": notice.idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const data = (await response.json()) as { id?: string };
    return Boolean(data.id);
  } catch {
    return false;
  }
}
