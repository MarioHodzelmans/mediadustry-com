import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Algemene voorwaarden | MEDIADUSTRY" };

const sections = [
    ["1. Inleiding", "Deze voorwaarden zijn van toepassing op het gebruik van mediadustry.com, de gekoppelde Shopify-webshop en de daarbij aangeboden digitale producten en diensten. Door de website of webshop te gebruiken, ga je akkoord met deze voorwaarden, het privacybeleid en aanvullende voorwaarden waarnaar wordt verwezen."],
    ["2. Gebruik van onze diensten", "MEDIADUSTRY biedt digitale producten en diensten aan. Gebruikers zijn verantwoordelijk voor het vertrouwelijk en veilig houden van hun account- en inloggegevens. MEDIADUSTRY kan accounts beëindigen en inhoud verwijderen of aanpassen wanneer dit voor veiligheid, misbruikpreventie of naleving noodzakelijk is."],
    ["3. Producten en diensten", "Producten, licenties en diensten mogen uitsluitend worden gebruikt volgens de beschrijving, offerte of licentievoorwaarden die bij de aankoop horen. Doorverkoop, overdracht of commercieel hergebruik is niet toegestaan, tenzij MEDIADUSTRY dit schriftelijk heeft toegestaan."],
    ["4. Juistheid van informatie", "Wij beschrijven producten en diensten zo zorgvuldig mogelijk. Voor zover wettelijk toegestaan garanderen wij niet dat beschrijvingen, kleuren, informatie of andere inhoud altijd volledig, actueel of foutloos zijn."],
    ["5. Intellectueel eigendom", "Alle grafische elementen, afbeeldingen, inhoud, software en andere materialen op de website en webshop zijn van MEDIADUSTRY of diens licentiegevers en worden beschermd door toepasselijke intellectuele-eigendomsrechten. Gebruik buiten het normale gebruik van de dienst vereist voorafgaande schriftelijke toestemming."],
    ["6. Betaling en facturatie", "Betaling vindt plaats via de betaalmethoden die in de webshop of offerte worden aangeboden. Betalingen kunnen door externe betaaldienstverleners worden verwerkt; hun aanvullende voorwaarden en privacybeleid kunnen van toepassing zijn."],
    ["7. Levering", "Digitale producten worden geleverd op de wijze en binnen de termijn die bij het aanbod staat vermeld. Voor diensten gelden de planning, afhankelijkheden en oplevermomenten uit de betreffende offerte of opdrachtbevestiging."],
    ["8. Annulering, retouren en restituties", "Voor digitale inhoud en maatwerkdiensten kunnen wettelijke uitzonderingen op het herroepingsrecht gelden, met name wanneer levering met uitdrukkelijke voorafgaande instemming is begonnen. Eventuele aanvullende voorwaarden voor annulering of restitutie staan bij het product, de dienst of in de offerte."],
    ["9. Garantie en aansprakelijkheid", "Wij garanderen niet dat iedere dienst ononderbroken of foutloos beschikbaar is, of dat het gebruik daarvan een specifiek bedrijfsresultaat oplevert. Aansprakelijkheid wordt beperkt voor zover de toepasselijke wet dit toestaat; wettelijke rechten van consumenten blijven onverlet."],
    ["10. Vrijwaring", "Je bent verantwoordelijk voor schade of aanspraken van derden die voortkomen uit onrechtmatig gebruik van onze diensten, schending van deze voorwaarden of inbreuk op rechten van derden, voor zover dit volgens de toepasselijke wet aan jou kan worden toegerekend."],
    ["11. Deelbaarheid", "Wanneer een bepaling ongeldig of niet-afdwingbaar blijkt, blijven de overige bepalingen van kracht. De ongeldige bepaling wordt voor zover mogelijk vervangen door een geldige bepaling met een vergelijkbare strekking."],
    ["12. Beëindiging", "Verplichtingen en aansprakelijkheden die naar hun aard na beëindiging voortduren, blijven van kracht."],
    ["13. Wijzigingen", "MEDIADUSTRY kan deze voorwaarden aanpassen. De actuele versie wordt op deze website gepubliceerd. Materiële wijzigingen gelden niet met terugwerkende kracht, tenzij de wet dit toestaat."],
    ["14. Contact", "Vragen over deze voorwaarden kun je sturen naar info@mediadustry.com."],
];

export default function TermsPage() {
    return <LegalPage eyebrow="Juridisch" title="Algemene voorwaarden" intro="Voor het gebruik van de website, webshop en diensten van MEDIADUSTRY.">{sections.map(([title, text]) => <LegalSection key={title} title={title}><p>{text}</p></LegalSection>)}</LegalPage>;
}
