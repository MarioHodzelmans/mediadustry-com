import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { hasDatabase } from "@/lib/quotes/db";
import { purgeExpiredAcceptanceMetadata } from "@/lib/quotes/workflow";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? "";
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const expectedBytes = Buffer.from(secret);
  const providedBytes = Buffer.from(provided);
  if (
    !secret ||
    expectedBytes.length !== providedBytes.length ||
    !timingSafeEqual(expectedBytes, providedBytes)
  ) {
    return NextResponse.json({ error: "Niet geautoriseerd." }, { status: 401 });
  }
  if (!hasDatabase())
    return NextResponse.json(
      { error: "Database niet ingericht." },
      { status: 503 },
    );
  try {
    const rows = await purgeExpiredAcceptanceMetadata();
    return NextResponse.json({
      deletedMetadataRows: Number(rows[0]?.deleted ?? 0),
    });
  } catch (error) {
    console.error(
      "acceptance metadata retention failed",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      { error: "Retentie-opruiming mislukt." },
      { status: 503 },
    );
  }
}
