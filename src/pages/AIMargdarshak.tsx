import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useState } from "react";

const initialMessages = [
  { role: "ai" as const, text: "Namaste! I'm your AI Margdarshak. I can help you find the best time and location to work. What would you like to know?" },
  { role: "user" as const, text: "What's the best time to start today?" },
  { role: "ai" as const, text: "Based on current demand patterns, I recommend starting at 11:30 AM. Lunch rush begins early today due to a cricket match. Koramangala and HSR Layout will have 40% higher orders between 12-2 PM. 🏏" },
  { role: "user" as const, text: "Which area should I focus on?" },
  { role: "ai" as const, text: "Focus on Koramangala → HSR Layout corridor. Current surge pricing is 1.5x there. Avoid Electronic City — low demand and higher AQI (187). Your estimated earnings potential: ₹1,800-2,200 for a 6-hour shift. 💰" },
];

export default function AIMargdarshak() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: "ai",
        text: "Great question! Based on my analysis, I'd suggest optimizing your route through Indiranagar for the evening shift. Expect ₹120-150 per order during dinner rush. Stay safe! 🛡️"
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)]">
      <PageHeader title="AI Margdarshak" subtitle="Your intelligent work guide" icon={Bot} />

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "ai" ? "glass-card text-foreground" : "gradient-primary text-primary-foreground"}`}>
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about best time, location, earnings..."
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button onClick={handleSend} className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center hover:opacity-90 transition-opacity">
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
}
