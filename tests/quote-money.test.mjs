import test from "node:test";
import assert from "node:assert/strict";
import { calculatePaymentSplit } from "../lib/quotes/money.mjs";

test("the €2,722.50 quotation splits into two exact 50% amounts", () => {
  assert.deepEqual(calculatePaymentSplit(272250), {
    downPaymentCents: 136125,
    remainingCents: 136125,
  });
});

test("odd cent totals preserve every cent in the remaining balance", () => {
  assert.deepEqual(calculatePaymentSplit(1001), {
    downPaymentCents: 500,
    remainingCents: 501,
  });
});

test("invalid or unsafe amounts are rejected", () => {
  for (const amount of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => calculatePaymentSplit(amount), RangeError);
  }
});
