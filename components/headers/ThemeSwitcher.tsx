"use client";

import { useSyncExternalStore } from "react";
import { safeLocalSet } from "@/lib/template/safeStorage";
import styles from "./header.module.css";

const STORAGE_KEY = "template.theme";
type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("color-scheme") === "dark"
    ? "dark"
    : "light";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["color-scheme"],
  });
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === STORAGE_KEY &&
      (event.newValue === "dark" || event.newValue === "light")
    ) {
      document.documentElement.setAttribute("color-scheme", event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

type ThemeSwitcherProps = { initialTheme?: Theme; isPermanent?: boolean };

export default function ThemeSwitcher({
  initialTheme = "light",
  isPermanent = false,
}: ThemeSwitcherProps) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    () => initialTheme,
  );
  const isDark = theme === "dark";
  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("color-scheme", next);
    safeLocalSet(STORAGE_KEY, next);
    document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; samesite=lax${location.protocol === "https:" ? "; secure" : ""}`;
  };

  return (
    <button
      id="color-switcher"
      className={`mxd-color-switcher ${styles.theme} ${isPermanent ? "permanent" : ""}`}
      type="button"
      role="switch"
      aria-label={
        isDark ? "Schakel naar lichte modus" : "Schakel naar donkere modus"
      }
      aria-checked={isDark}
      onClick={toggle}
    >
      <span className={`switcher-text ${styles.themeText}`}>
        {isDark ? "Day" : "Night"}
      </span>
      <span className={`switcher-icon ${styles.themeIcon}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          {isDark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </>
          ) : (
            <path d="M20.4 15.2A8.7 8.7 0 0 1 8.8 3.6 8.8 8.8 0 1 0 20.4 15.2Z" />
          )}
        </svg>
      </span>
    </button>
  );
}
