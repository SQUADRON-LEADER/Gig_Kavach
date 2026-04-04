import { Link, useLocation } from "react-router-dom";
import { BarChart3, AlertTriangle, Shield, Bot, Wallet, Bell } from "lucide-react";

const bottomItems = [
  { path: "/aay-darpan", label: "Darpan", icon: BarChart3 },
  { path: "/jokhim-soochak", label: "Jokhim", icon: AlertTriangle },
  { path: "/suraksha-kavach", label: "Kavach", icon: Shield },
  { path: "/ai-margdarshak", label: "AI", icon: Bot },
  { path: "/surakshapay", label: "Pay", icon: Wallet },
  { path: "/smart-suchna", label: "Suchna", icon: Bell },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t rounded-none px-2 py-1.5">
      <div className="flex justify-around">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav-item py-1.5 px-2 rounded-xl text-xs ${isActive ? 'active' : ''}`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className={isActive ? 'font-semibold text-primary' : ''}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
