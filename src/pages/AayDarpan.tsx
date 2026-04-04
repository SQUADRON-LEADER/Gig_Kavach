import { motion } from "framer-motion";
import { BarChart3, TrendingUp, IndianRupee, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", earnings: 820, tips: 120 },
  { day: "Tue", earnings: 950, tips: 80 },
  { day: "Wed", earnings: 1100, tips: 200 },
  { day: "Thu", earnings: 780, tips: 90 },
  { day: "Fri", earnings: 1350, tips: 250 },
  { day: "Sat", earnings: 1500, tips: 300 },
  { day: "Sun", earnings: 1200, tips: 180 },
];

const monthlyData = [
  { week: "W1", earnings: 5200 },
  { week: "W2", earnings: 6100 },
  { week: "W3", earnings: 5800 },
  { week: "W4", earnings: 7200 },
];

const breakdownData = [
  { name: "Delivery", value: 65, color: "hsl(157, 82%, 24%)" },
  { name: "Tips", value: 15, color: "hsl(100, 62%, 60%)" },
  { name: "Bonus", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "Incentives", value: 8, color: "hsl(210, 92%, 55%)" },
];

type Period = "daily" | "weekly" | "monthly";

export default function AayDarpan() {
  const [period, setPeriod] = useState<Period>("weekly");

  return (
    <div>
      <PageHeader title="Aay Darpan" subtitle="Your earnings dashboard & insights" icon={BarChart3} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today" value="₹1,250" change="+12% vs yesterday" changeType="positive" icon={IndianRupee} delay={0.1} />
        <StatCard title="This Week" value="₹7,700" change="+8% vs last week" changeType="positive" icon={TrendingUp} delay={0.15} />
        <StatCard title="Protected Income" value="₹5,000" change="Insured amount" changeType="neutral" icon={ShieldCheck} delay={0.2} />
        <StatCard title="Monthly Goal" value="72%" change="₹21,600 / ₹30,000" changeType="neutral" icon={BarChart3} delay={0.25} />
      </div>

      {/* Period Toggle */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground">Earnings Trend</h2>
          <div className="flex bg-muted rounded-xl p-1 gap-1">
            {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={period === "monthly" ? monthlyData : weeklyData}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(157, 82%, 24%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(157, 82%, 24%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 88%)" />
            <XAxis dataKey={period === "monthly" ? "week" : "day"} tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="earnings" stroke="hsl(157, 82%, 24%)" fill="url(#greenGrad)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4 text-foreground">Weekly Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 15%, 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="earnings" fill="hsl(157, 82%, 24%)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="tips" fill="hsl(100, 62%, 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card p-5">
          <h3 className="font-display font-semibold mb-4 text-foreground">Income Sources</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {breakdownData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
