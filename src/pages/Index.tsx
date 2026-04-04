import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BellRing, BrainCircuit, Clock3, Globe, Leaf, MapPinned, ShieldCheck, Sparkles, Users } from "lucide-react";

const navigation = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
];

const highlightCards = [
  { title: "Live Safety Map", subtitle: "Interactive Leaflet zones with incident and earnings overlays.", icon: MapPinned },
  { title: "Two Portals", subtitle: "Clean separation between admin command center and user experience.", icon: Users },
  { title: "Smart Alerts", subtitle: "Risk notifications, zone flags, and performance monitoring.", icon: BellRing },
];

const serviceCards = [
  { title: "Surakshit Kshetra", text: "Open a real map with zone-level risk markers and demo safety intelligence.", icon: MapPinned },
  { title: "Aay Darpan", text: "Summarize deliveries, earnings, and zone performance in one dashboard.", icon: Sparkles },
  { title: "Jokhim Soochak", text: "Highlight risky streets and actions before a rider enters a zone.", icon: ShieldCheck },
  { title: "Suraksha Kavach", text: "Protect delivery partners with a smarter, faster response layer.", icon: BadgeCheck },
  { title: "AI Margdarshak", text: "Guide decisions with simple route suggestions and city insights.", icon: BrainCircuit },
  { title: "Smart Suchna", text: "Get alerts for weather, crowds, and incident patterns.", icon: BellRing },
];

const faqs = [
  { q: "Who should use the user portal?", a: "Delivery partners and customer-side users who need route safety, alerts, and performance views." },
  { q: "What does the admin portal do?", a: "It gives operations staff a different control-center interface for zone review, incident management, and approvals." },
  { q: "Is the map real?", a: "Yes. Surakshit Kshetra uses Leaflet tiles with interactive zone markers and popups." },
];

