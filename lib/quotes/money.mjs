export function calculatePaymentSplit(totalCents) {
  if (!Number.isSafeInteger(totalCents) || totalCents < 1) {
    throw new RangeError("totalCents must be a positive safe integer");
  }
  const downPaymentCents = Math.floor(totalCents / 2);
  return { downPaymentCents, remainingCents: totalCents - downPaymentCents };
}
