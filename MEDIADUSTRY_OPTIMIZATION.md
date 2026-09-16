# MEDIADUSTRY website — content en technische optimalisatie

## Uitgangspunt

- Modus: strategische optimalisatie van de bestaande Next.js-homepage.
- Primaire conversie: een projectaanvraag via de contactpagina.
- Aanbod: strategie, webdesign, development, headless Shopify en digitale ondersteuning.
- Markt: Nederland, met MEDIADUSTRY gevestigd in Voerendaal.
- Privacy: geen analytics, advertentiepixels of marketingtracking toegevoegd.
- Visuele richting: bestaande Creative Studio-vormgeving en templatebeelden behouden.

## Verwerkte klantreferenties

Alleen de door Mario Hodzelmans aangeleverde klantnamen worden publiek getoond:

- Gemeente Voerendaal
- Gemeente Stein
- Stichting Evenementenmanagement Nouveau Visage
- Bouwservice Peskens
- SerPaCo GmbH & Co. KG
- Dyanne Sleijpen
- Olrik Interim Management
- DOCK Legal Experts B.V.

Factuurnummers, factuurdata, bedragen en betaalstatussen zijn bewust niet in de website of broncode opgenomen.

## Uitgevoerde optimalisaties

- GSAP ScrollSmoother en scroll-normalisatie van de homepage verwijderd.
- Globale custom-cursor en zware pagina-brede animatie-initialisatie verwijderd.
- Native browserscroll hersteld voor directer en voorspelbaarder scrollgedrag.
- Externe autoplayvideo in de hero vervangen door een lokaal geoptimaliseerd templatebeeld.
- Autoplay-logocarrousel vervangen door een statisch, responsive klantenoverzicht.
- `prefers-reduced-motion` toegevoegd voor bezoekers die minder beweging wensen.
- Fontgebruik teruggebracht van negen Google-fontfamilies naar Inter en Space Grotesk met alleen gebruikte gewichten.
- Dubbele externe Google Fonts-import verwijderd.
- Metadata, canonical, Open Graph en LocalBusiness/ProfessionalService JSON-LD toegevoegd.
- `robots.ts` en `sitemap.ts` toegevoegd met alleen de relevante MEDIADUSTRY-routes.
- Basale security headers toegevoegd: nosniff, frame protection, referrer policy en permissions policy.
- Hero-afbeelding krijgt vroege laadprioriteit en een stabiele intrinsieke afmeting.

## Contentprincipes

- Geen verzonnen reviews, awards, cijfers, garanties of schaarste.
- Klantnamen zijn gebaseerd op door de eigenaar aangeleverde informatie.
- Financiële administratie blijft privé.
- Call-to-actions benoemen concreet wat de bezoeker kan doen.

## Open punten

- Juridische pagina’s professioneel laten toetsen voor definitieve compliance.
- Echte projectcases, resultaten en klantlogo’s toevoegen zodra gebruiksrechten zijn bevestigd.
- Contactformulier later koppelen aan een server-side maildienst met validatie, rate limiting en spambeveiliging; momenteel opent het de lokale e-mailclient.
- De resterende ongebruikte demo-routes kunnen in een volgende fase worden verwijderd om repository en deployment verder te verkleinen.
