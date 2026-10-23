type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
}) {
  const hits = new Map<string, number[]>();

  return {
    check(key: string, now = Date.now()): RateLimitResult {
      if (hits.size > 5000) hits.clear();
      const recent = (hits.get(key) ?? []).filter(
        (time) => now - time < options.windowMs,
      );
      if (recent.length >= options.limit) {
        const retryAfterMs = options.windowMs - (now - recent[0]);
        hits.set(key, recent);
        return {
          ok: false,
          retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true };
    },
  };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first.slice(0, 80);
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 80);
  return "unknown";
}
