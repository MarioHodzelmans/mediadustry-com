import { changeConsent, contactConfig } from "@/lib/contact-service";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  return changeConsent(request, "confirm", contactConfig());
}
