import { createHmac, timingSafeEqual } from "node:crypto";

export type ConsentToken = {
  purpose: "confirm" | "unsubscribe";
  email: string;
  nonce: string;
  issuedAt: number;
  expiresAt: number;
};

export function signConsentToken(value: ConsentToken, secret: string): string {
  if (secret.length < 32)
    throw new Error("CONTACT_TOKEN_SECRET must contain at least 32 characters");
  const payload = Buffer.from(JSON.stringify(value)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function readConsentToken(
  token: string,
  purpose: ConsentToken["purpose"],
  secret: string,
  now = Date.now(),
): ConsentToken | null {
  if (secret.length < 32 || token.length > 2000) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const expected = createHmac("sha256", secret).update(parts[0]).digest();
  let actual: Buffer;
  try {
    actual = Buffer.from(parts[1], "base64url");
  } catch {
    return null;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    return null;
  try {
    const value = JSON.parse(
      Buffer.from(parts[0], "base64url").toString("utf8"),
    ) as ConsentToken;
    if (
      value.purpose !== purpose ||
      typeof value.email !== "string" ||
      typeof value.nonce !== "string" ||
      !Number.isSafeInteger(value.issuedAt) ||
      !Number.isSafeInteger(value.expiresAt) ||
      value.issuedAt > now + 300_000 ||
      value.expiresAt <= now ||
      value.expiresAt <= value.issuedAt
    )
      return null;
    return value;
  } catch {
    return null;
  }
}

export function consentNonce(requestId: string, email: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`marketing-confirm:${requestId}:${email}`)
    .digest("hex");
}
