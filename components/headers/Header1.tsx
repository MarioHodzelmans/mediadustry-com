import ThemeSwitcher from "@/components/headers/ThemeSwitcher";
import MediadustryMark from "@/components/brand/MediadustryMark";
import styles from "./header.module.css";

type Header1Props = { initialTheme?: "light" | "dark" };

export default function Header1({ initialTheme = "light" }: Header1Props) {
  return (
    <header id="header" className={`mxd-header ${styles.header}`}>
      <div className="mxd-header__logo">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The homepage is served as standalone HTML. */}
        <a
          className={`mxd-logo ${styles.logo}`}
          href="/"
          aria-label="MEDIADUSTRY — home"
        >
          <MediadustryMark className={`mxd-logo__image ${styles.mark}`} />
          <span className={`mxd-logo__text ${styles.wordmark}`}>
            MEDIADUSTRY
          </span>
        </a>
      </div>
      <div className={`mxd-header__controls ${styles.controls}`}>
        <ThemeSwitcher initialTheme={initialTheme} />
      </div>
    </header>
  );
}
