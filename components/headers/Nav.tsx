"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MediadustryMark from "@/components/brand/MediadustryMark";
import ArrowIcon from "@/components/brand/ArrowIcon";

type NavProps = { isOpen: boolean; onClose: () => void };

export default function Nav({ isOpen, onClose }: NavProps) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/#werk", label: "Werk", active: pathname.startsWith("/werk") },
    { href: "/#diensten", label: "Diensten", active: false },
    {
      href: "/contact",
      label: "Contact",
      active: pathname.startsWith("/contact"),
    },
  ];

  return (
    <div
      id="site-menu"
      className="md-site-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      hidden={!isOpen}
    >
      <div className="md-menu-top">
        <Link
          href="/"
          className="md-menu-logo"
          onClick={onClose}
          aria-label="MEDIADUSTRY — naar de homepage"
        >
          <MediadustryMark />
          <span>MEDIADUSTRY</span>
        </Link>
        <button
          type="button"
          className="md-menu-close"
          onClick={onClose}
          aria-label="Menu sluiten"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="m5 5 14 14M19 5 5 19"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div className="md-menu-columns">
        <nav aria-labelledby="site-menu-title">
          <h2 id="site-menu-title" className="md-visually-hidden">
            Hoofdmenu
          </h2>
          <ul className="md-menu-links">
            {links.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span className="md-menu-number">/ 0{index + 1}</span>
                  <span>{item.label}</span>
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside className="md-menu-contact" aria-label="Bedrijfsgegevens">
          <p className="md-menu-intro">
            Strategie, design en development voor digitale vooruitgang.
          </p>
          <div>
            <span>E-mail</span>
            <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
          </div>
          <div>
            <span>KVK</span>
            <p>54271932</p>
          </div>
          <div>
            <span>BTW</span>
            <p>NL062176468B02</p>
          </div>
          <Link href="/privacy" onClick={onClose}>
            Privacy & cookies
          </Link>
        </aside>
      </div>
      <p className="md-menu-copyright">
        © {new Date().getFullYear()} MEDIADUSTRY
      </p>
    </div>
  );
}
