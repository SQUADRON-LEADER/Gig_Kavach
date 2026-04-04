import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, UserRound, ArrowRight, MapPinned, BellRing } from "lucide-react";

export default function LoginHub() {
  return (
    <div className="min-h-screen bg-[#F7F9F7] px-4 py-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-[#AECCAE]/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#6B8E6B]/20 blur-3xl" />

      <div className="w-full max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/70 backdrop-blur-sm shadow-sm">
            <BellRing className="w-3.5 h-3.5 text-[#2E5C31]" />
            <span className="text-[11px] font-medium text-[#526652] tracking-[0.2em] uppercase">Choose your portal</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[#1A2E1A] mt-4">Login choice for users and administrators</h1>
          <p className="text-[#526652] mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            The platform keeps login simple. Pick the user portal for delivery and customer workflows or the admin portal for monitoring and control.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_0.9fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 md:p-8"
          >
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-[#2E5C31]/15">
              <UserRound className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1A2E1A]">User Portal</h2>
            <p className="text-sm text-[#526652] mt-2 mb-6 leading-relaxed">
              Use this path for customer-facing and rider-facing tools. It highlights route safety, map zones, alerts, and earnings.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                [MapPinned, "Live map zones"],
                [BellRing, "Alerts & earnings"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-2xl bg-white/60 border border-white/70 p-4 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#2E5C31]" />
                  <span className="text-sm font-medium text-[#1A2E1A]">{label as string}</span>
                </div>
              ))}
            </div>
            <Link to="/login/user" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2E5C31] text-white font-medium hover:bg-[#244a27] transition-colors">
              Login as User <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 md:p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1F3321] flex items-center justify-center mb-4 shadow-lg shadow-[#1F3321]/20">
              <ShieldCheck className="w-6 h-6 text-warning-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1A2E1A]">Admin Portal</h2>
            <p className="text-sm text-[#526652] mt-2 mb-6 leading-relaxed">
              Open the operations console to monitor incidents, review high-risk zones, and manage admin actions in a separate layout.
            </p>
            <div className="rounded-2xl bg-[#1F3321] text-white p-4 mb-6">
              <p className="text-sm font-medium">Different experience</p>
              <p className="text-xs text-white/65 mt-1 leading-relaxed">Darker, denser, and more operational than the user portal.</p>
            </div>
            <Link to="/login/admin" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0F2113] text-white font-medium hover:bg-[#1a321d] transition-colors">
              Login as Admin <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
