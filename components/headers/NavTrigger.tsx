"use client";

import styles from "./header.module.css";

type NavTriggerProps = { isOpen: boolean; onToggle: () => void };

export default function NavTrigger({ isOpen, onToggle }: NavTriggerProps) {
  return (
    <div
      className={`mxd-menu__contain ${styles.triggerWrap}`}
      aria-hidden={isOpen}
      inert={isOpen}
    >
      <button
        id="site-menu-toggle"
        type="button"
        className={`mxd-menu__hamburger ${styles.trigger}`}
        aria-label="Open navigatie"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        tabIndex={isOpen ? -1 : 0}
        onClick={onToggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>
  );
}
