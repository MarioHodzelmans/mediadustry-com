"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MediadustryMark from "@/components/brand/MediadustryMark";
import styles from "./nav.module.css";
import headerStyles from "./header.module.css";

type NavProps = { isOpen: boolean; onClose: () => void };

export default function Nav({ isOpen, onClose }: NavProps) {
  const pathname = usePathname();
  const item = (
    href: string,
    number: string,
    label: string,
    active = false,
  ) => {
    const content = (
      <>
        <span
          className={`main-menu__number ${styles.number}`}
          aria-hidden="true"
        >
          / {number}
        </span>
        <span
          className={`main-menu__caption ${styles.caption}${href === "/concept/alex-kamsma-parket" ? ` ${styles.proposalCaption}` : ""}`}
        >
          {label}
        </span>
      </>
    );
    return (
      <li
        className={`main-menu__item ${styles.item}${active ? ` main-menu__item--current ${styles.current}` : ""}`}
      >
        {href === "/" || href.startsWith("/#") ? (
          <a
            className={`main-menu__link ${styles.link}`}
            href={href}
            onClick={onClose}
            aria-current={active ? "page" : undefined}
          >
            {content}
          </a>
        ) : (
          <Link
            className={`main-menu__link ${styles.link}`}
            href={href}
            prefetch={false}
            onClick={onClose}
            aria-current={active ? "page" : undefined}
          >
            {content}
          </Link>
        )}
      </li>
    );
  };

  return (
    <div
      id="site-menu"
      className={`mxd-menu ${styles.menu}${isOpen ? ` mxd-menu--open ${styles.open}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Hoofdnavigatie"
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className={`mxd-menu__overlay ${styles.overlay}`}
        data-lenis-prevent=""
      >
        <button
          type="button"
          className={`${headerStyles.trigger} ${styles.close}`}
          onClick={onClose}
          aria-label="Menu sluiten"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m5 5 14 14M19 5 5 19" />
          </svg>
        </button>
        <div className={`mxd-menu__logo ${styles.logoWrap}`}>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The homepage is served as standalone HTML. */}
          <a
            href="/"
            className={`menu-logo ${headerStyles.logo} ${styles.logo}`}
            onClick={onClose}
            aria-label="MEDIADUSTRY — home"
          >
            <MediadustryMark
              className={`menu-logo__image ${headerStyles.mark}`}
            />
            <span className={`menu-logo__text ${headerStyles.wordmark}`}>
              MEDIADUSTRY
            </span>
          </a>
        </div>
        <div className={`mxd-menu__inner ${styles.inner}`}>
          <div className={`mxd-menu__caption ${styles.intro}`}>
            <p>
              Strategie, design en development
              <br />
              voor digitale vooruitgang.
            </p>
          </div>
          <nav
            className={`mxd-menu__left ${styles.navigation}`}
            aria-label="Pagina’s"
          >
            <ul
              id="main-menu"
              className={`main-menu__accordion ${styles.list}`}
            >
              {item("/", "01", "Home", pathname === "/")}
              {item("/#werk", "02", "Werk", pathname.startsWith("/werk"))}
              {item("/#diensten", "03", "Diensten")}
              {item(
                "/concept/alex-kamsma-parket",
                "04",
                "Websitevoorstel",
                pathname === "/concept/alex-kamsma-parket",
              )}
              {item(
                "/contact",
                "05",
                "Contact",
                pathname === "/contact" || pathname.startsWith("/contact/"),
              )}
            </ul>
          </nav>
          <div
            className={`mxd-menu__right ${styles.details}`}
            aria-label="Bedrijfsgegevens"
          >
            <div className={`menu-contact ${styles.contact}`}>
              <div className={`menu-contact__item ${styles.contactItem}`}>
                <span className={`menu-contact__label ${styles.label}`}>
                  E-mail
                </span>
                <a
                  className={`menu-contact__value ${styles.value}`}
                  href="mailto:info@mediadustry.com"
                >
                  info@mediadustry.com
                </a>
              </div>
              <div className={`menu-contact__item ${styles.contactItem}`}>
                <span className={`menu-contact__label ${styles.label}`}>
                  Coördinaten
                </span>
                <span className={`menu-contact__value ${styles.value}`}>
                  50.8824° N · 5.9241° E
                </span>
              </div>
              <div className={`menu-contact__item ${styles.contactItem}`}>
                <span className={`menu-contact__label ${styles.label}`}>
                  KVK
                </span>
                <span className={`menu-contact__value ${styles.value}`}>
                  54271932
                </span>
              </div>
              <div className={`menu-contact__item ${styles.contactItem}`}>
                <span className={`menu-contact__label ${styles.label}`}>
                  BTW
                </span>
                <span className={`menu-contact__value ${styles.value}`}>
                  NL062176468B02
                </span>
              </div>
            </div>
          </div>
          <div className={`mxd-menu__footer ${styles.footer}`}>
            <p>© {new Date().getFullYear()} MEDIADUSTRY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
