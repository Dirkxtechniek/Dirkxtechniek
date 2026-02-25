import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import { useMarketData } from './hooks/useMarketData';
import PersistentUI from './components/PersistentUI';
import BootSequence from './sections/BootSequence';
import MainDashboard from './sections/MainDashboard';
import MarketIntelligence from './sections/MarketIntelligence';
import SystemConsole from './sections/SystemConsole';
import OpenNetworks from './sections/OpenNetworks';
import EngineeringLog from './sections/EngineeringLog';
import NodeStatus from './sections/NodeStatus';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const marketData = useMarketData();
  const mainRef = useRef<HTMLElement>(null);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-dirkx-bg min-h-screen">
      {/* Persistent UI Elements */}
      <PersistentUI />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Boot Sequence - pin: true */}
        <BootSequence />

        {/* Section 2: Main Dashboard - pin: true */}
        <MainDashboard marketData={marketData} />

        {/* Section 3: Market Intelligence - pin: false */}
        <MarketIntelligence marketData={marketData} />

        {/* Section 4: System Console - pin: false */}
        <SystemConsole />

        {/* Section 5: Open Networks - pin: false */}
        <OpenNetworks />

        {/* Section 6: Engineering Log - pin: false */}
        <EngineeringLog />

        {/* Section 7: Node Status - pin: false */}
        <NodeStatus />
      </main>
    </div>
  );
}

export default App;
