import { Resend } from "resend";
import { escapeHtml, formatMoney } from "./format";
import { getQueuedEmails, recordEmailResult } from "./workflow";
import { quoteConfig } from "./config";

type EmailRow = {
  id: string;
  quote_id: string;
  event_type: string;
  recipient: string;
  payload: Record<string, unknown>;
  status?: string;
};

function renderCustomerSignature() {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:600px;font-family:Arial,Helvetica,sans-serif;color:#171717">
    <tr><td style="font-size:14px;line-height:21px;padding:0 0 14px">Met vriendelijke groet,</td></tr>
    <tr><td style="font-size:20px;line-height:27px;font-weight:bold;padding:0">Mario Hodzelmans</td></tr>
    <tr><td style="font-size:14px;line-height:21px;padding:2px 0 0">E-commerce &amp; Digital Consultant</td></tr>
    <tr><td style="padding:18px 0 16px"><img src="https://www.mediadustry.com/logo.png" width="132" alt="MEDIADUSTRY" style="display:block;width:132px;max-width:132px;height:auto;border:0;outline:none;text-decoration:none"></td></tr>
    <tr><td style="font-size:13px;line-height:20px"><a href="tel:+31624383998" style="color:#171717;text-decoration:none">+31 6 243 83 998</a></td></tr>
    <tr><td style="font-size:13px;line-height:20px"><a href="mailto:info@mediadustry.com" style="color:#171717;text-decoration:none">info@mediadustry.com</a></td></tr>
    <tr><td style="font-size:13px;line-height:20px"><a href="https://www.mediadustry.com/" style="color:#171717;text-decoration:none;font-weight:bold">www.mediadustry.com</a></td></tr>
    <tr><td style="font-size:13px;line-height:20px;padding-top:12px">Tenelenweg 11<br>6367 VR Voerendaal, The Netherlands</td></tr>
    <tr><td style="font-size:10px;line-height:15px;font-style:italic;color:#666666;padding-top:22px">Legal Disclaimer: This e-mail may contain confidential and/or privileged information. If you are not the intended recipient or have received this e-mail in error please notify the sender immediately and destroy this e-mail. Any unauthorised copying, disclosure or distribution of the material in this e-mail is strictly forbidden.</td></tr>
  </table>`;
}

function customerAcceptanceContent(
  quoteId: string,
  payload: Record<string, unknown>,
) {
  const acceptedBy = escapeHtml(String(payload.accepted_by ?? ""));
  const totalCents = Number(
    payload.quote_subtotal_cents ??
      quoteConfig.websiteCents + quoteConfig.outlookCents,
  );
  const acceptedAt = String(payload.accepted_at ?? "");
  const acceptedDate =
    acceptedAt && !Number.isNaN(new Date(acceptedAt).getTime())
      ? new Intl.DateTimeFormat("nl-NL", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "Europe/Amsterdam",
        }).format(new Date(acceptedAt))
      : "";
  const dateLine = acceptedDate
    ? `<tr><td style="font-size:13px;line-height:20px;color:#555b66;padding-top:12px">Akkoord ontvangen op ${escapeHtml(acceptedDate)}.</td></tr>`
    : "";
  const greeting = acceptedBy ? `Beste ${acceptedBy},` : "Beste klant,";
  const plainText = `${greeting}\n\nWe hebben je digitale akkoord op offerte ${quoteId} ontvangen en vastgelegd. Het offertebedrag is ${formatMoney(totalCents)} exclusief btw. De betaalgegevens voor de overeengekomen aanbetaling ontvang je in een aparte e-mail. We nemen contact met je op over de vervolgstappen.${acceptedDate ? `\n\nAkkoord ontvangen op ${acceptedDate}.` : ""}\n\nMet vriendelijke groet,\nMario Hodzelmans\nE-commerce & Digital Consultant\nMEDIADUSTRY\n+31 6 243 83 998\ninfo@mediadustry.com\nwww.mediadustry.com\nTenelenweg 11\n6367 VR Voerendaal, The Netherlands\n\nLegal Disclaimer: This e-mail may contain confidential and/or privileged information. If you are not the intended recipient or have received this e-mail in error please notify the sender immediately and destroy this e-mail. Any unauthorised copying, disclosure or distribution of the material in this e-mail is strictly forbidden.`;

  return {
    subject: `We hebben je akkoord ontvangen · offerte ${quoteId}`,
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#f3f1ef;font-family:Arial,Helvetica,sans-serif;color:#171717"><tr><td align="center" style="padding:24px 12px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;max-width:600px;background-color:#ffffff"><tr><td style="padding:32px 30px 26px;border-top:4px solid #123bc6"><img src="https://www.mediadustry.com/logo.png" width="132" alt="MEDIADUSTRY" style="display:block;width:132px;max-width:132px;height:auto;border:0;outline:none;text-decoration:none"></td></tr><tr><td style="padding:0 30px 30px;font-size:15px;line-height:24px"><p style="margin:0 0 16px">${greeting}</p><h1 style="font-size:25px;line-height:32px;letter-spacing:-.4px;margin:0 0 16px;color:#171717">Je akkoord is ontvangen</h1><p style="margin:0 0 14px">We hebben je digitale akkoord op offerte ${escapeHtml(quoteId)} ontvangen en vastgelegd.</p><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#f5f6fa;margin:20px 0"><tr><td style="padding:16px 18px;font-size:14px;line-height:22px">Offertebedrag <strong style="font-size:18px;color:#123bc6">${escapeHtml(formatMoney(totalCents))}</strong><br><span style="font-size:12px;color:#555b66">Exclusief btw</span></td></tr></table><p style="margin:0 0 12px">De betaalgegevens voor de overeengekomen aanbetaling ontvang je in een aparte e-mail. We nemen contact met je op over de vervolgstappen.</p>${dateLine}<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse"><tr><td style="padding-top:26px">${renderCustomerSignature()}</td></tr></table></td></tr></table></td></tr></table>`,
    text: plainText,
  };
}

function emailContent(
  eventType: string,
  quoteId: string,
  payload: Record<string, unknown>,
) {
  if (eventType === "quotation_accepted") {
    return customerAcceptanceContent(quoteId, payload);
  }
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
    quotation_accepted_internal: `Offerte ${quoteId} is digitaal geaccepteerd door ${String(payload.customer_name ?? "de klant")}. Contact: ${String(payload.customer_email ?? "geen e-mailadres")}${payload.customer_phone ? ` · ${String(payload.customer_phone)}` : ""}. Offertebedrag: ${formatMoney(Number(payload.quote_subtotal_cents ?? quoteConfig.websiteCents + quoteConfig.outlookCents))} exclusief btw.`,
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
