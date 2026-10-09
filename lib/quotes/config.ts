import { createHash, timingSafeEqual } from "node:crypto";
import { calculatePaymentSplit } from "./money.mjs";

export const quoteConfig = {
  id: process.env.DIETWIEJ_QUOTE_ID ?? "",
  version: "1.6",
  customerName: "Gastrobar Die Twie",
  organization: "Gastrobar Die Twie",
  totalCents: 235950,
  websiteCents: 185000,
  outlookCents: 10000,
  currency: "EUR",
  issuedOn: "2026-10-09",
  termsVersion: process.env.DIETWIEJ_TERMS_VERSION ?? "",
  termsText: process.env.DIETWIEJ_TERMS_TEXT ?? "",
} as const;

const split = calculatePaymentSplit(quoteConfig.totalCents);

export const quoteContent = {
  title: "Websitevernieuwing en Microsoft Outlook 365",
  introduction:
    "Een gastvrije, heldere website die laat zien wat Die Twie bijzonder maakt, met praktische informatie die ook op mobiel prettig werkt. Met ruimte voor de persoonlijke benadering én de manier van reserveren die bij de gast past.",
  context: [
    "Die Twie heeft al een persoonlijk verhaal, praktische informatie, een beveiligde websiteverbinding en bestaande Google Reviews. De vernieuwing bouwt daarop voort en maakt de eerste indruk en de belangrijkste informatie duidelijker, met extra aandacht voor mobiele bezoekers.",
    "De menukaarten worden beter leesbaar, de Nederlandse en Engelse inhoud consistenter en de basis voor technische en lokale vindbaarheid sterker. De vertrouwde persoonlijke benadering blijft behouden; waar passend kan online gemak daarop aanvullend aansluiten.",
  ],
  websiteServices: [
    "Vernieuwing van de website met een warme, passende uitstraling voor Gastrobar Die Twie.",
    "Mobielvriendelijke opbouw met een duidelijke navigatie.",
    "Een sterke eerste indruk met een korte uitleg van Die Twie, direct telefonisch contact en een duidelijke plek voor eventueel online reserveren.",
    "Een heldere pagina-indeling voor bijvoorbeeld Home, Menukaart, Over Die Twie en Contact.",
    "Menukaartinformatie als leesbare webtekst, zodat gasten de kaart ook op hun telefoon goed kunnen bekijken.",
    "Een duidelijke weergave van openingstijden, locatie, contactgegevens en reserveringsinformatie.",
    "Technische basisoptimalisatie voor zoekmachines: paginatitels, meta descriptions, socialmediavoorvertoningen en gestructureerde bedrijfsinformatie waar technisch mogelijk.",
    "Basisoptimalisatie van aangeleverde afbeeldingen voor gebruik op de website.",
    "Een kleine update van de huidige vindbaarheid in Google en AI-zoekomgevingen. Op basis van mijn eigen kennis voeg ik een beknopte momentopname en praktische aandachtspunten toe. Dit is geen uitgebreide SEO-campagne en biedt geen garantie op posities of AI-vermeldingen.",
  ],
  reservations:
    "De persoonlijke benadering en telefonisch reserveren blijven waardevol, zeker voor een dorpszaak als Die Twie. Ik adviseer online reserveren als belangrijke aanvulling: gasten kunnen op hun eigen moment een tafel aanvragen en hoeven niet af te haken wanneer bellen niet uitkomt. De passende oplossing en eventuele koppeling stemmen we apart af.",
  reservationEvidence: [
    {
      claim:
        "De NOS meldde op basis van de Restaurant Monitor 2023 dat 79% van de reserveringen online werd gemaakt.",
      source: "NOS · Restaurant Monitor 2023",
      url: "https://nos.nl/artikel/2474594-spontaan-uit-eten-steeds-lastiger-we-reserveren-meer-en-eerder",
    },
    {
      claim:
        "OOvB berichtte in april 2024 dat het aandeel volgens onderzoek van een reserveringsplatform boven de 80% uitkwam.",
      source: "OOvB · online reserveringen stijgen",
      url: "https://www.oovb.nl/nieuws/online-reserveringen-stijgen",
    },
    {
      claim:
        "In consumentenonderzoek uit 2024 vond 77% het belangrijk een online reservering zelf te kunnen wijzigen of annuleren; 87% zei sneller te reserveren bij een restaurant met een online systeem.",
      source: "De RestaurantKrant · Lightspeed/Zenchef-onderzoek",
      url: "https://www.derestaurantkrant.nl/ruim-driekwart-nederlanders-wil-online-reservering-in-horeca-zelf-kunnen-beheren",
    },
    {
      claim:
        "In datzelfde onderzoek ontdekte 34% nieuwe restaurants via culinaire websites en 22% via apps om restaurants te ontdekken.",
      source: "De RestaurantKrant · Lightspeed/Zenchef-onderzoek",
      url: "https://www.derestaurantkrant.nl/ruim-driekwart-nederlanders-wil-online-reservering-in-horeca-zelf-kunnen-beheren",
    },
    {
      claim:
        "Een afzonderlijk consumentenonderzoek uit 2023 liet ook zien dat 72% het liefst telefonisch reserveerde.",
      source: "De RestaurantKrant · Lightspeed/OnePoll-onderzoek",
      url: "https://www.derestaurantkrant.nl/voorschot-bij-reservering-zorgt-voor-onbegrip-bij-horegast",
    },
  ],
  reservationRecommendation:
    "Het kosteloze vooronderzoek levert drie passende opties op. Guestplan is mijn eerste voorkeursoptie vanwege de directe Google-koppeling. GoTable en Zenchef nemen we mee als alternatieven; de definitieve keuze stemmen we af op het gebruik bij Die Twie.",
  reservationOptions: [
    {
      name: "Guestplan · eerste voorkeursoptie",
      url: "https://www.guestplan.com/online-reservations/",
      description:
        "Reserveren via de website én rechtstreeks via Google Zoeken en Google Maps met Reserve with Google.",
    },
    {
      name: "GoTable",
      url: "https://www.gotable.app/",
      description:
        "Combineert telefonische, website- en Google-reserveringen. De precieze Google-koppeling en activering voor Die Twie controleren we bij de aanbieder.",
    },
    {
      name: "Zenchef",
      url: "https://help.zenchef.com/hc/nl/articles/16644935066397-Reserve-with-Google",
      description:
        "Ondersteunt Reserve with Google, waarmee gasten rechtstreeks vanuit Google Zoeken en Google Maps een tafel kunnen boeken.",
    },
  ],
  reservationScope:
    "Een reserveringssysteem, abonnement of technische koppeling is niet opgenomen in deze offerteprijs. Als Die Twie dit wil verkennen, kunnen we de passende oplossing en eventuele kosten apart bespreken.",
  hosting:
    "De website komt op premium hosting, met aandacht voor snelheid, beschikbaarheid en een technisch goed bereikbare basis voor indexatie. Het eerste hostingjaar is inbegrepen dankzij € 300 hostingkorting. Vanaf het tweede jaar kost hosting € 300 per jaar (€ 25 per maand), exclusief btw. De eenmalige investering bedraagt € 1.950 exclusief btw.",
  outlookScope:
    "Inrichting van één extra zakelijk e-mailadres binnen Microsoft Outlook 365, bijvoorbeeld facturen@dietwie.nl.",
  outlookConditions:
    "De vaste prijs van € 100 excl. btw geldt wanneer Die Twie de installatie en aanmelding op de eigen laptop en mobiele telefoon zelf kan uitvoeren. Hulp bij installatie op laptop of mobiel is niet in deze vaste prijs inbegrepen; als dat nodig is, stemmen we dit vooraf apart af.",
  annualLicense:
    "Een extra Outlook-e-mailadres kost bij de bestaande leverancier van de klant € 75 excl. btw per jaar. Dit is een terugkerende externe licentiekost, geen bedrag dat MEDIADUSTRY ontvangt.",
  photography:
    "Voor een gastvrije horecawebsite zijn sterke, professionele foto’s een waardevolle investering. Ik raad aan om een gespecialiseerde foodfotograaf in te schakelen, zodat de gerechten, sfeer en locatie goed tot hun recht komen. Ter inspiratie: Jeroen Jorissen (https://www.instagram.com/jeroenjorissen/) en Guy Houben Photo (https://www.instagram.com/guyhoubenphoto/). Dit zijn voorbeelden, geen bevestigde partners of prijsafspraken. Gespecialiseerde foodfotografie valt doorgaans in een hoger prijssegment. De kosten hangen af van de wensen en omvang van de shoot. Fotografie is niet inbegrepen; Dyanne kan eventueel meekijken naar een passende fotograaf of aanpak.",
  googleReviews:
    "De Google Reviews en de huidige beoordeling van Die Twie zien er goed uit. Blijf gasten actief uitnodigen om een review achter te laten en blijf zorgvuldig reageren op feedback. Reviews geven nieuwe bezoekers vertrouwen wanneer zij via de website kennismaken met Die Twie. Ze dragen ook bij aan lokale vindbaarheid en zijn relevante signalen voor zoekmachines en AI-systemen, nu en in de toekomst. Een goede beoordeling helpt, maar geeft geen garantie op een bepaalde positie of vermelding.",
  exclusions: [
    "Professionele fotografie is niet inbegrepen.",
    "Extra hulp bij installatie op laptop of mobiel is niet inbegrepen en wordt vooraf apart afgestemd.",
    "Een online reserveringssysteem, abonnement of technische koppeling is niet inbegrepen; deze kan desgewenst apart worden besproken.",
    "Er is geen oplevertermijn of betaaltermijn overeengekomen in deze offerte.",
  ],
  workflow: [
    "Na akkoord stemmen we de gewenste inhoud en benodigde materialen samen af.",
    "We bespreken welke actuele menukaart, openingstijden, teksten en foto’s beschikbaar zijn. Als aanvullende fotografie gewenst is, bespreken we samen de mogelijkheden en eventuele kosten; fotografie is niet inbegrepen in deze offerte.",
    "Na akkoord en ontvangst van het materiaal bepalen we de planning in overleg.",
  ],
  summaryOutcomes: [
    "Een betere ervaring voor mobiele bezoekers.",
    "Een duidelijkere presentatie van Die Twie en het aanbod.",
    "Een goed leesbare menukaart op telefoon en desktop.",
    "Een duidelijke telefonische contactmogelijkheid en een aanbeveling om online reserveren als aanvulling te verkennen.",
    "Een extra zakelijk e-mailadres, bijvoorbeeld voor facturen.",
  ],
} as const;

