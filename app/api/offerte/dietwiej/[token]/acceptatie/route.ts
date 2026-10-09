import { NextResponse } from "next/server";
import { isAcceptanceReady, validCustomerToken } from "@/lib/quotes/config";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { hasDatabase } from "@/lib/quotes/db";
import { flushQueuedEmails } from "@/lib/quotes/email";
import { acceptQuote, ensureQuote } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/offerte/dietwiej/[token]/acceptatie">,
) {
  const { token } = await params;
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!validCustomerToken(token))
    return NextResponse.json(
      { error: "Offerte niet gevonden." },
      { status: 404 },
    );
  if (!hasDatabase() || !isAcceptanceReady())
    return NextResponse.json(
      { error: "De offerte is nog niet ingericht voor digitale acceptatie." },
      { status: 503 },
    );

  let input: {
    confirmations?: unknown;
    name?: unknown;
    email?: unknown;
    phone?: unknown;
  };
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige invoer." }, { status: 400 });
  }
  if (
    typeof input.name !== "string" ||
    input.name.trim().length < 2 ||
    input.name.trim().length > 120 ||
    !Array.isArray(input.confirmations) ||
    input.confirmations.length !== 4 ||
    input.confirmations.some((value) => value !== true)
  ) {
    return NextResponse.json(
      { error: "Vul je naam in en bevestig je akkoord." },
      { status: 400 },
    );
  }
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length > 32 ||
    phone.replace(/\D/g, "").length < 8
  ) {
    return NextResponse.json(
      {
        error: "Vul een geldig e-mailadres en telefoonnummer in.",
      },
      { status: 400 },
    );
  }

  try {
    const quote = await ensureQuote(token);
    const forwarded =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const ip =
      forwarded && forwarded.includes(":")
        ? `${forwarded.slice(0, forwarded.lastIndexOf(":"))}:0`
        : forwarded
          ? `${forwarded.split(".").slice(0, 3).join(".")}.0`
          : null;
    const accepted = await acceptQuote(String(quote.id), {
      acceptedAt: new Date().toISOString(),
      name: (input.name as string).trim(),
      email,
      phone,
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
      confirmations: [
        "quotation_reviewed",
        "terms_accepted",
        "payment_obligation_understood",
        "organization_authority_confirmed",
      ],
    });
    if (!accepted)
      return NextResponse.json(
        {
          error:
            "Deze offerte is al geaccepteerd of kan niet worden geaccepteerd.",
        },
        { status: 409 },
      );
    const emailReady = Boolean(
      process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL,
    );
    if (emailReady) await flushQueuedEmails(String(quote.id));
    return NextResponse.json({ accepted: true, emailConfigured: emailReady });
  } catch (error) {
    console.error(
      "quote acceptance failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      {
        error:
          "Acceptatie kon niet worden vastgelegd. Probeer het later opnieuw.",
      },
      { status: 503 },
    );
  }
}
