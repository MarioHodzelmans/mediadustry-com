import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getShowcases } from "@/content/showcases";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Cases van MEDIADUSTRY — strategie, design en development.",
};

export default function WorkPage() {
  const cases = getShowcases("case");
  return (
    <main className={`${styles.page} showcase-page`}>
      <nav><Link href="/">MEDIADUSTRY</Link><Link href="/contact">Start een project</Link></nav>
      <header><p>Selected work / 2026</p><h1>Werk dat digitaal vooruitgaat.</h1></header>
      <section aria-label="Portfolio cases">
        {cases.map((item, index) => (
          <Link href={`/work/${item.slug}`} key={item.slug} className={styles.card}>
            <div><Image src={item.cover} alt="" fill priority={index === 0} sizes="100vw" /></div>
            <p>{item.client}</p><h2>{item.title}</h2><span>{item.category} · {item.year}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
