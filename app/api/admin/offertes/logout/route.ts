import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/quotes/admin-auth";
import { validSameOrigin } from "@/lib/quotes/csrf";

export async function POST(request: Request) {
  if (!validSameOrigin(request))
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 403 });
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
