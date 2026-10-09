import type { Metadata } from "next";
import styles from "./offerte.module.css";
import { Acceptance } from "./acceptance";
import { isAcceptanceReady, quoteContent } from "@/lib/quotes/config";
import { ReservationPreview } from "./reservation-preview";

export const metadata: Metadata = {
  title: "Websitevernieuwing en Microsoft Outlook 365 — Gastrobar Die Twie",
  description:
    "Persoonlijke offerte voor de websitevernieuwing van Gastrobar Die Twie en de inrichting van een extra Outlook 365-e-mailadres.",
  alternates: { canonical: "/offerte/dietwiej" },
  robots: { index: false, follow: false, nocache: true },
};

export function DietwiejOfferPage({ token }: { token?: string }) {
  return (
    <main className={styles.offer}>
      <article className={styles.sheet} aria-labelledby="offer-title">
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            Persoonlijke offerte · Gastrobar Die Twie · 9 oktober 2026
          </p>
          <h1 id="offer-title">
            Websitevernieuwing <span>en Microsoft Outlook 365</span>
          </h1>
          <p className={styles.lead}>{quoteContent.introduction}</p>
          <dl className={styles.projectMeta}>
            <div>
              <dt>Voor</dt>
              <dd>Gastrobar Die Twie</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                <a href="https://www.dietwie.nl/">dietwie.nl</a>
              </dd>
            </div>
            <div>
              <dt>Van</dt>
              <dd>MEDIADUSTRY</dd>
            </div>
          </dl>
        </section>

        <section
          className={styles.auditHighlights}
          aria-labelledby="audit-highlights-title"
        >
          <div className={styles.auditHighlightsHead}>
            <span className={styles.index}>
              DRIE BELANGRIJKE VERBETERPUNTEN
            </span>
            <h2 id="audit-highlights-title">
              Een vernieuwde website die Die Twie recht doet.
            </h2>
          </div>
          <ol>
            <li>
              <strong>Vernieuwing</strong>
              <span>
                Een moderne website met actuele informatie en een heldere
                opbouw.
              </span>
            </li>
            <li>
              <strong>Warmere uitstraling</strong>
              <span>
                Breng de sfeer, gerechten en gastvrijheid van Die Twie beter
                over.
              </span>
            </li>
            <li>
              <strong>Actueel gebruiksgemak</strong>
              <span>
                Maak menukaart, contact en eventueel online reserveren eenvoudig
                bereikbaar.
              </span>
            </li>
          </ol>
        </section>

        <section
          className={styles.previewSection}
          aria-labelledby="preview-title"
        >
          <p className={styles.index}>INTERACTIEF ONTWERPVOORBEELD</p>
          <h2 id="preview-title">Zo kan Die Twie online tot leven komen.</h2>
          <ReservationPreview />
        </section>

        <section className={styles.context}>
          <div className={styles.sectionHeading}>
            <span className={styles.index}>01 / DE KANS</span>
            <h2>Een goed verhaal, helder verteld.</h2>
          </div>
          <div className={styles.contextCopy}>
            <p>{quoteContent.context[0]}</p>
            <p>{quoteContent.context[1]}</p>
          </div>
        </section>

        <section className={styles.scope}>
          <div className={styles.sectionHeading}>
            <span className={styles.index}>02 / VOORSTEL</span>
            <h2>Wat we voor Die Twie vernieuwen.</h2>
          </div>
          <div className={styles.scopeCard}>
            <div className={styles.cardTop}>
              <p>Een uitnodigende online kennismaking met Die Twie.</p>
            </div>
            <ul className={styles.serviceList}>
              {quoteContent.websiteServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p className={styles.reservationNote}>
              <strong>Persoonlijk contact blijft belangrijk.</strong>{" "}
              {quoteContent.reservations}
            </p>
            <section
              className={styles.reservationInsight}
              aria-labelledby="reservation-title"
            >
              <h3 id="reservation-title">
                Online reserveren: een belangrijke kans.
              </h3>
              <p>
                Gasten willen reserveren wanneer het hun uitkomt. Een online
                mogelijkheid naast de telefoon verlaagt de drempel en voorkomt
                dat een geïnteresseerde gast afhaakt wanneer bellen niet past.
              </p>
              <div className={styles.statGrid}>
                <div>
                  <strong>79%</strong>
                  <span>
                    van de reserveringen werd online gemaakt volgens de
                    Restaurant Monitor 2023.
                  </span>
                  <a
                    href={quoteContent.reservationEvidence[0].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    NOS · 2023
                  </a>
                </div>
                <div>
                  <strong>Ruim 80%</strong>
                  <span>
                    online reserveringen in 2024, volgens het platformonderzoek
                    dat OOvB aanhaalt.
                  </span>
                  <a
                    href={quoteContent.reservationEvidence[1].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OOvB · 2024
                  </a>
                </div>
                <div>
                  <strong>77%</strong>
                  <span>
                    vindt het belangrijk een online reservering zelf te kunnen
                    wijzigen of annuleren.
                  </span>
                  <a
                    href={quoteContent.reservationEvidence[2].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lightspeed/Zenchef · 2024
                  </a>
                </div>
              </div>
              <div className={styles.reservationOptions}>
                <h3>Voorselectie uit het kosteloze vooronderzoek</h3>
                <p>{quoteContent.reservationRecommendation}</p>
                <ul>
                  {quoteContent.reservationOptions.map((option) => (
                    <li key={option.name}>
                      <a href={option.url} target="_blank" rel="noreferrer">
                        <strong>{option.name}</strong>
                      </a>
                      <p>{option.description}</p>
                    </li>
                  ))}
                </ul>
                <p>
                  Een directe koppeling met Google heeft de voorkeur: gasten
                  kunnen dan vanuit Google Zoeken en Google Maps reserveren.
                  Telefonisch contact blijft beschikbaar.
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className={styles.outlook}>
          <div className={styles.sectionHeading}>
            <span className={styles.index}>03 / E-MAIL</span>
            <h2>Microsoft Outlook 365</h2>
          </div>
          <div className={styles.outlookGrid}>
            <div>
              <h3>Een extra zakelijk e-mailadres</h3>
              <p>
                {quoteContent.outlookScope.split("facturen@dietwie.nl")[0]}
                <strong>facturen@dietwie.nl</strong>.
              </p>
              <p>
                {quoteContent.outlookConditions.replace(
                  "De vaste prijs van € 100 excl. btw ",
                  "De vaste prijs ",
                )}
              </p>
            </div>
          </div>
          <div className={styles.licenseNote}>
            <span className={styles.dot} aria-hidden="true" />
            <p>
              De licentie voor dit extra e-mailadres loopt via de bestaande
              leverancier en wordt rechtstreeks daar afgenomen.
            </p>
          </div>
          <div
            className={styles.oneTimePrice}
            aria-label="Eenmalige investering"
          >
            <div>
              <span>Websitevernieuwing</span>
              <strong>€ 2.150</strong>
            </div>
            <div>
              <span>Outlook 365-inrichting</span>
              <strong>€ 100</strong>
            </div>
            <div className={styles.oneTimeTotal}>
              <span>Totaal eenmalig</span>
              <strong>€ 2.250</strong>
            </div>
            <div className={styles.hostingPrice}>
              <span>Premium hosting · korting eerste jaar</span>
              <strong>
                − € 300 <small>Eerste hostingjaar inbegrepen</small>
              </strong>
            </div>
            <p>{quoteContent.hosting}</p>
            <p>
              Alle bedragen zijn exclusief btw. De Microsoft 365-licentie kost €
              75 per jaar via de bestaande leverancier. Fotografie en eventuele
              extra installatiehulp zijn niet inbegrepen.
            </p>
          </div>
        </section>

        <section className={styles.advice}>
          <div className={styles.adviceCard}>
            <span className={styles.index}>AANBEVELING · FOTOGRAFIE</span>
            <h2>Laat de sfeer alvast voor zich spreken.</h2>
            <p>“{quoteContent.photography.split(" Ter inspiratie:")[0]}”</p>
            <p>
              Ter inspiratie:{" "}
              <a
                href="https://www.instagram.com/jeroenjorissen/"
                target="_blank"
                rel="noreferrer"
              >
                Jeroen Jorissen
              </a>{" "}
              en{" "}
              <a
                href="https://www.instagram.com/guyhoubenphoto/"
                target="_blank"
                rel="noreferrer"
              >
                Guy Houben Photo
              </a>
              {quoteContent.photography.split("). ").slice(1).join("). ")}
            </p>
            <span className={styles.excludedTag}>
              Niet inbegrepen · kosten op aanvraag
            </span>
          </div>
          <aside className={styles.reviewsCard}>
            <span className={styles.index}>GOOGLE REVIEWS</span>
            <h2>Vertrouwen groeit met echte ervaringen.</h2>
            <p>{quoteContent.googleReviews}</p>
          </aside>
        </section>

        <section className={styles.process}>
          <div className={styles.sectionHeading}>
            <span className={styles.index}>04 / VERVOLG</span>
            <h2>Van akkoord naar een passende planning.</h2>
          </div>
          <ol>
            {quoteContent.workflow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {token && <Acceptance token={token} ready={isAcceptanceReady()} />}
        <section
          className={styles.technicalDetails}
          aria-labelledby="technical-details-title"
        >
          <details>
            <summary>
              <span className={styles.index}>TECHNISCH RAPPORT</span>
              <strong id="technical-details-title">
                Technisch rapport · website-audit dietwie.nl
              </strong>
            </summary>
            <p>
              De audit van 9 oktober 2026 noemt verbeteringen voor vindbaarheid,
              mobiel gebruik en techniek. Dit zijn aanbevelingen voor later; ze
              zijn niet opgenomen in deze offerte.
            </p>
            <ul>
              <li>
                <strong>Vindbaarheid:</strong> server-side leesbare inhoud, meta
                description, Open Graph, Restaurant-gegevens (JSON-LD),
                canonical/hreflang, robots.txt en sitemap.
              </li>
              <li>
                <strong>Mobiel en toegankelijkheid:</strong> voldoende
                kleurcontrast, beschrijvende alt-teksten, logische
                openingstijden en reduced-motion ondersteuning.
              </li>
              <li>
                <strong>Actuele informatie:</strong> menukaart bijwerken,
                Engelse versie gelijk houden en adresgegevens (53 of 53A)
                controleren.
              </li>
              <li>
                <strong>Techniek:</strong> afbeeldingen verkleinen, caching en
                securityheaders nalopen; cookies veilig configureren.
              </li>
              <li>
                <strong>Vervolgcontrole:</strong> lokale bedrijfsvermeldingen,
                reviews en Google Search Console controleren. Lighthouse/Core
                Web Vitals en het Google Bedrijfsprofiel vielen buiten de audit.
              </li>
            </ul>
          </details>
        </section>
        <footer className={styles.footer}>
          <span>MEDIADUSTRY × GASTROBAR DIE TWIE</span>
          <span>Offertedatum · 9 oktober 2026</span>
        </footer>
      </article>
    </main>
  );
}

export default function PrivateOfferLanding() {
  return (
    <main className={styles.offer}>
      <article className={styles.sheet}>
        <header className={styles.masthead}>
          <span className={styles.documentLabel}>Persoonlijke offerte</span>
        </header>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>MEDIADUSTRY</p>
          <h1>
            Deze offerte <span>is persoonlijk.</span>
          </h1>
          <p className={styles.lead}>
            Open de persoonlijke link die MEDIADUSTRY met je heeft gedeeld.
          </p>
        </section>
      </article>
    </main>
  );
}
