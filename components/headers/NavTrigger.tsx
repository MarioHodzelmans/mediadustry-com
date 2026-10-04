"use client";

type NavTriggerProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function NavTrigger({ isOpen, onToggle }: NavTriggerProps) {
  return (
    <div className="mxd-menu__contain md-menu-trigger">
      <div className="mxd-menu__toggle">
        <button
          type="button"
          className={`mxd-menu__hamburger ${isOpen ? "active" : ""}`}
          id="site-menu-trigger"
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={onToggle}
        >
          <span className="hamburger__line" aria-hidden="true" />
          <span className="hamburger__line" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
