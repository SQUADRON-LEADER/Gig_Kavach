import { motion } from "framer-motion";
import { Shield, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

const plans = [
  { name: "Basic Shield", coverage: "₹1,00,000", premium: "₹99/mo", features: ["Accident Cover", "Emergency Support", "Basic Claim"], active: false },
  { name: "Pro Shield", coverage: "₹5,00,000", premium: "₹249/mo", features: ["All Basic", "Income Protection", "Family Cover", "Fast Claims"], active: true },
  { name: "Premium Shield", coverage: "₹10,00,000", premium: "₹499/mo", features: ["All Pro", "Health Checkup", "Legal Aid", "24/7 Priority"], active: false },
];

export default function SurakshaKavach() {
  return (
    <div>
      <PageHeader title="Suraksha Kavach" subtitle="Your insurance shield & protection plans" icon={Shield} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 mb-6 gradient-primary text-primary-foreground">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-6 h-6" />
          <h2 className="font-display font-bold text-lg">Active Coverage: Pro Shield</h2>
        </div>
        <p className="text-primary-foreground/80 text-sm">Coverage: ₹5,00,000 • Premium: ₹249/mo • Next renewal: 15 May 2026</p>
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-primary-foreground/20 backdrop-blur text-sm font-medium hover:bg-primary-foreground/30 transition-colors">View Details</button>
          <button className="px-4 py-2 rounded-xl bg-primary-foreground text-primary text-sm font-medium hover:opacity-90 transition-opacity">File Claim</button>
        </div>
      </motion.div>

      <h3 className="font-display font-semibold text-foreground mb-4">Available Plans</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card-hover p-5 ${plan.active ? 'ring-2 ring-primary' : ''}`}>
            {plan.active && <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded-lg mb-3 inline-block">Current Plan</span>}
            <h4 className="font-display font-bold text-lg text-foreground">{plan.name}</h4>
            <p className="text-2xl font-bold text-primary mt-1">{plan.premium}</p>
            <p className="text-sm text-muted-foreground mb-4">Coverage: {plan.coverage}</p>
            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />{f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${plan.active ? 'bg-muted text-muted-foreground' : 'gradient-primary text-primary-foreground hover:opacity-90'}`}>
              {plan.active ? 'Active' : 'Activate'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
