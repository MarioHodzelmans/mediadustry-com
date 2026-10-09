# MEDIADUSTRY — status

Bijgewerkt: 2026-10-09.

**Huidige opdracht:** plaats de door de eigenaar aangeleverde Gastrobar Die Twie ChatGPT Site als interactieve conceptpreview in de offerte en maak deze bron extern toegankelijk.

**Lokaal geïmplementeerd:** de reserveringspreview verwijst nu naar de aangeleverde concept-URL; de host staat expliciet op de iframe-allowlist en de preview is als concept met voorlopige inhoud/reserveringen gelabeld. Productiebuild is op 9 oktober 2026 geslaagd. Homepagebronnen bleven ongewijzigd.

**Werkelijk gecontroleerd:** `npm run build` geslaagd na de previewaanpassing. Anonieme HTTP-verzoeken naar de opgegeven bron kregen `401`; dit kan toegangsbeleid of botbescherming zijn. De ChatGPT Sites-lijst bevat deze Gastrobar-site niet, dus het deelbeleid kon vanuit dit account niet worden aangepast of bevestigd. Nog geen browsercontrole van de aangepaste productiepreview.

**Nog nodig vóór digitale acceptatie:** Neon resource/schema; adminlogin; offerte-ID en klantmail; goedgekeurde voorwaarden en bewaartermijn; admin-/cronsecrets, Resend-afzender en ING-gegevens. Het privé offertetoegangstoken is uitsluitend in Vercel Production ingesteld. Acceptatie blijft uitgeschakeld tot de database en overige verplichte instellingen zijn ingericht. Resend gebruikt de API, geen SMTP.

**Publicatie:** laatst bekende offertecommit `4b3a359` staat op GitHub `main`; gekoppelde Vercel-productiondeployment `dpl_6qBQX9kwdduzbuMVkF3rL7JPyJQw` is READY. De nieuwe externe previewwijziging is lokaal en nog niet gepusht, omdat openbare toegang tot de doelbron niet kon worden bevestigd. Homepagebron `content/homepage/index.html` en root/homepageroutes zijn niet aangepast.

**Volgende stap/blokkade:** de eigenaar van de ChatGPT Site moet in de site-instellingen toegang voor bezoekers buiten de organisatie/account inschakelen en publiceren, of bevestigen dat `401` alleen botbescherming is. Daarna anonieme toegang en iframe laden controleren en de wijziging via GitHub publiceren.

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
