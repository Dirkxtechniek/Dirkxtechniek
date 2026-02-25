import { motion } from "framer-motion";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Globe,
  Wrench,
  Activity,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "⌥1" },
  { id: "markets", label: "Markets", icon: TrendingUp, shortcut: "⌥2" },
  { id: "log", label: "Engineering Log", icon: FileText, shortcut: "⌥3" },
  { id: "networks", label: "Open Networks", icon: Globe, shortcut: "⌥4" },
  { id: "tools", label: "Tools", icon: Wrench, shortcut: "⌥5" },
  { id: "status", label: "System Status", icon: Activity, shortcut: "⌥6" },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activeModule, setActiveModule } = useUIStore();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "fixed left-0 top-0 h-full bg-cyber-graphite/95 backdrop-blur-md border-r border-cyber-cyan/10 z-40 transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-cyber-cyan/10">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Terminal className="w-5 h-5 text-cyber-cyan" />
            <span className="font-bold text-sm tracking-tight">
              <span className="text-cyber-cyan">DIRKX</span>
              <span className="text-foreground/60 ml-1">NODE</span>
            </span>
          </motion.div>
        )}
        {sidebarCollapsed && <Terminal className="w-5 h-5 text-cyber-cyan mx-auto" />}
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-cyber-cyan/20 border border-cyber-cyan/40 rounded-full flex items-center justify-center hover:bg-cyber-cyan/30 transition-colors"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-3 h-3 text-cyber-cyan" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-cyber-cyan" />
        )}
      </button>

      <nav className="p-2 space-y-1 mt-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setActiveModule(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group",
                isActive
                  ? "bg-cyber-cyan/10 border border-cyber-cyan/30"
                  : "hover:bg-cyber-cyan/5 border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-cyber-cyan" : "text-foreground/50 group-hover:text-cyber-cyan/70"
                )}
              />
              {!sidebarCollapsed && (
                <>
                  <span
                    className={cn(
                      "text-sm transition-colors flex-1 text-left",
                      isActive ? "text-cyber-cyan" : "text-foreground/70 group-hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                </>
              )}
            </motion.button>
          );
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-cyan/10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span>System Online</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">v2.4.1-stable</div>
        </div>
      )}
    </motion.aside>
  );
}