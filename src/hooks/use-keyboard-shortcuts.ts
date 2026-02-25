import { useEffect, useCallback } from "react";
import { useUIStore } from "@/store/ui-store";

export function useKeyboardShortcuts() {
  const { toggleCommandPalette, setActiveModule } = useUIStore();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        toggleCommandPalette();
      }

      if (event.key === "Escape") {
        const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore.getState();
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false);
        }
      }

      if (event.altKey) {
        switch (event.key) {
          case "1":
            event.preventDefault();
            setActiveModule("dashboard");
            break;
          case "2":
            event.preventDefault();
            setActiveModule("markets");
            break;
          case "3":
            event.preventDefault();
            setActiveModule("log");
            break;
          case "4":
            event.preventDefault();
            setActiveModule("networks");
            break;
          case "5":
            event.preventDefault();
            setActiveModule("tools");
            break;
          case "6":
            event.preventDefault();
            setActiveModule("status");
            break;
        }
      }
    },
    [toggleCommandPalette, setActiveModule]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}