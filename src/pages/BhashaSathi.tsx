import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, Languages } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useState } from "react";

const languages = ["Hindi", "English", "Kannada", "Tamil", "Telugu"];

export default function BhashaSathi() {
  const [listening, setListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Hindi");

  return (
    <div>
      <PageHeader title="Bhasha Sathi" subtitle="Voice assistant with multilingual support" icon={Mic} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Languages className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Select Language</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button key={lang} onClick={() => setSelectedLang(lang)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${selectedLang === lang ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
              {lang}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 mb-6 flex flex-col items-center text-center">
        <button onClick={() => setListening(!listening)} className={`w-24 h-24 rounded-full flex items-center justify-center transition-all mb-4 ${listening ? 'gradient-primary animate-pulse-green' : 'bg-muted hover:bg-accent'}`}>
          {listening ? <Mic className="w-10 h-10 text-primary-foreground" /> : <MicOff className="w-10 h-10 text-muted-foreground" />}
        </button>
        <p className="font-display font-semibold text-foreground mb-1">
          {listening ? "Listening..." : "Tap to speak"}
        </p>
        <p className="text-sm text-muted-foreground">
          {listening ? `Speaking in ${selectedLang}` : "Ask about earnings, routes, safety tips"}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2"><Volume2 className="w-5 h-5 text-primary" />Recent Commands</h3>
        <div className="space-y-2">
          {["Aaj kitna kamaya?", "Sabse safe area kaunsa hai?", "Mera insurance status batao"].map((cmd, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/50 text-sm text-foreground">🎙️ "{cmd}"</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