export default function Index() {
  return (
    <div className="min-h-screen overflow-hidden relative bg-[#F7F9F7] text-[#1A2E1A]">
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-gradient-to-b from-[#E8F5E9] via-[#F7F9F7] to-transparent" />
      <div className="absolute -top-28 -left-20 w-96 h-96 rounded-full bg-[#AECCAE]/30 blur-3xl" />
      <div className="absolute top-24 right-0 w-80 h-80 rounded-full bg-[#6B8E6B]/20 blur-3xl" />

      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#2E5C31] text-white flex items-center justify-center shadow-lg shadow-[#2E5C31]/20">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] uppercase group-hover:opacity-80 transition-opacity">Gig Kavach</p>
              <p className="text-[10px] text-[#526652] -mt-0.5">Safety-first gig platform</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-[#405240] hover:text-[#2E5C31] transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#dce8dc] bg-white/60 text-sm font-medium text-[#1A2E1A] hover:bg-white transition-colors">
              Login
            </Link>
            <Link to="/login" className="bg-[#2E5C31] hover:bg-[#244a27] text-white text-xs font-medium py-2 px-4 rounded-full transition-all shadow-lg shadow-[#2E5C31]/20">
              Open Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(174,204,174,0.35),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(107,142,107,0.18),_transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.30),rgba(247,249,247,0.88))]" />
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(46,92,49,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(46,92,49,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 w-full">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/70 backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-green-800 tracking-[0.2em] uppercase">Live operations across city zones</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1A2E1A] leading-[1.05] max-w-4xl">
                  Safe work, smarter routes, and better gig earnings.
                </h1>

                <p className="text-base md:text-xl text-[#405240] font-sans-feature font-light max-w-2xl leading-relaxed">
                  Gig Kavach is a safety-first web platform for delivery partners and operators. Start with a polished dashboard, choose your login path, and then work inside a dedicated user or admin portal.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link to="/login" className="bg-[#2E5C31] hover:bg-[#244a27] text-white text-sm font-medium py-3 px-8 rounded-full transition-all shadow-xl shadow-[#2E5C31]/20 flex items-center gap-2 group">
                    Choose Login
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/login/user" className="bg-white/50 hover:bg-white/80 border border-white/60 text-[#1A2E1A] text-sm font-medium py-3 px-8 rounded-full backdrop-blur-sm transition-all">
                    Demo User Login
                  </Link>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 pt-4 max-w-3xl">
                  {[
                    ["98%", "route visibility"],
                    ["24/7", "incident tracking"],
                    ["2", "portal experiences"],
                  ].map(([value, label]) => (
                    <div key={label} className="glass-card px-5 py-4 rounded-2xl">
                      <p className="text-2xl font-semibold tracking-tight leading-none text-[#1A2E1A]">{value}</p>
                      <p className="text-xs text-[#526652] mt-1 uppercase tracking-[0.18em]">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                <div className="absolute -top-12 -right-8 w-56 h-56 bg-green-200/35 rounded-full blur-3xl" />
                <div className="absolute bottom-0 -left-6 w-40 h-40 bg-white/50 rounded-full blur-3xl" />

                <div className="glass-card p-4 md:p-5 rounded-[2rem] rotate-1">
                  <div className="rounded-[1.5rem] overflow-hidden bg-white/70 border border-white/60">
                    <div className="p-5 md:p-6 border-b border-stone-200/60 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#526652]">Platform Overview</p>
                        <h2 className="text-xl font-semibold text-[#1A2E1A] mt-1">Website dashboard before login</h2>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E5C31] flex items-center justify-center">
                        <Clock3 className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-5 md:p-6">
                      {[
                        ["User portal", "Safer routes, alerts, earnings"],
                        ["Admin portal", "Command center, incidents, approvals"],
                        ["Leaflet map", "Real map tiles with zone popups"],
                        ["Demo data", "Fast testing without backend setup"],
                      ].map(([title, text]) => (
                        <div key={title} className="rounded-2xl bg-[#F7F9F7] border border-white/70 p-4">
                          <p className="text-sm font-semibold text-[#1A2E1A]">{title}</p>
                          <p className="text-xs text-[#526652] mt-1 leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1A2E1A]">
                  Built for gig teams that need clarity, safety, and control.
                </h2>
                <p className="text-base text-[#405240] leading-relaxed font-sans-feature">
                  The platform combines a public landing dashboard, separate login choices, and role-specific portals. Users see deliveries, route safety, and earnings. Admins see incidents, zone risk, and compliance status in a different workspace.
                </p>

                <div className="space-y-4">
                  {[
                    [Leaf, "Soft green glass UI", "Milky backgrounds, rounded cards, and calm contrast for a premium feel."],
                    [Globe, "City-scale map intelligence", "A real interactive map for zone-level review and operations."],
                    [BadgeCheck, "Demo-friendly flow", "Prefilled login credentials and sample data to show the product quickly."],
                  ].map(([Icon, title, text]) => (
                    <div key={title as string} className="glass-card p-4 flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E5C31] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1A2E1A]">{title as string}</h3>
                        <p className="text-sm text-[#526652] mt-1 leading-relaxed">{text as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
                <div className="absolute -top-10 right-0 w-52 h-52 bg-[#E8F5E9] rounded-full blur-3xl" />
                <div className="glass-card p-2 rounded-[2rem] rotate-[-1deg]">
                  <div className="rounded-[1.5rem] overflow-hidden bg-[#1F3321] text-white">
                    <div className="p-6 md:p-7 border-b border-white/10">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">What the website includes</p>
                      <h3 className="text-2xl font-semibold mt-2">A long-form portal landing experience</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/10">
                      {[
                        ["Landing dashboard", "Explains the product before login"],
                        ["Admin portal", "Separate command-center experience"],
                        ["User portal", "Safer delivery and earnings tools"],
                        ["Leaflet map", "Interactive live zone explorer"],
                      ].map(([title, text]) => (
                        <div key={title} className="bg-[#203523] p-5 min-h-32">
                          <p className="font-semibold text-white">{title}</p>
                          <p className="text-sm text-white/65 mt-2 leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-24 bg-[#F0F2F0]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-[#526652]">Core modules</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1A2E1A] mt-3">Everything organized into focused modules</h2>
              <p className="text-sm md:text-base text-[#526652] mt-4">A clean dashboard first, then role-based access for daily operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {serviceCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 rounded-[1.5rem]"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/70 border border-white/70 flex items-center justify-center text-[#2E5C31] shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#1A2E1A]">{item.title}</h3>
                  <p className="text-sm text-[#526652] mt-2 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="py-20 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#526652]">Flow</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1A2E1A]">A simple path from discovery to daily use.</h2>
                <p className="text-[#526652] leading-relaxed font-sans-feature">
                  The website is meant to tell the story first, then guide a visitor into the right login. After that, each role gets a focused working surface with its own tone and information density.
                </p>

                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E5C31] hover:translate-x-0.5 transition-transform">
                  Jump to login choice <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  ["1", "Landing dashboard", "Introduce the platform and build trust first."],
                  ["2", "Choose login", "Pick user or admin access on a clear screen."],
                  ["3", "Enter portal", "Work in the dedicated surface that matches the role."],
                ].map(([step, title, text], index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-5 rounded-[1.5rem]"
                  >
                    <div className="text-3xl font-medium text-[#2E5C31]">{step}</div>
                    <h3 className="mt-3 text-base font-semibold text-[#1A2E1A]">{title}</h3>
                    <p className="text-sm text-[#526652] mt-2 leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 md:py-24 bg-[#F0F2F0]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#526652]">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#1A2E1A] mt-3">A quick explanation before login</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="glass-card p-5 rounded-[1.25rem]">
                  <h3 className="font-semibold text-[#1A2E1A]">{item.q}</h3>
                  <p className="text-sm text-[#526652] mt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login/user" className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#2E5C31] text-white text-sm font-medium shadow-lg shadow-[#2E5C31]/20 hover:bg-[#244a27] transition-colors">
                Demo user login
              </Link>
              <Link to="/login/admin" className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[#dce8dc] bg-white/70 text-sm font-medium text-[#1A2E1A] hover:bg-white transition-colors">
                Admin login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F2113] text-white/80 py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-white/10 pb-8">
            <div>
              <p className="text-lg font-semibold tracking-tight text-white uppercase">Gig Kavach</p>
              <p className="text-sm text-white/55 mt-2 max-w-xl">A calm, polished gig-safety website for user and admin workflows, with real map interaction and demo data.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 rounded-full bg-white text-[#0F2113] text-sm font-semibold">
                Go to login
              </Link>
              <a href="#hero" className="px-4 py-2 rounded-full border border-white/15 text-sm font-semibold text-white/85">
                Back to top
              </a>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/45">
            <p>Designed for demonstration, onboarding, and gig-work safety workflows.</p>
            <p>Leaflet map, dual portals, and dashboard-first navigation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
