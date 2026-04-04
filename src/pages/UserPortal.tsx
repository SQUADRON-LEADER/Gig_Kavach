import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPinned, BellRing, WalletCards, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const userStats = [
  { label: "Today Deliveries", value: "18" },
  { label: "Risk Alerts", value: "3" },
  { label: "Safe Zone Ratio", value: "82%" },
  { label: "Weekly Earnings", value: "INR 4,850" },
];

export default function UserPortal() {
  const name = useAuthStore((state) => state.name);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="font-display text-3xl font-bold text-foreground mt-1">{name || "Customer User"} Portal</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Track your safety map, live alerts, and earnings performance in one place.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="glass-card p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold text-foreground mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/surakshit-kshetra" className="glass-card-hover p-5 block">
          <MapPinned className="w-8 h-8 text-primary" />
          <h3 className="mt-3 font-semibold text-foreground">Live Safety Map</h3>
          <p className="text-xs text-muted-foreground mt-1">Explore real zone risk with interactive Leaflet map.</p>
          <span className="inline-flex items-center gap-1 text-sm text-primary mt-3">Open map <ArrowRight className="w-4 h-4" /></span>
        </Link>

        <Link to="/smart-suchna" className="glass-card-hover p-5 block">
          <BellRing className="w-8 h-8 text-warning" />
          <h3 className="mt-3 font-semibold text-foreground">Alert Feed</h3>
          <p className="text-xs text-muted-foreground mt-1">Check area incidents and weather-triggered notifications.</p>
          <span className="inline-flex items-center gap-1 text-sm text-primary mt-3">View feed <ArrowRight className="w-4 h-4" /></span>
        </Link>

        <Link to="/surakshapay" className="glass-card-hover p-5 block">
          <WalletCards className="w-8 h-8 text-info" />
          <h3 className="mt-3 font-semibold text-foreground">Earnings Center</h3>
          <p className="text-xs text-muted-foreground mt-1">Monitor payouts, bonuses, and safe-route rewards.</p>
          <span className="inline-flex items-center gap-1 text-sm text-primary mt-3">View earnings <ArrowRight className="w-4 h-4" /></span>
        </Link>
      </div>
    </div>
  );
}
