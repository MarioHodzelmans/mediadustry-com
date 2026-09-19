"use client";

import Link from "next/link";
import { useRef } from "react";
import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import TextScramble from "@/components/animations/TextScramble";
import { useLenis } from "@/components/common/LenisContext";
import { useHeaderScrollHidden } from "@/hooks/useHeaderScrollHidden";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import MediadustryMark from "@/components/brand/MediadustryMark";

type Header1Props = {
  initialTheme: "light" | "dark";
};

export default function Header1({ initialTheme }: Header1Props) {
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  useHeaderScrollHidden(headerRef, lenis);
  return (
    <CommonLoadAnimation>
      <header
        id="header"
        ref={headerRef}
        className="mxd-header"
      >
        <CommonLoadFade index={0}>
          <div className="mxd-header__logo loading-fade">
            <Link className="mxd-logo" href={`/`}>
              <MediadustryMark className="mxd-logo__image" />
              <div className="mxd-logo__text">
                <TextScramble className="mxd-scramble">MEDIADUSTRY</TextScramble>
              </div>
            </Link>
          </div>
        </CommonLoadFade>
        <CommonLoadFade index={1}>
          <div className="mxd-header__controls loading-fade">
            <ThemeSwitcher initialTheme={initialTheme} />
          </div>
        </CommonLoadFade>
      </header>
    </CommonLoadAnimation>
  );
}
