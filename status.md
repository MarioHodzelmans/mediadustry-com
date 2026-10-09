# MEDIADUSTRY — status

Bijgewerkt: 2026-10-09.

**Huidige opdracht — offertebevestiging, akkoordtekst en headerlogo:** klantmail gebruikt alleen de voornaam, benoemt een lange samenwerking en vertrouwen in het rendement. De e-mailbody en “Met vriendelijke groet” delen dezelfde Arial-maatvoering. De klantweergave noemt het onderdeel “Akkoord” en de knop “Akkoord en doorgaan naar betaling”. Beeldmerk en woordmerk zijn verkleind op desktop en mobiel in beide gedeelde headerimplementaties; homepage-inhoud bleef ongemoeid. Commit `3d36d6c` staat op GitHub `main`; Vercel Production-deployment `dpl_Gow6pLmLAR8Z4x9MPUV3sRmnpVsx` is READY.

**Werkelijk gecontroleerd:** Prettier, `npx tsc --noEmit`, `npm run build` inclusief header-pariteitscontrole en `git diff --check` geslaagd. Geen e-mail verzonden of offerte geaccepteerd.

**Huidige opdracht — e-mailhandtekening en akkoordbevestiging:** er is een losse, Outlook-vriendelijke HTML-handtekening gemaakt in `docs/email-signature.html`. De Resend-klantbevestiging na offerteakkoord is vormgegeven met MEDIADUSTRY-logo/contactblok, akkoordmoment en uitsluitend het offertebedrag exclusief btw. De aanbetalingsmail blijft een aparte e-mail. Commit `f60b862` staat op GitHub `main`; Vercel Production-deployment `dpl_ADwjYyvBFFebNQqroDUnrMCKuWCS` is READY. Op verzoek is één expliciet als voorbeeld gemarkeerde mail via Resend verzonden; Resend meldt `delivered` (ID `01a12142-04c9-7b31-b710-6197d737743d`). Er heeft geen echte offerteacceptatie of betaling plaatsgevonden. De automatische acceptatieflow is nog niet beschikbaar door ontbrekende configuratie.

**Werkelijk gecontroleerd:** `npx prettier --write` voor de gewijzigde code- en documentbestanden, `npx tsc --noEmit`, `npm run build` en `git diff --check` zijn geslaagd. De voorbeeldmail is als `delivered` bevestigd via de Resend-emailstatus. Homepagebestanden in het aparte hoofdproject zijn niet gewijzigd.

**Laatste wijziging — e-mailhandtekeninglogo:** de bestaande generieke assets zijn vervangen door het door de eigenaar aangeleverde MEDIADUSTRY-icon als zwart transparant beeldmerk. `public/logo.svg` gebruikt expliciet `#000000`; `public/logo.png` is transparant en 1110×1099 px. Commit `81be4b2` staat op GitHub `main`; Vercel Production-deployment `dpl_9FPFyFK9bMaKp7mXEhefjqTe7cJY` is READY. Live `/logo.png` is transparante 1110×1099 PNG en `/logo.svg` bevat expliciet zwart. Beide assets zijn na cacheverversing byte voor byte gelijk aan de lokale bestanden (HTTP 200). **Laatste wijziging — Resend-ontvangers:** bij digitale acceptatie wordt een ontvangstbevestiging naar de klant en een interne acceptatiemelding naar `info@mediadustry.com` klaargezet. Alle betaalstatusmails gaan alleen naar de klant. De server-side Resend-outbox gebruikt idempotency keys. `npx tsc --noEmit`, `npm run build` en `git diff --check` zijn geslaagd; er is geen e-mail verstuurd. Commit `7e51b57` staat op GitHub `main`; de bijbehorende Vercel Production-deployment is READY. Werkelijke verzending vereist nog bevestiging dat `RESEND_API_KEY` en een geverifieerde `RESEND_FROM_EMAIL` in Vercel Production zijn ingesteld; ook overige eerder genoemde acceptatievoorwaarden/database-inrichting zijn nog open. Homepagebestanden zijn niet gewijzigd.

**Huidige stand:** offerteversie 1.7 staat lokaal op € 2.250 excl. btw (€ 2.150 websitevernieuwing + € 100 Outlook-inrichting). De interne betaalbasis is bijgewerkt; de klant ziet uitsluitend de bedragen excl. btw.

**Akkoordknop:** de checkbox werkt, maar de acceptatieomgeving is nog niet volledig ingericht. Daarom kan het akkoord nog niet worden ingediend of vastgelegd. De knop benoemt nu expliciet dat acceptatie tijdelijk niet beschikbaar is en welke configuratieblokken nog ontbreken. Deze UI-correctie staat op GitHub `main` als commit `8cdfaf4`; Vercel Production-deployment `dpl_XkyiHLDqg6iAdmBoWPc5f5qHxPkd` is READY.

