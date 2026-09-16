import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy & cookies | MEDIADUSTRY" };

export default function PrivacyPage() {
    return (
        <LegalPage eyebrow="Privacy" title="Privacy & cookies" intro="Hoe MEDIADUSTRY persoonsgegevens, cookies en vergelijkbare technologieën gebruikt.">
            <LegalSection title="Verwerkingsverantwoordelijke"><p>MEDIADUSTRY, Tenelenweg 11, 6367 VR Voerendaal, is verantwoordelijk voor de verwerking van persoonsgegevens via deze website. Vragen of privacyverzoeken kun je sturen naar info@mediadustry.com.</p></LegalSection>
            <LegalSection title="Welke gegevens verwerken we?"><p>We kunnen gegevens verwerken die je zelf verstrekt, zoals naam, e-mailadres, telefoonnummer, bedrijfs- en factuurgegevens, de inhoud van een aanvraag en bestelgegevens. Daarnaast kunnen technisch noodzakelijke gegevens worden verwerkt, zoals IP-adres, browserinformatie, apparaat- en gebruiksgegevens.</p></LegalSection>
            <LegalSection title="Waarom verwerken we gegevens?"><p>We gebruiken gegevens om aanvragen te beantwoorden, overeenkomsten uit te voeren, bestellingen en betalingen te verwerken, ondersteuning te bieden, de website veilig en goed werkend te houden en — met toestemming of een andere geldige grondslag — inzicht te krijgen in het gebruik van onze website.</p></LegalSection>
            <LegalSection title="Bewaartermijnen en delen"><p>Gegevens worden niet langer bewaard dan nodig voor het doel waarvoor ze zijn verzameld of zolang een wettelijke bewaarplicht geldt. We delen gegevens alleen met dienstverleners die nodig zijn voor hosting, communicatie, betalingen, administratie of levering, of wanneer de wet dit vereist. Met verwerkers maken we waar nodig afspraken over bescherming van gegevens.</p></LegalSection>
            <LegalSection title="Cookies"><p>Cookies zijn kleine gegevensbestanden die op je apparaat kunnen worden geplaatst. We kunnen strikt noodzakelijke cookies gebruiken voor beveiliging en basisfunctionaliteit. Functionele cookies ondersteunen voorkeuren en functies, zoals video. Analytische cookies helpen het gebruik van de website te begrijpen. Marketingcookies worden alleen gebruikt wanneer daarvoor een geldige grondslag bestaat.</p></LegalSection>
            <LegalSection title="Cookievoorkeuren"><p>Niet-noodzakelijke cookies mogen alleen worden geplaatst nadat je daarvoor toestemming hebt gegeven. Je kunt toestemming later intrekken of cookies via je browser verwijderen. Het uitschakelen van cookies kan onderdelen van de website minder goed laten werken. De daadwerkelijk gebruikte cookies en leveranciers moeten overeenkomen met de actieve cookie-instellingen van deze website.</p></LegalSection>
            <LegalSection title="Jouw rechten"><p>Afhankelijk van de situatie kun je verzoeken om inzage, correctie, verwijdering, beperking, overdracht of bezwaar. Je kunt toestemming altijd intrekken. Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.</p></LegalSection>
            <LegalSection title="Wijzigingen"><p>Dit beleid kan worden bijgewerkt wanneer onze website, leveranciers of wettelijke verplichtingen veranderen. Controleer deze pagina daarom regelmatig.</p></LegalSection>
        </LegalPage>
    );
}
