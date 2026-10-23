/**
 * Language models the public AI Gateway catalog tagged `free` on 2026-10-23,
 * with tool use and a fixed zero price. See docs/chat-assistant.md.
 * `reflection/beam` is also tagged free, but its price varies by provider,
 * so it is not in this list. No Grok model carries the free tag.
 */
export const FREE_TIER_CHAT_MODELS = [
  "reflection/beam-free",
  "poolside/laguna-s-2.1-free",
] as const;

export const DEFAULT_CHAT_MODEL = FREE_TIER_CHAT_MODELS[0];

/** Fallback ids after the primary. The gateway tries these in order. */
export function gatewayFallbackModels(primary: string): string[] {
  return FREE_TIER_CHAT_MODELS.filter((id) => id !== primary);
}
