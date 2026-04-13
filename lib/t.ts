import type { Messages } from "./translations";

export function t(msgs: Messages, key: string): string {
  const keys = key.split(".");
  let result: unknown = msgs;
  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === "string" ? result : key;
}
