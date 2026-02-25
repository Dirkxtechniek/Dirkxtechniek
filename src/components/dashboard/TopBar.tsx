import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/ui-store";
import { cn, formatTimestamp } from "@/lib/utils";
import { Search, Wifi, Cpu, Activity, Command } from "lucide-react";

export function TopBar() {
  const { toggleCommandPalette, sidebarCollapsed } = useUIStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(34);
  const [networkStatus] = useState<"online" | "warning">("online");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const metricsInterval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 5);
      setMemoryUsage(Math.floor(Math.random() * 20) + 25);
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "fixed top-0 right-0 h-16 bg-cyber-graphite/95 backdrop-blur-md border-b border-cyber-cyan/10 z-30 transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="h-full flex items-center justify-between px-6">
        <button
          onClick={toggleCommandPalette}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyber-black/50 border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-colors group"
        >
          <Search className="w-4 h-4 text-foreground/50 group-hover:text-cyber-cyan" />
          <span className="text-sm text-foreground/50 group-hover:text-foreground/70">
            Search...
          </span>
          <div className="flex items-center gap-1 ml-2 text-xs text-muted-foreground">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wifi
              className={cn(
                "w-4 h-4",
                networkStatus === "online" ? "text-cyber-green" : "text-cyber-yellow"
              )}
            />
            <span className="text-xs text-muted-foreground">
              {networkStatus === "online" ? "Connected" : "Degraded"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
            <div className="flex flex-col">
              <span className="text-xs font-mono">{cpuUsage}%</span>
              <div className="w-16 h-1 bg-cyber-black rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cpuUsage}%` }}
                  className="h-full bg-cyber-cyan"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-purple" />
            <div className="flex flex-col">
              <span className="text-xs font-mono">{memoryUsage}%</span>
              <div className="w-16 h-1 bg-cyber-black rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${memoryUsage}%` }}
                  className="h-full bg-cyber-purple"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-cyber-cyan/20 pl-6">
            <span className="text-sm font-mono text-cyber-cyan">
              {formatTimestamp(currentTime)}
            </span>
            <span className="text-xs text-muted-foreground">UTC</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}