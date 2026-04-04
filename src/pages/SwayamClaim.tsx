import { motion } from "framer-motion";
import { FileCheck, CheckCircle2, Clock, XCircle, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const claimSteps = [
  { label: "Submitted", status: "done" },
  { label: "Under Review", status: "current" },
  { label: "Verified", status: "pending" },
  { label: "Approved", status: "pending" },
  { label: "Paid", status: "pending" },
];

const claimHistory = [
  { id: "CLM-001", type: "Accident Cover", amount: "₹15,000", date: "2 Mar 2026", status: "Approved" },
  { id: "CLM-002", type: "Income Protection", amount: "₹8,500", date: "18 Jan 2026", status: "Paid" },
  { id: "CLM-003", type: "Medical", amount: "₹22,000", date: "5 Dec 2025", status: "Rejected" },
];

const statusIcons: Record<string, typeof CheckCircle2> = { Approved: CheckCircle2, Paid: CheckCircle2, Rejected: XCircle };
const statusStyles: Record<string, string> = {
  Approved: "text-success",
  Paid: "text-info",
  Rejected: "text-destructive",
};

export default function SwayamClaim() {
  return (
    <div>
      <PageHeader title="Swayam Claim" subtitle="Automated claim filing & tracking" icon={FileCheck} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Current Claim Progress — CLM-004</h3>
        <div className="flex items-center justify-between mb-2">
          {claimSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                step.status === "done" ? "gradient-primary text-primary-foreground" :
                step.status === "current" ? "border-2 border-primary text-primary animate-pulse-green" :
                "bg-muted text-muted-foreground"
              }`}>
                {step.status === "done" ? "✓" : i + 1}
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground text-center">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mt-3">
          <div className="gradient-primary h-1.5 rounded-full" style={{ width: "30%" }} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-3">File New Claim</h3>
        <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Upload documents (photo, medical report, FIR)</p>
          <button className="mt-3 px-5 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Start Auto-Claim
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">Claim History</h3>
        <div className="space-y-3">
          {claimHistory.map((claim) => {
            const Icon = statusIcons[claim.status] || Clock;
            return (
              <div key={claim.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{claim.id} — {claim.type}</p>
                  <p className="text-xs text-muted-foreground">{claim.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{claim.amount}</p>
                  <p className={`text-xs font-medium flex items-center gap-1 justify-end ${statusStyles[claim.status]}`}>
                    <Icon className="w-3 h-3" />{claim.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
