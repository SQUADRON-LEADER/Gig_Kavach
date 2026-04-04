import { motion } from "framer-motion";
import { Bell, AlertTriangle, TrendingUp, Shield, Gift, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const alerts = [
  { type: "risk", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", title: "High AQI Alert", desc: "AQI 187 in Electronic City. Consider mask or alternate area.", time: "5 min ago" },
  { type: "opportunity", icon: TrendingUp, color: "text-success", bg: "bg-success/10", title: "Surge Pricing Active", desc: "1.8x surge in Koramangala-HSR corridor. Expected 30 min.", time: "12 min ago" },
  { type: "safety", icon: Shield, color: "text-info", bg: "bg-info/10", title: "Insurance Renewed", desc: "Your Pro Shield plan has been auto-renewed for May.", time: "1 hr ago" },
  { type: "reward", icon: Gift, color: "text-warning", bg: "bg-warning/10", title: "Bonus Unlocked!", desc: "Complete 5 more orders today to earn ₹300 bonus.", time: "2 hrs ago" },
  { type: "opportunity", icon: Zap, color: "text-primary", bg: "bg-accent", title: "Peak Hours Starting", desc: "Dinner rush begins at 7 PM. Best areas: Indiranagar, MG Road.", time: "3 hrs ago" },
  { type: "risk", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", title: "Rain Warning", desc: "Heavy rain expected 6-9 PM in South Bangalore. Drive safe!", time: "4 hrs ago" },
];

export default function SmartSuchna() {
  return (
    <div>
      <PageHeader title="Smart Suchna" subtitle="Real-time alerts for risks & opportunities" icon={Bell} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6 flex flex-wrap gap-2">
        {["All", "Risks", "Opportunities", "Safety", "Rewards"].map((f) => (
          <button key={f} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${f === "All" ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{f}</button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="glass-card-hover p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${alert.bg} flex items-center justify-center flex-shrink-0`}>
                <alert.icon className={`w-5 h-5 ${alert.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm text-foreground">{alert.title}</h4>
                  <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
