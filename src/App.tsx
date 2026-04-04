import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import AayDarpan from "./pages/AayDarpan";
import JokhimSoochak from "./pages/JokhimSoochak";
import SurakshaKavach from "./pages/SurakshaKavach";
import SwayamClaim from "./pages/SwayamClaim";
import SahiChayan from "./pages/SahiChayan";
import SurakshitKshetra from "./pages/SurakshitKshetra";
import AIMargdarshak from "./pages/AIMargdarshak";
import VishwasScore from "./pages/VishwasScore";
import KaaryaPradarshan from "./pages/KaaryaPradarshan";
import SurakshaPay from "./pages/SurakshaPay";
import BonusVaapsi from "./pages/BonusVaapsi";
import BhashaSathi from "./pages/BhashaSathi";
import SmartSuchna from "./pages/SmartSuchna";
import LoginHub from "./pages/LoginHub";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserPortal from "./pages/UserPortal";
import AdminPortal from "./pages/AdminPortal";
import NotFound from "./pages/NotFound";
import { UserRole, useAuthStore } from "./stores/useAuthStore";
import { Chatbot } from "@/components/shared/Chatbot";

const queryClient = new QueryClient();

function StartupLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="glass-card px-6 py-5 flex items-center gap-4">
        <div className="relative w-10 h-10">
          <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <span className="absolute inset-1 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Loading Gig Kavach</p>
          <p className="text-xs text-muted-foreground">Preparing dashboard and safety portals</p>
        </div>
      </div>
    </div>
  );
}

function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function RoleGate({ allowedRoles, children }: { allowedRoles: UserRole[]; children: ReactNode }) {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/portal/admin" : "/portal/user"} replace />;
  }

  return <>{children}</>;
}

function ProtectedLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function AppShell() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <StartupLoader /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginHub />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />

          <Route element={<RequireAuth />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/portal/user" element={<RoleGate allowedRoles={["user"]}><UserPortal /></RoleGate>} />
              <Route path="/portal/admin" element={<RoleGate allowedRoles={["admin"]}><AdminPortal /></RoleGate>} />
              <Route path="/aay-darpan" element={<AayDarpan />} />
              <Route path="/jokhim-soochak" element={<JokhimSoochak />} />
              <Route path="/suraksha-kavach" element={<SurakshaKavach />} />
              <Route path="/swayam-claim" element={<SwayamClaim />} />
              <Route path="/sahi-chayan" element={<SahiChayan />} />
              <Route path="/surakshit-kshetra" element={<SurakshitKshetra />} />
              <Route path="/ai-margdarshak" element={<AIMargdarshak />} />
              <Route path="/vishwas-score" element={<VishwasScore />} />
              <Route path="/kaarya-pradarshan" element={<KaaryaPradarshan />} />
              <Route path="/surakshapay" element={<SurakshaPay />} />
              <Route path="/bonus-vaapsi" element={<BonusVaapsi />} />
              <Route path="/bhasha-sathi" element={<BhashaSathi />} />
              <Route path="/smart-suchna" element={<SmartSuchna />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
