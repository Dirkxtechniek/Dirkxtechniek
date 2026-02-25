import { motion } from "framer-motion";
import { useSystemTelemetry } from "@/hooks/use-system-telemetry";
import { useUIStore } from "@/store/ui-store";
import { Panel } from "./Panel";
import { cn, formatNumber } from "@/lib/utils";
import { Activity, Clock, Wifi, Shield, Thermometer, Server, Database, Cpu } from "lucide-react";

export function SystemStatus() {
  const { formattedUptime } = useSystemTelemetry();
  const { packetsSent, networkIntegrity, trackersBlocked, systemTemp } = useUIStore();

  const metrics = [
    {
      label: "Uptime",
      value: formattedUptime,
      icon: Clock,
      color: "text-cyber-cyan",
      trend: "stable" as const,
    },
    {
      label: "Packets Sent",
      value: formatNumber(packetsSent, 0),
      icon: Wifi,
      color: "text-cyber-green",
      trend: "up" as const,
    },
    {
      label: "Network Integrity",
      value: `${networkIntegrity.toFixed(2)}%`,
      icon: Shield,
      color: "text-cyber-green",
      trend: "stable" as const,
    },
    {
      label: "Trackers Blocked",
      value: formatNumber(trackersBlocked, 0),
      icon: Database,
      color: "text-cyber-purple",
      trend: "up" as const,
    },
    {
      label: "System Temp",
      value: `${Math.round(systemTemp)}°C`,
      icon: Thermometer,
      color: systemTemp > 60 ? "text-cyber-red" : "text-cyber-cyan",
      trend: systemTemp > 55 ? ("up" as const) : ("stable" as const),
    },
  ];

  const services = [
    { name: "Market Data Feed", status: "online", latency: "45ms" },
    { name: "Network Monitor", status: "online", latency: "12ms" },
    { name: "Telemetry Collector", status: "online", latency: "8ms" },
    { name: "Command Interface", status: "online", latency: "3ms" },
    { name: "Data Cache", status: "online", latency: "2ms" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">System Status</h2>
        <p className="text-sm text-muted-foreground">Real-time telemetry and system health</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Panel
                title={metric.label}
                icon={<Icon className={cn("w-4 h-4", metric.color)} />}
                glowColor={
                  metric.color.includes("red")
                    ? "red"
                    : metric.color.includes("green")
                    ? "green"
                    : metric.color.includes("purple")
                    ? "purple"
                    : "cyan"
                }
              >
                <div className="text-2xl font-bold font-mono text-foreground">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      metric.trend === "up" ? "bg-cyber-green" : "bg-cyber-cyan"
                    )}
                  />
                  <span className="text-xs text-muted-foreground">
                    {metric.trend === "up" ? "Increasing" : "Stable"}
                  </span>
                </div>
              </Panel>
            </motion.div>
          );
        })}
      </div>

      <Panel title="Service Health" icon={<Server className="w-4 h-4" />}>
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-md bg-cyber-black/30"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full animate-pulse bg-cyber-green" />
                <span className="text-sm text-foreground">{service.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground font-mono">{service.latency}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
                  ONLINE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel title="CPU Usage" icon={<Cpu className="w-4 h-4 text-cyber-cyan" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Load</span>
              <span className="text-lg font-mono text-cyber-cyan">12%</span>
            </div>
            <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "12%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[15, 12, 10, 14].map((val, i) => (
                <div key={i} className="p-2 rounded bg-cyber-black/30">
                  <div className="text-xs text-muted-foreground">Core {i + 1}</div>
                  <div className="text-sm font-mono text-cyber-cyan">{val}%</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Memory Usage" icon={<Activity className="w-4 h-4 text-cyber-purple" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Used / Total</span>
              <span className="text-lg font-mono text-cyber-purple">3.2 / 16 GB</span>
            </div>
            <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-cyber-black/30">
                <div className="text-xs text-muted-foreground">Heap</div>
                <div className="text-sm font-mono text-cyber-purple">245 MB</div>
              </div>
              <div className="p-2 rounded bg-cyber-black/30">
                <div className="text-xs text-muted-foreground">Stack</div>
                <div className="text-sm font-mono text-cyber-purple">12 MB</div>
              </div>
              <div className="p-2 rounded bg-cyber-black/30">
                <div className="text-xs text-muted-foreground">Cache</div>
                <div className="text-sm font-mono text-cyber-purple">1.8 GB</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Network Traffic" icon={<Wifi className="w-4 h-4 text-cyber-green" />} glowColor="green">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-cyber-black/30">
            <div className="text-xs text-muted-foreground mb-1">Inbound</div>
            <div className="text-xl font-mono text-cyber-green">2.4 MB/s</div>
          </div>
          <div className="p-4 rounded-lg bg-cyber-black/30">
            <div className="text-xs text-muted-foreground mb-1">Outbound</div>
            <div className="text-xl font-mono text-cyber-cyan">1.1 MB/s</div>
          </div>
          <div className="p-4 rounded-lg bg-cyber-black/30">
            <div className="text-xs text-muted-foreground mb-1">Connections</div>
            <div className="text-xl font-mono text-cyber-purple">47</div>
          </div>
          <div className="p-4 rounded-lg bg-cyber-black/30">
            <div className="text-xs text-muted-foreground mb-1">Latency</div>
            <div className="text-xl font-mono text-cyber-yellow">24ms</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}