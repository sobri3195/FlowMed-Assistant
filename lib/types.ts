export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  isError?: boolean;
  retryPayload?: { role: MessageRole; content: string }[];
};

export type ChatApiInputMessage = {
  role: MessageRole;
  content: string;
};
