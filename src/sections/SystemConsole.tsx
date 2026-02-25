import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, 
  TrendingUp, 
  Radio, 
  Wrench, 
  FileText, 
  Activity, 
  User,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const commands = [
  { id: 'markets', label: 'markets', icon: TrendingUp, desc: 'View market data and charts' },
  { id: 'media', label: 'media', icon: Radio, desc: 'Access podcasts and feeds' },
  { id: 'tools', label: 'tools', icon: Wrench, desc: 'Utilities and calculators' },
  { id: 'research', label: 'research', icon: FileText, desc: 'Papers and protocols' },
  { id: 'status', label: 'status', icon: Activity, desc: 'System diagnostics' },
  { id: 'about', label: 'about', icon: User, desc: 'Node information' },
];

const outputLines = [
  '> open markets',
  '> fetch price_feed --src=binance,coingecko',
  '> render chart --pair=BTC/USD --tf=4H',
  '> status: ok',
  '> latency: 24ms',
  '> connection: stable',
];

export default function SystemConsole() {
  const sectionRef = useRef<HTMLElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [activeCommand, setActiveCommand] = useState('markets');
  const [visibleOutput, setVisibleOutput] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleOutput((prev) => (prev < outputLines.length ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const prompt = promptRef.current;
    const grid = gridRef.current;
    const output = outputRef.current;

    if (!section || !prompt || !grid || !output) return;

    const tiles = grid.querySelectorAll('.command-tile');

    const ctx = gsap.context(() => {
      // Prompt animation
      gsap.fromTo(prompt,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Command tiles animation
      gsap.fromTo(tiles,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Output log animation
      gsap.fromTo(output,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-dirkx-bg dot-grid py-[10vh] overflow-hidden"
    >
      <div className="px-[6vw]">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-space text-4xl md:text-5xl font-light tracking-tight text-dirkx-text mb-4">
            SYSTEM CONSOLE
          </h2>
          <p className="font-inter text-lg text-dirkx-text-secondary max-w-xl">
            Command palette for navigation and system control.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Prompt & Output */}
          <div className="space-y-6">
            {/* Prompt Card */}
            <div
              ref={promptRef}
              className="glass-panel corner-brackets corner-brackets-bottom p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Terminal size={18} className="text-dirkx-cyan" />
                <span className="panel-title">COMMAND INPUT</span>
              </div>
              
              <div className="bg-dirkx-bg-secondary/80 rounded p-4 font-mono">
                <span className="text-dirkx-cyan">{'>'}</span>
                <span className="text-dirkx-text ml-2">{activeCommand}</span>
                <span className="animate-blink text-dirkx-cyan ml-1">_</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-dirkx-text-secondary">
                <span className="font-mono text-xs">Press</span>
                <kbd className="px-2 py-1 rounded bg-dirkx-bg-secondary font-mono text-xs text-dirkx-cyan border border-dirkx-cyan/30">
                  ESC
                </kbd>
                <span className="font-mono text-xs">to open console overlay</span>
              </div>
            </div>

            {/* Output Log */}
            <div
              ref={outputRef}
              className="glass-panel corner-brackets p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Activity size={18} className="text-dirkx-cyan" />
                <span className="panel-title">SYSTEM OUTPUT</span>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                {outputLines.slice(0, visibleOutput).map((line, index) => (
                  <p
                    key={index}
                    className={`${
                      line.includes('ok') || line.includes('stable')
                        ? 'text-dirkx-success'
                        : line.includes('error')
                        ? 'text-dirkx-danger'
                        : 'text-dirkx-text-secondary'
                    }`}
                  >
                    {line}
                  </p>
                ))}
                {visibleOutput < outputLines.length && (
                  <p className="animate-blink text-dirkx-cyan">_</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Command Grid */}
          <div ref={gridRef} className="grid grid-cols-2 gap-4">
            {commands.map((command) => {
              const Icon = command.icon;
              const isActive = activeCommand === command.id;
              
              return (
                <button
                  key={command.id}
                  onClick={() => setActiveCommand(command.id)}
                  className={`command-tile glass-panel corner-brackets p-5 text-left transition-all duration-200 hover:-translate-y-1 ${
                    isActive
                      ? 'border-dirkx-cyan/60 bg-dirkx-cyan/5'
                      : 'border-dirkx-cyan/10 hover:border-dirkx-cyan/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded flex items-center justify-center ${
                      isActive ? 'bg-dirkx-cyan/20' : 'bg-dirkx-bg-secondary'
                    }`}>
                      <Icon size={18} className={isActive ? 'text-dirkx-cyan' : 'text-dirkx-text-secondary'} />
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${
                      isActive ? 'text-dirkx-cyan translate-x-1' : 'text-dirkx-text-secondary/50'
                    }`} />
                  </div>
                  
                  <p className={`font-mono text-sm font-medium mb-1 ${
                    isActive ? 'text-dirkx-text' : 'text-dirkx-text-secondary'
                  }`}>
                    {command.label}
                  </p>
                  <p className="font-mono text-xs text-dirkx-text-secondary/60">
                    {command.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 glass-panel p-4">
          <p className="panel-title mb-4">KEYBOARD SHORTCUTS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: '↑/↓', action: 'Navigate commands' },
              { key: 'Enter', action: 'Execute command' },
              { key: 'Esc', action: 'Open/Close console' },
              { key: 'Cmd+K', action: 'Quick search' },
            ].map((shortcut) => (
              <div key={shortcut.key} className="flex items-center gap-3">
                <kbd className="px-2 py-1 rounded bg-dirkx-bg-secondary font-mono text-xs text-dirkx-cyan border border-dirkx-cyan/30 whitespace-nowrap">
                  {shortcut.key}
                </kbd>
                <span className="font-mono text-xs text-dirkx-text-secondary">{shortcut.action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
