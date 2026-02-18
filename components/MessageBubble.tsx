import { ChatMessage } from "@/lib/types";

type MessageBubbleProps = {
  message: ChatMessage;
  onRetry?: () => void;
};

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex animate-slide-fade px-3 py-2 ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[85%] items-end gap-2 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
        {isAssistant && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            AI
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isAssistant
              ? message.isError
                ? "rounded-bl-md bg-rose-100 text-rose-700"
                : "rounded-bl-md bg-flowmed-assistant text-slate-800"
              : "rounded-br-md bg-flowmed-accent text-white"
          }`}
        >
          <p>{message.content}</p>
          {message.isError && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 rounded-lg border border-rose-300 bg-white/80 px-2.5 py-1 text-xs font-medium text-rose-700 transition hover:bg-white"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
