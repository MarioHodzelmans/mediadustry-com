import Link from "next/link";
import { notFound } from "next/navigation";
import { quoteConfig } from "@/lib/quotes/config";
import styles from "../offerte.module.css";

export const metadata = {
  title: "Offertevoorwaarden — MEDIADUSTRY",
  robots: { index: false, follow: false, nocache: true },
};

export default function TermsPage() {
  if (!quoteConfig.termsText || !quoteConfig.termsVersion) notFound();
  return (
    <main className={styles.offer}>
      <article className={styles.sheet}>
        <header className={styles.masthead}>
          <Link className={styles.wordmark} href="/offerte/dietwiej">
            MEDIA<span>DUSTRY</span>
          </Link>
          <span className={styles.documentLabel}>
            Voorwaarden · {quoteConfig.termsVersion}
          </span>
        </header>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Gastrobar Die Twie</p>
          <h1>
            Toepasselijke <span>offertevoorwaarden</span>
          </h1>
          <div className={styles.termsText}>{quoteConfig.termsText}</div>
          <p>
            <Link href="/offerte/dietwiej">Terug naar de offerte</Link>
          </p>
        </section>
      </article>
    </main>
  );
}
