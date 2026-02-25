import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/ui-store";
import { Terminal, Cpu, Network, Database } from "lucide-react";

const bootSequence = [
  { text: "INITIALIZING DIRKX NODE...", icon: Terminal, delay: 0 },
  { text: "Loading kernel modules...", icon: Cpu, delay: 300 },
  { text: "Initializing market streams...", icon: Database, delay: 600 },
  { text: "Connecting to open networks...", icon: Network, delay: 900 },
  { text: "Loading intelligence modules...", icon: Database, delay: 1200 },
  { text: "System ready.", icon: Terminal, delay: 1500 },
];

export function BootScreen() {
  const { setBooting, setBootComplete } = useUIStore();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const showLines = async () => {
      for (let i = 0; i < bootSequence.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, i === 0 ? 500 : 400));
        setVisibleLines((prev) => [...prev, i]);
        setCurrentLine(i);
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      setBooting(false);
      setBootComplete(true);
    };

    showLines();
  }, [setBooting, setBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-cyber-black flex items-center justify-center"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 scanline-overlay" />

      <div className="relative z-10 w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            <span className="text-cyber-cyan text-glow-cyan">DIRKX</span>
            <span className="text-foreground/80 ml-2">SYSTEM</span>
          </h1>
          <p className="text-cyber-cyan/60 text-sm mt-2 tracking-widest">
            NODE v2.4.1
          </p>
        </motion.div>

        <div className="bg-cyber-graphite/80 border border-cyber-cyan/20 rounded-lg p-6 backdrop-blur-sm">
          <div className="terminal-text space-y-2">
            {bootSequence.map((line, index) => {
              const Icon = line.icon;
              const isVisible = visibleLines.includes(index);
              const isCurrent = currentLine === index;

              return (
                <AnimatePresence key={index}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="text-cyber-cyan/60">
                        <Icon size={14} />
                      </span>
                      <span
                        className={`${
                          index === bootSequence.length - 1
                            ? "text-cyber-green"
                            : "text-foreground/70"
                        }`}
                      >
                        {line.text}
                      </span>
                      {isCurrent && index !== bootSequence.length - 1 && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="w-2 h-4 bg-cyber-cyan/60"
                        />
                      )}
                      {index !== bootSequence.length - 1 && !isCurrent && (
                        <span className="text-cyber-green">✓</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="h-1 bg-cyber-graphite rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${(visibleLines.length / bootSequence.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Boot Progress</span>
              <span>
                {Math.round((visibleLines.length / bootSequence.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8 text-xs text-muted-foreground"
        >
          <p>Secure Connection Established | Encrypted Session</p>
        </motion.div>
      </div>
    </motion.div>
  );
}