export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface MarketOverview {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  btc_dominance: number;
  eth_dominance: number;
}

export interface FearGreedData {
  value: number;
  value_classification: string;
  timestamp: string;
}

export interface LogEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  type: "experiment" | "observation" | "build" | "thought";
}

export interface NetworkResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

export interface SystemMetric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  color?: string;
}

export interface Command {
  id: string;
  name: string;
  description: string;
  shortcut?: string;
  action: () => void;
  icon?: string;
}

export interface PanelProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "green" | "purple" | "none";
}