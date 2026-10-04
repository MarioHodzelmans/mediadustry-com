import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/brand/ArrowIcon";
import { realCases } from "@/data/realCases";
import styles from "./real-work-home.module.css";

const process = [
  {
    number: "01",
    title: "Richting",
    body: "We maken doelgroep, aanbod en onderscheid scherp. Zo begint het ontwerp met een reden.",
  },
  {
    number: "02",
    title: "Ontwerp",
    body: "We brengen inhoud, identiteit en gebruik samen in een digitaal systeem dat herkenbaar voelt.",
  },
  {
    number: "03",
    title: "Realisatie",
    body: "We bouwen snel, toegankelijk en beheersbaar — klaar voor lancering én doorontwikkeling.",
  },
];

export default function RealWorkHome() {
  const featured = realCases[0];
  const supporting = realCases.slice(1);

  return (
    <main id="main-content" className={`${styles.page} md-real-home`}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Strategie · design · development</p>
          <h1 id="home-title" className={styles.heroTitle}>
            Websites die beter worden gevonden én <em>gekozen</em>.
          </h1>
          <p className={styles.heroIntro}>
            Werk rechtstreeks met Mario aan een snelle website die vertrouwen
            wekt, jouw verhaal scherp vertelt en bezoekers helpt kiezen.
          </p>
          <div className={styles.actions}>
            <Link href="/website-check" className={styles.primaryAction}>
              Vraag je gratis websitecheck <ArrowIcon />
            </Link>
            <Link href="#werk" className={styles.secondaryAction}>
              Bekijk echt werk <ArrowIcon />
            </Link>
          </div>
          <ul className={styles.heroProof} aria-label="Waarom MEDIADUSTRY">
            <li>Direct contact met Mario</li>
            <li>Vrijblijvend eerste advies</li>
            <li>Geen nieuwsbrief zonder toestemming</li>
          </ul>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualMeta} aria-hidden="true">
            <span>Case 01</span>
            <span>Live project</span>
          </div>
          <div className={styles.browserFrame}>
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <p>bouwservicepeskens.nl</p>
            </div>
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              preload
              sizes="(max-width: 1050px) 94vw, 50vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.mobileFrame}>
            <Image
              src="/img/cases/bouwservice-peskens-mobile.webp"
              alt="Mobiele homepage van Bouwservice Peskens"
              fill
              sizes="(max-width: 700px) 26vw, (max-width: 1050px) 23vw, 14vw"
              className={styles.mobileImage}
            />
          </div>
          <p className={styles.visualNote} aria-hidden="true">
            Strategie · design · development
          </p>
        </div>
      </section>

      <section className={styles.check} aria-labelledby="check-title">
        <div>
          <p className={styles.eyebrow}>Een duidelijke eerste stap</p>
          <h2 id="check-title">Waar laat jouw website kansen liggen?</h2>
          <p>
            Mario kijkt persoonlijk naar je website, boodschap en route naar een
            aanvraag. Je ontvangt een eerste advies per e-mail met concrete
            verbeterpunten. Vrijblijvend, zonder verkoopverplichting.
          </p>
        </div>
        <div className={styles.checkDetails}>
          <ul>
            <li>Een heldere blik op vindbaarheid en snelheid</li>
            <li>Advies over vertrouwen, inhoud en gebruik op mobiel</li>
            <li>Een passende vervolgstap voor meer aanvragen</li>
          </ul>
          <Link href="/website-check" className={styles.primaryAction}>
            Ontvang je persoonlijke websitecheck <ArrowIcon />
          </Link>
          <p>
            Een persoonlijke beoordeling, geen automatische scan. E-mailupdates
            zijn optioneel.
          </p>
        </div>
      </section>

      <section id="werk" className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Geselecteerd werk · 2026</p>
          <h2 id="work-title">Recent werk, gemaakt voor echte ondernemers.</h2>
          <p>
            Van positionering en content tot ontwerp en development. Iedere case
            laat zien wat er is gemaakt, waarom en voor wie.
          </p>
        </div>

        <article className={styles.featuredCase}>
          <Link href={`/werk/${featured.slug}`} className={styles.caseMedia}>
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(max-width: 900px) 94vw, 62vw"
              className={styles.caseImage}
            />
          </Link>
          <div className={styles.featuredCopy}>
            <p className={styles.caseMeta}>
              {featured.sector} · {featured.location}
            </p>
            <h3>{featured.title}</h3>
            <p className={styles.caseStatement}>{featured.statement}</p>
            <p>{featured.summary}</p>
            <ul className={styles.tags} aria-label="Geleverde diensten">
              {featured.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <Link href={`/werk/${featured.slug}`} className={styles.textLink}>
              Bekijk de case <ArrowIcon />
            </Link>
          </div>
        </article>

        <div className={styles.caseGrid}>
          {supporting.map((item, index) => (
            <article className={styles.caseCard} key={item.slug}>
              <Link href={`/werk/${item.slug}`} className={styles.cardMedia}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 700px) 94vw, (max-width: 1100px) 46vw, 45vw"
                  className={styles.caseImage}
                />
                <span className={styles.cardNumber}>0{index + 2}</span>
              </Link>
              <div className={styles.cardCopy}>
                <p className={styles.caseMeta}>
                  {item.sector} · {item.location}
                </p>
                <h3>{item.title}</h3>
                <p>{item.statement}</p>
                <Link href={`/werk/${item.slug}`} className={styles.textLink}>
                  Bekijk de case <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="aanpak"
        className={styles.process}
        aria-labelledby="process-title"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Zo ontstaat goed digitaal werk</p>
          <h2 id="process-title">
            Van scherpe positionering naar een site die klopt.
          </h2>
        </div>
        <div className={styles.processGrid}>
          {process.map((step) => (
            <article key={step.number} className={styles.processCard}>
              <p>{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="diensten"
        className={styles.services}
        aria-labelledby="services-title"
      >
        <div>
          <p className={styles.eyebrow}>Waarmee MEDIADUSTRY helpt</p>
          <h2 id="services-title">
            Eén digitale partner van verhaal tot lancering.
          </h2>
        </div>
        <div className={styles.serviceList}>
          <article>
            <span>01</span>
            <h3>Merk & positionering</h3>
            <p>
              Een helder verhaal, herkenbare identiteit en visuele richting.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Webdesign & development</h3>
            <p>
              Responsive UX, sterk ontwerp en een snelle, toegankelijke
              realisatie.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Groei & doorontwikkeling</h3>
            <p>
              Content, SEO-basis, optimalisatie en technische ondersteuning.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Goed om vooraf te weten</p>
          <h2 id="faq-title">Van eerste vraag naar een helder plan.</h2>
        </div>
        <div className={styles.faqList}>
          <details>
            <summary>Is de websitecheck echt gratis?</summary>
            <p>
              Ja. Het eerste persoonlijke advies is gratis en vrijblijvend.
              Eventueel vervolgwerk bespreken we apart. Je meldt je alleen aan
              voor e-mailupdates als je dat zelf aanvinkt en daarna via e-mail
              bevestigt.
            </p>
          </details>
          <details>
            <summary>Kun je ook mijn bestaande website verbeteren?</summary>
            <p>
              Ja. We bekijken eerst de inhoud, techniek en doelen van je
              bestaande website. Vervolgens bepalen we of gerichte verbeteringen
              voldoende zijn of een nieuwe opbouw meer oplevert.
            </p>
          </details>
          <details>
            <summary>Wat kost een nieuwe website?</summary>
            <p>
              Dat hangt af van de inhoud, functies en benodigde begeleiding. Na
              een kennismaking ontvang je een voorstel met een duidelijke scope
              en prijs. Werk begint pas na jouw akkoord.
            </p>
          </details>
          <details>
            <summary>Hoe weet ik of mijn website resultaat oplevert?</summary>
            <p>
              We kiezen vooraf wat voor jouw bedrijf telt, zoals relevante
              aanvragen of afspraken. Snelheid, vindbaarheid en gebruik
              ondersteunen dat doel. Indien nodig bespreken we passende meting
              en toestemming voor aanvullende meetdiensten.
            </p>
          </details>
          <details>
            <summary>Met wie werk ik samen?</summary>
            <p>
              Je werkt rechtstreeks met Mario Hodzelmans van MEDIADUSTRY aan
              strategie, ontwerp en development. Eén aanspreekpunt voor je
              vragen en de volgende stap.
            </p>
          </details>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaLabel}>
          <span aria-hidden="true" />
          Een nieuwe website of een bestaande site die beter moet?
        </div>
        <h2 id="cta-title">
          Laten we scherp krijgen wat jouw volgende stap is.
        </h2>
        <p>
          Vertel kort waar je nu staat en wat je wilt bereiken. Je krijgt een
          eerlijk eerste beeld van de kansen, aanpak en passende vervolgstap.
        </p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primaryAction}>
            Bespreek jouw project <ArrowIcon />
          </Link>
          <Link href="/website-check" className={styles.secondaryAction}>
            Eerst een gratis websitecheck <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
