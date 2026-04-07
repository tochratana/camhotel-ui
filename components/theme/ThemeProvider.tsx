"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (nextTheme: Theme) => void;
  toggleTheme: (e?: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_CHANGED_EVENT = "camhotel-theme-changed";

function getPreferredTheme(): Theme {
  const storedTheme = localStorage.getItem("theme") as Theme | null;

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToThemeChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGED_EVENT, callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(
    subscribeToThemeChanges,
    getPreferredTheme,
    () => "light"
  );
  const isAnimating = useRef(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const applyTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGED_EVENT));
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
  }, [applyTheme]);

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    if (isAnimating.current) return;
    
    const newTheme = theme === "light" ? "dark" : "light";

    // If the View Transition API is supported, use it for a smooth diagonal sweep
    if (document.startViewTransition && e) {
      isAnimating.current = true;

      // Get click coordinates (from the toggle button)
      const x = e.clientX;
      const y = e.clientY;

      // Calculate the max radius needed to cover the entire screen
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        applyTheme(newTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });

      transition.finished.then(() => {
        isAnimating.current = false;
      });
    } else {
      // Fallback: no animation
      applyTheme(newTheme);
    }
  }, [applyTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
