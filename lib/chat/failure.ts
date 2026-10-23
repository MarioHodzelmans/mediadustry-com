export type ChatFailureKind =
  | "rate_limit"
  | "model_unavailable"
  | "unavailable";

export const VISITOR_RATE_LIMIT =
  "Je hebt in korte tijd veel berichten gestuurd. Probeer het zo opnieuw, of mail info@mediadustry.com.";

export const VISITOR_MODEL_UNAVAILABLE =
  "De assistent is tijdelijk niet beschikbaar. Mail info@mediadustry.com of ga naar de contactpagina. Een teamlid helpt je verder.";

export const VISITOR_UNAVAILABLE =
  "De chat kan nu geen antwoord geven. Mail info@mediadustry.com of ga naar de contactpagina. Een teamlid helpt je verder.";

const MODEL_UNAVAILABLE =
  /free tier|restrictedmodels|do not have access to this model|model_not_found/i;

function chain(error: unknown): unknown[] {
  const seen: unknown[] = [];
  const pending: unknown[] = [error];
  while (pending.length > 0 && seen.length < 12) {
    const current = pending.shift();
    if (current == null || seen.includes(current)) continue;
    seen.push(current);
    if (typeof current !== "object") continue;
    const record = current as {
      cause?: unknown;
      lastError?: unknown;
      errors?: unknown;
    };
    if ("cause" in record) pending.push(record.cause);
    if ("lastError" in record) pending.push(record.lastError);
    if (Array.isArray(record.errors)) pending.push(...record.errors);
  }
  return seen;
}

function statusCodeOf(error: unknown): number | undefined {
  for (const item of chain(error)) {
    if (typeof item !== "object" || item == null || !("statusCode" in item)) {
      continue;
    }
    const status = (item as { statusCode?: unknown }).statusCode;
    if (typeof status === "number") return status;
  }
  return undefined;
}

function describe(error: unknown): string {
  return chain(error)
    .map((item) =>
      item instanceof Error ? `${item.name} ${item.message}` : "",
    )
    .join(" ");
}

export function classifyChatFailure(error: unknown): ChatFailureKind {
  const status = statusCodeOf(error);
  const text = describe(error);
  if (status === 429 || /GatewayRateLimitError|rate limit/i.test(text)) {
    return "rate_limit";
  }
  if (
    MODEL_UNAVAILABLE.test(text) ||
    /GatewayModelNotFoundError/.test(text) ||
    (status === 403 && /model/i.test(text))
  ) {
    return "model_unavailable";
  }
  return "unavailable";
}

/** Try another model after a provider 5xx or a restricted-model 403. */
export function shouldTryNextModel(error: unknown): boolean {
  const kind = classifyChatFailure(error);
  if (kind === "rate_limit") return false;
  if (kind === "model_unavailable") return true;
  const status = statusCodeOf(error);
  if (status != null && status >= 500 && status < 600) return true;
  return /GatewayInternalServerError|Service temporarily unavailable/i.test(
    describe(error),
  );
}

export function visitorMessage(kind: ChatFailureKind): string {
  if (kind === "rate_limit") return VISITOR_RATE_LIMIT;
  if (kind === "model_unavailable") return VISITOR_MODEL_UNAVAILABLE;
  return VISITOR_UNAVAILABLE;
}

export function logChatFailure(
  error: unknown,
  context: { model: string; kind: ChatFailureKind },
): void {
  const name = error instanceof Error ? error.name : "UnknownError";
  console.error("[chat] model request failed", {
    kind: context.kind,
    model: context.model,
    name,
    status: statusCodeOf(error) ?? null,
  });
}
