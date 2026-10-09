import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | undefined;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  cached ??= neon(url);
  return cached;
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}
