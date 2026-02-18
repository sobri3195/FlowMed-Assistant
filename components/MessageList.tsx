import { ChatMessage } from "@/lib/types";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";

type MessageListProps = {
  messages: ChatMessage[];
  isAssistantTyping: boolean;
  onRetry: (messageId: string) => void;
  listRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
};

export function MessageList({ messages, isAssistantTyping, onRetry, listRef, onScroll }: MessageListProps) {
  return (
    <div ref={listRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-1 py-2">
      {messages.length === 0 ? (
        <div className="mx-auto mt-20 max-w-xs rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
          Mulai chat untuk tanya kebijakan RS, BPJS, dan alur rujukan.
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRetry={message.isError ? () => onRetry(message.id) : undefined}
          />
        ))
      )}
      {isAssistantTyping && <TypingIndicator />}
    </div>
  );
}
