import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const demoUser = {
  email: "user@gigsahayata.demo",
  password: "user123",
  name: "Rider Demo User",
};

export default function UserLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState(demoUser.email);
  const [password, setPassword] = useState(demoUser.password);
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === demoUser.email && password === demoUser.password) {
      login("user", demoUser.name);
      navigate("/portal/user");
      return;
    }

    setError("Invalid demo credentials. Use the prefilled values.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card w-full max-w-md p-6 md:p-8">
        <h1 className="font-display text-3xl font-bold text-foreground">User Login</h1>
        <p className="text-sm text-muted-foreground mt-2">Demo credentials are prefilled for quick testing.</p>

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

          <button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition-opacity">
            Login to User Portal
          </button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">Need admin access? <Link to="/login/admin" className="text-primary underline">Switch to admin login</Link></p>
      </motion.div>
    </div>
  );
}
