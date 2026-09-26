"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TextScramble from "@/components/animations/TextScramble";
import MediadustryMark from "@/components/brand/MediadustryMark";

type NavProps = { isOpen: boolean; onClose: () => void };

export default function Nav({ isOpen, onClose }: NavProps) {
  const pathname = usePathname();
  const homeIsActive = pathname === "/";
  const workIsActive = pathname.startsWith("/werk");
  const contactIsActive = pathname === "/contact" || pathname.startsWith("/contact/");
  const item = (href: string, number: string, label: string, active = false) => (
    <li className={`main-menu__item${active ? " main-menu__item--current" : ""}`}>
      <Link className="main-menu__link" href={href} onClick={onClose} tabIndex={isOpen ? 0 : -1} aria-current={active ? "page" : undefined}>
        <span className="main-menu__number">/ {number}</span><span className="main-menu__caption">{label}</span>
      </Link>
      <div className="main-menu__divider divider-bottom" />
    </li>
  );

  return (
    <nav id="site-menu" className={`mxd-menu ${isOpen ? "mxd-menu--open" : ""}`} aria-hidden={!isOpen}>
      <button className="mxd-menu__backdrop" onClick={onClose} aria-label="Menu sluiten" tabIndex={isOpen ? 0 : -1} />
      <div className="mxd-menu__overlay"><div className="mxd-menu__content" data-lenis-prevent="">
        <div className="mxd-menu__logo">
          <Link href="/" className="menu-logo" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
            <MediadustryMark className="menu-logo__image" /><div className="menu-logo__text"><span>MEDIADUSTRY</span></div>
          </Link>
        </div>
        <div className="mxd-menu__media"><div className="menu-media__wrapper"><div className="mxd-video-poster" style={{ backgroundImage: 'url("/video/900x1280_menu.webp")' }} aria-hidden="true" /></div></div>
        <div className="mxd-menu__navigation"><div className="mxd-menu__inner">
          <div className="mxd-menu__shadow shadow-top" />
          <div className="mxd-menu__caption"><p>Strategie, design en development<br />voor digitale vooruitgang.</p></div>
          <div className="mxd-menu__left"><div className="main-menu"><div className="main-menu__content">
            <ul id="main-menu" className="main-menu__accordion">
              <li aria-hidden="true"><div className="main-menu__divider divider-top" /></li>
              {item("/", "01", "Home", homeIsActive)}
              {item("/#werk", "02", "Werk", workIsActive)}
              {item("/#diensten", "03", "Diensten")}
              {item("/contact", "04", "Contact", contactIsActive)}
            </ul>
          </div></div></div>
          <div className="mxd-menu__right"><div className="menu-contact" aria-label="Bedrijfsgegevens">
            <div className="menu-contact__item"><span className="menu-contact__label">E-mail</span><a className="menu-contact__value" href="mailto:info@mediadustry.com" tabIndex={isOpen ? 0 : -1}><TextScramble className="mxd-scramble">info@mediadustry.com</TextScramble></a></div>
            <div className="menu-contact__item"><span className="menu-contact__label">Coördinaten</span><span className="menu-contact__value md-coordinates">50.8824° N · 5.9241° E</span></div>
            <div className="menu-contact__item"><span className="menu-contact__label">KVK</span><span className="menu-contact__value">54271932</span></div>
            <div className="menu-contact__item"><span className="menu-contact__label">BTW</span><span className="menu-contact__value">NL062176468B02</span></div>
          </div></div>
          <div className="mxd-menu__footer"><p>© {new Date().getFullYear()} MEDIADUSTRY</p></div>
        </div></div>
      </div></div>
    </nav>
  );
}
