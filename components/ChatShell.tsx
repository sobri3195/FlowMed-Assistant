"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Composer } from "@/components/Composer";
import { MessageList } from "@/components/MessageList";
import { clearChatHistory, readChatHistory, saveChatHistory } from "@/lib/storage";
import { createId } from "@/lib/id";
import { ChatMessage } from "@/lib/types";

const MAX_INPUT_LENGTH = 2000;

function toApiMessages(history: ChatMessage[]) {
  return history
    .filter((message) => !message.isError)
    .map(({ role, content }) => ({ role, content }));
}

export function ChatShell() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    setMessages(readChatHistory());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    saveChatHistory(messages);
  }, [messages, initialized]);

  const scrollToBottom = useCallback((smooth = true) => {
    const container = listRef.current;
    if (!container || !shouldAutoScrollRef.current) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto"
    });
  }, []);

  useEffect(() => {
    scrollToBottom(messages.length > 0);
  }, [messages, isLoading, scrollToBottom]);

  const handleScroll = () => {
    const container = listRef.current;
    if (!container) return;

    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    shouldAutoScrollRef.current = distanceFromBottom < 100;
  };

  const sendWithHistory = useCallback(async (history: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(history) })
      });

      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Gagal mendapatkan jawaban dari server.");
      }

      const assistantMessage: ChatMessage = {
        id: createId("asst"),
        role: "assistant",
        content: payload.reply,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const failedMessage: ChatMessage = {
        id: createId("err"),
        role: "assistant",
        content: error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.",
        createdAt: new Date().toISOString(),
        isError: true,
        retryPayload: toApiMessages(history)
      };

      setMessages((prev) => [...prev, failedMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const sanitized = trimmed.slice(0, MAX_INPUT_LENGTH);

    const nextMessage: ChatMessage = {
      id: createId("usr"),
      role: "user",
      content: sanitized,
      createdAt: new Date().toISOString()
    };

    setInput("");
    setMessages((prev) => {
      const history = [...prev, nextMessage];
      void sendWithHistory(history);
      return history;
    });
  };

  const handleRetry = async (messageId: string) => {
    if (isLoading) return;

    const failed = messages.find((message) => message.id === messageId);
    if (!failed?.retryPayload) return;

    setMessages((prev) => prev.filter((message) => message.id !== messageId));

    const reconstructedHistory = [
      ...messages.filter((message) => message.id !== messageId && !message.isError)
    ];

    await sendWithHistory(reconstructedHistory);
  };

  const resetDisabled = useMemo(() => messages.length === 0 && !input, [messages.length, input]);

  return (
    <section className="flex h-full min-h-screen flex-1 flex-col sm:min-h-0">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.85rem)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold text-flowmed-primary">FlowMed Assistant</h1>
            <p className="text-xs text-emerald-600">Online</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMessages([]);
              setInput("");
              clearChatHistory();
            }}
            disabled={resetDisabled}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </header>

      <MessageList
        messages={messages}
        isAssistantTyping={isLoading}
        onRetry={handleRetry}
        listRef={listRef}
        onScroll={handleScroll}
      />

      <Composer value={input} onChange={setInput} onSend={handleSend} disabled={isLoading} />
    </section>
  );
}
