import { NextResponse } from "next/server";
import { validCustomerToken } from "@/lib/quotes/config";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { hasDatabase } from "@/lib/quotes/db";
import { findQuoteByToken, markPaymentPending } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/offerte/dietwiej/[token]/betaling-gemeld">,
) {
  const { token } = await params;
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!validCustomerToken(token) || !hasDatabase())
    return NextResponse.json(
      { error: "Offerte niet gevonden." },
      { status: 404 },
    );
  const quote = await findQuoteByToken(token);
  if (!quote?.accepted_at)
    return NextResponse.json(
      { error: "De offerte is nog niet geaccepteerd." },
      { status: 409 },
    );
  const changed = await markPaymentPending(String(quote.id));
  return changed
    ? NextResponse.json({ reported: true })
    : NextResponse.json(
        { error: "Er staat geen aanbetaling open." },
        { status: 409 },
      );
}
