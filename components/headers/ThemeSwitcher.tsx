"use client";

import { useSyncExternalStore } from "react";
import { safeLocalSet } from "@/lib/template/safeStorage";

const STORAGE_KEY = "template.theme";
type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("color-scheme", theme);
}

function subscribe(onChange: () => void) {
  window.addEventListener("mediadustry-theme", onChange);
  return () => window.removeEventListener("mediadustry-theme", onChange);
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("color-scheme") === "dark"
    ? "dark"
    : "light";
}

function getServerTheme(): Theme {
  return "light";
}

type ThemeSwitcherProps = {
  initialTheme?: Theme;
  isPermanent?: boolean;
};

export default function ThemeSwitcher({
  isPermanent = false,
}: ThemeSwitcherProps) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    safeLocalSet(STORAGE_KEY, next);
    document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new Event("mediadustry-theme"));
  };

  const isDark = theme === "dark";

  return (
    <button
      id="color-switcher"
      className={`btn mxd-color-switcher ${isPermanent ? "permanent" : ""}`}
      type="button"
      role="switch"
      aria-label="Donkere weergave"
      aria-checked={isDark}
      onClick={toggle}
    >
      {isDark ? (
        <>
          <span className="switcher-text">Licht</span>
          <span className="switcher-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              version="1.1"
              viewBox="0 0 18 18"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M8,0h2v2h-2V0ZM2,2h2v2h-2v-2ZM14,2h2v2h-2v-2ZM6,4h6v2h2v6h-2v2h-6v-2h-2v-6h2v-2ZM0,8h2v2H0v-2ZM16,8h2v2h-2v-2ZM2,14h2v2h-2v-2ZM14,14h2v2h-2v-2ZM8,16h2v2h-2v-2Z" />
            </svg>
          </span>
        </>
      ) : (
        <>
          <span className="switcher-text">Donker</span>
          <span className="switcher-icon night">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              version="1.1"
              viewBox="0 0 18 18"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M7.7,0h7.7v2.6h-2.6v2.6h-2.6v7.7h2.6v2.6h2.6v2.6h-7.7v-2.6h-2.6v-2.6h-2.6v-7.7h2.6v-2.6h2.6V0Z" />
            </svg>
          </span>
        </>
      )}
    </button>
  );
}
