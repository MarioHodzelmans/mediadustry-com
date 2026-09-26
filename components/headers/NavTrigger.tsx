"use client";

import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";

type NavTriggerProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function NavTrigger({
  isOpen,
  onToggle,
}: NavTriggerProps) {
  return (
    <CommonLoadAnimation>
      <CommonLoadFade index={0}>
        <div className="mxd-menu__contain loading-fade">
          <div className="mxd-menu__toggle">
            <button
              type="button"
              className={`mxd-menu__hamburger ${isOpen ? "active" : ""}`}
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-controls="site-menu"
              onClick={onToggle}
            >
              <div className="hamburger__line" />
              <div className="hamburger__line" />
            </button>
          </div>
        </div>
      </CommonLoadFade>
    </CommonLoadAnimation>
  );
}
