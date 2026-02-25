import { motion } from "framer-motion";
import { Panel } from "./Panel";
import { useMarketData } from "@/hooks/use-market-data";
import { useSystemTelemetry } from "@/hooks/use-system-telemetry";
import { useUIStore } from "@/store/ui-store";
import { cn, formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  Activity,
  Bitcoin,
  Clock,
  Shield,
  FileText,
  Globe,
  ArrowRight,
} from "lucide-react";

export function MainDashboard() {
  const { marketOverview, fearGreed, getTopGainers, getCoinData } = useMarketData();
  const { formattedUptime } = useSystemTelemetry();
  const { packetsSent, networkIntegrity, setActiveModule } = useUIStore();

  const btcData = getCoinData("btc");
  const ethData = getCoinData("eth");
  const topGainers = getTopGainers(3);

  const quickStats = [
    {
      label: "BTC Price",
      value: btcData ? formatCurrency(btcData.current_price) : "--",
      change: btcData?.price_change_percentage_24h,
      icon: Bitcoin,
      color: "cyan",
    },
    {
      label: "ETH Price",
      value: ethData ? formatCurrency(ethData.current_price) : "--",
      change: ethData?.price_change_percentage_24h,
      icon: Activity,
      color: "purple",
    },
    {
      label: "Market Cap",
      value: marketOverview ? formatCurrency(marketOverview.total_market_cap) : "--",
      change: marketOverview?.market_cap_change_percentage_24h,
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Fear & Greed",
      value: fearGreed ? fearGreed.value.toString() : "--",
      subtext: fearGreed?.value_classification,
      icon: Activity,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          <span className="text-cyber-cyan">DIRKX</span> SYSTEM NODE
        </h1>
        <p className="text-muted-foreground mt-1">Cyber Intelligence Dashboard v2.4.1</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-cyber-graphite/50 border border-cyber-cyan/10 hover:border-cyber-cyan/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  className={cn(
                    "w-4 h-4",
                    stat.color === "cyan" && "text-cyber-cyan",
                    stat.color === "purple" && "text-cyber-purple",
                    stat.color === "green" && "text-cyber-green",
                    stat.color === "yellow" && "text-cyber-yellow"
                  )}
                />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-xl font-bold font-mono text-foreground">{stat.value}</div>
              {stat.change !== undefined && (
                <div className={cn("text-xs mt-1", stat.change >= 0 ? "text-cyber-green" : "text-cyber-red")}>
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change.toFixed(2)}%
                </div>
              )}
              {stat.subtext && <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel
          title="Top Gainers"
          icon={<TrendingUp className="w-4 h-4 text-cyber-green" />}
          glowColor="green"
          headerAction={
            <button onClick={() => setActiveModule("markets")} className="text-xs text-cyber-cyan hover:underline">
              View All
            </button>
          }
        >
          <div className="space-y-2">
            {topGainers.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-md bg-cyber-black/30"
              >
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                  <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                </div>
                <span className="text-xs text-cyber-green">+{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel
          title="System Status"
          icon={<Shield className="w-4 h-4 text-cyber-cyan" />}
          glowColor="cyan"
          headerAction={
            <button onClick={() => setActiveModule("status")} className="text-xs text-cyber-cyan hover:underline">
              Details
            </button>
          }
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-sm font-mono text-cyber-cyan">{formattedUptime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-mono text-cyber-green">{networkIntegrity.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Packets</span>
              <span className="text-sm font-mono text-cyber-purple">{packetsSent.toLocaleString()}</span>
            </div>
            <div className="h-1 bg-cyber-black rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${networkIntegrity}%` }}
                className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Quick Access" icon={<Activity className="w-4 h-4" />}>
          <div className="space-y-2">
            <button
              onClick={() => setActiveModule("markets")}
              className="w-full flex items-center justify-between p-3 rounded-md bg-cyber-black/30 hover:bg-cyber-cyan/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-cyber-cyan" />
                <span className="text-sm">Market Intelligence</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
            </button>
            <button
              onClick={() => setActiveModule("log")}
              className="w-full flex items-center justify-between p-3 rounded-md bg-cyber-black/30 hover:bg-cyber-cyan/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyber-purple" />
                <span className="text-sm">Engineering Log</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
            </button>
            <button
              onClick={() => setActiveModule("networks")}
              className="w-full flex items-center justify-between p-3 rounded-md bg-cyber-black/30 hover:bg-cyber-cyan/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyber-green" />
                <span className="text-sm">Open Networks</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
            </button>
          </div>
        </Panel>
      </div>

      <Panel title="Recent Activity" icon={<Clock className="w-4 h-4" />}>
        <div className="space-y-2">
          {[
            { time: "2 min ago", event: "Market data refreshed", type: "info" },
            { time: "5 min ago", event: "New connection established", type: "success" },
            { time: "12 min ago", event: "Telemetry updated", type: "info" },
            { time: "1 hour ago", event: "System check completed", type: "success" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-2 rounded-md bg-cyber-black/30"
            >
              <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
              <span className={cn("w-2 h-2 rounded-full", activity.type === "success" ? "bg-cyber-green" : "bg-cyber-cyan")} />
              <span className="text-sm text-foreground">{activity.event}</span>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  );
}