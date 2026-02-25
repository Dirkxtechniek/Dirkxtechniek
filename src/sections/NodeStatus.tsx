import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Mail, Github, Twitter, Globe, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', icon: Github, url: '#' },
  { name: 'Twitter', icon: Twitter, url: '#' },
  { name: 'Website', icon: Globe, url: '#' },
];

export default function NodeStatus() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const statusText = statusTextRef.current;
    const contact = contactRef.current;

    if (!section || !card || !statusText || !contact) return;

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(card,
        { y: '8vh', scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Status text animation
      gsap.fromTo(statusText,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact animation
      gsap.fromTo(contact,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
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
      className="relative w-full min-h-screen bg-dirkx-bg dot-grid py-[10vh] overflow-hidden flex items-center"
    >
      {/* Cyan Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dirkx-cyan/5 rounded-full blur-[100px] pointer-events-none" 
        style={{ animation: 'pulse-glow 6s ease-in-out infinite' }}
      />

      <div className="px-[6vw] w-full">
        {/* Status Card */}
        <div
          ref={cardRef}
          className="max-w-4xl mx-auto glass-panel-strong corner-brackets corner-brackets-bottom p-8 md:p-12"
        >
          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-dirkx-success" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-dirkx-success animate-ping" />
            </div>
            <span className="font-mono text-sm text-dirkx-success tracking-wider">
              NODE ONLINE
            </span>
          </div>

          {/* Main Status Text */}
          <h2
            ref={statusTextRef}
            className="font-space text-4xl md:text-6xl font-light tracking-tight text-dirkx-text text-center mb-6"
          >
            SYSTEM ONLINE
          </h2>

          <p className="font-inter text-lg text-dirkx-text-secondary text-center max-w-xl mx-auto mb-10">
            Node reachable. Latency low. Open to collaboration and interesting problems.
          </p>

          {/* Contact */}
          <div ref={contactRef} className="text-center mb-10">
            <a
              href="mailto:hello@dirkx.systems"
              className="inline-flex items-center gap-3 px-6 py-3 rounded bg-dirkx-cyan/10 border border-dirkx-cyan/30 hover:bg-dirkx-cyan/20 hover:border-dirkx-cyan/50 transition-all group"
            >
              <Mail size={18} className="text-dirkx-cyan" />
              <span className="font-mono text-lg text-dirkx-cyan">hello@dirkx.systems</span>
              <ArrowUpRight 
                size={16} 
                className="text-dirkx-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-12 h-12 rounded bg-dirkx-bg-secondary border border-dirkx-cyan/10 hover:border-dirkx-cyan/30 flex items-center justify-center transition-colors group"
                  title={link.name}
                >
                  <Icon size={20} className="text-dirkx-text-secondary group-hover:text-dirkx-cyan transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-dirkx-cyan" />
            <span className="font-mono text-xs text-dirkx-text-secondary">
              DIRKX SYSTEM NODE v2.7
            </span>
          </div>
          
          <p className="font-mono text-xs text-dirkx-text-secondary/60">
            © 2026 DIRKX SYSTEM NODE. Open systems. Open internet. Open markets.
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-dirkx-text-secondary">
              LAT 52.3676° N
            </span>
            <span className="font-mono text-xs text-dirkx-text-secondary">
              LNG 4.9041° E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
