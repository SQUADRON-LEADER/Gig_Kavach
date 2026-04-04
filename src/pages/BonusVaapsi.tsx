import { motion } from "framer-motion";
import { Gift, CheckCircle2, Clock, Star, Coins } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const rewards = [
  { title: "No-Claim Bonus", amount: "₹500", status: "Earned", desc: "30 days without claim" },
  { title: "Safety Streak", amount: "₹200", status: "Earned", desc: "15 days perfect rating" },
  { title: "Referral Cashback", amount: "₹150", status: "Pending", desc: "Invited Raju — awaiting first order" },
  { title: "Festive Bonus", amount: "₹1,000", status: "Upcoming", desc: "Complete 50 orders by Diwali" },
];

const statusStyles: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  Earned: { bg: "bg-success/10", text: "text-success", icon: CheckCircle2 },
  Pending: { bg: "bg-warning/10", text: "text-warning", icon: Clock },
  Upcoming: { bg: "bg-info/10", text: "text-info", icon: Star },
};

export default function BonusVaapsi() {
  return (
    <div>
      <PageHeader title="Bonus Vaapsi" subtitle="Cashback & reward tracking" icon={Gift} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
          <Coins className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
          <p className="text-3xl font-display font-bold text-foreground">₹2,850</p>
          <p className="text-xs text-success font-medium">+₹700 this month</p>
        </div>
      </motion.div>

      <div className="space-y-3">
        {rewards.map((r, i) => {
          const style = statusStyles[r.status];
          const Icon = style.icon;
          return (
            <motion.div key={r.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${style.text}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-foreground">{r.amount}</p>
                <p className={`text-[10px] font-medium ${style.text}`}>{r.status}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
