import type { Metadata } from "next";
import ArrowIcon from "@/components/brand/ArrowIcon";
import NativeFooter3 from "@/components/footers/NativeFooter3";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description: "Ga terug naar de homepage van MEDIADUSTRY.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <>
      <main className={styles.page}>
        <p className={styles.label}>404</p>
        <h1>Deze pagina bestaat niet.</h1>
        <p>Via de homepage vind je ons werk, onze aanpak en contactgegevens.</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The homepage is served as standalone HTML. */}
        <a href="/" className={styles.link}>
          Terug naar de homepage <ArrowIcon />
        </a>
      </main>
      <NativeFooter3 />
    </>
  );
}
