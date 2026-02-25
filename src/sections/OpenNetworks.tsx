import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Radio, 
  FileText, 
  Wrench, 
  Network, 
  Database, 
  Users,
  ExternalLink,
  LockOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const networkNodes = [
  {
    id: 'media',
    label: 'MEDIA',
    icon: Radio,
    description: 'Podcasts, newsletters, and live feeds',
    resources: [
      { name: 'Bankless', url: '#', type: 'Podcast' },
      { name: 'Unchained', url: '#', type: 'Podcast' },
      { name: 'The Defiant', url: '#', type: 'Newsletter' },
      { name: 'Week in Ethereum', url: '#', type: 'Newsletter' },
    ],
  },
  {
    id: 'research',
    label: 'RESEARCH',
    icon: FileText,
    description: 'Papers, protocols, and technical docs',
    resources: [
      { name: 'Ethereum Whitepaper', url: '#', type: 'Paper' },
      { name: 'Bitcoin Paper', url: '#', type: 'Paper' },
      { name: 'a16z crypto', url: '#', type: 'Research' },
      { name: 'Messari Reports', url: '#', type: 'Analysis' },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    icon: Wrench,
    description: 'Converters, calculators, and APIs',
    resources: [
      { name: 'Etherscan', url: '#', type: 'Explorer' },
      { name: 'Dune Analytics', url: '#', type: 'Analytics' },
      { name: 'DeFiLlama', url: '#', type: 'Data' },
      { name: 'CoinGecko API', url: '#', type: 'API' },
    ],
  },
  {
    id: 'protocols',
    label: 'PROTOCOLS',
    icon: Network,
    description: 'Open protocols and standards',
    resources: [
      { name: 'Ethereum', url: '#', type: 'L1' },
      { name: 'IPFS', url: '#', type: 'Storage' },
      { name: 'Lens Protocol', url: '#', type: 'Social' },
      { name: 'Uniswap', url: '#', type: 'DEX' },
    ],
  },
  {
    id: 'data',
    label: 'DATA',
    icon: Database,
    description: 'Open datasets and archives',
    resources: [
      { name: 'Glassnode', url: '#', type: 'On-chain' },
      { name: 'The Graph', url: '#', type: 'Indexing' },
      { name: 'Chainlink', url: '#', type: 'Oracle' },
      { name: 'Arweave', url: '#', type: 'Storage' },
    ],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    icon: Users,
    description: 'Forums, chats, and DAOs',
    resources: [
      { name: 'Ethereum Magicians', url: '#', type: 'Forum' },
      { name: 'ETHResearch', url: '#', type: 'Forum' },
      { name: 'Snapshot', url: '#', type: 'Governance' },
      { name: 'Discord Servers', url: '#', type: 'Chat' },
    ],
  },
];

export default function OpenNetworks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const orbit = orbitRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !orbit || !cards) return;

    const cardElements = cards.querySelectorAll('.network-card');
    const lines = orbit.querySelectorAll('.orbit-line');
    const nodes = orbit.querySelectorAll('.orbit-node');

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { y: '4vh', opacity: 0 },
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

      // Orbit diagram animation
      gsap.fromTo(orbit,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Lines draw animation
      lines.forEach((line, index) => {
        gsap.fromTo(line,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: 0.3 + index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Nodes pop animation
      gsap.fromTo(nodes,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(cardElements,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
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
      className="relative w-full min-h-screen bg-dirkx-bg-secondary dot-grid-light py-[10vh] overflow-hidden"
    >
      <div className="px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <LockOpen size={20} className="text-dirkx-cyan" />
            <h2 className="font-space text-4xl md:text-5xl font-light tracking-tight text-dirkx-text">
              OPEN NETWORKS
            </h2>
          </div>
          <p className="font-inter text-lg text-dirkx-text-secondary max-w-2xl">
            A living index of free media, research archives, and open protocols. 
            No paywalls. No noise.
          </p>
        </div>

        {/* Orbit Diagram */}
        <div ref={orbitRef} className="relative h-[300px] mb-12 hidden md:block">
          <svg
            viewBox="0 0 800 300"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Center Node */}
            <g className="orbit-node">
              <circle cx="400" cy="150" r="40" fill="rgba(0, 240, 255, 0.1)" stroke="#00F0FF" strokeWidth="1" />
              <text x="400" y="155" textAnchor="middle" fill="#00F0FF" fontSize="12" fontFamily="IBM Plex Mono">
                NETWORKS
              </text>
            </g>

            {/* Satellite Nodes and Lines */}
            {networkNodes.map((node, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = 120;
              const x = 400 + Math.cos(angle) * radius;
              const y = 150 + Math.sin(angle) * radius;

              return (
                <g key={node.id}>
                  {/* Connection Line */}
                  <line
                    x1="400"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="rgba(0, 240, 255, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    className="orbit-line"
                  />
                  {/* Node */}
                  <g className="orbit-node">
                    <circle cx={x} cy={y} r="30" fill="rgba(11, 15, 28, 0.8)" stroke="#00F0FF" strokeWidth="1" />
                    <text x={x} y={y + 5} textAnchor="middle" fill="#F2F5FA" fontSize="10" fontFamily="IBM Plex Mono">
                      {node.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Network Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {networkNodes.map((node) => {
            const Icon = node.icon;
            
            return (
              <div
                key={node.id}
                className="network-card glass-panel corner-brackets corner-brackets-bottom p-5 hover:border-dirkx-cyan/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded bg-dirkx-cyan/10 flex items-center justify-center">
                    <Icon size={18} className="text-dirkx-cyan" />
                  </div>
                  <div>
                    <h3 className="font-space text-sm font-medium text-dirkx-text tracking-wider">
                      {node.label}
                    </h3>
                    <p className="font-mono text-xs text-dirkx-text-secondary">
                      {node.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  {node.resources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.url}
                      className="flex items-center justify-between p-2 rounded bg-dirkx-bg-secondary/50 hover:bg-dirkx-bg-secondary transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-dirkx-text group-hover:text-dirkx-cyan transition-colors">
                          {resource.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-dirkx-text-secondary/60">
                          {resource.type}
                        </span>
                        <ExternalLink size={12} className="text-dirkx-text-secondary/40 group-hover:text-dirkx-cyan transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-8 glass-panel p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-mono text-2xl text-dirkx-cyan">24</p>
              <p className="font-mono text-xs text-dirkx-text-secondary">Media Sources</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-dirkx-cyan">156</p>
              <p className="font-mono text-xs text-dirkx-text-secondary">Research Papers</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-dirkx-cyan">48</p>
              <p className="font-mono text-xs text-dirkx-text-secondary">Open Tools</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-dirkx-cyan">12</p>
              <p className="font-mono text-xs text-dirkx-text-secondary">Protocols</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
