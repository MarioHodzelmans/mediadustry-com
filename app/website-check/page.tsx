import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import SiteFooter from "@/components/footers/SiteFooter";
import styles from "@/app/funnel.module.css";

const description =
  "Vraag een gratis persoonlijke website-check van MEDIADUSTRY aan. Mario bekijkt je website en geeft een eerste beeld van de verbeterkansen.";
export const metadata: Metadata = {
  title: "Gratis persoonlijke website-check",
  description,
  alternates: { canonical: "https://www.mediadustry.com/website-check" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    title: "Gratis persoonlijke website-check | MEDIADUSTRY",
    description,
    url: "https://www.mediadustry.com/website-check",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis persoonlijke website-check | MEDIADUSTRY",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function WebsiteCheckPage() {
  return (
    <>
      <main id="main-content" className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            Gratis eerste beoordeling · Persoonlijk advies
          </p>
          <h1>Wat kan jouw website beter?</h1>
          <p className={styles.intro}>
            Laat Mario naar je website kijken. Je krijgt een eerste beeld van
            wat al goed werkt en waar je uitstraling, gebruiksgemak en route
            naar contact sterker kunnen worden.
          </p>
          <ul className={styles.benefits} aria-label="Wat je kunt verwachten">
            <li>Persoonlijk bekeken</li>
            <li>Praktische verbeterkansen</li>
            <li>Vrijblijvend</li>
          </ul>
        </header>
        <div className={styles.grid}>
          <section
            className={styles.formSection}
            aria-labelledby="vraag-je-check-aan"
          >
            <h2 id="vraag-je-check-aan">Vraag je website-check aan.</h2>
            <p className={styles.formIntro}>
              De aanvraag is gratis en verplicht je tot niets. Je hoeft je niet
              aan te melden voor e-mailtips om je check te ontvangen.
            </p>
            <ContactForm
              source="website-check"
              available={Boolean(
                process.env.RESEND_API_KEY &&
                process.env.CONTACT_FROM_EMAIL &&
                process.env.UPSTASH_REDIS_REST_URL &&
                process.env.UPSTASH_REDIS_REST_TOKEN,
              )}
            />
          </section>
          <aside className={styles.aside} aria-labelledby="zo-werkt-het">
            <section className={styles.card}>
              <p className={styles.eyebrow}>Van website naar vervolgstap</p>
              <h2 id="zo-werkt-het">Zo werkt het.</h2>
              <ol className={styles.steps}>
                <li>
                  <strong>Deel je website.</strong>
                  <p>
                    Vul je adres en contactgegevens in. Een concrete vraag mag
                    erbij.
                  </p>
                </li>
                <li>
                  <strong>Mario kijkt persoonlijk.</strong>
                  <p>
                    Hij beoordeelt de eerste indruk, duidelijkheid en
                    belangrijkste contactroute.
                  </p>
                </li>
                <li>
                  <strong>Je krijgt een eerste richting.</strong>
                  <p>
                    Je ontvangt per e-mail de verbeterkansen en kunt daarna een
                    vervolgstap bespreken.
                  </p>
                </li>
              </ol>
            </section>
            <p className={styles.asideNote}>
              De check is een persoonlijke eerste beoordeling. Je ontvangt geen
              automatisch scanrapport of volledige technische audit.
            </p>
          </aside>
        </div>
        <section className={styles.faq} aria-labelledby="praktische-vragen">
          <h2 id="praktische-vragen">Praktische vragen.</h2>
          <details>
            <summary>Wat bekijkt Mario?</summary>
            <p>
              De eerste indruk, je verhaal, gebruiksgemak en de route naar een
              aanvraag of contact. Je krijgt concrete aandachtspunten om je
              volgende stap te bepalen.
            </p>
          </details>
          <details>
            <summary>Moet ik me aanmelden voor e-mailtips?</summary>
            <p>
              Nee. De e-mailtips zijn een aparte, optionele keuze. Als je
              daarvoor kiest, bevestig je die aanmelding eerst via e-mail.
              Afmelden kan altijd. In de{" "}
              <Link href="/privacy">privacyverklaring</Link> lees je hoe je
              gegevens worden gebruikt.
            </p>
          </details>
          <details>
            <summary>
              Ik heb nog geen website. Kan ik ook contact opnemen?
            </summary>
            <p>
              Zeker. Gebruik het <Link href="/contact">contactformulier</Link>{" "}
              en vertel over je idee, organisatie of de vraag waar je mee zit.
            </p>
          </details>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
