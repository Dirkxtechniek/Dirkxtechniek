import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Calendar, Tag, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const logEntries = [
  {
    id: 1,
    date: '2026-01-18',
    title: 'Deployed a minimal market feed renderer using Canvas 2D',
    content: 'Built a lightweight charting component that renders real-time price data without external dependencies. Focused on performance and minimal footprint.',
    tags: ['canvas', 'performance', 'markets'],
    type: 'build',
  },
  {
    id: 2,
    date: '2026-01-10',
    title: 'Refactored routing: now map-based instead of tree-based',
    content: 'Switched from nested route trees to a flat map structure. Reduces complexity and makes dynamic routing more predictable.',
    tags: ['architecture', 'routing', 'refactor'],
    type: 'note',
  },
  {
    id: 3,
    date: '2025-12-22',
    title: 'Notes on open internet discovery: curate, then aggregate',
    content: 'The best discovery systems start with human curation. Algorithms should amplify quality, not replace judgment.',
    tags: ['philosophy', 'curation', 'open-internet'],
    type: 'observation',
  },
  {
    id: 4,
    date: '2025-12-15',
    title: 'Experiment: WebGL particle system for data visualization',
    content: 'Testing GPU-accelerated particles for representing network topology. 60fps with 10k+ nodes on mid-tier hardware.',
    tags: ['webgl', 'visualization', 'experiment'],
    type: 'experiment',
  },
  {
    id: 5,
    date: '2025-12-08',
    title: 'System observation: latency patterns in DeFi protocols',
    content: 'Noticed consistent 12-24ms latency spikes during block finalization. Documenting for future optimization work.',
    tags: ['defi', 'performance', 'observation'],
    type: 'observation',
  },
];

const typeColors: Record<string, string> = {
  build: 'text-dirkx-success',
  note: 'text-dirkx-cyan',
  observation: 'text-dirkx-warning',
  experiment: 'text-dirkx-danger',
};

const typeBgColors: Record<string, string> = {
  build: 'bg-dirkx-success/10',
  note: 'bg-dirkx-cyan/10',
  observation: 'bg-dirkx-warning/10',
  experiment: 'bg-dirkx-danger/10',
};

export default function EngineeringLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const cardElements = cards.querySelectorAll('.log-card');

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
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

      // Cards animation
      gsap.fromTo(cardElements,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Headline */}
          <div ref={headlineRef}>
            <div className="flex items-center gap-3 mb-4">
              <FileText size={20} className="text-dirkx-cyan" />
              <h2 className="font-space text-4xl md:text-5xl font-light tracking-tight text-dirkx-text">
                ENGINEERING LOG
              </h2>
            </div>
            <p className="font-inter text-lg text-dirkx-text-secondary max-w-md mb-8">
              Builds, notes, and system observations. A record of experiments and learnings.
            </p>

            {/* Stats */}
            <div className="glass-panel p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-dirkx-text-secondary">Total Entries</span>
                <span className="font-mono text-lg text-dirkx-cyan">{logEntries.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-dirkx-text-secondary">Builds</span>
                <span className="font-mono text-lg text-dirkx-success">
                  {logEntries.filter(e => e.type === 'build').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-dirkx-text-secondary">Experiments</span>
                <span className="font-mono text-lg text-dirkx-danger">
                  {logEntries.filter(e => e.type === 'experiment').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-dirkx-text-secondary">Observations</span>
                <span className="font-mono text-lg text-dirkx-warning">
                  {logEntries.filter(e => e.type === 'observation').length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Log Cards */}
          <div ref={cardsRef} className="space-y-4">
            {logEntries.map((entry) => (
              <div
                key={entry.id}
                className="log-card glass-panel corner-brackets p-5 hover:border-dirkx-cyan/30 transition-colors cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${typeBgColors[entry.type]}`}>
                      <Calendar size={14} className={typeColors[entry.type]} />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-dirkx-text-secondary">
                        {entry.date}
                      </span>
                      <span className={`font-mono text-xs ml-3 uppercase ${typeColors[entry.type]}`}>
                        {entry.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight 
                    size={16} 
                    className="text-dirkx-text-secondary/40 group-hover:text-dirkx-cyan group-hover:translate-x-1 transition-all" 
                  />
                </div>

                {/* Title */}
                <h3 className="font-space text-lg font-medium text-dirkx-text mb-2 group-hover:text-dirkx-cyan transition-colors">
                  {entry.title}
                </h3>

                {/* Content */}
                <p className="font-inter text-sm text-dirkx-text-secondary leading-relaxed mb-4">
                  {entry.content}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={12} className="text-dirkx-text-secondary/40" />
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-dirkx-bg-secondary font-mono text-xs text-dirkx-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* View All Link */}
            <button className="w-full glass-panel p-4 text-center hover:border-dirkx-cyan/30 transition-colors group">
              <span className="font-mono text-sm text-dirkx-text-secondary group-hover:text-dirkx-cyan transition-colors">
                View All Entries
              </span>
              <ArrowRight 
                size={14} 
                className="inline-block ml-2 text-dirkx-text-secondary/40 group-hover:text-dirkx-cyan group-hover:translate-x-1 transition-all" 
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
