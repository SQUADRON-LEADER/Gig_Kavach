import { motion } from "framer-motion";
import { Package, MapPin, Clock, IndianRupee, Star, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const orders = [
  { id: "ORD-101", restaurant: "Biryani House", pickup: "Koramangala", drop: "HSR Layout", distance: "3.2 km", amount: "₹85", demand: "High", time: "12 min", rating: 4.5 },
  { id: "ORD-102", restaurant: "Pizza Corner", pickup: "Indiranagar", drop: "MG Road", distance: "2.1 km", amount: "₹65", demand: "Medium", time: "8 min", rating: 4.2 },
  { id: "ORD-103", restaurant: "South Express", pickup: "BTM Layout", drop: "JP Nagar", distance: "4.5 km", amount: "₹110", demand: "High", time: "18 min", rating: 4.8 },
  { id: "ORD-104", restaurant: "Chai Point", pickup: "Whitefield", drop: "ITPL", distance: "1.8 km", amount: "₹45", demand: "Low", time: "6 min", rating: 3.9 },
  { id: "ORD-105", restaurant: "Meghana Foods", pickup: "Residency Rd", drop: "Richmond Town", distance: "2.8 km", amount: "₹95", demand: "High", time: "10 min", rating: 4.7 },
];

const demandColors: Record<string, string> = {
  High: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

export default function SahiChayan() {
  return (
    <div>
      <PageHeader title="Sahi Chayan" subtitle="AI-recommended orders optimized for you" icon={Package} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6 flex flex-wrap gap-2">
        {["Best Pay", "Shortest Distance", "High Demand", "Top Rated"].map((f) => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">{f}</button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {orders.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card-hover p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">{order.restaurant}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{order.pickup} → {order.drop}</p>
              </div>
              <span className="text-xl font-display font-bold text-primary">{order.amount}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.distance}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{order.time}</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning" />{order.rating}</span>
              <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-medium ml-auto ${demandColors[order.demand]}`}>{order.demand} Demand</span>
            </div>
            <button className="mt-3 w-full py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Accept Order
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
