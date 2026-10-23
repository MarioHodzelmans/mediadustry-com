/**
 * Publieke feiten voor de verkoopassistent.
 * Alleen teksten die in deze repository op de live site staan.
 * Niet aanvullen met aannames, offertes of templatepagina's van het thema.
 *
 * Bronnen:
 * - content/homepage/index.html
 * - app/layout.tsx (bedrijfsnaam, e-mail, KvK, btw in JSON-LD)
 * - components/other-pages/contact/SectionTitle.tsx
 * - public/privacy-policy.html
 * - public/algemene-voorwaarden.html
 * - public/cookieverklaring.html
 */
export const siteFacts = {
  name: "MEDIADUSTRY",
  url: "https://www.mediadustry.com",
  email: "info@mediadustry.com",
  contactPath: "/contact",
  privacyPath: "/privacy-policy.html",
  kvk: "54271932",
  vatId: "NL062176468B02",
  person: "Mario",
  privacyContact: "Mario Hodzelmans",
  positioning:
    "MEDIADUSTRY combineert strategie, webdesign en development tot snelle, toegankelijke websites voor organisaties en ondernemers.",
  hero: "Strategie, design en technologie. Voor digitale groei.",
  summary:
    "Een merk, een website en de techniek erachter moeten als één geheel werken. Van positionering en inhoud tot ontwerp, development en doorontwikkeling.",
  services: [
    {
      title: "Strategie & merk",
      detail:
        "Positionering, merkverhaal en structuur die duidelijk maken waar je voor staat.",
    },
    {
      title: "Websites & platforms",
      detail:
        "Toegankelijke websites met logische routes en betrouwbare techniek.",
    },
    {
      title: "Content & vindbaarheid",
      detail:
        "Tekst, beeld en SEO die mensen helpen je te vinden en je aanbod te begrijpen.",
    },
    {
      title: "Optimalisatie & groei",
      detail:
        "Meten, verbeteren en gericht doorbouwen op basis van gebruik en doelen.",
    },
  ],
  expertise: [
    "Strategie",
    "UX & design",
    "Development",
    "SEO",
    "Toegankelijkheid",
    "Doorontwikkeling",
  ],
  approach: [
    "Luisteren en de vraag scherpstellen",
    "Richting en structuur bepalen",
    "Ontwerpen, bouwen en opleveren",
    "Gericht verbeteren wanneer dat nodig is",
  ],
  approachNote:
    "Je werkt rechtstreeks met Mario. Eerst scherp krijgen wat je nodig hebt. Daarna samen keuzes maken, ontwerpen en bouwen. Eén betrokken aanspreekpunt, heldere afspraken en korte lijnen.",
  lighthouse:
    "De MEDIADUSTRY-homepage behaalde in een Lighthouse-meting vier scores van 100 (performance, toegankelijkheid, best practices en SEO). De site zegt er uitdrukkelijk bij dat scores voor klantwebsites verschillen per project, inhoud en meetmoment.",
  cases: [
    {
      name: "Bouwservice Peskens",
      meta: "Maatwerkbadkamers · Voerendaal",
      line: "Van vakmanschap naar een helder digitaal visitekaartje.",
      url: "https://www.bouwservicepeskens.nl/",
    },
    {
      name: "Alex Kamsma Design Parket",
      meta: "Parket & PVC · Zuid-Limburg",
      line: "Ambacht en persoonlijk advies in een digitale ervaring.",
      url: "https://www.alexkamsmaparket.nl/",
    },
    {
      name: "Kapsalon Marisa",
      meta: "Haar & verzorging · Voerendaal",
      line: "Een vertrouwd lokaal merk met een frisse digitale uitstraling.",
      url: "https://www.kapsalonmarisa.nl/",
    },
    {
      name: "Dierenartspraktijk Voerendaal",
      meta: "Diergeneeskunde · Voerendaal",
      line: "Zorg, deskundigheid en vertrouwen in één heldere ervaring.",
      url: "https://www.dierenartspraktijkvoerendaal.nl/",
    },
    {
      name: "Patrik Mouratidis",
      meta: "Sport & wellness · Limburg",
      line: "Een persoonlijke propositie voor herstel en prestaties.",
      url: "https://www.wellness-therapeut.nl/",
    },
  ],
  terms: [
    "Een opdracht komt tot stand nadat een offerte schriftelijk of per e-mail is aanvaard, of anders aantoonbaar is bevestigd.",
    "Prijs, planning en scope staan in de offerte of factuur, niet op de website.",
    "Voor zover een opdracht een inspanningsverplichting is, wordt geen bepaald commercieel, technisch, SEO- of Lighthouse-resultaat gegarandeerd.",
    "Werk buiten de afgesproken scope wordt vooraf besproken. Gevolgen voor prijs en planning worden schriftelijk vastgelegd voordat dat werk start.",
    "Er is geen openbaar vestigingsadres op de site gepubliceerd. Noem er geen.",
    "Er is geen openbaar telefoonnummer van MEDIADUSTRY op de site. Noem er geen.",
    "Er is geen online agenda of boekingslink op de site.",
  ],
} as const;
