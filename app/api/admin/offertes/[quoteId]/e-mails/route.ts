import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { flushQueuedEmails } from "@/lib/quotes/email";
import { addEmailRetryAudit } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/admin/offertes/[quoteId]/e-mails">,
) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  const { quoteId } = await params;
  try {
    await addEmailRetryAudit({
      quoteId,
      eventType: "queued_or_failed",
      adminId: process.env.QUOTE_ADMIN_ID ?? "admin",
    });
    const sent = await flushQueuedEmails(quoteId);
    return sent
      ? NextResponse.json({ sent: true })
      : NextResponse.json(
          {
            error:
              "Niet alle berichten zijn verstuurd. Controleer de outbox en Resend-configuratie.",
          },
          { status: 502 },
        );
  } catch {
    return NextResponse.json(
      { error: "E-mailverzending kon niet worden uitgevoerd." },
      { status: 503 },
    );
  }
}
