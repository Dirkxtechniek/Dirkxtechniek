import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isBooting: boolean;
  bootComplete: boolean;
  setBooting: (value: boolean) => void;
  setBootComplete: (value: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (value: boolean) => void;
  toggleCommandPalette: () => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  uptime: number;
  packetsSent: number;
  networkIntegrity: number;
  trackersBlocked: number;
  systemTemp: number;
  incrementUptime: () => void;
  updateTelemetry: () => void;
  lastMarketUpdate: number;
  setLastMarketUpdate: (timestamp: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isBooting: true,
      bootComplete: false,
      setBooting: (value: boolean) => set({ isBooting: value }),
      setBootComplete: (value: boolean) => set({ bootComplete: value }),
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state: UIState) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (value: boolean) => set({ commandPaletteOpen: value }),
      toggleCommandPalette: () =>
        set((state: UIState) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      activeModule: "dashboard",
      setActiveModule: (module: string) => set({ activeModule: module }),
      uptime: 0,
      packetsSent: 1247893,
      networkIntegrity: 99.97,
      trackersBlocked: 4521,
      systemTemp: 42,
      incrementUptime: () => set((state: UIState) => ({ uptime: state.uptime + 1 })),
      updateTelemetry: () =>
        set((state: UIState) => ({
          packetsSent: state.packetsSent + Math.floor(Math.random() * 50),
          networkIntegrity: Math.min(
            100,
            Math.max(99, state.networkIntegrity + (Math.random() - 0.5) * 0.1)
          ),
          trackersBlocked:
            state.trackersBlocked + Math.floor(Math.random() * 3),
          systemTemp: Math.min(
            70,
            Math.max(35, state.systemTemp + (Math.random() - 0.5) * 2)
          ),
        })),
      lastMarketUpdate: Date.now(),
      setLastMarketUpdate: (timestamp: number) => set({ lastMarketUpdate: timestamp }),
    }),
    {
      name: "dirkx-ui-store",
      partialize: (state: UIState) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        activeModule: state.activeModule,
      }),
    }
  )
);