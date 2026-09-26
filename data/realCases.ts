export type RealCase = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  year: string;
  statement: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  services: string[];
  image: string;
  imageAlt: string;
  liveUrl: string;
  accent: string;
};

export const realCases: RealCase[] = [
  {
    slug: "bouwservice-peskens",
    title: "Bouwservice Peskens",
    sector: "Maatwerkbadkamers",
    location: "Voerendaal",
    year: "2026",
    statement: "Van vakmanschap naar een helder digitaal visitekaartje.",
    summary:
      "Een positionerende website voor een persoonlijk familiebedrijf, met gerealiseerd werk, een transparante werkwijze en Tim als direct aanspreekpunt.",
    challenge:
      "Bouwservice Peskens wilde niet langer overkomen als een algemene aannemer, maar als specialist in complete maatwerkbadkamers.",
    approach:
      "We brachten niche, vakmanschap en persoonlijke begeleiding samen in een heldere structuur met echte projectfotografie, een proces in zes stappen en directe contactmomenten.",
    outcome:
      "Een rustige, geloofwaardige website waarop bezoekers meteen begrijpen wat Peskens maakt, hoe een traject verloopt en met wie ze samenwerken.",
    services: ["Positionering", "Copy", "Webdesign", "Development"],
    image: "/img/cases/bouwservice-peskens.webp",
    imageAlt: "Homepage van Bouwservice Peskens met een gerealiseerde maatwerkbadkamer",
    liveUrl: "https://www.bouwservicepeskens.nl/",
    accent: "#4D78FF",
  },
  {
    slug: "alex-kamsma-design-parket",
    title: "Alex Kamsma Design Parket",
    sector: "Parket & PVC",
    location: "Zuid-Limburg",
    year: "2026",
    statement: "Ambacht en persoonlijk advies in een premium digitale ervaring.",
    summary:
      "Een complete website waarin materiaalgevoel, vakkennis, thuisadvies en garantie samen vertrouwen opbouwen.",
    challenge:
      "Het brede aanbod — parket, PVC, renovatie en trappen — moest overzichtelijk worden zonder het persoonlijke karakter te verliezen.",
    approach:
      "We kozen voor grote materiaalbeelden, een uitgesproken typografische stijl en inhoud die de keuzes rond ondergrond, afwerking en plaatsing begrijpelijk maakt.",
    outcome:
      "Een premium presentatie die Alex als vakman positioneert en bezoekers gericht naar persoonlijk advies leidt.",
    services: ["Strategie", "Content", "Webdesign", "Development"],
    image: "/img/cases/alex-kamsma.webp",
    imageAlt: "Homepage van Alex Kamsma Design Parket met een lichte houten vloer",
    liveUrl: "https://www.alexkamsmaparket.nl/",
    accent: "#FF6438",
  },
  {
    slug: "kapsalon-marisa",
    title: "Kapsalon Marisa",
    sector: "Haar & verzorging",
    location: "Voerendaal",
    year: "2026",
    statement: "Een vertrouwd lokaal merk met een frisse digitale uitstraling.",
    summary:
      "Een warme, toegankelijke website voor dames, heren en haarwerken, met directe conversie en meer dan vijftig jaar lokale historie.",
    challenge:
      "De salon had een digitale uitstraling nodig die zowel de lange historie als het actuele aanbod en de persoonlijke aandacht geloofwaardig laat voelen.",
    approach:
      "We combineerden fotografie uit de salon met een krachtig rood-zwart palet, heldere aanbodsecties, de volledige prijslijst en directe telefonische CTA’s.",
    outcome:
      "Een herkenbare website waarop vaste en nieuwe klanten snel hun behandeling, prijs en contactroute vinden.",
    services: ["Merkverhaal", "UX", "Webdesign", "Development"],
    image: "/img/cases/kapsalon-marisa.webp",
    imageAlt: "Homepage van Kapsalon Marisa met een echt beeld uit de salon",
    liveUrl: "https://www.kapsalonmarisa.nl/",
    accent: "#B046FF",
  },
  {
    slug: "dierenartspraktijk-voerendaal",
    title: "Dierenartspraktijk Voerendaal",
    sector: "Diergeneeskunde",
    location: "Voerendaal",
    year: "2026",
    statement: "Zorg, deskundigheid en vertrouwen in één heldere ervaring.",
    summary:
      "Een praktijkwebsite die dertig jaar expertise, het team en de zorgaanpak zichtbaar maakt met echte fotografie en sociaal bewijs.",
    challenge:
      "De website moest medische deskundigheid uitstralen en tegelijk het warme, persoonlijke karakter van de praktijk behouden.",
    approach:
      "We maakten de zorgbelofte, het team, de spoedroute en praktische informatie direct zichtbaar, ondersteund door echte praktijkbeelden en Google-reviews.",
    outcome:
      "Een toegankelijke, geruststellende ervaring die eigenaren snel naar de juiste informatie of contactmogelijkheid brengt.",
    services: ["UX", "Content", "Webdesign", "Development"],
    image: "/img/cases/dierenartspraktijk-voerendaal.webp",
    imageAlt: "Homepage van Dierenartspraktijk Voerendaal met dierenartsen en een hond",
    liveUrl: "https://www.dierenartspraktijkvoerendaal.nl/",
    accent: "#4D78FF",
  },
  {
    slug: "patrik-mouratidis",
    title: "Patrik Mouratidis",
    sector: "Sport & wellness",
    location: "Limburg",
    year: "2026",
    statement: "Een persoonlijke propositie voor herstel en prestaties.",
    summary:
      "Een compacte website die sportmassage, mobilisatie, herstel en voeding samenbrengt in een persoonlijke aanpak.",
    challenge:
      "Meerdere specialismen moesten als één begrijpelijk en professioneel aanbod worden gepresenteerd.",
    approach:
      "We bouwden de site rond Patriks persoonlijke begeleiding, vier expertisegebieden, een uitgebreide FAQ en een directe afspraakroute via WhatsApp.",
    outcome:
      "Een krachtige landingspagina die inhoudelijk vertrouwen opbouwt en de stap naar een afspraak klein maakt.",
    services: ["Positionering", "Copy", "Webdesign", "Development"],
    image: "/img/cases/wellness-therapeut.webp",
    imageAlt: "Homepage van Patrik Mouratidis Sport en Wellness Therapeut",
    liveUrl: "https://www.wellness-therapeut.nl/",
    accent: "#FF6438",
  },
];

export function getRealCase(slug: string) {
  return realCases.find((item) => item.slug === slug);
}