**Werkelijk gecontroleerd:** `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Lokale offerte op poort 3012 antwoordt HTTP 200; daarin staan € 2.150 en € 2.250 elk eenmaal als zichtbare prijs, de oude prijzen ontbreken en de hostingtoelichting herhaalt het totaal niet. De pagina toont de disabled-state, de tijdelijke melding en uitleg. Homepagebestanden zijn niet gewijzigd.

**Eerdere opdracht (afgerond):** haal de opt-incheckboxes weg en maak de vooraf ingevulde naam, e-mail en telefoon verplichte akkoordgegevens.

**Lokaal geïmplementeerd:** het akkoordformulier heeft alleen de bestaande checkbox voor offerteakkoord. Naam, e-mailadres en telefoonnummer zijn vooraf ingevuld en aanpasbaar; alle drie zijn verplicht. Acceptatie- en betaalberichten gaan naar het ingevulde e-mailadres. Het telefoonnummer verschijnt in het beveiligde offertedossier en volgt de acceptatiemetadataretentie.

**Werkelijk gecontroleerd:** `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Lokale offertelink geeft HTTP 200; alle drie vooraf ingevulde velden staan erin, er is precies één checkbox en er zijn geen opt-invelden/teksten. Commit `baf022b` staat op GitHub `main`; Vercel meldt deployment completed. Geen acceptatie, databasewijziging, e-mail of betaling uitgevoerd. Homepagebestanden zijn niet gewijzigd.

**Nog nodig vóór actief gebruik:** `db/schema.sql` toepassen op Neon, voorwaarden en bewaartermijn plus de overige eerder genoemde acceptatie-instellingen afronden. Geen Neon-integratietest uitgevoerd. De productiepagina blijft zonder deze configuratie ongeschikt voor een echte acceptatie.

**Geïmplementeerd en gepubliceerd:** de PDF-knop, component en alleen daarvoor gebruikte CSS zijn verwijderd. Akkoordfunctionaliteit blijft staan. Commit `eae559d` staat op GitHub `main`; Vercel-productiondeployment `dpl_Dyma8Vs2FCrsQr3cxPVTGzjF5zMR` is READY.

**Werkelijk gecontroleerd:** `npm run build`, Prettier en `git diff --check` geslaagd. De lokale persoonlijke offerte op poort 3012 geeft HTTP 200; HTML bevat geen PDF-knoptekst maar wel de akkoord- en technische rapportsecties.

**Nog nodig vóór digitale acceptatie:** Neon resource/schema; adminlogin; offerte-ID en klantmail; goedgekeurde voorwaarden en bewaartermijn; admin-/cronsecrets, Resend-afzender en ING-gegevens. Het privé offertetoegangstoken is uitsluitend in Vercel Production ingesteld. Acceptatie blijft uitgeschakeld tot de database en overige verplichte instellingen zijn ingericht. Resend gebruikt de API, geen SMTP.

**Publicatie:** verwijdering van de PDF-knop staat op GitHub `main` en Vercel. Productiedeployment voor commit `eae559d` is READY. Homepagebestanden zijn niet gewijzigd.

**Open punt:** externe toegankelijkheid van de ingebedde conceptbron is niet bevestigd (anonieme HTTP 401). Homepagebestanden zijn niet aangepast.

## Update 2026-10-09 — vereenvoudigde klantweergave

De offerte is versie 1.3. De klantweergave is één pagina met één prijsoverzicht; de website-audit staat als drie prioriteiten bovenaan en de technische aanbevelingen onderaan achter een disclosure. De toelichting met reserveringsbronnen is eveneens inklapbaar, terwijl de reserveringsaanbeveling zelf zichtbaar blijft. Elke eenmalige prijs en jaarlijkse licentieprijs wordt één keer getoond. Alle klantbedragen zijn exclusief btw; de interne betaalworkflow blijft behouden.

De pagina gebruikt de Alex Kamsma-conceptachtergrond en MEDIADUSTRY-homepageheader. Een lokale, responsive Die Twie-websitepreview staat ingebouwd met desktop- en mobiele simulatie, interactieve bediening en link naar de live site. Bij deze vereenvoudiging: productiebuild opnieuw geslaagd; browsercontrole op desktop en 390 px mobiel, mobiele documentbreedte exact 390 px, één offerte, één prijsoverzicht en bedragen elk één keer; reserveringsbronnen en technische checklist zijn standaard gesloten. `npm run test:quote` 3/3, TypeScript, gerichte ESLint, Prettier en `git diff --check` geslaagd.

