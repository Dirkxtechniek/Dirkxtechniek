import { useClock } from '../hooks/useClock';

export default function PersistentUI() {
  const { utcTime } = useClock();

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-[6vw] py-4 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto">
          <span className="font-space text-lg font-medium tracking-tight text-dirkx-text hover:text-dirkx-cyan transition-colors cursor-pointer">
            DIRKX
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-dirkx-success animate-pulse" />
          <span className="font-mono text-xs text-dirkx-text-secondary tracking-wider">
            NODE v2.7 • ONLINE
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-[6vw] py-4 flex items-center justify-between pointer-events-none">
        {/* UTC Clock */}
        <div className="font-mono text-xs text-dirkx-text-secondary tracking-wider">
          UTC {utcTime}
        </div>

        {/* Coordinates */}
        <div className="hidden md:flex items-center gap-4">
          <span className="font-mono text-xs text-dirkx-text-secondary">
            LAT 52.3676° N
          </span>
          <span className="font-mono text-xs text-dirkx-text-secondary">
            LNG 4.9041° E
          </span>
        </div>
      </div>
    </>
  );
}
