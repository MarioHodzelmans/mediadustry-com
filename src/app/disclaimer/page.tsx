import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Disclaimer | MEDIADUSTRY" };

export default function DisclaimerPage() {
    return (
        <LegalPage eyebrow="Juridisch" title="Disclaimer" intro="Versie januari 2024 — van toepassing op mediadustry.com.">
            <LegalSection title="Gebruik van de website"><p>De informatie op deze website is uitsluitend bedoeld als algemene informatie. Aan de inhoud kunnen geen rechten worden ontleend. Hoewel MEDIADUSTRY de website zorgvuldig samenstelt en onderhoudt, kunnen wij niet instaan voor de juistheid, volledigheid en actualiteit van alle informatie of voor een foutloze en ononderbroken werking. De aanschaf van producten of diensten garandeert geen specifiek resultaat; uitkomsten verschillen per organisatie en situatie.</p></LegalSection>
            <LegalSection title="Informatie, producten en diensten van derden"><p>Links naar websites van derden betekenen niet dat MEDIADUSTRY hun inhoud, producten of diensten onderschrijft. MEDIADUSTRY is niet verantwoordelijk voor de inhoud, het gebruik of de beschikbaarheid van externe websites. Het gebruik van dergelijke links is voor eigen risico.</p></LegalSection>
            <LegalSection title="Gebruik van informatie"><p>MEDIADUSTRY behoudt alle intellectuele-eigendomsrechten en overige rechten op informatie die via deze website wordt aangeboden, waaronder teksten, grafisch materiaal en logo’s. Kopiëren, publiceren, verspreiden of reproduceren is zonder voorafgaande schriftelijke toestemming of een andere wettelijke grondslag niet toegestaan. Afdrukken of downloaden voor persoonlijk gebruik is toegestaan.</p></LegalSection>
            <LegalSection title="Wijzigingen"><p>MEDIADUSTRY kan informatie op deze website en deze disclaimer op ieder moment aanpassen. Controleer deze pagina regelmatig op wijzigingen.</p></LegalSection>
            <LegalSection title="Toepasselijk recht"><p>Op deze website en disclaimer is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland, voor zover dwingend recht niet anders bepaalt.</p></LegalSection>
        </LegalPage>
    );
}
