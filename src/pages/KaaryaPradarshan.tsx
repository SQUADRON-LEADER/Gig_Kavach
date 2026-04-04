import { motion } from "framer-motion";
import { TrendingUp, Star, Package, Clock, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weeklyPerformance = [
  { day: "Mon", orders: 12, rating: 4.5 },
  { day: "Tue", orders: 15, rating: 4.7 },
  { day: "Wed", orders: 18, rating: 4.8 },
  { day: "Thu", orders: 10, rating: 4.3 },
  { day: "Fri", orders: 22, rating: 4.9 },
  { day: "Sat", orders: 25, rating: 4.6 },
  { day: "Sun", orders: 20, rating: 4.7 },
];

const efficiencyData = [
  { metric: "Speed", score: 88 },
  { metric: "Accuracy", score: 95 },
  { metric: "Ratings", score: 92 },
  { metric: "Acceptance", score: 78 },
  { metric: "Completion", score: 96 },
];

export default function KaaryaPradarshan() {
  return (
    <div>
      <PageHeader title="Kaarya Pradarshan" subtitle="Performance analytics & insights" icon={TrendingUp} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Orders" value="122" change="+18 this week" changeType="positive" icon={Package} delay={0.1} />
        <StatCard title="Avg Rating" value="4.6★" change="+0.2 vs last week" changeType="positive" icon={Star} delay={0.15} />
        <StatCard title="Avg Delivery" value="22 min" change="-3 min improvement" changeType="positive" icon={Clock} delay={0.2} />
        <StatCard title="Efficiency" value="91%" change="Top 10% in city" changeType="positive" icon={Zap} delay={0.25} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4 text-foreground">Orders & Ratings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="orders" stroke="hsl(157, 82%, 24%)" strokeWidth={2.5} dot={{ fill: 'hsl(157, 82%, 24%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4 text-foreground">Efficiency Metrics</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={efficiencyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 88%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis type="category" dataKey="metric" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="score" fill="hsl(100, 62%, 60%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
