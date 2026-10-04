import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowIcon from "@/components/brand/ArrowIcon";
import { getRealCase, realCases } from "@/data/realCases";
import styles from "./case.module.css";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return realCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getRealCase(slug);
  if (!item) return {};

  return {
    title: `${item.title} — case`,
    description: item.summary,
    alternates: { canonical: `/werk/${item.slug}` },
    openGraph: {
      title: `${item.title} — case | MEDIADUSTRY`,
      description: item.summary,
      url: `https://mediadustry.com/werk/${item.slug}`,
      images: [
        { url: item.image, width: 1440, height: 1000, alt: item.imageAlt },
      ],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getRealCase(slug);
  if (!item) notFound();

  const currentIndex = realCases.findIndex((entry) => entry.slug === item.slug);
  const next = realCases[(currentIndex + 1) % realCases.length];

  return (
    <main
      className={`${styles.page} md-case-page`}
      style={{ "--case-accent": item.accent } as React.CSSProperties}
    >
      <section className={styles.hero}>
        <Link href="/#werk" className={styles.backLink}>
          <ArrowIcon /> Alle projecten
        </Link>
        <p className={styles.eyebrow}>
          {item.sector} · {item.location} · {item.year}
        </p>
        <h1>{item.title}</h1>
        <p className={styles.statement}>{item.statement}</p>
        <ul className={styles.services} aria-label="Geleverde diensten">
          {item.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      <div className={styles.visual}>
        <div className={styles.browserBar} aria-hidden="true">
          <span />
          <span />
          <span />
          <p>{new URL(item.liveUrl).hostname}</p>
        </div>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <section className={styles.story} aria-label="Casebeschrijving">
        <article>
          <p className={styles.number}>01 · De vraag</p>
          <h2>Een duidelijke digitale positie.</h2>
          <p>{item.challenge}</p>
        </article>
        <article>
          <p className={styles.number}>02 · De aanpak</p>
          <h2>Strategie zichtbaar gemaakt.</h2>
          <p>{item.approach}</p>
        </article>
        <article>
          <p className={styles.number}>03 · De uitkomst</p>
          <h2>Een website die vertrouwen opbouwt.</h2>
          <p>{item.outcome}</p>
        </article>
      </section>

      <section className={styles.links}>
        <a
          href={item.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.primaryLink}
        >
          Bekijk de live website <ArrowIcon direction="down-right" />
        </a>
        <Link href="/contact" className={styles.secondaryLink}>
          Bespreek een vergelijkbaar project <ArrowIcon />
        </Link>
        {item.slug === "alex-kamsma-design-parket" && (
          <Link
            href="/concept/alex-kamsma-parket"
            className={styles.secondaryLink}
          >
            Bekijk het websitevoorstel <ArrowIcon />
          </Link>
        )}
      </section>

      <Link href={`/werk/${next.slug}`} className={styles.nextCase}>
        <span>Volgende case</span>
        <strong>{next.title}</strong>
        <ArrowIcon />
      </Link>
    </main>
  );
}
