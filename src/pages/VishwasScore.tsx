import { motion } from "framer-motion";
import { Fingerprint, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const scoreData = [{ name: "Score", value: 82, fill: "hsl(157, 82%, 24%)" }];

const factors = [
  { label: "Order Completion Rate", value: "96%", status: "good" },
  { label: "Average Delivery Time", value: "22 min", status: "good" },
  { label: "Customer Complaints", value: "2", status: "warning" },
  { label: "GPS Anomalies", value: "0", status: "good" },
  { label: "Payment Disputes", value: "1", status: "warning" },
  { label: "Identity Verified", value: "Yes", status: "good" },
];

export default function VishwasScore() {
  return (
    <div>
      <PageHeader title="Vishwas Score" subtitle="Your trust & fraud detection score" icon={Fingerprint} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-48 h-48">
          <ResponsiveContainer>
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} data={scoreData}>
              <RadialBar background dataKey="value" cornerRadius={10} max={100} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-display font-bold text-foreground">82</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-foreground mb-1">Excellent Trust Score</h3>
          <p className="text-sm text-muted-foreground mb-3">Your score is above 95% of gig workers in your area</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-xl bg-success/10 text-success text-xs font-medium">Verified</span>
            <span className="px-3 py-1 rounded-xl bg-info/10 text-info text-xs font-medium">Low Risk</span>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-3">
        {factors.map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {f.status === "good" ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertTriangle className="w-5 h-5 text-warning" />}
              <span className="text-sm text-foreground">{f.label}</span>
            </div>
            <span className="font-semibold text-sm text-foreground">{f.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
