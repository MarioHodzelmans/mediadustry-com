import Link from "next/link";
import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import MediadustryMark from "@/components/brand/MediadustryMark";

export default function Header1() {
  return (
    <header id="header" className="mxd-header md-site-header">
      <Link
        className="mxd-logo"
        href="/"
        aria-label="MEDIADUSTRY — naar de homepage"
      >
        <MediadustryMark className="mxd-logo__image" />
        <span className="mxd-logo__text">MEDIADUSTRY</span>
      </Link>
      <div className="mxd-header__controls">
        <Link href="/contact" className="md-header-contact">
          Start een project
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
