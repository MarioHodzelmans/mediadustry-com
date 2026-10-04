import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/brand/ArrowIcon";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import styles from "@/app/funnel.module.css";

const description =
  "Bespreek je website, positionering of digitaal project met Mario van MEDIADUSTRY. Persoonlijk contact en een duidelijke vervolgstap.";
export const metadata: Metadata = {
  title: "Contact — bespreek je digitale project",
  description,
  alternates: { canonical: "https://www.mediadustry.com/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    title: "Contact | MEDIADUSTRY",
    description,
    url: "https://www.mediadustry.com/contact",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | MEDIADUSTRY",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Persoonlijk contact · MEDIADUSTRY</p>
        <h1>Maak je volgende stap concreet.</h1>
        <p className={styles.intro}>
          Een nieuwe website, een scherper verhaal of een digitaal idee? Vertel
          waar je staat. Mario denkt met je mee over een passende aanpak.
        </p>
      </header>
      <div className={styles.grid}>
        <section
          className={styles.formSection}
          aria-labelledby="vertel-je-vraag"
        >
          <h2 id="vertel-je-vraag">Vertel kort over je vraag.</h2>
          <p className={styles.formIntro}>
            Vul de verplichte velden in. De aanvullende keuzes helpen om meteen
            gericht met je mee te denken.
          </p>
          <ContactForm
            source="contact"
            available={Boolean(
              process.env.RESEND_API_KEY &&
              process.env.CONTACT_FROM_EMAIL &&
              process.env.UPSTASH_REDIS_REST_URL &&
              process.env.UPSTASH_REDIS_REST_TOKEN,
            )}
          />
        </section>
        <aside className={styles.aside} aria-labelledby="direct-contact">
          <section className={styles.card}>
            <p className={styles.eyebrow}>Kort en direct</p>
            <h2 id="direct-contact">Eén aanspreekpunt.</h2>
            <p>
              Je spreekt met Mario Hodzelmans, van de eerste vraag tot
              strategie, ontwerp en realisatie.
            </p>
            <a className={styles.textLink} href="mailto:info@mediadustry.com">
              info@mediadustry.com <ArrowIcon />
            </a>
            <p className={styles.companyDetails}>
              MEDIADUSTRY
              <br />
              KVK 54271932
              <br />
              BTW NL062176468B02
            </p>
          </section>
          <section
            className={styles.secondaryCard}
            aria-labelledby="eerst-inzicht"
          >
            <h2 id="eerst-inzicht">Eerst inzicht in je website?</h2>
            <p>
              Vraag een gratis persoonlijke website-check aan en krijg een
              eerste beeld van je verbeterkansen.
            </p>
            <Link href="/website-check" className={styles.textLink}>
              Vraag een website-check aan <ArrowIcon />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
