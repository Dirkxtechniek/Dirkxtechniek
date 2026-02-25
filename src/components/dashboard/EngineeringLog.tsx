import { motion } from "framer-motion";
import { Panel } from "./Panel";
import { Beaker, Lightbulb, Hammer, Eye } from "lucide-react";

interface LogEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  type: "experiment" | "observation" | "build" | "thought";
}

const logEntries: LogEntry[] = [
  {
    id: "1",
    date: "2024-02-26",
    title: "Market Data Pipeline Optimization",
    content:
      "Refactored the real-time market data ingestion pipeline. Reduced latency by 40% through implementing connection pooling and async batch processing.",
    tags: ["performance", "api", "async"],
    type: "build",
  },
  {
    id: "2",
    date: "2024-02-24",
    title: "Fear & Greed Index Analysis",
    content:
      "Observed correlation between extreme fear periods (index < 20) and 30-day BTC recovery patterns. Historical data suggests 73% probability of positive returns.",
    tags: ["analysis", "btc", "sentiment"],
    type: "observation",
  },
  {
    id: "3",
    date: "2024-02-22",
    title: "WebSocket vs Polling Experiment",
    content:
      "Testing WebSocket connections for real-time price updates. Initial results show 15x reduction in latency compared to REST polling.",
    tags: ["websocket", "real-time", "experiment"],
    type: "experiment",
  },
  {
    id: "4",
    date: "2024-02-20",
    title: "On Decentralized Intelligence",
    content:
      "The future of market analysis lies in distributed, open-source intelligence networks. Centralized data providers create single points of failure.",
    tags: ["philosophy", "decentralization"],
    type: "thought",
  },
  {
    id: "5",
    date: "2024-02-18",
    title: "Layer 2 Scaling Metrics Dashboard",
    content:
      "Implemented comparative analysis panel for L2 solutions. Tracking TVL, transaction throughput, and fee metrics across Arbitrum, Optimism, and Base.",
    tags: ["l2", "dashboard", "analytics"],
    type: "build",
  },
  {
    id: "6",
    date: "2024-02-15",
    title: "AI Token Sector Classification",
    content:
      "Developed heuristic classification for AI-related crypto projects. Criteria: team background, compute tokenization, model ownership structure.",
    tags: ["ai", "classification", "research"],
    type: "observation",
  },
];

const typeIcons = {
  experiment: Beaker,
  observation: Eye,
  build: Hammer,
  thought: Lightbulb,
};

const typeColors = {
  experiment: "text-cyber-purple border-cyber-purple/30 bg-cyber-purple/10",
  observation: "text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10",
  build: "text-cyber-green border-cyber-green/30 bg-cyber-green/10",
  thought: "text-cyber-yellow border-cyber-yellow/30 bg-cyber-yellow/10",
};

export function EngineeringLog() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Engineering Log</h2>
        <p className="text-sm text-muted-foreground">Experiments, observations, and system thoughts</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-cyber-cyan/20" />

        <div className="space-y-4">
          {logEntries.map((entry, index) => {
            const Icon = typeIcons[entry.type];
            const colorClass = typeColors[entry.type];

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-2 ${colorClass}`} />

                <Panel
                  title={entry.title}
                  icon={<Icon className="w-4 h-4" />}
                  glowColor={
                    entry.type === "experiment"
                      ? "purple"
                      : entry.type === "build"
                      ? "green"
                      : entry.type === "thought"
                      ? "cyan"
                      : "none"
                  }
                  headerAction={<span className="text-xs text-muted-foreground">{entry.date}</span>}
                >
                  <p className="text-sm text-foreground/80 leading-relaxed">{entry.content}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full border border-cyber-cyan/30 text-cyber-cyan"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Panel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}