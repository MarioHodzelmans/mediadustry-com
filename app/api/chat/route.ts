import { handleChatRequest } from "../../../lib/chat/handle";

export const runtime = "nodejs";
export const maxDuration = 30;

export function POST(request: Request) {
  return handleChatRequest(request);
}
