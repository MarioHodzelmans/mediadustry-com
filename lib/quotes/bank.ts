import QRCode from "qrcode";
import { formatMoney } from "./format";
import { calculatePaymentSplit } from "./money.mjs";
import { quoteConfig } from "./config";

export const bankConfigured = Boolean(
  process.env.ING_BENEFICIARY_NAME && process.env.ING_IBAN,
);

export function bankPaymentDetails(kind: "ANBETALING" | "RESTANT") {
  if (!bankConfigured) return null;
  const iban = (process.env.ING_IBAN ?? "").replaceAll(" ", "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return null;
  const reference = `${kind} ${quoteConfig.id}`;
  const split = calculatePaymentSplit(quoteConfig.totalCents);
  const amountCents =
    kind === "ANBETALING" ? split.downPaymentCents : split.remainingCents;
  const amount = (amountCents / 100).toFixed(2);
  const name = process.env.ING_BENEFICIARY_NAME ?? "";
  const remittance = reference.replace(/[^A-Za-z0-9 .-]/g, "").slice(0, 140);
  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`.replace(
    /[A-Z]/g,
    (letter) => String(letter.charCodeAt(0) - 55),
  );
  let checksum = 0;
  for (const digit of rearranged)
    checksum = (checksum * 10 + Number(digit)) % 97;
  if (checksum !== 1 || !quoteConfig.id) return null;
  return {
    iban,
    beneficiary: name,
    reference,
    amountCents,
    amount: formatMoney(amountCents),
    epc: [
      "BCD",
      "002",
      "1",
      "SCT",
      "",
      name,
      iban,
      `EUR${amount}`,
      "",
      remittance,
    ].join("\n"),
  };
}

export async function paymentQrDataUrl(kind: "ANBETALING" | "RESTANT") {
  const details = bankPaymentDetails(kind);
  return details
    ? QRCode.toDataURL(details.epc, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 300,
      })
    : null;
}
