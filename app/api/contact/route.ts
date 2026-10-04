import { contactConfig, submitContact } from "@/lib/contact-service";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  return submitContact(request, contactConfig());
}
