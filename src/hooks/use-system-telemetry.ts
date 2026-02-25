import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";

export function useSystemTelemetry() {
  const { incrementUptime, updateTelemetry, uptime } = useUIStore();

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      incrementUptime();
    }, 1000);

    const telemetryInterval = setInterval(() => {
      updateTelemetry();
    }, 3000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(telemetryInterval);
    };
  }, [incrementUptime, updateTelemetry]);

  const formatUptime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    uptime,
    formattedUptime: formatUptime(uptime),
  };
}