import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "mediadustry_quote_admin";
const maxAgeSeconds = 60 * 60 * 8;

function secret() {
  return process.env.QUOTE_ADMIN_SECRET ?? "";
}

function signature(expiresAt: string) {
  return createHmac("sha256", secret()).update(expiresAt).digest("hex");
}

export function adminAuthConfigured() {
  return Boolean(
    process.env.QUOTE_ADMIN_PASSWORD &&
    process.env.QUOTE_ADMIN_PASSWORD.length >= 20 &&
    Buffer.byteLength(secret()) >= 32,
  );
}

export function passwordMatches(password: string) {
  const expected = process.env.QUOTE_ADMIN_PASSWORD ?? "";
  if (!expected || !password) return false;
  const actual = createHmac("sha256", secret()).update(password).digest();
  const wanted = createHmac("sha256", secret()).update(expected).digest();
  return timingSafeEqual(actual, wanted);
}

export async function issueAdminSession() {
  if (!adminAuthConfigured())
    throw new Error("Admin authentication is not configured");
  const expiresAt = String(Math.floor(Date.now() / 1000) + maxAgeSeconds);
  const store = await cookies();
  store.set(cookieName, `${expiresAt}.${signature(expiresAt)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  if (!adminAuthConfigured()) return false;
  const value = (await cookies()).get(cookieName)?.value ?? "";
  const [expiresAt, provided] = value.split(".");
  if (
    !expiresAt ||
    !provided ||
    Number(expiresAt) < Math.floor(Date.now() / 1000)
  )
    return false;
  const expected = signature(expiresAt);
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
