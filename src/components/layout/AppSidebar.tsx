import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, AlertTriangle, Shield, FileCheck, Package,
  Map, Bot, Fingerprint, TrendingUp, Wallet, Gift,
  Mic, Bell, Sun, Moon, ChevronLeft, ChevronRight, LayoutDashboard, LogOut
} from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const navItems = [
  { path: "/aay-darpan", label: "Aay Darpan", icon: BarChart3 },
  { path: "/jokhim-soochak", label: "Jokhim Soochak", icon: AlertTriangle },
  { path: "/suraksha-kavach", label: "Suraksha Kavach", icon: Shield },
  { path: "/swayam-claim", label: "Swayam Claim", icon: FileCheck },
  { path: "/sahi-chayan", label: "Sahi Chayan", icon: Package },
  { path: "/surakshit-kshetra", label: "Surakshit Kshetra", icon: Map },
  { path: "/ai-margdarshak", label: "AI Margdarshak", icon: Bot },
  { path: "/vishwas-score", label: "Vishwas Score", icon: Fingerprint },
  { path: "/kaarya-pradarshan", label: "Kaarya Pradarshan", icon: TrendingUp },
  { path: "/surakshapay", label: "SurakshaPay", icon: Wallet },
  { path: "/bonus-vaapsi", label: "Bonus Vaapsi", icon: Gift },
  { path: "/bhasha-sathi", label: "Bhasha Sathi", icon: Mic },
  { path: "/smart-suchna", label: "Smart Suchna", icon: Bell },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useAppStore();
  const { role, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const portalPath = role === "admin" ? "/portal/admin" : "/portal/user";

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && <h1 className="font-display font-bold text-lg text-sidebar-primary">GigKavach</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1 rounded-lg hover:bg-sidebar-accent transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        <Link
          to={portalPath}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            location.pathname === portalPath
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          }`}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Portal Dashboard</span>}
        </Link>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <motion.div layoutId="sidebar-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button onClick={toggleDarkMode} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-sidebar-accent/50 transition-colors">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button onClick={onLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-sidebar-accent/50 transition-colors mt-1">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
