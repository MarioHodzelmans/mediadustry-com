import type { ContactSource } from "./funnel";

export type SubmissionReceipt = {
  source: ContactSource;
  receiptSent: boolean;
  marketingStatus:
    | "pending"
    | "not-requested"
    | "already-confirmed"
    | "unavailable";
  acceptedAt: number;
};

const RECEIPT_KEY = "mediadustry.submission-receipt";

export function saveReceipt(value: SubmissionReceipt) {
  try {
    sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function receiptSnapshot() {
  try {
    const value = sessionStorage.getItem(RECEIPT_KEY);
    if (!value) return null;
    const receipt = JSON.parse(value) as SubmissionReceipt;
    if (
      !Number.isSafeInteger(receipt.acceptedAt) ||
      Date.now() - receipt.acceptedAt > 30 * 60 * 1000 ||
      Date.now() < receipt.acceptedAt ||
      (receipt.source !== "contact" && receipt.source !== "website-check")
    )
      return null;
    return value;
  } catch {
    return null;
  }
}
