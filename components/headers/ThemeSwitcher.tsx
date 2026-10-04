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
      aria-label="Donker thema"
      aria-checked={isDark}
      onClick={toggle}
    >
      <span className={`switcher-text ${styles.themeText}`}>
        {isDark ? "Day" : "Night"}
      </span>
      <span className={`switcher-icon ${styles.themeIcon}`}>
        <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
          <path
            d={
              isDark
                ? "M8,0h2v2h-2V0ZM2,2h2v2h-2v-2ZM14,2h2v2h-2v-2ZM6,4h6v2h2v6h-2v2h-6v-2h-2v-6h2v-2ZM0,8h2v2H0v-2ZM16,8h2v2h-2v-2ZM2,14h2v2h-2v-2ZM14,14h2v2h-2v-2ZM8,16h2v2h-2v-2Z"
                : "M7.7,0h7.7v2.6h-2.6v2.6h-2.6v7.7h2.6v2.6h2.6v2.6h-7.7v-2.6h-2.6v-2.6h-2.6v-7.7h2.6v-2.6h2.6V0Z"
            }
          />
        </svg>
      </span>
    </button>
  );
}