export const quoteSnapshot = {
  id: quoteConfig.id,
  version: quoteConfig.version,
  customer: quoteConfig.customerName,
  organization: quoteConfig.organization,
  currency: quoteConfig.currency,
  totalCents: quoteConfig.totalCents,
  downPaymentCents: split.downPaymentCents,
  remainingCents: split.remainingCents,
  issuedOn: quoteConfig.issuedOn,
  content: quoteContent,
  items: [
    {
      description: "Websitevernieuwing",
      amountCents: quoteConfig.websiteCents,
    },
    {
      description: "Eenmalige Outlook 365-inrichting",
      amountCents: quoteConfig.outlookCents,
    },
  ],
  vatRatePercent: 21,
  vatCents: 40950,
  annualExternalLicenseCents: 7500,
  annualHostingCents: 30000,
  firstYearHostingDiscountCents: 30000,
  firstYearHostingPayableCents: 0,
  telephoneReservationsRemainAvailable: true,
  onlineReservationSystemIncluded: false,
  excludesPhotographyAndAdditionalDeviceSupport: true,
  termsVersion: quoteConfig.termsVersion,
  termsText: quoteConfig.termsText,
} as const;

export const quoteSnapshotJson = JSON.stringify(quoteSnapshot);
export const quoteSnapshotSha256 = createHash("sha256")
  .update(quoteSnapshotJson)
  .digest("hex");

