import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { flushQueuedEmails } from "@/lib/quotes/email";
import { verifyPayment } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/admin/offertes/[quoteId]/betalingen">,
) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  let body: { kind?: unknown; bankReference?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige invoer." }, { status: 400 });
  }
  if (body.kind !== "down_payment" && body.kind !== "remaining_balance")
    return NextResponse.json(
      { error: "Ongeldig betalingstype." },
      { status: 400 },
    );
  if (typeof body.bankReference !== "string" || body.bankReference.length > 120)
    return NextResponse.json(
      { error: "Vul de banktransactiereferentie in." },
      { status: 400 },
    );
  const { quoteId } = await params;
  try {
    const changed = await verifyPayment({
      quoteId,
      kind: body.kind,
      verifier: process.env.QUOTE_ADMIN_ID ?? "admin",
      bankReference: body.bankReference.trim(),
    });
    if (!changed)
      return NextResponse.json(
        { error: "Geen open betaling gevonden." },
        { status: 409 },
      );
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
      await flushQueuedEmails(quoteId);
    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error(
      "payment verification failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      { error: "Betaling kon niet worden geregistreerd." },
      { status: 503 },
    );
  }
}
