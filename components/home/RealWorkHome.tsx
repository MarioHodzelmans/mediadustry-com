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
    <main className={`${styles.page} md-real-home`}>
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
            <Link href="/contact" className={styles.primaryAction}>
              Ontdek wat beter kan <ArrowIcon />
            </Link>
            <Link href="#werk" className={styles.secondaryAction}>
              Bekijk echt werk <ArrowIcon />
            </Link>
          </div>
          <ul className={styles.heroProof} aria-label="Waarom MEDIADUSTRY">
            <li>PageSpeed-geoptimaliseerd</li>
            <li>SEO & AI-ready</li>
            <li>Zonder onnodige plug-ins</li>
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
              loading="eager"
              sizes="(max-width: 900px) 94vw, 57vw"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.mobileFrame}>
            <Image
              src="/img/cases/bouwservice-peskens-mobile.webp"
              alt="Mobiele homepage van Bouwservice Peskens"
              fill
              sizes="(max-width: 900px) 34vw, 16vw"
              className={styles.mobileImage}
            />
          </div>
          <p className={styles.visualNote} aria-hidden="true">
            Strategie · design · development
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

      <section id="aanpak" className={styles.process} aria-labelledby="process-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Zo ontstaat goed digitaal werk</p>
          <h2 id="process-title">Van scherpe positionering naar een site die klopt.</h2>
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

      <section id="diensten" className={styles.services} aria-labelledby="services-title">
        <div>
          <p className={styles.eyebrow}>Waarmee MEDIADUSTRY helpt</p>
          <h2 id="services-title">Eén digitale partner van verhaal tot lancering.</h2>
        </div>
        <div className={styles.serviceList}>
          <article>
            <span>01</span>
            <h3>Merk & positionering</h3>
            <p>Een helder verhaal, herkenbare identiteit en visuele richting.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Webdesign & development</h3>
            <p>Responsive UX, sterk ontwerp en een snelle, toegankelijke realisatie.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Groei & doorontwikkeling</h3>
            <p>Content, SEO-basis, optimalisatie en technische ondersteuning.</p>
          </article>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaLabel}>
          <span aria-hidden="true" />
          Een nieuwe website of een bestaande site die beter moet?
        </div>
        <h2 id="cta-title">Laten we scherp krijgen wat jouw volgende stap is.</h2>
        <p>
          Vertel kort waar je nu staat en wat je wilt bereiken. Je krijgt een
          eerlijk eerste beeld van de kansen, aanpak en passende vervolgstap.
        </p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primaryAction}>
            Plan een kennismaking <ArrowIcon />
          </Link>
          <a href="mailto:info@mediadustry.com" className={styles.secondaryAction}>
            Mail MEDIADUSTRY <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  );
}
