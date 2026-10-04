import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/brand/ArrowIcon";
import SiteFooter from "@/components/footers/SiteFooter";
import styles from "@/components/home/real-work-home.module.css";
export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};
export default function NotFoundPage() {
  return (
    <>
      <main className={styles.page} id="main-content">
        <section className={styles.cta} style={{ paddingTop: "12rem" }}>
          <p className={styles.eyebrow}>404 · Pagina niet gevonden</p>
          <h1 className={styles.heroTitle}>Hier loopt het even dood.</h1>
          <p>
            Deze pagina bestaat niet of is verplaatst. Ga terug naar de homepage
            of vertel ons wat je zoekt.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/">
              Naar de homepage <ArrowIcon />
            </Link>
            <Link className={styles.secondaryAction} href="/contact">
              Neem contact op <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
