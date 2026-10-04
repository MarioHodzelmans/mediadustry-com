import Link from "next/link";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="MEDIADUSTRY, naar de homepage"
        >
          MEDIADUSTRY
        </Link>
        <a href="mailto:info@mediadustry.com" className={styles.email}>
          info@mediadustry.com
        </a>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} MEDIADUSTRY · KVK 54271932</p>
        <nav aria-label="Footernavigatie">
          <Link href="/#werk">Werk</Link>
          <Link href="/website-check">Website-check</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacyverklaring</Link>
        </nav>
      </div>
    </footer>
  );
}
