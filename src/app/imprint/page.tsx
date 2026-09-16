import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Imprint | MEDIADUSTRY" };

export default function ImprintPage() {
    return (
        <LegalPage eyebrow="Bedrijfsgegevens" title="Imprint">
            <LegalSection title="MEDIADUSTRY">
                <p>Eigenaar: Mario Hodzelmans<br />Tenelenweg 11<br />6367 VR Voerendaal<br />Nederland</p>
                <p>Telefoon: <a href="tel:+31624383998">+31 (0)6 243 83 998</a><br />E-mail: <a href="mailto:info@mediadustry.com">info@mediadustry.com</a><br />Website: <a href="https://www.mediadustry.com">www.mediadustry.com</a></p>
            </LegalSection>
            <LegalSection title="Registratie">
                <p>Kamer van Koophandel: 54271932<br />Btw-identificatienummer: NL062176468B02</p>
            </LegalSection>
            <LegalSection title="Juridische kennisgeving">
                <p>Deze website is eigendom van en wordt beheerd door MEDIADUSTRY. Alle rechten op de inhoud en vormgeving zijn voorbehouden. Teksten, afbeeldingen, geluiden en andere onderdelen mogen niet zonder voorafgaande schriftelijke toestemming van MEDIADUSTRY worden gereproduceerd, overgedragen, verspreid of opgeslagen, behalve voor zover de toepasselijke wet dit toestaat. Getoonde merken en logo’s zijn eigendom van MEDIADUSTRY of worden met toestemming gebruikt.</p>
            </LegalSection>
        </LegalPage>
    );
}
