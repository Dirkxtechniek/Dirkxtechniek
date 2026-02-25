import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Activity } from 'lucide-react';
import type { MarketData } from '../hooks/useMarketData';

gsap.registerPlugin(ScrollTrigger);

interface MarketIntelligenceProps {
  marketData: MarketData;
}

function MiniChart({ data, color = '#00F0FF' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${color})`}
      />
    </svg>
  );
}

export default function MarketIntelligence({ marketData }: MarketIntelligenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Generate mock chart data
  const chartData = Array.from({ length: 50 }, (_, i) => {
    const base = 65000;
    const trend = i * 100;
    const noise = (Math.random() - 0.5) * 2000;
    return base + trend + noise;
  });

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const chart = chartRef.current;
    const ticker = tickerRef.current;
    const stats = statsRef.current;

    if (!section || !headline || !chart || !ticker || !stats) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );

      // Chart animation
      gsap.fromTo(chart,
        { x: '10vw', scale: 0.98, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // Ticker animation
      gsap.fromTo(ticker,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );

      // Stats animation
      gsap.fromTo(stats,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      // Parallax effect
      gsap.to(chart, {
        y: '-2vh',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const allAssets = [...marketData.crypto, ...marketData.stocks];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-dirkx-bg-secondary dot-grid-light py-[10vh] overflow-hidden"
    >
      <div className="px-[6vw]">
        {/* Headline Block */}
        <div ref={headlineRef} className="mb-8">
          <h2 className="font-space text-4xl md:text-5xl font-light tracking-tight text-dirkx-text mb-4">
            MARKET INTELLIGENCE
          </h2>
          <p className="font-inter text-lg text-dirkx-text-secondary max-w-xl">
            Live feeds. On-chain signals. Macro context.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart Panel */}
          <div ref={chartRef} className="glass-panel corner-brackets corner-brackets-bottom p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 size={18} className="text-dirkx-cyan" />
                <span className="panel-title">BTC/USD • 4H</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-dirkx-text-secondary">
                  RSI <span className="text-dirkx-cyan">62</span>
                </span>
                <span className="font-mono text-xs text-dirkx-text-secondary">
                  Vol <span className="text-dirkx-cyan">24.1B</span>
                </span>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-[280px] relative">
              <MiniChart data={chartData} />
              
              {/* Price Labels */}
              <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-right">
                <span className="font-mono text-xs text-dirkx-text-secondary">$69,420</span>
                <span className="font-mono text-xs text-dirkx-text-secondary">$67,420</span>
                <span className="font-mono text-xs text-dirkx-text-secondary">$65,420</span>
              </div>
            </div>

            {/* Time Labels */}
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs text-dirkx-text-secondary">00:00</span>
              <span className="font-mono text-xs text-dirkx-text-secondary">06:00</span>
              <span className="font-mono text-xs text-dirkx-text-secondary">12:00</span>
              <span className="font-mono text-xs text-dirkx-text-secondary">18:00</span>
              <span className="font-mono text-xs text-dirkx-text-secondary">Now</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="space-y-4">
            {/* BTC Dominance */}
            <div className="glass-panel corner-brackets p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PieChart size={16} className="text-dirkx-cyan" />
                  <span className="panel-title">BTC DOMINANCE</span>
                </div>
                <span className="font-mono text-2xl text-dirkx-cyan">
                  {marketData.btcDominance.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-dirkx-bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-dirkx-cyan to-dirkx-success"
                  style={{ width: `${marketData.btcDominance}%` }}
                />
              </div>
            </div>

            {/* Total Market Cap */}
            <div className="glass-panel corner-brackets p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-dirkx-cyan" />
                  <span className="panel-title">TOTAL MARKET CAP</span>
                </div>
                <span className="font-mono text-2xl text-dirkx-text">
                  ${marketData.totalMarketCap}
                </span>
              </div>
            </div>

            {/* Top Gainers/Losers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel corner-brackets p-4">
                <p className="panel-title mb-3 text-dirkx-success">TOP GAINERS</p>
                <div className="space-y-2">
                  {marketData.topGainers.slice(0, 3).map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between">
                      <span className="font-mono text-sm text-dirkx-text">{asset.symbol}</span>
                      <span className="font-mono text-xs text-dirkx-success">+{asset.change24h.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel corner-brackets p-4">
                <p className="panel-title mb-3 text-dirkx-danger">TOP LOSERS</p>
                <div className="space-y-2">
                  {marketData.topLosers.slice(0, 3).map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between">
                      <span className="font-mono text-sm text-dirkx-text">{asset.symbol}</span>
                      <span className="font-mono text-xs text-dirkx-danger">{asset.change24h.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker Tape */}
        <div ref={tickerRef} className="glass-panel p-4 overflow-hidden">
          <div className="flex animate-ticker-scroll whitespace-nowrap">
            {[...allAssets, ...allAssets].map((asset, index) => (
              <div key={`${asset.symbol}-${index}`} className="flex items-center gap-4 mx-6">
                <span className="font-mono text-sm text-dirkx-text">{asset.symbol}</span>
                <span className="font-mono text-sm text-dirkx-text-secondary">
                  ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`font-mono text-sm flex items-center gap-1 ${asset.change24h >= 0 ? 'text-dirkx-success' : 'text-dirkx-danger'}`}>
                  {asset.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(asset.change24h).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Overview */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 text-center">
            <p className="panel-title mb-2">LAYER 1</p>
            <p className="font-mono text-lg text-dirkx-cyan">+3.2%</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="panel-title mb-2">LAYER 2</p>
            <p className="font-mono text-lg text-dirkx-success">+5.8%</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="panel-title mb-2">AI SECTOR</p>
            <p className="font-mono text-lg text-dirkx-success">+8.4%</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="panel-title mb-2">DEFI</p>
            <p className="font-mono text-lg text-dirkx-danger">-1.2%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
