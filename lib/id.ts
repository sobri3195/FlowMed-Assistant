export function createId(prefix = "msg"): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);

  return `${prefix}_${Date.now()}_${random}`;
}
