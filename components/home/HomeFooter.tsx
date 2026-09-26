import Link from "next/link";
import styles from "./home-footer.module.css";

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <nav aria-label="Footernavigatie">
          <Link href="/" prefetch={false}>Home</Link>
          <Link href="/contact" prefetch={false}>Contact</Link>
        </nav>
        <div className={styles.details}>
          <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
          <span>50.8824° N · 5.9241° E</span>
          <span>KVK 54271932 · BTW NL062176468B02</span>
        </div>
      </div>
      <p className={styles.wordmark}>MEDIADUSTRY</p>
      <div className={styles.bottom}>
        <span>Strategie · design · development</span>
        <span>© {new Date().getFullYear()} MEDIADUSTRY</span>
      </div>
    </footer>
  );
}