Preview: `http://localhost:3008/offerte/dietwiej/local-visual-test-token-0000000000000000000000000000`. Publicatie naar GitHub/de hosting nog niet uitgevoerd; er zijn geen e-mails of betalingen verstuurd.

## Aanvulling 2026-10-09 — sitebrede header en thema

De gedeelde app-header heeft hetzelfde MEDIADUSTRY-beeldmerk en woordmerk, maan-/zonicoon, rond menu en driestreepsymbool als de standalone homepage. De eigen offertemasthead is verwijderd. De offerte volgt `color-scheme` met een aparte donkere kleurset. Kleine tekst is verhoogd (lopende tekst minimaal 14–16 px op desktop en de intro 18 px op mobiel). Desktop-/mobielbrowsercontrole en toggle-/menuactie geslaagd; details en bestandswijzigingen staan in log.md.

## Controle op gelijke header — 2026-10-09

De homepagegenerator vergelijkt de header-SVG’s en gedeelde iconmaten/gutters tussen de standalone homepage en appcomponenten. Een afwijking laat de build falen. De gecorrigeerde controle is meegenomen in de geslaagde eindbuild.

## 2026-10-09 — browseropmerkingen verwerkt

Offerte v1.4: hoofdpunten vernieuwing, warmere uitstraling en actueel gebruiksgemak; zichtbare reserveringsstatistieken met bron/jaar; premium hosting € 300/jaar (€ 25/maand) excl. btw, apart van de eenmalige investering. Alleen op de offerte is de header naar de live schaal vergroot; footer 16 px. Previewknoppen fullscreen/live verwijderd. Eén akkoordcheckbox, invulbare naam en datum van vandaag; naam wordt server-side gevalideerd en in acceptatiebewijs/audit opgeslagen. Losse handtekeningruimte verwijderd.

Build, gerichte ESLint, geldtests (3/3) en diff-controle geslaagd. Browser: desktop en 390 px mobiel, geen horizontale overflow; naamveld invulbaar en één checkbox bevestigd. Geen echte databaseacceptatie uitgevoerd. Nieuwe zichtbare preview op http://localhost:3012/offerte/dietwiej/local-visual-test-token-0000000000000000000000000000. Alleen lokaal; niets gepusht.

## 2026-10-09 — hostingkorting en reserveringsvoorselectie

v1.5: gemarkeerde reserveringstoelichting verwijderd; Guestplan als eerste voorkeursoptie, GoTable en Zenchef als alternatieven toegevoegd. Direct Reserve with Google bevestigd in officiële Guestplan- en Zenchef-informatie; GoTable vermeldt Google, precieze koppeling nog te controleren. Statistiekgewichten 800. Prijsblok volle inhoudsbreedte en duidelijker omlijnd. Hostingcorrectie: eerste jaar € 300 korting, eerste hostingjaar inbegrepen; vanaf jaar twee € 300/jaar. Eenmalige investering blijft € 2.250 excl. btw. Snapshot legt jaarlijkse hosting en eerstejaarskorting vast.

Build/TypeScript, gerichte ESLint en diff-controle geslaagd. Browser: prijsblok en sectie beide 1084 px breed; percentages gewicht 800; verwijderde tekst afwezig; mobiel documentbreedte 390 px. Preview op 3012 vernieuwd. Alleen lokaal.

## Aanvulling 2026-10-09 — typografie en uitlijning

De bovenruimte en het verticale ritme van de offerte zijn aangescherpt. Labels, auditregels, technische toelichting en footer zijn vergroot; online reserveringsopties staan in drie gelijkwaardige desktopkaarten en stapelen op mobiel. Het prijsblok gebruikt de volledige inhoudsbreedte en geeft het eenmalige totaal en de eerstejaarskorting meer visueel gewicht. Browsercontrole op desktop en 390 px mobiel bevestigt leesbare hiërarchie en geen horizontale overflow. Productiebuild geslaagd. Preview lokaal op 3012; niet gepubliceerd.

## Aanvulling 2026-10-09 — offertebedrag en materialen

Offerte v1.6: eenmalig totaal € 1.950 excl. btw (€ 1.850 websitevernieuwing + € 100 Outlook-inrichting). De interne 50/50-betaalsplitsing wordt berekend op basis van het tarief inclusief wettelijke btw: € 1.179,75 per termijn. Workflowtekst verduidelijkt dat beschikbare foto’s worden geïnventariseerd en eventuele extra fotografie met kosten vooraf wordt besproken. Hostingtoelichting heeft meer afstand tot de kortingsregel. Build en typecontrole geslaagd; desktoppreview vernieuwd op poort 3012. Daarna via GitHub `main` gepubliceerd; Vercel-productiondeployment READY en live private route gecontroleerd.
