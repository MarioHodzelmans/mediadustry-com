import Link from "next/link";
import ArrowIcon from "@/components/brand/ArrowIcon";
import { realCases } from "@/data/realCases";
import CaseImage from "./CaseImage";
import DeferredCaseImages from "./DeferredCaseImages";
import styles from "./real-work-home.module.css";

const services = [
  [
    "01",
    "Strategie & merk",
    "Een scherp verhaal, heldere doelgroep en herkenbare visuele richting.",
  ],
  [
    "02",
    "Websites & platforms",
    "Toegankelijke websites met logische routes en snelle, solide techniek.",
  ],
  [
    "03",
    "Content & vindbaarheid",
    "Tekst, beeld en SEO die mensen helpen om je te vinden en begrijpen.",
  ],
  [
    "04",
    "Optimalisatie & groei",
    "Meten, verbeteren en doorbouwen op basis van gedrag en doelen.",
  ],
];

export default function RealWorkHome() {
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
            Pure focus. <em>Sterk digitaal.</em>
          </h1>
          <p className={styles.heroIntro}>
            MEDIADUSTRY helpt ondernemers en organisaties met een herkenbaar
            merk, een gebruiksvriendelijke website en een digitale basis die
            resultaat oplevert.
          </p>
          <Link
            prefetch={false}
            href="/contact"
            className={styles.primaryAction}
          >
            Bespreek je project <ArrowIcon />
          </Link>
        </div>
        <div
          className={styles.heroVisual}
          role="img"
          aria-label="Creatieve maker in een digitale studio"
        >
          <div className={styles.heroVeil} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="intro-title">
        <h2 id="intro-title">
          Je website is het hart van je merk, <em>wij begrijpen dat.</em>
        </h2>
        <div>
          <p>
            Van de eerste indruk tot het contactmoment: bezoekers moeten direct
            begrijpen wie je bent, wat je doet en waarom ze voor jou kiezen.
          </p>
          <p>
            Daarom brengen we strategie, inhoud, ontwerp en techniek samen in
            één duidelijke digitale ervaring.
          </p>
          <Link prefetch={false} href="/about-us" className={styles.textLink}>
            Lees meer over MEDIADUSTRY <ArrowIcon />
          </Link>
        </div>
      </section>

      <section
        id="diensten"
        className={styles.services}
        aria-labelledby="services-title"
      >
        <p className={styles.eyebrow}>Oplossingen voor iedere digitale stap</p>
        <h2 id="services-title">
          Alles wat je nodig hebt om online vooruit te gaan.
        </h2>
        <div className={styles.serviceGrid}>
          <article className={`${styles.serviceIntro} ${styles.serviceCard}`}>
            <p>Van eerste idee tot blijvende groei</p>
            <h3>Één partner voor je volledige digitale basis.</h3>
          </article>
          {services.map(([number, title, body], index) => (
            <article className={styles.serviceCard} key={number}>
              <div
                className={styles.serviceIcon}
                data-variant={index + 1}
                aria-hidden="true"
              >
                <span />
              </div>
              <p>{number}</p>
              <h3>{title}</h3>
              <p>{body}</p>
              <Link
                prefetch={false}
                href="/services"
                aria-label={`Lees meer over ${title}`}
              >
                <ArrowIcon />
              </Link>
            </article>
          ))}
          <article className={`${styles.serviceMore} ${styles.serviceCard}`}>
            <p>Benieuwd wat jouw organisatie nodig heeft?</p>
            <Link prefetch={false} href="/contact" className={styles.textLink}>
              Ontdek de mogelijkheden <ArrowIcon />
            </Link>
          </article>
        </div>
      </section>

      <section
        id="aanpak"
        className={styles.story}
        aria-labelledby="approach-title"
      >
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>Een persoonlijke aanpak</p>
          <h2 id="approach-title">Direct contact maakt het verschil.</h2>
          <p>
            Je werkt rechtstreeks met Mario. Zo blijven keuzes begrijpelijk,
            afspraken helder en het tempo hoog. Eerst luisteren en richting
            bepalen, daarna ontwerpen, bouwen en gericht verbeteren.
          </p>
          <p>
            Geen onnodige lagen of lange overdrachten. Wel één betrokken partner
            die jouw organisatie en doelen leert kennen.
          </p>
        </div>
        <div
          className={`${styles.storyImage} ${styles.storyImageFirst}`}
          role="img"
          aria-label="Abstracte MEDIADUSTRY-vorm in de eigen kleurwereld"
        />
      </section>

      <section
        className={`${styles.story} ${styles.storyReverse}`}
        aria-labelledby="expert-title"
      >
        <div
          className={`${styles.storyImage} ${styles.storyImageSecond}`}
          role="img"
          aria-label="Digitale werkplek en ontwerpomgeving"
        />
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>Altijd dichtbij</p>
          <h2 id="expert-title">Expertise wanneer je die nodig hebt.</h2>
          <p>
            Van positionering en UX tot development, SEO en doorontwikkeling: je
            krijgt precies de expertise die jouw volgende stap vraagt.
          </p>
          <Link prefetch={false} href="/contact" className={styles.textLink}>
            Neem contact op <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className={styles.proof} aria-labelledby="proof-title">
        <h2 id="proof-title">
          Een moderne basis voor <em>duurzame groei.</em>
        </h2>
        <ul aria-label="Technieken en kwaliteitsgebieden">
          <li>Next.js</li>
          <li>React</li>
          <li>Vercel</li>
          <li>SEO</li>
          <li>AI-ready</li>
          <li>WCAG</li>
        </ul>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <p className={styles.eyebrow}>Klaar voor de volgende stap?</p>
        <h2 id="cta-title">
          Benieuwd naar de beste oplossing voor jouw organisatie?
        </h2>
        <Link prefetch={false} href="/contact" className={styles.ctaLink}>
          Laten we praten <ArrowIcon />
        </Link>
      </section>

      <section id="werk" className={styles.work} aria-labelledby="work-title">
        <p className={styles.eyebrow}>Recent werk</p>
        <h2 id="work-title">Oplossingen die al resultaat leveren.</h2>
        <div className={styles.caseGrid}>
          {realCases.map((item) => (
            <article className={styles.caseCard} key={item.slug}>
              <Link
                prefetch={false}
                href={`/werk/${item.slug}`}
                className={styles.caseMedia}
              >
                <CaseImage
                  src={item.image}
                  alt={item.imageAlt}
                  sizes="(max-width: 700px) 94vw, 31vw"
                  className={styles.caseImage}
                />
              </Link>
              <div className={styles.caseCopy}>
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
                  Bekijk project <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
