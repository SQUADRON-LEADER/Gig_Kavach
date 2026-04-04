import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldAlert, MapPinned, UserCog, ArrowRight, Activity, TriangleAlert, NotebookPen, Users2 } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const adminStats = [
  { label: "Active Riders", value: "246" },
  { label: "High Risk Zones", value: "5" },
  { label: "Pending Incidents", value: "12" },
  { label: "Avg. Response Time", value: "07m" },
];

const flaggedZones = [
  { zone: "Electronic City", issue: "Low lighting reports", severity: "High" },
  { zone: "Yelahanka", issue: "Repeated theft alert", severity: "High" },
  { zone: "Whitefield", issue: "Heavy waterlogging", severity: "Medium" },
  { zone: "JP Nagar", issue: "Traffic diversion", severity: "Medium" },
];

const adminActions = [
  { label: "Zones reviewed", value: "92%" },
  { label: "Active escalations", value: "12" },
  { label: "Ops team online", value: "14" },
  { label: "Avg response", value: "07m" },
];

export default function AdminPortal() {
  const name = useAuthStore((state) => state.name);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] overflow-hidden bg-[#0F2113] text-white shadow-2xl shadow-[#0F2113]/20"
      >
        <div className="p-6 md:p-8 border-b border-white/10 bg-[linear-gradient(135deg,rgba(46,92,49,0.55),rgba(15,33,19,1))]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Operations Command Center</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2">{name || "Admin"} control room</h1>
          <p className="text-sm text-white/70 mt-3 max-w-3xl leading-relaxed">
            This portal is intentionally different from the user experience. It is built for review, escalation, and city-level coordination.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-white/10">
          {adminActions.map((stat, index) => (
            <div key={stat.label} className="bg-[#132816] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{stat.label}</p>
              <p className="text-3xl font-semibold text-white mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-5">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#526652]">Incident queue</p>
              <h2 className="text-2xl font-semibold text-[#1A2E1A] mt-1">Flagged zone review</h2>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E8F5E9] text-[#2E5C31] flex items-center justify-center">
              <TriangleAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {flaggedZones.map((zone, index) => (
              <div key={zone.zone} className="rounded-2xl bg-white/60 border border-white/70 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#1A2E1A]">{zone.zone}</p>
                  <p className="text-xs text-[#526652] mt-1">{zone.issue}</p>
                </div>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${zone.severity === "High" ? "bg-[#fef2f2] text-[#b42318]" : "bg-[#fff7ed] text-[#b45309]"}`}>
                  {zone.severity}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.75rem] bg-[#1F3321] text-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Control stack</p>
                <h3 className="text-2xl font-semibold mt-2">Admin tools</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                [MapPinned, "Live zone map", "Review tiles, markers, and hot spots."],
                [ShieldAlert, "Compliance snapshot", "Track reviewed zones and open escalations."],
                [Users2, "Team availability", "See who is handling the current queue."],
                [NotebookPen, "Action log", "Record approvals, notes, and follow-ups."],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="rounded-2xl bg-white/6 border border-white/10 p-4">
                  <Icon className="w-5 h-5 text-[#AECCAE]" />
                  <p className="mt-3 font-medium">{title as string}</p>
                  <p className="text-xs text-white/65 mt-1 leading-relaxed">{text as string}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#526652]">Quick actions</p>
                <h3 className="text-lg font-semibold text-[#1A2E1A] mt-1">Operational shortcuts</h3>
              </div>
              <UserCog className="w-6 h-6 text-[#2E5C31]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link to="/surakshit-kshetra" className="rounded-2xl bg-white/65 border border-white/70 p-4 hover:bg-white transition-colors">
                <p className="text-sm font-semibold text-[#1A2E1A]">Open map</p>
                <p className="text-xs text-[#526652] mt-1 leading-relaxed">Inspect risky zones and marker details.</p>
              </Link>
              <Link to="/smart-suchna" className="rounded-2xl bg-white/65 border border-white/70 p-4 hover:bg-white transition-colors">
                <p className="text-sm font-semibold text-[#1A2E1A]">Open alerts</p>
                <p className="text-xs text-[#526652] mt-1 leading-relaxed">Review new incident and weather signals.</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
