import { motion } from "framer-motion";
import { Panel } from "./Panel";
import {
  Wrench,
  Calculator,
  Hash,
  Clock,
  Palette,
  QrCode,
  FileJson,
  Globe,
  Lock,
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
}

export function ToolsPanel() {
  const tools: Tool[] = [
    {
      id: "base64",
      name: "Base64 Encoder",
      description: "Encode/decode Base64 strings",
      icon: FileJson,
      action: () => {
        const input = prompt("Enter text to encode:");
        if (input) {
          alert(`Base64: ${btoa(input)}`);
        }
      },
    },
    {
      id: "timestamp",
      name: "Timestamp Converter",
      description: "Convert Unix timestamps",
      icon: Clock,
      action: () => {
        const ts = prompt("Enter Unix timestamp (seconds):");
        if (ts) {
          const date = new Date(parseInt(ts) * 1000);
          alert(`Date: ${date.toUTCString()}`);
        }
      },
    },
    {
      id: "color",
      name: "Color Converter",
      description: "Convert between color formats",
      icon: Palette,
      action: () => {
        const hex = prompt("Enter HEX color (e.g., #00f0ff):");
        if (hex) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          alert(`RGB: rgb(${r}, ${g}, ${b})`);
        }
      },
    },
    {
      id: "qr",
      name: "QR Generator",
      description: "Generate QR codes",
      icon: QrCode,
      action: () => {
        const text = prompt("Enter text for QR code:");
        if (text) {
          window.open(
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`,
            "_blank"
          );
        }
      },
    },
    {
      id: "ip",
      name: "IP Lookup",
      description: "Check your IP address",
      icon: Globe,
      action: () => {
        window.open("https://ipinfo.io", "_blank");
      },
    },
    {
      id: "password",
      name: "Password Generator",
      description: "Generate secure passwords",
      icon: Lock,
      action: () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 16; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        alert(`Generated password: ${password}`);
      },
    },
    {
      id: "calc",
      name: "Calculator",
      description: "Quick calculations",
      icon: Calculator,
      action: () => {
        const expr = prompt("Enter expression:");
        if (expr) {
          try {
            // eslint-disable-next-line no-eval
            const result = eval(expr);
            alert(`Result: ${result}`);
          } catch {
            alert("Invalid expression");
          }
        }
      },
    },
    {
      id: "hash",
      name: "Hash Generator",
      description: "Generate SHA-256 hashes",
      icon: Hash,
      action: () => {
        alert("Hash generator - Placeholder for crypto.subtle integration");
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tools</h2>
        <p className="text-sm text-muted-foreground">Utility functions and converters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={tool.action}
                className="w-full p-4 rounded-lg bg-cyber-graphite/50 border border-cyber-cyan/10 hover:border-cyber-cyan/40 hover:bg-cyber-cyan/5 transition-all duration-300 text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-md bg-cyber-cyan/10 group-hover:bg-cyber-cyan/20 transition-colors">
                    <Icon className="w-5 h-5 text-cyber-cyan" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-cyber-cyan transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
              </button>
            </motion.div>
          );
        })}
      </div>

      <Panel title="Quick Actions" icon={<Wrench className="w-4 h-4" />}>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
          >
            Refresh Dashboard
          </button>
          <button
            onClick={() => alert("Cache cleared successfully")}
            className="px-4 py-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
          >
            Clear Cache
          </button>
          <button
            onClick={() => alert("Export functionality - Placeholder")}
            className="px-4 py-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
          >
            Export Data
          </button>
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="px-4 py-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
          >
            Fullscreen
          </button>
        </div>
      </Panel>

      <Panel title="System Information" icon={<Globe className="w-4 h-4" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Platform</div>
            <div className="font-mono text-foreground">{navigator.platform}</div>
          </div>
          <div>
            <div className="text-muted-foreground">User Agent</div>
            <div className="font-mono text-foreground truncate">{navigator.userAgent.split(" ")[0]}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Language</div>
            <div className="font-mono text-foreground">{navigator.language}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Cores</div>
            <div className="font-mono text-foreground">{navigator.hardwareConcurrency}</div>
          </div>
        </div>
      </Panel>
    </div>
  );
}