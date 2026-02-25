import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bootLines = [
  '> mount /dev/node_root … ok',
  '> load modules: net, markets, media, tools … ok',
  '> sync time (NTP) … ok',
  '> handshake: open_networks … ok',
  '> render_surface: canvas_2d … ok',
  '> initialize market feeds … ok',
  '> establish secure connection … ok',
];

export default function BootSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const bootCardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Auto-play boot animation on load
  useEffect(() => {
    const tl = gsap.timeline();

    // Type boot lines sequentially
    bootLines.forEach((_, index) => {
      tl.to({}, {
        duration: 0.08,
        onComplete: () => setVisibleLines(index + 1),
      });
    });

    // Progress bar animation
    tl.to({}, {
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: () => {
        // Flash effect
        gsap.to(progressBarRef.current, {
          backgroundColor: '#00F0FF',
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      },
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll-driven exit animation
  useEffect(() => {
    const section = sectionRef.current;
    const bootCard = bootCardRef.current;
    const scanline = scanlineRef.current;
    const progressBar = progressRef.current;

    if (!section || !bootCard || !scanline || !progressBar) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back
            gsap.set(bootCard, { scale: 1, opacity: 1 });
            gsap.set(progressBar, { opacity: 1 });
            gsap.set(scanline, { x: '-110vw', opacity: 0 });
          },
        },
      });

      // SETTLE phase (0% - 70%): Hold position
      // EXIT phase (70% - 100%)
      scrollTl.fromTo(bootCard,
        { scale: 1, opacity: 1 },
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(progressBar,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Scanline wipe transition
      scrollTl.fromTo(scanline,
        { x: '-110vw', opacity: 0.35 },
        { x: '110vw', opacity: 0, ease: 'power2.inOut' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen bg-dirkx-bg dot-grid overflow-hidden z-10"
    >
      {/* Boot Card */}
      <div
        ref={bootCardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,980px)] h-[min(52vh,420px)] glass-panel corner-brackets corner-brackets-bottom flex flex-col items-center justify-center"
      >
        {/* Boot Lines (Left Side) */}
        <div className="absolute left-8 top-8 space-y-2">
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <p
              key={index}
              className="font-mono text-xs text-dirkx-text-secondary"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Center Logo */}
        <h1 className="font-space text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-dirkx-text">
          DIRKX
        </h1>

        {/* Status Label */}
        <p className="absolute bottom-16 font-mono text-sm text-dirkx-cyan tracking-wider">
          SYSTEM NODE INITIALIZING…
        </p>

        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="absolute bottom-8 left-8 right-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-dirkx-text-secondary">
              boot_sequence
            </span>
            <span className="font-mono text-xs text-dirkx-cyan">
              {progress}%
            </span>
          </div>
          <div className="h-[3px] bg-dirkx-bg-secondary rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-dirkx-cyan transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scanline Transition */}
      <div
        ref={scanlineRef}
        className="absolute left-0 top-0 w-screen h-screen bg-gradient-to-r from-transparent via-dirkx-cyan/20 to-transparent pointer-events-none"
        style={{ transform: 'translateX(-110vw)' }}
      />
    </section>
  );
}
