"use client";

import Link from "next/link";
import { useRef } from "react";
import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import TextScramble from "@/components/animations/TextScramble";
import { useLenis } from "@/components/common/LenisContext";
import { useHeaderScrollHidden } from "@/hooks/useHeaderScrollHidden";
import MediadustryMark from "@/components/brand/MediadustryMark";

type Header1Props = {
  initialTheme: "light" | "dark";
};

export default function Header1({ initialTheme }: Header1Props) {
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  useHeaderScrollHidden(headerRef, lenis);
  return (
    <header id="header" ref={headerRef} className="mxd-header">
      <div className="mxd-header__logo">
        <Link className="mxd-logo" href={`/`} prefetch={false}>
          <MediadustryMark className="mxd-logo__image" />
          <div className="mxd-logo__text">
            <TextScramble className="mxd-scramble">MEDIADUSTRY</TextScramble>
          </div>
        </Link>
      </div>
      <div className="mxd-header__controls">
        <ThemeSwitcher initialTheme={initialTheme} />
      </div>
    </header>
  );
}
