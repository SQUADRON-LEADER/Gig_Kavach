import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendChatMessage, type ChatHistoryMessage, type ChatReplySource } from "@/services/chatApi";

const QUICK_SUGGESTIONS = [
  "How does Jokhim Soochak risk score work?",
  "How can I check disaster alerts for my area?",
  "Where can I see my insurance protection status?",
];

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: ChatReplySource;
}

function toHistory(messages: UiMessage[]): ChatHistoryMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I am your platform assistant. Ask me about dashboard tools, alerts, earnings, and protection features.",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const history = useMemo(() => toHistory(messages), [messages]);

  useEffect(() => {
    // Keep the latest user/assistant message visible while chatting.
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSendMessage(contentOverride?: string) {
    const content = (contentOverride ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    const userMessage: UiMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError("");

    console.log("[chatbot] User message submitted", {
      messageLength: content.length,
      historyCount: history.length,
    });

    try {
      // Backend applies Gemini system prompt and returns model-generated reply.
      const result = await sendChatMessage(content, history);

      console.log("[chatbot] Assistant reply received", {
        replyLength: result.reply.length,
        source: result.source,
      });

      setMessages((previous) => [
        ...previous,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: result.reply,
          source: result.source,
        },
      ]);
    } catch (requestError) {
      const errorMessage = requestError instanceof Error ? requestError.message : "Unable to get AI response.";
      console.error("[chatbot] Assistant reply failed", {
        error: errorMessage,
      });

      setError(errorMessage);

      const fallbackContent = errorMessage.toLowerCase().includes("gemini")
        ? "AI assistant is not configured yet. Please add GEMINI_API_KEY in .env.local and restart backend."
        : "Sorry, I couldn't process your request right now.";

      setMessages((previous) => [
        ...previous,
        {
          id: `assistant-fallback-${Date.now()}`,
          role: "assistant",
          content: fallbackContent,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[600px] glass-card border border-border/60 shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                  <p className="text-[11px] text-muted-foreground">Gemini-powered help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div ref={scrollRef} className="h-[calc(100%-150px)] overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%]">
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-accent text-accent-foreground rounded-bl-md"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === "assistant" ? (
                      <p className="text-[10px] text-muted-foreground mt-1 px-1">
                        {message.source === "faq" ? "Quick answer" : "AI generated response"}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="bg-accent text-accent-foreground rounded-2xl rounded-bl-md px-3 py-2 text-sm inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse [animation-delay:240ms]" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-background hover:bg-accent transition-colors"
                    onClick={() => handleSendMessage(item)}
                    disabled={isLoading}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {error ? <p className="text-xs text-destructive mb-2">{error}</p> : null}

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about features, alerts, insurance..."
                  className="flex-1 h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button onClick={() => handleSendMessage()} disabled={isLoading} size="icon" className="rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="h-12 px-4 rounded-2xl shadow-xl inline-flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">AI Assistant</span>
          <MessageSquare className="w-4 h-4 sm:hidden" />
        </Button>
      ) : null}
    </div>
  );
}