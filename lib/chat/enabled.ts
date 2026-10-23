/** Widget renders unless this public flag is exactly the string "false". */
export function isChatEnabled(
  value: string | undefined = process.env.NEXT_PUBLIC_CHAT_ENABLED,
): boolean {
  return value !== "false";
}
