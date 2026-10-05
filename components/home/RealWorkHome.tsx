import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import Link from "next/link";
import ArrowIcon from "@/components/brand/ArrowIcon";
import { realCases } from "@/data/realCases";
import CaseImage from "./CaseImage";
import DeferredCaseImages from "./DeferredCaseImages";
import styles from "./real-work-home.module.css";

const mobileHero = `data:image/avif;base64,${readFileSync(
  join(cwd(), "public/img/cases/responsive/bouwservice-peskens-1080.avif"),
).toString("base64")}`;

const services = [
  {
    number: "01",
    title: "Strategie & merk",
    body: "Positionering, doelgroep en merkverhaal als duidelijke basis voor iedere digitale keuze.",
  },
  {
    number: "02",
    title: "Websites & platforms",
    body: "Toegankelijke websites met een herkenbare uitstraling, logische routes en snelle techniek.",
  },
  {
    number: "03",
    title: "Content & vindbaarheid",
    body: "Heldere teksten, sterke beelden en een technische SEO-basis waardoor klanten je begrijpen én vinden.",
  },
  {
    number: "04",
    title: "Optimalisatie & groei",
    body: "Meten, verbeteren en doorbouwen op basis van gedrag, doelen en kansen in jouw markt.",
  },
];

const process = [
  {
    number: "01",
    title: "Luisteren",
    body: "We brengen doel, doelgroep en kansen terug tot een duidelijke digitale opdracht.",
  },
  {
    number: "02",
    title: "Vormgeven",
    body: "We vertalen die richting naar inhoud, interactie en een herkenbare visuele stijl.",
  },
  {
    number: "03",
    title: "Versnellen",
    body: "We bouwen, meten en verbeteren tot de ervaring snel, toegankelijk en overtuigend is.",
  },
];

export default function RealWorkHome() {
  const featured = realCases[0];
  const supporting = realCases.slice(1);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`${styles.page} md-real-home`}
    >
      <DeferredCaseImages />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Strategie · design · development</p>
          <h1 id="home-title" className={styles.heroTitle}>
            Digitaal werk dat helder voelt en <em>resultaat oplevert.</em>
          </h1>
          <p className={styles.heroIntro}>
            MEDIADUSTRY helpt ondernemers en organisaties met een herkenbaar
            merk, een gebruiksvriendelijke website en een digitale basis die kan
            meegroeien.
          </p>
          <div className={styles.actions}>
            <Link
              prefetch={false}
              href="/contact"
              className={styles.primaryAction}
            >
              Vertel over je plan <ArrowIcon />
            </Link>
            <a href="#werk" className={styles.secondaryAction}>
              Bekijk het werk <ArrowIcon />
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualMeta} aria-hidden="true">
            <span>Uitgelicht project</span>
            <span>Live</span>
          </div>
          <div className={styles.browserFrame}>
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <p>bouwservicepeskens.nl</p>
            </div>
            <CaseImage
              src={featured.image}
              alt={featured.imageAlt}
              eager
              inlineMobileSrc={mobileHero}
              sizes="(max-width: 1050px) 94vw, 52vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.mobileFrame}>
            <CaseImage
              src="/img/cases/bouwservice-peskens-mobile.webp"
              alt="Mobiele homepage van Bouwservice Peskens"
              nativeLazy
              sizes="(max-width: 700px) 26vw, (max-width: 1050px) 23vw, 120px"
              className={styles.mobileImage}
            />
          </div>
        </div>

        <ul className={styles.heroRail} aria-label="Kernkwaliteiten">
          <li>Direct contact</li>
          <li>Heldere afspraken</li>
          <li>Voor iedereen</li>
          <li>Meetbaar resultaat</li>
        </ul>
      </section>

      <section className={styles.intro} aria-labelledby="intro-title">
        <p className={styles.eyebrow}>Jouw digitale basis</p>
        <div className={styles.introGrid}>
          <h2 id="intro-title">
            Je website is het hart van je merk. Daarom moet alles kloppen.
          </h2>
          <div>
            <p>
              Van de eerste indruk tot het contactmoment: bezoekers moeten snel
              begrijpen wie je bent, wat je doet en waarom ze voor jou kiezen.
              Strategie, inhoud, ontwerp en techniek vormen daarom één geheel.
            </p>
            <Link prefetch={false} href="/about-us" className={styles.textLink}>
              Maak kennis met Mario <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="diensten"
        className={styles.services}
        aria-labelledby="services-title"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>
            Oplossingen voor iedere digitale stap
          </p>
          <h2 id="services-title">
            Alles wat nodig is om online vooruit te gaan.
          </h2>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <article className={styles.serviceCard} key={service.number}>
              <div
                className={styles.serviceArt}
                data-variant={index + 1}
                aria-hidden="true"
              >
                <span />
              </div>
              <p>{service.number}</p>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="werk" className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Geselecteerd werk · 2026</p>
          <h2 id="work-title">Werk dat helder voelt en hard werkt.</h2>
          <p>
            Eigen digitale werelden voor ondernemers die vooruit willen. Van
            positionering en content tot ontwerp en development.
          </p>
        </div>

        <article className={styles.featuredCase}>
          <Link
            prefetch={false}
            href={`/werk/${featured.slug}`}
            className={styles.caseMedia}
          >
            <CaseImage
              src={featured.image}
              alt={featured.imageAlt}
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
            <Link
              prefetch={false}
              href={`/werk/${featured.slug}`}
              className={styles.textLink}
            >
              Bekijk de case <ArrowIcon />
            </Link>
          </div>
        </article>

        <div className={styles.caseGrid}>
          {supporting.map((item, index) => (
            <article className={styles.caseCard} key={item.slug}>
              <Link
                prefetch={false}
                href={`/werk/${item.slug}`}
                className={styles.cardMedia}
              >
                <CaseImage
                  src={item.image}
                  alt={item.imageAlt}
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
                <Link
                  prefetch={false}
                  href={`/werk/${item.slug}`}
                  className={styles.textLink}
                >
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
        <div className={styles.processLead}>
          <p className={styles.eyebrow}>Persoonlijke aanpak</p>
          <h2 id="process-title">
            Eén ervaren partner, van eerste vraag tot doorontwikkeling.
          </h2>
          <p>
            Je werkt rechtstreeks met Mario. Samen maken we ingewikkelde keuzes
            overzichtelijk, houden we vaart in het project en bouwen we een
            oplossing die echt bij jouw organisatie past.
          </p>
          <Link prefetch={false} href="/services" className={styles.textLink}>
            Bekijk de werkwijze <ArrowIcon />
          </Link>
        </div>
        <div className={styles.processVisual} aria-hidden="true">
          <span />
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

      <section className={styles.proof} aria-labelledby="proof-title">
        <div>
          <p className={styles.eyebrow}>Gebouwd op een sterke basis</p>
          <h2 id="proof-title">
            Techniek die je bezoeker niet ziet, maar wel voelt.
          </h2>
        </div>
        <ul>
          <li>Next.js</li>
          <li>React</li>
          <li>Vercel</li>
          <li>SEO</li>
          <li>AI-ready</li>
          <li>WCAG</li>
        </ul>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaArt} aria-hidden="true">
          <span />
        </div>
        <p className={styles.eyebrow}>Heb je een idee?</p>
        <h2 id="cta-title">Laten we iets maken dat mensen bijblijft.</h2>
        <Link prefetch={false} href="/contact" className={styles.ctaLink}>
          Start een gesprek <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
