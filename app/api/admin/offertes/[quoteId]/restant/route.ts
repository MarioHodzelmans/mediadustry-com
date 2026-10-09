import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { flushQueuedEmails } from "@/lib/quotes/email";
import { requestRemainingPayment } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/admin/offertes/[quoteId]/restant">,
) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  const { quoteId } = await params;
  try {
    const requested = await requestRemainingPayment({
      quoteId,
      adminId: process.env.QUOTE_ADMIN_ID ?? "admin",
    });
    if (!requested)
      return NextResponse.json(
        {
          error:
            "Het restant kan pas na verificatie van de aanbetaling en op het afgesproken projectmoment worden aangevraagd.",
        },
        { status: 409 },
      );
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)
      await flushQueuedEmails(quoteId);
    return NextResponse.json({ requested: true });
  } catch (error) {
    console.error(
      "remaining payment request failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      { error: "Restantbetaling kon niet worden aangevraagd." },
      { status: 503 },
    );
  }
}
