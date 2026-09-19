import type { Showcase } from "@/lib/showcase/types";

const constructionTheme = {
  background: "#eee9df",
  foreground: "#22211f",
  accent: "#c7592f",
  muted: "#716d65",
  surface: "#f8f4ec",
  headingFont: "var(--font-manrope)",
  bodyFont: "var(--font-manrope)",
  radius: "0px",
  direction: "light" as const,
};

export const showcases: Showcase[] = [
  {
    slug: "alex-kamsma-parket-demo",
    type: "demo",
    client: "Alex Kamsma Design Parket",
    title: "Een vloer die precies goed voelt.",
    subtitle: "Een digitale richting voor persoonlijk vakmanschap.",
    description: "Een MEDIADUSTRY-concept voor Alex Kamsma Design Parket.",
    cover: "https://www.alexkamsmaparket.nl/hero-interior-v2.jpg",
    category: "Persoonlijk concept",
    year: "2026",
    theme: constructionTheme,
    seo: { title: "Alex Kamsma Design Parket — websiteconcept", description: "Interactief websiteconcept voor Alex Kamsma Design Parket.", noindex: true },
    blocks: [
      { type: "hero", eyebrow: "Alex Kamsma × MEDIADUSTRY", title: "Een vloer die precies goed voelt.", lead: "Persoonlijk advies, ambachtelijke plaatsing en een digitale presentatie die hetzelfde vertrouwen uitstraalt.", image: "https://www.alexkamsmaparket.nl/hero-interior-v2.jpg", imageAlt: "Lichte woonkamer met een eikenhouten vloer", meta: ["Parket", "PVC", "Renovatie", "Trappen"] },
      { type: "statement", eyebrow: "De richting", title: "Vakmanschap dat je online kunt voelen.", body: "Een rustige, hoogwaardige website waarin materiaal, afwerking en persoonlijke aandacht centraal staan. Beeld krijgt de ruimte en iedere dienst leidt logisch naar advies aan huis." },
      { type: "gallery", eyebrow: "Specialismen", title: "Van vloer tot laatste detail", images: [
        { src: "https://www.alexkamsmaparket.nl/parket-hero.jpg", alt: "Ambachtelijk parket" },
        { src: "https://www.alexkamsmaparket.nl/pvc-interior-v2.jpg", alt: "Moderne PVC-vloer in een interieur" },
        { src: "https://www.alexkamsmaparket.nl/stair-interior-v2.jpg", alt: "Gerenoveerde trap met houten treden" },
      ] },
      { type: "services", eyebrow: "Vertrouwen", title: "Waarom klanten voor Alex kiezen", items: [
        { title: "Persoonlijk advies", text: "Vrijblijvend advies aan huis, afgestemd op woning, gebruik en smaak." },
        { title: "Vakkundige plaatsing", text: "Parket, PVC, laminaat en trappen met aandacht voor iedere afwerking." },
        { title: "Duurzame kwaliteit", text: "Een sterke basis, minimaal vijf jaar garantie en duidelijke nazorg." },
      ] },
      { type: "process", eyebrow: "Werkwijze", title: "Van advies tot perfecte afwerking", items: [
        { title: "01 — Kennismaken", text: "Wensen, ruimte en technische mogelijkheden bespreken." },
        { title: "02 — Kiezen", text: "Materiaal, legpatroon, ondergrond en afwerking bepalen." },
        { title: "03 — Realiseren", text: "Vakkundig plaatsen, renoveren en zorgvuldig opleveren." },
      ] },
      { type: "cta", eyebrow: "Persoonlijk advies", title: "Welke vloer past bij jouw huis?", label: "Vraag advies aan", href: "/contact" },
    ],
  },
  {
    slug: "alex-kamsma-parket",
    type: "concept",
    client: "Alex Kamsma Design Parket",
    title: "Vakmanschap dat online net zo goed voelt.",
    subtitle: "We hebben onderzocht hoe een nieuwe digitale richting eruit kan zien.",
    description: "Een persoonlijk websitevoorstel voor Alex Kamsma Design Parket.",
    cover: "https://www.alexkamsmaparket.nl/hero-interior-v2.jpg",
    category: "Persoonlijk concept",
    year: "2026",
    theme: { ...constructionTheme, background: "#f3efe6", accent: "#d46537" },
    seo: { title: "Alex Kamsma Design Parket — persoonlijk concept", description: "Een persoonlijk en vertrouwelijk websiteconcept.", noindex: true },
    proposal: { proposalId: "PROP-2026-001", version: 1, createdAt: "2026-09-18", validUntil: "2026-10-18" },
    blocks: [
      { type: "hero", eyebrow: "Alex Kamsma × MEDIADUSTRY", title: "Vakmanschap dat online net zo goed voelt.", lead: "Wij zijn je alvast voor en laten zien hoe je toekomstige website eruit kan zien.", meta: ["Persoonlijk concept", "18 september 2026"] },
      { type: "browserDemo", demoUrl: "https://www.alexkamsmaparket.nl/", externalUrl: "https://www.alexkamsmaparket.nl/", height: 560, allowInteraction: true },
      { type: "problem", eyebrow: "De kans", title: "Een sterke vloer verdient een sterk podium.", body: "Potentiële klanten maken steeds vaker online kennis met een bedrijf. Daarom moeten vindbaarheid, uitstraling en gebruiksgemak direct vertrouwen wekken. De website die wij aanbieden is snel, professioneel en ontworpen om het vakmanschap van Alex Kamsma overtuigend te presenteren. Zo investeer je niet alleen in het bedrijf offline, maar ook in een sterke online basis die langdurig werkt." },
      { type: "services", eyebrow: "Scope", title: "Wat MEDIADUSTRY realiseert", items: [
        { title: "Strategie & structuur", text: "Sitemap, contenthiërarchie en conversieroutes." },
        { title: "UX & visual design", text: "Volledig responsive maatwerkontwerp." },
        { title: "Next.js development", text: "Snelle, toegankelijke en schaalbare realisatie." },
        { title: "Lancering", text: "Technische inrichting, redirects en kwaliteitscontrole." },
      ] },
      { type: "pricing", eyebrow: "Investering", title: "Duidelijk en compleet", label: "Website development", amount: "€ 2.750", note: "Exclusief btw. Voorstel geldig t/m 18 oktober 2026.", items: ["Strategie en ontwerp", "Responsive development", "Technische oplevering", "30 dagen nazorg"] },
      { type: "cta", title: "Klaar om te beginnen?", body: "Plan een gesprek en we maken het voorstel definitief.", label: "Neem contact op", href: "/contact" },
    ],
  },
  {
    slug: "gemeente-voerendaal",
    type: "case",
    client: "Gemeente Voerendaal",
    title: "Creatieve communicatie dichtbij.",
    subtitle: "Campagne, design en digitale communicatie.",
    description: "Een selectie van creatief en digitaal werk voor Gemeente Voerendaal.",
    cover: "/img/works/1920x1280_pr01.webp",
    category: "Campagne · Design · Communicatie",
    year: "2026",
    theme: { background: "#ecebe7", foreground: "#11120f", accent: "#4f62d7", muted: "#666760", surface: "#f6f5f1", radius: "0px", direction: "light" },
    seo: { title: "Gemeente Voerendaal — case", description: "Creatieve communicatie en digitaal design voor Gemeente Voerendaal." },
    blocks: [
      { type: "hero", eyebrow: "Gemeente Voerendaal × MEDIADUSTRY", title: "Creatieve communicatie dichtbij.", lead: "Heldere vormgeving en digitale middelen die publieke communicatie toegankelijk maken.", image: "/img/works/1920x1280_pr01.webp", imageAlt: "Creatief project voor Gemeente Voerendaal", meta: ["Campagne", "Design", "Digitaal"] },
      { type: "intro", eyebrow: "Samenwerking", title: "Duidelijk voor iedere inwoner.", body: "Van visuele richting tot digitale uitwerking: communicatie die herkenbaar, toegankelijk en direct toepasbaar is." },
      { type: "gallery", images: [{ src: "/img/works/700x700_pr01.webp", alt: "Projectbeeld Gemeente Voerendaal" }, { src: "/img/works/1920x1280_pr01.webp", alt: "Digitale uitwerking Gemeente Voerendaal" }] },
      { type: "cta", title: "Ook een verhaal helder in beeld brengen?", label: "Start een project", href: "/contact" },
    ],
  },
  {
    slug: "gemeente-stein",
    type: "case",
    client: "Gemeente Stein",
    title: "Een digitale richting met structuur.",
    subtitle: "Concept, webdesign en content.",
    description: "Een digitaal project voor Gemeente Stein.",
    cover: "/img/works/1920x1280_pr02.webp",
    category: "Concept · Webdesign · Development",
    year: "2026",
    theme: { background: "#101116", foreground: "#f4f2ed", accent: "#cf68ef", muted: "#aaaab1", surface: "#191b23", radius: "0px", direction: "dark" },
    seo: { title: "Gemeente Stein — case", description: "Concept, webdesign en digitale ontwikkeling voor Gemeente Stein." },
    blocks: [
      { type: "hero", eyebrow: "Gemeente Stein × MEDIADUSTRY", title: "Digitale richting met structuur.", lead: "Een helder samenspel van concept, content en interface.", image: "/img/works/1920x1280_pr02.webp", imageAlt: "Digitaal project voor Gemeente Stein", meta: ["Concept", "Webdesign", "Content"] },
      { type: "intro", eyebrow: "De aanpak", title: "Content als vertrekpunt.", body: "Een digitale structuur waarin informatie snel vindbaar is en de visuele identiteit consequent doorwerkt." },
      { type: "gallery", images: [{ src: "/img/works/700x700_pr02.webp", alt: "Projectbeeld Gemeente Stein" }, { src: "/img/works/1920x1280_pr02.webp", alt: "Digitale uitwerking Gemeente Stein" }] },
      { type: "cta", title: "Samen een digitale richting bepalen?", label: "Neem contact op", href: "/contact" },
    ],
  },
  {
    slug: "serpaco-digital-experience",
    type: "case",
    client: "SerPaCo",
    title: "Een schaalbare digitale ervaring.",
    subtitle: "Strategie, design, development en support.",
    description: "Digitale ervaring en ondersteuning voor SerPaCo.",
    cover: "/img/works/1920x1280_pr03.webp",
    category: "Strategie · Design · Development",
    year: "2025",
    theme: { background: "#e9edf3", foreground: "#101319", accent: "#e95835", muted: "#626872", surface: "#f7f9fb", radius: "2px", direction: "light" },
    seo: { title: "SerPaCo digital experience — case", description: "Strategie, design, development en support voor SerPaCo." },
    blocks: [
      { type: "hero", eyebrow: "SerPaCo × MEDIADUSTRY", title: "Een schaalbare digitale ervaring.", lead: "Strategie en techniek samengebracht in een basis die kan blijven groeien.", image: "/img/works/1920x1280_pr03.webp", imageAlt: "Digitale ervaring voor SerPaCo", meta: ["Strategie", "Design", "Development"] },
      { type: "intro", eyebrow: "De samenwerking", title: "Van richting naar doorontwikkeling.", body: "Een praktische digitale samenwerking waarin ontwerp, techniek en ondersteuning op elkaar aansluiten." },
      { type: "gallery", images: [{ src: "/img/works/700x700_pr03.webp", alt: "Projectbeeld SerPaCo" }, { src: "/img/works/1920x1280_pr03.webp", alt: "Digitale uitwerking SerPaCo" }] },
      { type: "cta", title: "Een digitale partner nodig?", label: "Maak kennis", href: "/contact" },
    ],
  },
  {
    slug: "mediadustry-digital-foundation",
    type: "case",
    client: "MEDIADUSTRY",
    title: "Een digitaal fundament dat blijft bewegen.",
    subtitle: "Strategie, AI en digitale impact in één helder systeem.",
    description: "De nieuwe digitale identiteit en headless basis van MEDIADUSTRY.",
    cover: "/img/cta/mediadustry-services/service-03.webp",
    category: "Branding · Webdesign · Development",
    year: "2026",
    theme: { background: "#08090d", foreground: "#f5f3ef", accent: "#8798ff", muted: "#a7a8ae", surface: "#12141d", radius: "2px", direction: "dark" },
    seo: { title: "MEDIADUSTRY digital foundation", description: "Een kijkje in de digitale herpositionering van MEDIADUSTRY." },
    blocks: [
      { type: "hero", eyebrow: "MEDIADUSTRY × MEDIADUSTRY", title: "Een fundament dat blijft bewegen.", lead: "Een headless merkervaring waarin strategie, beeld en technologie samenkomen.", image: "/img/cta/mediadustry-services/service-03.webp", imageAlt: "Gelaagde digitale interface", meta: ["Brand system", "Next.js", "2026"] },
      { type: "intro", eyebrow: "De opdracht", title: "Een eigen podium voor digitaal werk.", body: "De identiteit moest volwassen, flexibel en uitgesproken worden—zonder snelheid en eenvoud te verliezen." },
      { type: "gallery", title: "Het systeem in beeld", images: [
        { src: "/img/cta/mediadustry-services/service-06.webp", alt: "Abstract digitaal materiaal" },
        { src: "/img/cta/mediadustry-services/service-12.webp", alt: "Driedimensionale digitale vorm" },
      ] },
      { type: "results", title: "Het resultaat", items: [{ value: "100", label: "SEO & best practices" }, { value: "1", label: "Herkenbaar digitaal systeem" }, { value: "∞", label: "Ruimte om door te groeien" }] },
      { type: "cta", title: "Ook bouwen aan een sterker digitaal fundament?", label: "Start een project", href: "/contact" },
    ],
  },
];

export function getShowcase(type: Showcase["type"], slug: string) {
  return showcases.find((item) => item.type === type && item.slug === slug);
}

export function getShowcases(type: Showcase["type"]) {
  return showcases.filter((item) => item.type === type);
}
