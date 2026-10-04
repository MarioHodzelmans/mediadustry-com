import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/footers/SiteFooter";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Lees hoe MEDIADUSTRY omgaat met je contactgegevens, website-check, e-mailvoorkeuren en functionele opslag.",
  alternates: { canonical: "https://www.mediadustry.com/privacy" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "MEDIADUSTRY",
    title: "Privacyverklaring | MEDIADUSTRY",
    description:
      "Informatie over contactaanvragen, de website-check, e-mailvoorkeuren en je privacyrechten.",
    url: "https://www.mediadustry.com/privacy",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacyverklaring | MEDIADUSTRY",
    description:
      "Informatie over contactaanvragen, e-mailvoorkeuren en je privacyrechten.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <main id="main-content" className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Bijgewerkt op 4 oktober 2026</p>
          <h1>Privacyverklaring</h1>
          <p className={styles.intro}>
            Je aanvraag en je e-mailvoorkeuren verdienen een duidelijke uitleg.
            Hier lees je welke gegevens deze website gebruikt en hoe je daar
            controle over houdt.
          </p>
        </header>

        <div className={styles.content}>
          <section aria-labelledby="verantwoordelijke">
            <h2 id="verantwoordelijke">Wie is verantwoordelijk?</h2>
            <p>
              MEDIADUSTRY, ingeschreven bij de Kamer van Koophandel onder nummer
              54271932, is verantwoordelijk voor de verwerking van
              persoonsgegevens via www.mediadustry.com. Voor privacyvragen en
              verzoeken kun je mailen naar{" "}
              <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>.
            </p>
          </section>

          <section aria-labelledby="aanvragen">
            <h2 id="aanvragen">Contact en de website-check</h2>
            <p>
              Bij een aanvraag geef je je naam en e-mailadres op. Voor een
              website-check hebben we ook je website-adres nodig; bij een
              contactaanvraag je bericht. Bedrijfsnaam, telefoonnummer,
              projectvoorkeuren en andere aanvullende informatie zijn optioneel.
              Zonder de vereiste gegevens kunnen we je aanvraag niet via het
              formulier behandelen.
            </p>
            <p>
              We gebruiken deze gegevens om je vraag te beantwoorden, je website
              te bekijken en de door jou gevraagde vervolgstap te bespreken.
              Gaat het om een mogelijke opdracht, dan is de grondslag het nemen
              van stappen op jouw verzoek voorafgaand aan een overeenkomst. Bij
              overige vragen is ons gerechtvaardigd belang om inkomende vragen
              te beantwoorden de grondslag.
            </p>
            <p>
              De aanvraag bevat ook het type formulier en het verzendmoment.
              Stuur geen gevoelige persoonsgegevens, wachtwoorden of
              vertrouwelijke gegevens van anderen mee.
            </p>
          </section>

          <section aria-labelledby="emailvoorkeuren">
            <h2 id="emailvoorkeuren">Optionele tips per e-mail</h2>
            <p>
              Alleen als je het aparte, niet vooraf aangevinkte vakje kiest,
              geef je toestemming voor praktische website- en groeitips van
              MEDIADUSTRY per e-mail. Je krijgt daarna een e-mail om je
              aanmelding te bevestigen. Pas na die bevestiging staat je adres
              ingeschreven voor deze tips. We leggen je keuze en bevestiging
              vast met de versie van de toestemmingstekst, het formulier en de
              bijbehorende tijdstippen. Het beantwoorden van je aanvraag hangt
              niet af van deze keuze.
            </p>
            <p>
              Je kunt je toestemming altijd intrekken via de afmeldlink in een
              e-mail of via{" "}
              <a href="mailto:info@mediadustry.com?subject=Afmelden%20e-mailtips">
                info@mediadustry.com
              </a>
              . We gebruiken je e-mailadres daarna niet meer voor deze tips.
              Intrekken verandert niets aan de rechtmatigheid van eerdere
              verwerking op basis van je toestemming.
            </p>
          </section>

          <section aria-labelledby="dienstverleners">
            <h2 id="dienstverleners">Verzending en hosting</h2>
            <p>
              Voor het verzenden van aanvraagberichten, ontvangstbevestigingen
              en aan- en afmeldberichten gebruiken we Resend, een dienst van
              Plus Five Five, Inc. Resend verwerkt de daarvoor benodigde
              e-mailadressen en berichtinhoud. Na bevestiging van een optionele
              aanmelding worden je e-mailadres en aanmeldstatus in de
              contactlijst bewaard. Onze e-maildienst verwerkt ontvangen
              aanvragen voor het behandelen van je verzoek.
            </p>
            <p>
              Resend is gevestigd in de Verenigde Staten en verwerkt gegevens
              daar en via zijn dienstverleners. Gegevens kunnen daardoor buiten
              de Europese Economische Ruimte worden verwerkt. Resend beschrijft
              zijn verwerking in de{" "}
              <a href="https://resend.com/legal/privacy-policy">
                privacyverklaring
              </a>{" "}
              en de contractuele waarborgen, waaronder Europese
              standaardcontractbepalingen, in zijn{" "}
              <a href="https://resend.com/legal/dpa">verwerkersovereenkomst</a>.
            </p>
            <p>
              Upstash levert de database voor aanmeldstatus, toestemmingsbewijs
              en afmeldingen. We bewaren daarin de gegevens die nodig zijn om je
              keuze betrouwbaar uit te voeren. De database wordt in een Europese
              regio ingericht; Upstash is een Amerikaanse dienstverlener. De
              verwerking en internationale waarborgen staan in de{" "}
              <a href="https://upstash.com/trust/privacy.pdf">
                privacy-informatie van Upstash
              </a>{" "}
              en de{" "}
              <a href="https://upstash.com/trust/dpa.pdf">
                verwerkersvoorwaarden
              </a>
              .
            </p>
            <p>
              Voor het tegengaan van misbruik wordt een afgeleide van je
              IP-adres maximaal tien minuten opgeslagen als aanvraaglimiet. Een
              technische referentie en verzendstatus worden maximaal 24 uur
              bewaard om dubbele inzendingen te voorkomen. Die referentie bevat
              geen ingevulde contactgegevens. De grondslag voor deze bescherming
              is ons gerechtvaardigd belang bij een veilige, werkende website.
            </p>
            <p>
              De website wordt gehost door Vercel. Voor het leveren en
              beveiligen van de website verwerkt de hostingdienst technische
              verzoekgegevens, zoals IP-adres, browserinformatie en het tijdstip
              van een verzoek. Vercel gebruikt internationale infrastructuur,
              waaronder in de Verenigde Staten. Meer informatie staat in de{" "}
              <a href="https://vercel.com/legal/privacy-notice">
                privacy-informatie van Vercel
              </a>{" "}
              en de{" "}
              <a href="https://vercel.com/legal/dpa">verwerkersvoorwaarden</a>.
            </p>
          </section>

          <section aria-labelledby="opslag">
            <h2 id="opslag">Cookies en opslag in je browser</h2>
            <p>
              Deze website plaatst geen advertentiecookies en gebruikt geen
              marketingpixels. Je keuze voor de lichte of donkere weergave wordt
              functioneel opgeslagen als <code>template.theme</code>: in een
              cookie met een looptijd van één jaar en in lokale browseropslag
              totdat je deze wist.
            </p>
            <p>
              Na een geslaagde formulierverzending bewaart de browser tijdelijk
              een bevestiging om de bedankpagina te tonen. Deze bevat geen
              ingevulde contactgegevens, verloopt na dertig minuten en blijft
              alleen binnen de browsersessie. Je kunt cookies en browseropslag
              wissen via de instellingen van je browser.
            </p>
            <p>
              Externe websites hebben hun eigen privacyregels. Een
              projectwebsite wordt pas bezocht wanneer je een externe link
              opent. Op conceptpagina’s kunnen externe beelden of een ingebedde
              projectwebsite worden geladen; daarbij ontvangt die externe
              website technische verzoekgegevens.
            </p>
          </section>

          <section aria-labelledby="bewaren">
            <h2 id="bewaren">Hoelang zijn gegevens nodig?</h2>
            <p>
              Voor aanvragen hangt dit af van de behandeling van je vraag, de
              gevraagde opvolging en een eventuele samenwerking. Gegevens voor
              een opdracht kunnen daarnaast nodig zijn voor administratie en
              wettelijke verplichtingen. Je keuze voor e-mailtips geldt totdat
              je die intrekt; gegevens die nodig zijn om je afmelding te
              respecteren, kunnen daarvoor worden bewaard.
            </p>
            <p>
              Aanmeld- en bevestigingsgegevens zijn nodig om je e-mailvoorkeuren
              uit te voeren en toestemming te kunnen aantonen. Je aanvraag kan
              ook in onze e-mailcorrespondentie terechtkomen. Vraag ons gerust
              om informatie over jouw specifieke gegevens of om verwijdering.
            </p>
          </section>

          <section aria-labelledby="rechten">
            <h2 id="rechten">Je privacyrechten</h2>
            <p>
              Je kunt vragen om inzage, correctie of verwijdering van je
              gegevens. Afhankelijk van de situatie kun je ook vragen om
              beperking of overdracht van gegevens, bezwaar maken tegen
              verwerking en je toestemming intrekken. Mail je verzoek naar{" "}
              <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>. Om
              je gegevens te beschermen kan het nodig zijn je identiteit te
              controleren. We reageren binnen de wettelijke termijn.
            </p>
            <p>
              Heb je een klacht over het gebruik van je gegevens, dan kun je
              contact met ons opnemen en een klacht indienen bij de{" "}
              <a href="https://www.autoriteitpersoonsgegevens.nl/">
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>
          </section>

          <Link href="/contact" className={styles.contactLink}>
            Neem contact op met MEDIADUSTRY
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
