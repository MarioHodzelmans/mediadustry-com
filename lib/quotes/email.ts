import { Resend } from "resend";
import { escapeHtml, formatMoney } from "./format";
import { getQueuedEmails, recordEmailResult } from "./workflow";

type EmailRow = {
  id: string;
  quote_id: string;
  event_type: string;
  recipient: string;
  payload: Record<string, unknown>;
  status?: string;
};

function emailContent(
  eventType: string,
  quoteId: string,
  payload: Record<string, unknown>,
) {
  const amountCents = Number(
    payload.down_payment_cents ?? payload.amount_cents ?? 0,
  );
  const reference = String(payload.payment_reference ?? quoteId);
  const accessToken = process.env.DIETWIEJ_ACCESS_TOKEN ?? "";
  const paymentUrl = `${process.env.APP_BASE_URL ?? "https://www.mediadustry.com"}/offerte/dietwiej/${encodeURIComponent(accessToken)}`;
  const subjects: Record<string, string> = {
    quotation_accepted: `Ontvangstbevestiging offerte ${quoteId}`,
    quotation_accepted_internal: `Nieuwe offerteacceptatie ${quoteId}`,
    down_payment_requested: `Aanbetaling offerte ${quoteId}`,
    down_payment_verified: `Aanbetaling bevestigd · offerte ${quoteId}`,
    remaining_payment_requested: `Restantbetaling offerte ${quoteId}`,
    quotation_fully_paid: `Betaling afgerond · offerte ${quoteId}`,
  };
  const messages: Record<string, string> = {
    quotation_accepted: `De digitale acceptatie van offerte ${quoteId} is vastgelegd. De genoemde offertebedragen zijn exclusief btw.`,
    quotation_accepted_internal: `Offerte ${quoteId} is digitaal geaccepteerd door ${String(payload.customer_name ?? "de klant")}. Contact: ${String(payload.customer_email ?? "geen e-mailadres")}${payload.customer_phone ? ` · ${String(payload.customer_phone)}` : ""}. Offertebedrag: ${formatMoney(Number(payload.quote_total_cents ?? 0))} exclusief btw.`,
    down_payment_requested: `Voor offerte ${quoteId} staat een aanbetaling van ${formatMoney(amountCents)} open. Gebruik bij de overboeking referentie ${reference}.`,
    down_payment_verified: `De aanbetaling voor offerte ${quoteId} van ${formatMoney(amountCents)} is handmatig gecontroleerd en geregistreerd.`,
    remaining_payment_requested: `Voor offerte ${quoteId} staat nu een restantbetaling van ${formatMoney(amountCents)} open. Gebruik referentie ${reference}.`,
    quotation_fully_paid: `Alle betalingen voor offerte ${quoteId} zijn handmatig gecontroleerd en geregistreerd.`,
  };
  const body = escapeHtml(
    messages[eventType] ?? `Er is een update over offerte ${quoteId}.`,
  );
  const internalDetails =
    eventType === "quotation_accepted_internal"
      ? `<p>Contactgegevens klant:<br>${escapeHtml(String(payload.customer_email ?? ""))}<br>${escapeHtml(String(payload.customer_phone ?? ""))}</p>`
      : "";
  const action = eventType.endsWith("requested")
    ? `<p>Betaalgegevens staan in de persoonlijke offertepagina: <a href="${escapeHtml(paymentUrl)}">${escapeHtml(paymentUrl)}</a></p>`
    : "";
  return {
    subject: subjects[eventType] ?? `Update offerte ${quoteId}`,
    html: `<div style="font-family:Arial,sans-serif;color:#24211d;line-height:1.6"><p>${body}</p>${internalDetails}${action}<p>Met vriendelijke groet,<br>MEDIADUSTRY</p></div>`,
    text: `${messages[eventType] ?? `Er is een update over offerte ${quoteId}.`}${eventType.endsWith("requested") ? `\n\nBetaalgegevens: ${paymentUrl}` : ""}\n\nMet vriendelijke groet,\nMEDIADUSTRY`,
  };
}

export async function sendQueuedEmail(email: EmailRow) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    await recordEmailResult({
      id: email.id,
      status: "failed",
      error: "Resend is not configured",
    });
    return false;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const content = emailContent(email.event_type, email.quote_id, email.payload);
  const { data, error } = await resend.emails.send(
    { from: process.env.RESEND_FROM_EMAIL, to: [email.recipient], ...content },
    { idempotencyKey: `quote-${email.event_type}/${email.quote_id}` },
  );
  if (error) {
    await recordEmailResult({
      id: email.id,
      status: "failed",
      error: error.message.slice(0, 400),
    });
    return false;
  }
  await recordEmailResult({
    id: email.id,
    status: "sent",
    providerEmailId: data?.id,
  });
  return true;
}

export async function flushQueuedEmails(quoteId?: string) {
  const result = (await getQueuedEmails(quoteId)) as unknown as EmailRow[];
  const emails = result.filter((item) => item.status !== "sent");
  const outcomes = await Promise.all(
    emails.map((item) => sendQueuedEmail(item)),
  );
  return outcomes.every(Boolean);
}
