"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import MediadustryMark from "@/components/brand/MediadustryMark";

type Header1Props = { initialTheme: "light" | "dark" };

export default function Header1({ initialTheme }: Header1Props) {
  return (
    <header id="header" className="mxd-header">
      <div className="mxd-header__logo">
        <Link className="mxd-logo" href="/" aria-label="MEDIADUSTRY home">
          <MediadustryMark className="mxd-logo__image" />
          <div className="mxd-logo__text">MEDIADUSTRY</div>
        </Link>
      </div>
      <div className="mxd-header__controls">
        <Link className="btn mxd-header__link slide-right" href="/contact" aria-label="Contact opnemen">
          <span className="btn-caption">Contact</span>
          <i aria-hidden="true"><svg viewBox="0 0 18 18"><path d="M3.1,15.6h2.4v2.4h-2.4v-2.4ZM10.2,18h2.4v-2.4h-2.4v2.4ZM14.9,4.7H5.5V0H.8v2.4h2.4v11.8h9.4v-2.4h-7.1v-4.7h9.4v2.4h2.4v-4.7h-2.4ZM12.5,11.8h2.4v-2.4h-2.4v2.4Z" /></svg></i>
        </Link>
        <ThemeSwitcher initialTheme={initialTheme} />
      </div>
    </header>
  );
}
