import type { UIMessage } from "ai";
import {
  MAX_ASSISTANT_CHARS,
  MAX_HISTORY_MESSAGES,
  MAX_USER_CHARS,
} from "./limits";

export type SanitizeResult =
  | { ok: true; messages: UIMessage[] }
  | { ok: false; status: number; error: string };

export function sanitizeMessages(value: unknown): SanitizeResult {
  if (!Array.isArray(value)) {
    return {
      ok: false,
      status: 400,
      error: "Stuur een bericht om verder te gaan.",
    };
  }
  if (value.length > MAX_HISTORY_MESSAGES) {
    return {
      ok: false,
      status: 400,
      error:
        "Dit gesprek is te lang. Sluit de chat en begin opnieuw, of mail info@mediadustry.com.",
    };
  }

  const messages: UIMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") {
      return {
        ok: false,
        status: 400,
        error: "Stuur een bericht om verder te gaan.",
      };
    }
    const role = (item as { role?: unknown }).role;
    if (role !== "user" && role !== "assistant") continue;
    const parts = (item as { parts?: unknown }).parts;
    if (!Array.isArray(parts)) {
      return {
        ok: false,
        status: 400,
        error: "Stuur een bericht om verder te gaan.",
      };
    }

    const textParts: Array<{ type: "text"; text: string }> = [];
    for (const part of parts) {
      if (!part || typeof part !== "object") continue;
      if ((part as { type?: unknown }).type !== "text") continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text !== "string") continue;
      const trimmed = text.trim();
      if (!trimmed) continue;
      const max = role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
      if (trimmed.length > max) {
        return {
          ok: false,
          status: 400,
          error: `Je bericht is te lang. Houd het onder ${MAX_USER_CHARS} tekens.`,
        };
      }
      textParts.push({ type: "text", text: trimmed });
    }
    if (textParts.length === 0) continue;

    const rawId = (item as { id?: unknown }).id;
    const id =
      typeof rawId === "string" && rawId.trim()
        ? rawId.trim().slice(0, 80)
        : `m-${messages.length}`;
    messages.push({ id, role, parts: textParts });
  }

  if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
    return {
      ok: false,
      status: 400,
      error: "Stuur een bericht om verder te gaan.",
    };
  }

  return { ok: true, messages };
}
