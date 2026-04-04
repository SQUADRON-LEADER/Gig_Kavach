import axios from "axios";

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export type ChatReplySource = "faq" | "gemini";

export interface ChatReply {
  reply: string;
  source: ChatReplySource;
}

interface ChatApiResponse {
  success?: boolean;
  reply?: string;
  source?: ChatReplySource;
  message?: string;
}

const chatClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 15000,
});

export async function sendChatMessage(message: string, history: ChatHistoryMessage[]): Promise<ChatReply> {
  console.log("[chatApi] Sending /api/chat request", {
    messageLength: message.length,
    historyCount: history.length,
  });

  const response = await chatClient.post<ChatApiResponse>("/api/chat", {
    message,
    history,
  });

  console.log("[chatApi] Received /api/chat response", {
    success: response.data.success,
    hasReply: Boolean(response.data.reply),
  });

  if (response.data.reply) {
    return {
      reply: response.data.reply,
      source: response.data.source || "gemini",
    };
  }

  if (response.data.message) {
    throw new Error(response.data.message);
  }

  throw new Error("No reply received from AI service.");
}