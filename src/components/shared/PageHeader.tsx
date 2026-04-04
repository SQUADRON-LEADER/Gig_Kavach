import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export function PageHeader({ title, subtitle, icon: Icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="font-display font-bold text-xl md:text-2xl text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
  );
}
