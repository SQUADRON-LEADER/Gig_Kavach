import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const demoAdmin = {
  email: "admin@gigkavach.demo",
  password: "admin123",
  name: "Operations Admin",
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState(demoAdmin.email);
  const [password, setPassword] = useState(demoAdmin.password);
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === demoAdmin.email && password === demoAdmin.password) {
      login("admin", demoAdmin.name);
      navigate("/portal/admin");
      return;
    }

    setError("Invalid demo credentials. Use the prefilled values.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-warning/10 to-background px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card w-full max-w-md p-6 md:p-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Admin Login</h1>
        <p className="text-sm text-muted-foreground mt-2">Demo admin credentials are prefilled for review.</p>

        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full mt-1 rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full mt-1 rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          </div>

          {error ? <p className="text-xs text-destructive">{error}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-warning text-warning-foreground py-2.5 font-medium hover:opacity-90 transition-opacity">
            Login to Admin Portal
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">Need user access? <Link to="/login/user" className="text-primary underline">Switch to user login</Link></p>
      </motion.div>
    </div>
  );
}
