const ENGLISH_HINT =
  /\b(the|and|what|website|price|hello|can|you|please|about|our|need)\b/gi;

/** Text that is safe to pass to speechSynthesis. Links and markdown are removed. */
export function toSpeakable(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[*_~`>#]/g, "")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * nl-NL unless the page language or the visitor's words are clearly English.
 * Browser speech recognition uses this BCP 47 tag.
 */
export function recognitionLanguage(sample: string, pageLang = "nl"): string {
  const page = pageLang.toLowerCase();
  if (page.startsWith("en")) return "en-US";
  const hints = sample.match(ENGLISH_HINT);
  if (hints && hints.length >= 2) return "en-US";
  return "nl-NL";
}
