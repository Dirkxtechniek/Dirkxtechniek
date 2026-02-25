import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, 
  Radio, 
  Wrench, 
  Network, 
  FileText, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import type { Asset } from '../hooks/useMarketData';

gsap.registerPlugin(ScrollTrigger);

interface DashboardPanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function DashboardPanel({ title, icon, children, className = '' }: DashboardPanelProps) {
  return (
    <div className={`glass-panel corner-brackets corner-brackets-bottom p-5 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-dirkx-cyan">{icon}</span>
          <h3 className="panel-title">{title}</h3>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function AssetRow({ asset }: { asset: Asset }) {
  const isPositive = asset.change24h >= 0;
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-dirkx-cyan/10 last:border-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-dirkx-text">{asset.symbol}</span>
        <span className="font-mono text-xs text-dirkx-text-secondary">{asset.name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-dirkx-text">
          {asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className={`font-mono text-xs flex items-center gap-1 ${isPositive ? 'text-dirkx-success' : 'text-dirkx-danger'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(asset.change24h).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

interface MainDashboardProps {
  marketData: {
    crypto: Asset[];
    stocks: Asset[];
  };
}

export default function MainDashboard({ marketData }: MainDashboardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const panels = panelsRef.current;
    const scanline = scanlineRef.current;

    if (!section || !header || !panels || !scanline) return;

    const panelElements = panels.querySelectorAll('.dashboard-panel');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(header,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      panelElements.forEach((panel, index) => {
        scrollTl.fromTo(panel,
          { y: 40, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.04 * index
        );
      });

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      panelElements.forEach((panel, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        scrollTl.to(panel,
          { 
            y: row === 0 ? -80 : 80,
            x: col === 0 ? -60 : col === 2 ? 60 : 0,
            opacity: 0,
            ease: 'power2.in'
          },
          0.70 + 0.02 * index
        );
      });

      scrollTl.fromTo(header,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Scanline transition
      scrollTl.fromTo(scanline,
        { y: '-10vh', opacity: 0.8 },
        { y: '110vh', opacity: 0, ease: 'power2.inOut' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const topCrypto = marketData.crypto.slice(0, 3);
  const topStocks = marketData.stocks.slice(0, 2);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen bg-dirkx-bg dot-grid overflow-hidden z-20"
    >
      {/* Cyan Glow Background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dirkx-cyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Header */}
      <div
        ref={headerRef}
        className="absolute left-[6vw] right-[6vw] top-[6vh] flex items-center justify-between"
      >
        <h2 className="font-space text-2xl font-medium tracking-tight text-dirkx-text">
          DASHBOARD
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-dirkx-success animate-pulse" />
          <span className="font-mono text-sm text-dirkx-text-secondary">
            SYSTEM ONLINE • LATENCY 24ms
          </span>
        </div>
      </div>

      {/* Panel Grid */}
      <div
        ref={panelsRef}
        className="absolute left-[6vw] right-[6vw] top-[16vh] bottom-[10vh] grid grid-cols-3 grid-rows-2 gap-[2.2vh_2.2vw]"
      >
        {/* Markets Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="MARKETS" icon={<TrendingUp size={18} />}>
            <div className="space-y-1">
              {topCrypto.map((asset) => (
                <AssetRow key={asset.symbol} asset={asset} />
              ))}
              {topStocks.map((asset) => (
                <AssetRow key={asset.symbol} asset={asset} />
              ))}
            </div>
          </DashboardPanel>
        </div>

        {/* Media Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="MEDIA" icon={<Radio size={18} />}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded bg-dirkx-bg-secondary/50">
                <div className="w-8 h-8 rounded bg-dirkx-cyan/20 flex items-center justify-center">
                  <Radio size={14} className="text-dirkx-cyan" />
                </div>
                <div>
                  <p className="font-mono text-sm text-dirkx-text">Podcasts</p>
                  <p className="font-mono text-xs text-dirkx-text-secondary">12 feeds</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded bg-dirkx-bg-secondary/50">
                <div className="w-8 h-8 rounded bg-dirkx-cyan/20 flex items-center justify-center">
                  <FileText size={14} className="text-dirkx-cyan" />
                </div>
                <div>
                  <p className="font-mono text-sm text-dirkx-text">Newsletters</p>
                  <p className="font-mono text-xs text-dirkx-text-secondary">8 sources</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded bg-dirkx-bg-secondary/50">
                <div className="w-8 h-8 rounded bg-dirkx-cyan/20 flex items-center justify-center">
                  <Activity size={14} className="text-dirkx-cyan" />
                </div>
                <div>
                  <p className="font-mono text-sm text-dirkx-text">Live Feeds</p>
                  <p className="font-mono text-xs text-dirkx-text-secondary">24 streams</p>
                </div>
              </div>
            </div>
          </DashboardPanel>
        </div>

        {/* Tools Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="TOOLS" icon={<Wrench size={18} />}>
            <div className="grid grid-cols-2 gap-2">
              {['Converters', 'Calculators', 'APIs', 'Validators', 'Simulators', 'Analyzers'].map((tool) => (
                <div
                  key={tool}
                  className="p-2 rounded bg-dirkx-bg-secondary/50 border border-dirkx-cyan/10 hover:border-dirkx-cyan/30 transition-colors cursor-pointer"
                >
                  <p className="font-mono text-xs text-dirkx-text-secondary text-center">{tool}</p>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </div>

        {/* Networks Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="NETWORKS" icon={<Network size={18} />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-dirkx-bg-secondary/50">
                <span className="font-mono text-sm text-dirkx-text-secondary">Active Nodes</span>
                <span className="font-mono text-sm text-dirkx-cyan">47</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-dirkx-bg-secondary/50">
                <span className="font-mono text-sm text-dirkx-text-secondary">Peers</span>
                <span className="font-mono text-sm text-dirkx-cyan">128</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-dirkx-bg-secondary/50">
                <span className="font-mono text-sm text-dirkx-text-secondary">Open APIs</span>
                <span className="font-mono text-sm text-dirkx-cyan">16</span>
              </div>
              <div className="mt-3 p-2 rounded border border-dirkx-cyan/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-dirkx-success animate-pulse" />
                  <span className="font-mono text-xs text-dirkx-text-secondary">Network stable</span>
                </div>
              </div>
            </div>
          </DashboardPanel>
        </div>

        {/* Research Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="RESEARCH" icon={<FileText size={18} />}>
            <div className="space-y-2">
              {[
                { title: 'Layer 2 Scaling', type: 'Paper', date: '2026-01-15' },
                { title: 'MEV Analysis', type: 'Report', date: '2026-01-12' },
                { title: 'Protocol Design', type: 'Notes', date: '2026-01-08' },
                { title: 'Market Microstructure', type: 'Paper', date: '2026-01-05' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-2 rounded bg-dirkx-bg-secondary/50 hover:bg-dirkx-bg-secondary transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-mono text-sm text-dirkx-text">{item.title}</p>
                    <p className="font-mono text-xs text-dirkx-text-secondary">{item.type}</p>
                  </div>
                  <span className="font-mono text-xs text-dirkx-text-secondary">{item.date}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </div>

        {/* Status Panel */}
        <div className="dashboard-panel">
          <DashboardPanel title="STATUS" icon={<Activity size={18} />}>
            <div className="space-y-3">
              {[
                { name: 'Market Feed', status: 'ok', latency: '12ms' },
                { name: 'Data Sync', status: 'ok', latency: '8ms' },
                { name: 'Network', status: 'ok', latency: '24ms' },
                { name: 'Storage', status: 'ok', latency: '4ms' },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${service.status === 'ok' ? 'bg-dirkx-success' : 'bg-dirkx-danger'}`} />
                    <span className="font-mono text-sm text-dirkx-text-secondary">{service.name}</span>
                  </div>
                  <span className="font-mono text-xs text-dirkx-cyan">{service.latency}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded bg-dirkx-success/10 border border-dirkx-success/30">
              <p className="font-mono text-sm text-dirkx-success text-center">All systems nominal</p>
            </div>
          </DashboardPanel>
        </div>
      </div>

      {/* Scanline Transition */}
      <div
        ref={scanlineRef}
        className="absolute left-0 w-screen h-[2px] bg-dirkx-cyan/80 pointer-events-none"
        style={{ top: '-10vh' }}
      />
    </section>
  );
}
