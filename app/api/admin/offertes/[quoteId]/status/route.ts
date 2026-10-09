import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";
import { markProjectReady } from "@/lib/quotes/workflow";

export async function POST(
  request: Request,
  { params }: RouteContext<"/api/admin/offertes/[quoteId]/status">,
) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  const { quoteId } = await params;
  try {
    const changed = await markProjectReady(
      quoteId,
      process.env.QUOTE_ADMIN_ID ?? "admin",
    );
    return changed
      ? NextResponse.json({ updated: true })
      : NextResponse.json(
          { error: "Eerst moet de aanbetaling ontvangen zijn." },
          { status: 409 },
        );
  } catch {
    return NextResponse.json(
      { error: "Status kon niet worden bijgewerkt." },
      { status: 503 },
    );
  }
}
