import { AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/ui-store";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { BootScreen } from "@/components/dashboard/BootScreen";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { MainDashboard } from "@/components/dashboard/MainDashboard";
import { MarketIntelligence } from "@/components/dashboard/MarketIntelligence";
import { EngineeringLog } from "@/components/dashboard/EngineeringLog";
import { OpenNetworks } from "@/components/dashboard/OpenNetworks";
import { ToolsPanel } from "@/components/dashboard/ToolsPanel";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { cn } from "@/lib/utils";
import "./App.css";

function DashboardContent() {
  const { activeModule, sidebarCollapsed, bootComplete } = useUIStore();

  useKeyboardShortcuts();

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <MainDashboard />;
      case "markets":
        return <MarketIntelligence />;
      case "log":
        return <EngineeringLog />;
      case "networks":
        return <OpenNetworks />;
      case "tools":
        return <ToolsPanel />;
      case "status":
        return <SystemStatus />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-30" />

      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanline-overlay pointer-events-none" />

      {/* Boot Screen */}
      <AnimatePresence>{!bootComplete && <BootScreen />}</AnimatePresence>

      {/* Main Interface */}
      {bootComplete && (
        <>
          <Sidebar />
          <TopBar />
          <CommandPalette />
          <main
            className={cn(
              "min-h-screen pt-16 transition-all duration-300",
              sidebarCollapsed ? "pl-16" : "pl-64"
            )}
          >
            <div className="p-6 max-w-7xl mx-auto">{renderModule()}</div>
          </main>
        </>
      )}
    </div>
  );
}

function App() {
  return <DashboardContent />;
}

export default App;