export function isAcceptanceReady() {
  const retentionDays = Number(process.env.QUOTE_EVIDENCE_RETENTION_DAYS);
  const accessToken = process.env.DIETWIEJ_ACCESS_TOKEN ?? "";
  const iban = (process.env.ING_IBAN ?? "").replaceAll(" ", "").toUpperCase();
  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`.replace(
    /[A-Z]/g,
    (letter) => String(letter.charCodeAt(0) - 55),
  );
  let ibanChecksum = 0;
  for (const digit of rearranged)
    ibanChecksum = (ibanChecksum * 10 + Number(digit)) % 97;
  const validIban =
    /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban) && ibanChecksum === 1;
  return Boolean(
    quoteConfig.id &&
    quoteConfig.termsVersion &&
    quoteConfig.termsText &&
    Buffer.byteLength(accessToken) >= 32 &&
    process.env.DATABASE_URL &&
    process.env.QUOTE_ADMIN_PASSWORD &&
    process.env.QUOTE_ADMIN_PASSWORD.length >= 20 &&
    process.env.QUOTE_ADMIN_SECRET &&
    Buffer.byteLength(process.env.QUOTE_ADMIN_SECRET) >= 32 &&
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.QUOTE_ADMIN_ID &&
    Number.isInteger(retentionDays) &&
    retentionDays > 0 &&
    process.env.CRON_SECRET &&
    Buffer.byteLength(process.env.CRON_SECRET) >= 32 &&
    process.env.ING_BENEFICIARY_NAME &&
    validIban,
  );
}

export function validCustomerToken(token: string) {
  const expected = process.env.DIETWIEJ_ACCESS_TOKEN ?? "";
  const actualBytes = Buffer.from(token);
  const expectedBytes = Buffer.from(expected);
  if (expectedBytes.length < 32 || actualBytes.length !== expectedBytes.length)
    return false;
  return timingSafeEqual(actualBytes, expectedBytes);
}

export function paymentReference(kind: "ANBETALING" | "RESTANT") {
  return `${kind} ${quoteConfig.id}`;
}
