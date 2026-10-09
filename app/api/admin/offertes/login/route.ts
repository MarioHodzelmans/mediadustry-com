import { NextResponse } from "next/server";
import {
  adminAuthConfigured,
  issueAdminSession,
  passwordMatches,
} from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { hasDatabase } from "@/lib/quotes/db";
import { consumeAdminLoginAttempt } from "@/lib/quotes/workflow";

export async function POST(request: Request) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!adminAuthConfigured())
    return NextResponse.json(
      { error: "Adminlogin is nog niet ingericht." },
      { status: 503 },
    );
  if (!hasDatabase())
    return NextResponse.json(
      { error: "Database is nog niet ingericht." },
      { status: 503 },
    );
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!(await consumeAdminLoginAttempt(ip)))
    return NextResponse.json(
      { error: "Te veel pogingen. Probeer het over 15 minuten opnieuw." },
      { status: 429 },
    );
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige invoer." }, { status: 400 });
  }
  if (typeof body.password !== "string" || !passwordMatches(body.password))
    return NextResponse.json(
      { error: "Inloggen is niet gelukt." },
      { status: 401 },
    );
  await issueAdminSession();
  return NextResponse.json({ authenticated: true });
}
