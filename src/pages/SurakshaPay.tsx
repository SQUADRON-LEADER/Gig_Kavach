import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownRight, Shield, Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const transactions = [
  { type: "credit", label: "Earnings Deposit", amount: "₹1,250", date: "Today, 2:30 PM" },
  { type: "credit", label: "Bonus Reward", amount: "₹200", date: "Today, 11:00 AM" },
  { type: "debit", label: "Emergency Withdrawal", amount: "₹500", date: "Yesterday" },
  { type: "credit", label: "Cashback", amount: "₹75", date: "2 Apr 2026" },
  { type: "debit", label: "Insurance Premium", amount: "₹249", date: "1 Apr 2026" },
];

export default function SurakshaPay() {
  return (
    <div>
      <PageHeader title="SurakshaPay" subtitle="Your digital wallet & emergency fund" icon={Wallet} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card gradient-primary p-6 mb-6 text-primary-foreground">
        <p className="text-sm opacity-80 mb-1">Total Balance</p>
        <p className="text-3xl font-display font-bold mb-1">₹12,450</p>
        <p className="text-sm opacity-80 mb-4">Emergency Fund: ₹5,000</p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur text-sm font-medium hover:bg-primary-foreground/30 transition-colors">
            <Plus className="w-4 h-4" /> Add Money
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-foreground text-primary text-sm font-medium hover:opacity-90 transition-opacity">
            <Minus className="w-4 h-4" /> Withdraw
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-hover p-5">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Emergency Fund</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-foreground">₹5,000</p>
              <p className="text-xs text-muted-foreground">Target: ₹10,000</p>
            </div>
            <div className="w-24 bg-muted rounded-full h-2">
              <div className="gradient-primary h-2 rounded-full" style={{ width: "50%" }} />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card-hover p-5">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">This Month</h3>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">₹24,300</p>
          <p className="text-xs text-success font-medium">+₹3,200 vs last month</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "credit" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {tx.type === "credit" ? <ArrowDownRight className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${tx.type === "credit" ? "text-success" : "text-destructive"}`}>
                {tx.type === "credit" ? "+" : "-"}{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
