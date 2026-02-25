import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 2): string {
  if (num >= 1e12) return (num / 1e12).toFixed(decimals) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + "K";
  return num.toFixed(decimals);
}

export function formatCurrency(num: number, decimals = 2): string {
  return "$" + formatNumber(num, decimals);
}

export function formatPercentage(num: number, decimals = 2): string {
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(decimals)}%`;
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}