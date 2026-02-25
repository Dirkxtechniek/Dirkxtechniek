import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "green" | "purple" | "red" | "yellow" | "none";
  headerAction?: ReactNode;
}

const glowColors = {
  cyan: "hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] border-cyber-cyan/20",
  green: "hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] border-cyber-green/20",
  purple: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] border-cyber-purple/20",
  red: "hover:shadow-[0_0_30px_rgba(255,51,102,0.15)] border-cyber-red/20",
  yellow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] border-cyber-yellow/20",
  none: "",
};

export function Panel({
  title,
  icon,
  children,
  className,
  glowColor = "cyan",
  headerAction,
}: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-lg border bg-cyber-graphite/80 backdrop-blur-sm overflow-hidden transition-all duration-300",
        glowColor !== "none" && glowColors[glowColor],
        "hover:border-opacity-50",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          {icon && <span className="text-cyber-cyan/70">{icon}</span>}
          <h3 className="text-sm font-medium text-foreground/90 tracking-wide">
            {title}
          </h3>
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}