import { ChatMessage } from "@/lib/types";

const STORAGE_KEY = "flowmed-chat-history-v1";

export function readChatHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as ChatMessage[];
    return parsed.filter((item) => Boolean(item?.id && item?.role && item?.content));
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
