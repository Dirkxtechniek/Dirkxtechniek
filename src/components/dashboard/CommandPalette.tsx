import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Globe,
  Wrench,
  Activity,
  Search,
  Terminal,
  Info,
} from "lucide-react";

const commands = [
  { id: "dashboard", name: "Dashboard", description: "View main dashboard", icon: LayoutDashboard, shortcut: "⌥1" },
  { id: "markets", name: "Markets", description: "View market intelligence", icon: TrendingUp, shortcut: "⌥2" },
  { id: "log", name: "Engineering Log", description: "View system logs", icon: FileText, shortcut: "⌥3" },
  { id: "networks", name: "Open Networks", description: "Browse network resources", icon: Globe, shortcut: "⌥4" },
  { id: "tools", name: "Tools", description: "Access system tools", icon: Wrench, shortcut: "⌥5" },
  { id: "status", name: "System Status", description: "View system telemetry", icon: Activity, shortcut: "⌥6" },
  { id: "about", name: "About", description: "System information", icon: Info, shortcut: "" },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setActiveModule } = useUIStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex].id);
          }
          break;
        case "Escape":
          setCommandPaletteOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, filteredCommands, selectedIndex]);

  const executeCommand = (commandId: string) => {
    if (commandId === "about") {
      alert("DIRKX SYSTEM NODE v2.4.1\nCyber Intelligence Dashboard\nBuilt with React + Vite");
    } else {
      setActiveModule(commandId);
    }
    setCommandPaletteOpen(false);
    setSearchQuery("");
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="bg-cyber-graphite border border-cyber-cyan/30 rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-cyber-cyan/10">
                <Search className="w-5 h-5 text-cyber-cyan" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Terminal className="w-3 h-3" />
                  <span>ESC to close</span>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No commands found
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredCommands.map((command, index) => {
                      const Icon = command.icon;
                      const isSelected = index === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          onClick={() => executeCommand(command.id)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 transition-colors",
                            isSelected
                              ? "bg-cyber-cyan/10 border-l-2 border-cyber-cyan"
                              : "hover:bg-cyber-cyan/5 border-l-2 border-transparent"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-4 h-4",
                              isSelected ? "text-cyber-cyan" : "text-foreground/50"
                            )}
                          />
                          <div className="flex-1 text-left">
                            <div className={cn("text-sm", isSelected ? "text-foreground" : "text-foreground/70")}>
                              {command.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{command.description}</div>
                          </div>
                          {command.shortcut && (
                            <span className="text-xs text-muted-foreground">{command.shortcut}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-4 py-2 bg-cyber-black/50 border-t border-cyber-cyan/10 text-xs text-muted-foreground flex items-center justify-between">
                <span>{filteredCommands.length} commands available</span>
                <span>Use ↑↓ to navigate, ↵ to select</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}