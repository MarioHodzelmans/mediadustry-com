/**
 * Language models the public AI Gateway catalog tagged `free` on 2026-10-23,
 * with tool use and a fixed zero price. See docs/chat-assistant.md.
 * `reflection/beam` is also tagged free, but its price varies by provider,
 * so it is not in this list. No Grok model carries the free tag.
 *
 * Laguna is first because the PR #4 preview (23 Oct 2026, 08:35 and 08:37
 * Europe/Amsterdam) returned 503 for `reflection/beam-free`. That is evidence
 * Beam was unavailable, not evidence Laguna answers. Paid credits remain the
 * reliable way to use Grok.
 */
export const FREE_TIER_CHAT_MODELS = [
  "poolside/laguna-s-2.1-free",
  "reflection/beam-free",
] as const;

export const DEFAULT_CHAT_MODEL = FREE_TIER_CHAT_MODELS[0];

/** Primary id first, then the other free-tier models, without duplicates. */
export function chatModelOrder(override?: string): string[] {
  const primary = override?.trim();
  const rest = FREE_TIER_CHAT_MODELS.filter((id) => id !== primary);
  return primary ? [primary, ...rest] : [...FREE_TIER_CHAT_MODELS];
}
