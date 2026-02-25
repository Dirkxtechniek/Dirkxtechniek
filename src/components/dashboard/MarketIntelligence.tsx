import { motion } from "framer-motion";
import { useMarketData } from "@/hooks/use-market-data";
import { Panel } from "./Panel";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Bitcoin,
  Cpu,
  Layers,
  Zap,
  RefreshCw,
} from "lucide-react";

export function MarketIntelligence() {
  const {
    marketOverview,
    fearGreed,
    lastUpdate,
    refresh,
    getCoinData,
    getTopGainers,
    getTopLosers,
    getAISector,
    getLayer1,
    getLayer2,
  } = useMarketData();

  const btcData = getCoinData("btc");
  const ethData = getCoinData("eth");
  const topGainers = getTopGainers(5);
  const topLosers = getTopLosers(5);
  const aiSector = getAISector(5);
  const layer1 = getLayer1(5);
  const layer2 = getLayer2(5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Market Intelligence</h2>
          <p className="text-sm text-muted-foreground">Real-time crypto market data</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            Last update: {new Date(lastUpdate).toLocaleTimeString()}
          </span>
          <button
            onClick={refresh}
            className="p-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 hover:bg-cyber-cyan/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-cyber-cyan" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Panel title="Bitcoin" icon={<Bitcoin className="w-4 h-4" />} glowColor="cyan">
          <div className="space-y-2">
            <div className="text-2xl font-bold font-mono">
              {btcData ? formatCurrency(btcData.current_price) : "--"}
            </div>
            {btcData && (
              <div className={cn("text-sm", btcData.price_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red")}>
                {btcData.price_change_percentage_24h >= 0 ? "+" : ""}
                {btcData.price_change_percentage_24h.toFixed(2)}%
              </div>
            )}
          </div>
        </Panel>

        <Panel title="Ethereum" icon={<Activity className="w-4 h-4" />} glowColor="purple">
          <div className="space-y-2">
            <div className="text-2xl font-bold font-mono">
              {ethData ? formatCurrency(ethData.current_price) : "--"}
            </div>
            {ethData && (
              <div className={cn("text-sm", ethData.price_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red")}>
                {ethData.price_change_percentage_24h >= 0 ? "+" : ""}
                {ethData.price_change_percentage_24h.toFixed(2)}%
              </div>
            )}
          </div>
        </Panel>

        <Panel title="Total Market Cap" icon={<Layers className="w-4 h-4" />} glowColor="green">
          <div className="space-y-2">
            <div className="text-2xl font-bold font-mono">
              {marketOverview ? formatCurrency(marketOverview.total_market_cap) : "--"}
            </div>
            {marketOverview && (
              <div className={cn("text-sm", marketOverview.market_cap_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red")}>
                {marketOverview.market_cap_change_percentage_24h >= 0 ? "+" : ""}
                {marketOverview.market_cap_change_percentage_24h.toFixed(2)}%
              </div>
            )}
          </div>
        </Panel>

        <Panel title="Fear & Greed" icon={<Zap className="w-4 h-4" />} glowColor="yellow">
          <div className="space-y-2">
            <div className="text-2xl font-bold font-mono">{fearGreed ? fearGreed.value : "--"}</div>
            {fearGreed && (
              <div
                className={cn(
                  "text-sm",
                  fearGreed.value >= 75 ? "text-cyber-red" : fearGreed.value >= 50 ? "text-cyber-green" : "text-cyber-cyan"
                )}
              >
                {fearGreed.value_classification}
              </div>
            )}
            <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fearGreed?.value || 0}%` }}
                className={cn(
                  "h-full",
                  fearGreed && fearGreed.value >= 75
                    ? "bg-cyber-red"
                    : fearGreed && fearGreed.value >= 50
                    ? "bg-cyber-green"
                    : "bg-cyber-cyan"
                )}
              />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Panel title="BTC Dominance" icon={<Bitcoin className="w-4 h-4" />}>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold font-mono text-cyber-cyan">
              {marketOverview?.btc_dominance.toFixed(1) || "--"}%
            </div>
            <div className="text-sm text-muted-foreground">
              ETH: {marketOverview?.eth_dominance.toFixed(1) || "--"}%
            </div>
          </div>
        </Panel>

        <Panel title="24h Volume" icon={<Activity className="w-4 h-4" />}>
          <div className="text-3xl font-bold font-mono text-cyber-green">
            {marketOverview ? formatCurrency(marketOverview.total_volume) : "--"}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Top Gainers" icon={<TrendingUp className="w-4 h-4 text-cyber-green" />} glowColor="green">
          <div className="space-y-2">
            {topGainers.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-md bg-cyber-black/30"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono">{formatCurrency(coin.current_price)}</span>
                  <span className="text-xs text-cyber-green">+{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Top Losers" icon={<TrendingDown className="w-4 h-4 text-cyber-red" />} glowColor="red">
          <div className="space-y-2">
            {topLosers.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-md bg-cyber-black/30"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono">{formatCurrency(coin.current_price)}</span>
                  <span className="text-xs text-cyber-red">{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="AI Crypto Sector" icon={<Cpu className="w-4 h-4 text-cyber-purple" />} glowColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {aiSector.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-cyber-black/30 border border-cyber-purple/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
              </div>
              <div className="text-lg font-mono">{formatCurrency(coin.current_price)}</div>
              <div
                className={cn(
                  "text-xs mt-2",
                  coin.price_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red"
                )}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Layer 1" icon={<Layers className="w-4 h-4" />}>
          <div className="space-y-2">
            {layer1.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-md bg-cyber-black/30"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono">{formatCurrency(coin.current_price)}</span>
                  <span
                    className={cn(
                      "text-xs",
                      coin.price_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red"
                    )}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Layer 2" icon={<Layers className="w-4 h-4 text-cyber-cyan" />} glowColor="cyan">
          <div className="space-y-2">
            {layer2.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded-md bg-cyber-black/30"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium">{coin.symbol.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono">{formatCurrency(coin.current_price)}</span>
                  <span
                    className={cn(
                      "text-xs",
                      coin.price_change_percentage_24h >= 0 ? "text-cyber-green" : "text-cyber-red"
                    )}
                  >
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}