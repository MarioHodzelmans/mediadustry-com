# MEDIADUSTRY - www.mediadustry.com — werklog

Voeg nieuwe entries onderaan toe. Actuele stand: [status.md](status.md). Vaste afspraken: [instructions.md](instructions.md). Behoud bestaande projectlogs.

Eerdere context en geschiedenis: [README.md](README.md). Deze entry vervangt die geschiedenis niet.

## 2026-10-04 21:27 Europe/Amsterdam — AI-projectoverdracht ingericht

- Opdracht: iedere lokale projectmap voorzien van instructions.md, log.md en status.md zodat volgende modellen het werk kunnen oppakken.
- Uitgevoerd: ontbrekende overdrachtsbestanden ingericht met projectbronnen en verwijzingen vanuit AGENTS.md/CLAUDE.md. Bestaande instructies, logs en andere wijzigingen behouden.
- Controle: projectinventaris, aanwezigheid, leesverwijzingen, links en behoud van bestaande documentinhoud gecontroleerd. Geen applicatiecommando’s of inhoudelijke productieverificatie uitgevoerd.
- Publicatie: lokaal opgeslagen; geen commit, push, PR, merge of deployment uitgevoerd.
- Vervolg: concrete gebruikersopdracht hervatten en de inhoudelijke stand met bewijs vastleggen in status.md; daarna dit log bijhouden volgens instructions.md.

## 2026-10-04 21:34 Europe/Amsterdam — websitevoorstel geïntegreerd, lokaal

- Opdracht: bestaand Alex Kamsma-voorstel opnemen in de huidige website en de scrollvertraging herstellen.
- Gewijzigd: hoofdmenu en Alex-case met voorstelverwijzing; ShowcaseBrowserDemo met zelfstandige desktop/mobiele preview en zichtbaarheidsgestuurde, eenmalige autoscroll; pauze/herstart, bewuste handmatige bediening, Escape en native dialoog. Titel wrapt nu; vaste akkoordknop is compacter. Showcase-schema, lokale assets en documentatie bijgewerkt.
- Besluit: alleen een eigen same-origin ontwerpvoorbeeld automatisch bedienen. De oude externe iframe kon niet vanuit de ouderpagina worden bestuurd. Geen globale wijziging aan wheel-/touchscroll of onbewezen performanceclaims.
- Controle: volledige ESLint en TypeScript geslaagd. Menu en caseknop op 320/390 px getest: juiste navigatie, geen horizontale overflow, SVG-uitlijning goed. Nieuwe autoscrollstart, pauze, buiten-beeldpauze en voltooiing bovenaan in de browser gecontroleerd. Verdere functionele controles en productiebuild volgen.
- Publicatie: deze wijziging is nog lokaal. Eerdere optimalisatie staat live via Git-commit e91f3dad84ab3a15e7c41bf801e0ac3d9c569c8f; die meting en de nog open Upstash/DNS-activering zijn in status.md vastgelegd.
- Overdracht: bestaande administratieve entries en AGENTS.md-verwijzingen behouden. instructions.md aangevuld met geverifieerde projectbronnen; geen geheimen opgeslagen.

## 2026-10-04 21:39 Europe/Amsterdam — productiecontrole en scrollverificatie

- Controle: volledige ESLint, TypeScript en Next.js-productiebuild geslaagd. Browsercontrole op de lokale productieversie bevestigt automatische menu-/sectienavigatie en terugkeer bovenaan, pauze/herstart, handmatige childscroll met stabiele ouderpagina, Escape en volledig-schermbediening. Reduced-motion schakelt de automatische demo uit; beide previews blijven op scrollpositie nul.
- Meting: nul requestAnimationFrame-callbacks tijdens 1,2–1,5 seconde buiten beeld, bij pauze en na voltooiing. Een productieprofiel toont eveneens nul late animatiecallbacks tegenover de oude doorlopende lus. Geen browserfouten.
- Herstel: de terugkeerknop bedekte de mobiele previewnavigatie. Hij staat nu buiten het venster, onder de preview; productiegeometrie gecontroleerd (venster eindigt op y796, knop begint op y816).
- Performance: lokale preview halveert ongeveer de scriptbelasting, maar de eerste trace toont extra beeldbytes. Previewbeelden en lettertypes worden daarom nog verkleind vóór publicatie. Lighthouse-scores van lokaal en live zijn geen gecontroleerde directe vergelijking; geen nieuwe algemene snelheidsscore geclaimd.
- Overdracht: CLAUDE.md verwijst nu rechtstreeks naar instructions.md, status.md en log.md naast de bestaande AGENTS.md-verwijzing. Nog geen publicatie van deze wijziging.

## 2026-10-04 21:46 Europe/Amsterdam — definitieve preview gereed voor Git-publicatie

- Preview verkleind van 704.261 naar 334.894 bytes (52,4%); zes beelden opnieuw gecodeerd en lettertypes verliesloos naar WOFF2 omgezet, met alle glyphs behouden. Native lazy loading en lage fetchprioriteit voor beelden onder de vouw. Bronverantwoording bijgewerkt.
- Herstel: smalle previewheader houdt de telefoon op één regel en het menu op 44 px; een ontbrekende CSS-afsluiting hersteld voor tabletmenu's. De zwevende akkoordknop verdwijnt zolang de preview zichtbaar is, zodat toolbar- en previewbediening bereikbaar blijven.
- Controle: laatste productiebuild inclusief TypeScript geslaagd; scoped ESLint en formatter geslaagd. Volledig scherm bij 320 px opnieuw gecontroleerd: geen overflow, fonts geladen, Escape sluit de dialoog en herstelt focus/body-scroll. Definitieve desktoppreview start en scrollt; geen browserfouten.
- Meting op lokale productieversie na assetcompressie: transfer 817.787→569.127 bytes, beelden 420.451→195.625 bytes, idle animatiecallbacks nul; concept performance 84, accessibility/best practices 100. Scores voor de niet-indexeerbare conceptpagina zijn geen nieuwe homepage-score en geen gecontroleerde vergelijking met de oude live origin.
- Publicatie: klaar voor commit/push via de verbonden GitHub-repository; live deployment wordt daarna gecontroleerd.

## 2026-10-04 21:48 Europe/Amsterdam — via GitHub gepubliceerd en live geverifieerd

- Commit f51fe82b288a93d8bdeaf128abbc948e12f2176c gepusht naar GitHub main. Hostingdeployment dpl_4NbEndcTaaPL6iTHSsNJqchnNT7o is READY, met www.mediadustry.com en mediadustry.com als aliases. Publicatie verliep uitsluitend via Git.
- Live controle op www.mediadustry.com: hoofdmenu toont Websitevoorstel; Alex-caseknop opent het juiste concept. Desktop en mobiele preview laden dezelfde lokale snapshot en scrollen daadwerkelijk. Fonts geladen, akkoordknop verborgen tijdens preview, robots noindex/nofollow/nocache behouden.
- Live 320px-controle: geen horizontale overflow; volledig-schermpreview past op 286 px, Escape sluit de dialoog; geen browserfouten. Lokale browsers en eigen productieproces op poort3000 opgeruimd; andere projecten/processen niet gestopt.
- Websiteopdracht afgerond. Oorspronkelijke e-mailfunnel nog niet actief: persoonlijke Upstash-voorwaardenacceptatie en Redis-opslag ontbreken. Eigen maildomein-DNS en terugkerende campagnes blijven open zoals gedocumenteerd; geen volledige e-mailactivering geclaimd.

## 2026-10-04 22:27 Europe/Amsterdam — eerdere website teruggezet, voorstel behouden

- Nieuwe opdracht van de eigenaar: eerdere website herstellen en alleen het offertevoorstel behouden. Deze opdracht vervangt de eerdere funneloptimalisatie; geen verdere Upstash-/e-mailactivering uitgevoerd.
- Herstelbron: commit `0310fef`, vóór de optimalisatieronde. Oorspronkelijke homepage, rootlayout/template-runtime, header/menu/themawisselaar, cases, contact en template/showcasepagina’s hersteld. Nieuwe sitevormgeving, website-check, opt-inroutes/API/backend/tests verwijderd. Reeds geïnstalleerde Next.js/React-patchversies behouden; externe Resend-resources, hostingvariabelen en DNS niet gewijzigd.
- Voorstel behouden in afzonderlijke Proposal/ProposalBlocks/proposal.module.css, met verbeterde Alex-inhoud en lokale previewassets. Websitevoorstel-link behouden in het oude menu en de Alex-case. Native scroll op conceptpagina’s voorkomt interferentie door de oude Lenis-runtime. Overige showcases gebruiken hun oorspronkelijke renderer. Decoratieve pijlen gebruiken SVG; contactpijl heeft currentColor en focusable=false.
- Controles: volledige ESLint en productiebuild/TypeScript geslaagd; hoofdvormgevingsbestanden tegen de herstelbron vergeleken. Eerste build zag verouderde gegenereerde .next/dev-types van verwijderde routes; deze gegenereerde cache veilig naar een tijdelijke herstelmap verplaatst, waarna de build slaagde. Geen projectbron verwijderd als cache.
- Browsercontrole op lokale productieversie: beide kleurthema’s, homepage → voorstel → homepage, native proposal-scroll, daadwerkelijke autoscroll in beide frames, fullscreen/Escape en focus/body-scroll getest. Onafhankelijke mobiele QA op 390/320 px: geen overflow, Websitevoorstel-link werkt, alle menu-items passen, SVG-uitlijning correct, fullscreenframe286 px, Escape vanuit iframe werkt. Geen browserfouten. Geen nieuwe snelheidsmeting geclaimd.
- Documentatie bijgewerkt: README en showcase-engine beschrijven de herstelde structuur; oude funnel/DNS-documenten als historische configuratie gemarkeerd; instructions.md verwijst naar de actuele scripts. Historische logentries behouden.
- Publicatie: lokaal gereed voor GitHub-publicatie; live deploycontrole volgt. Contactontvangst via de oorspronkelijke Web3Forms-configuratie is niet geverifieerd.

## 2026-10-04 22:30 Europe/Amsterdam — terugzetting via GitHub live

- Definitieve ESLint en productiebuild/TypeScript opnieuw geslaagd na de contact-SVG-attributen. Onafhankelijke bronreview vond geen blokkerende koppeling: één root-runtime, behouden proposal-preview met passende CSS, veilige route-opruiming. Geen andere codewijzigingen nodig.
- Commit `60ce6bde7b22e07f2ef73884712024361bab09bb` gepusht naar GitHub main. Verbonden deployment `dpl_DciokHmRwfu8G1rcVngEZwAA2Qmu` is READY voor www.mediadustry.com en mediadustry.com. Geen directe Vercel-deployment gebruikt.
- Live verificatie: originele homepage op1280 px visueel bevestigd; menu opent voorstel. Concept op320 px heeft scrollWidth320, native scroll/geen Lenis, noindex/nofollow/nocache, twee geladen lokale frames. Beide autoscrollposities gemeten op3376/2593 px tijdens de tour. Fullscreen op320 px: dialoog288/frame286 px, geen overflow; Escape sluit, ontgrendelt body en herstelt focus. Live Alex-case op390 px: geen overflow en juiste voorstel-URL. Geen browserfouten.
- Eigen lokale productieproces op poort3000 gestopt (geen luisterend proces meer); eigen testsessies worden gesloten. Andere projecten/processen niet gewijzigd. Status bijgewerkt naar afgerond. Geen nieuwe algemene performance-score of werkende e-mailontvangst geclaimd.

## 2026-10-04 22:57 Europe/Amsterdam — behoudende PageSpeed-optimalisatie gestart

- Nieuwe opdracht: bestaande homepage en light/dark-uitstraling behouden, eenvoudigere menuknop en richting vier PageSpeed100-scores doorwerken.
- Uitgangsmeting met Lighthouse13.5.0 op live: mobiel86/100/100/100; desktop100/100/100/100. Mobiele FCP2,5s/LCP3,6s/TBT0/CLS0. Vooral ongebruikte template-CSS, dubbel/preload van origineel hero-beeld en gedeelde animatiecode. Officiële Google-API HTTP429; webinterface Unable to resolve op www/apex; Google DNS toont wel juiste publieke records. Geen Google-score verzonnen.
- Eerste wijzigingen: statische rootlayout met vroege themavoorkeur, behouden homepagevormgeving, lichte header/menu zonder GSAP, focus trap/Escape/inert/focusherstel, Nederlandse namen en SVGs; native versie van oorspronkelijke footer; CSS-filtergenerator met volledig behouden legacybron; aparte legacy-runtime en stylesheet voor contact/templatevoorbeelden. Canonical/robots/sitemap naar www, skiplink en zichtbare focus.
- Meting: lokale versie1 91/100/100/100; versie2 na verwijderen zware root404-imports en voorwaardelijke React.lazy-runtime 94/100/100/100. Mobiele FCP0,9s/LCP3,1s/TBT0/CLS0. Nieuwe responsive AVIF/serverbeelden volgen voor de resterende LCP; die zijn nog niet gemeten.
- Controle: volledige lint en productiebuild/TypeScript voor versie2 geslaagd. Homepage eerste scripts bevatten geen GSAP.1280px-light/dark visueel behouden; onafhankelijke header/menu320/390px-QA zonder overflow en met focus-/themaherstel. Route home→contact→home verwijdert legacy-styles/Lenis; voorstel direct en via menu scrollt, fullscreen/Escape werkt. Nieuwe runtime-aanpassing krijgt vervolgcontrole. Nog niet gepubliceerd.

## 2026-10-04 23:24 Europe/Amsterdam — vier lokale100-scores, afronding voorbereid

- Homepagevormgeving, light/dark, originele homepage-CSS en behouden Alex-voorstel blijven de bron. Simpele SVG-menuknop, focus/inert/Escape, native footer, correcte www-metadata en mobiele case/404-afmetingen toegepast.
- CSS van1,48MB bron teruggebracht tot88.992 bytes native kern; volledige template-CSS en GSAP/Lenis alleen voor bekende legacyroutes. Managed-instantiecontrole voorkomt het herstarten van vernietigde Lenis vanuit menu-cleanup.
- Responsive AVIF’s gegenereerd en originele WebP-fallback behouden. Hero op mobiel rechtstreeks met HTML; latere beelden binnen400px. Noscript-fallback zonder dubbele zichtbare placeholders gecontroleerd in echte Chrome-context met JavaScript uit. Alle vijf beelden geladen, breedte390px.
- Homepagefonts van88.912 naar35.224 bytes; glyph-outlines, advance widths, variabele gewichten100/400/420/480/520/600/700/max, OpenType-shaping en licenties gevalideerd. Reproduceerbare fontgenerator en Markdownrapport toegevoegd.
- De algemene Next/React-startscripts bleven mobiele LCP vertragen. Daarom genereert de build dezelfde homepage naar zelfstandige HTML en levert native-home.js de bediening. Bron blijft bestaande Next.js-componenten; generator bewaart inhoud/links/metadata/CSS/noscript en weigert ontbrekende content of onopgeloste React-streams. Productie gebruikt conditionloze rewrites voor beide homepage-URLs; terug-home anchors voorkomen RSC-fetch naar HTML.
- Metingen Lighthouse13.5.0 standaard: definitief lokaal mobiel100/100/100/100, FCP1,1s/LCP1,7s/TBT0/CLS0; desktop100/100/100/100, FCP0,3s/LCP0,4s/TBT0/CLS0. Geen gemanipuleerde throttling/scoring of speciale behandeling van meetdiensten. Circa109KiB mobiele transfer. Google API429/webinterface Unable to resolve, ook controle-URLweb.dev; geen Google-cloudscore geclaimd.
- Controle: volledige ESLint, TypeScript/productiebuild en native-generator geslaagd. Onafhankelijke320/390px light/dark, menuTab/ShiftTab/Escape/focus/inert/body, voorkeur na reload, alle vijf beelden, contact→home→Back/Forward,21 lokale assets200, metadata/robots en behouden voorstel gecontroleerd. Geen browserfouten. Complete laatste native verhaalcontrole volgt nog.
- Op verzoek van de eigenaar afronding ingezet en alles opgeslagen in README/instructions/status/log, docs/homepage-performance.md, docs/font-subsets.md en showcase-engine. Rapporten gekopieerd naar lokaal artifacts/pagespeed/2026-10-04 buiten Git. Npm-auditmeldingen betreffen vijf bestaande ontwikkeltoolketenmeldingen; geen force-downgrade of nieuwe e-mailactivering uitgevoerd.
- Publicatie via GitHub main volgt; live-scores en deployment-ID zijn nog niet bevestigd voor deze nieuwe versie.

## 2026-10-04 23:27 Europe/Amsterdam — hostingadapterpad hersteld

- Commit9ca29aa via GitHub gepusht; deployment dpl_HgM8NgY3Y8jYLGVxB65fp7ktMFfa faalde na succesvolle Next-build: Vercel onBuildComplete had .next/server/app/index.html verplaatst (ENOENT). De bestaande live versie bleef intact.
- Generator ondersteunt nu zowel lokaal Next-output als verplaatste Vercel-output, met gecontroleerde homepageherkenning en dezelfde inhoudsvalidaties. Lokale generatie en scoped lint opnieuw geslaagd. Alleen buildkoppeling gewijzigd; geen nieuwe optimalisatieronde.

- Aanvullende broncontrole: Next.js gebruikt bij adapterPath gehashte route-cachebestandsnamen. De generator zoekt daarom de inhoudsgevalideerde homepage ook in .next/server en schrijft waar aanwezig rechtstreeks naar de statische adapteroutput. Lokale generatie geslaagd; definitieve hostingcontrole volgt.

## 2026-10-04 — definitieve publicatie en afsluiting

- Codecommit6255fab4e8d5507cc1624538c33672fbd67c5f43 via GitHub; deploymentdpl_DDvJ6JKEPpfAeMXHenMycwGmLWTA READY en gekoppeld aan www.mediadustry.com/mediadustry.com. Native live HTML bevestigd; geen React-payload. Adapter-gehashte NextHTML herkend en waar aanwezig native HTML ook naar adapter-static-output geschreven.
- Live Lighthouse13.5.0: mobiel98/100/100/100 (FCP1.3 s/LCP1.7 s/SI4.0 s/TBT0 ms/CLS0); desktop100/100/100/100 (FCP0.3 s/LCP0.4 s/SI0.3 s/TBT0 ms/CLS0). Lokaal beide apparaten100/100/100/100. Geen live mobiele100-score of officiële Google-cloudscore verzonnen.
- Laatste onafhankelijke native verhaalcontrole geslaagd: contact, bfcache-thema, native terug-home, menufocus/Escape, daadwerkelijk scrollend Alex-voorstel, fullscreen en Escape vanuit iframe; geen consolefouten/waarschuwingen. Nieuwe JavaScript-uitcontrole op definitieve HTML bevestigt vijf geladen zichtbare beelden, verborgen placeholders, breedte390.
- Alle resultaten en grenzen opgeslagen in Markdown, volledige live-rapporten naar lokale artifacts gekopieerd. Op expliciet verzoek eigenaar afgesloten wegens resterende credits, zonder extra optimalisatieronde.
- Eigen productieproces op3000 gestopt en root/subagent-browserprofielen gesloten. Andere projecten en de in-app-browser van de eigenaar niet gesloten. Documentatie-update wordt via GitHub opgeslagen; deze nieuwe docs-build heeft nog geen afzonderlijk geverifieerde deploymentstatus.

## 2026-10-05 — homepage aangepast aan nieuwe visuele richting

- Opdracht: de homepage laten aansluiten op de rustige, ruime en kaartgedreven uitstraling van Trustteam, met behoud van de eigen MEDIADUSTRY-stijl.
- Gewijzigd: homepage opgebouwd rond een projecthero, ruime merkintro, drie visuele dienstenkaarten, vijf eigen cases, persoonlijke werkwijze, techniekbewijs en een grote contact-CTA. De eigen zwart/witbasis, blauw-paars-oranje kleurwereld, light/dark-bediening, eenvoudige menuknop en het Alex-offertevoorstel zijn behouden. Decoratie bestaat uit CSS-vormen; pijlen blijven toegankelijke inline SVGs.
- Besluit: alleen de compositieprincipes van de referentie gebruikt. Geen tekst, code, afbeeldingen of merkuitingen van Trustteam gekopieerd. De bestaande native homepage-architectuur en uitgestelde casebeelden blijven actief voor snelheid.
- Controle: ESLint, TypeScript/productiebuild en native-home-generator geslaagd. Browsercontrole op 1440 en 390 px; geen horizontale overflow, vijf casebeelden geladen na scroll, menu opent met correcte aria-/inert-status en light/dark schakelt. Een eerste toegankelijkheidsmeting vond te laag contrast in het label van de donkere werkwijzesectie; kleur gecorrigeerd. Definitieve lokale Lighthouse 13.5.0 mobiel: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1,7 s, CLS 0, TBT 0 ms.
- Publicatie: lokaal gereed voor GitHub-publicatie. Live deployment en controle volgen; geen directe Vercel-deployment uitgevoerd.

## 2026-10-05 — nieuwe homepage via GitHub gepubliceerd

- Commit `6c199e4bcd62891ea3d7b7c631a8813a97867bce` naar GitHub `main` gepusht. De gekoppelde productie-deployment `dpl_H15NRgfXNvumiwNsteX8bhWafLEQ` is READY; geen directe Vercel-deployment gebruikt.
- Live browsercontrole op 390 px bevestigt de nieuwe kop en hero, correcte grid-CSS, geladen 1080 px hero-afbeelding en `scrollWidth` gelijk aan `clientWidth` (390 px). De visuele hero komt overeen met de lokaal goedgekeurde versie.
- Live Lighthouse 13.5.0 mobiel op de gepubliceerde www-origin: performance 100, accessibility 100, best practices 100, SEO 100; FCP 1,1 s, LCP 1,4 s, CLS 0, TBT 0 ms.

## 2026-10-05 — homepage verder naar toegankelijke Trustteam-structuur gebracht

- Nieuwe correctie van de eigenaar: de hele homepage moet veel duidelijker aansluiten op de lichte, rustige en toegankelijke informatieroute van Trustteam, met eigen content en bestaande MEDIADUSTRY-kleuren.
- Gewijzigd: lichte hero is nu de betrouwbare standaard; de themastijlen gebruiken het echte `color-scheme`-attribuut. Hero, merkintro en teksten zijn herschreven voor een directe klantvraag. Het dienstenaanbod is uitgebreid naar vier overzichtelijke kaarten: strategie & merk, websites & platforms, content & vindbaarheid en optimalisatie & groei. De persoonlijke aanpak benoemt direct samenwerken met Mario. Eigen cases, kleurverloop, dark mode, menu en voorstel blijven behouden.
- Controle: ESLint, TypeScript/productiebuild en native-home-generator geslaagd. Visuele browsercontrole op 1440 px van hero, merkintro en vier kaarten; 390 px hero en knoppen; geen horizontale overflow. Light mode start licht, dark mode schakelt naar de bestaande donkere kleurwereld. Lokale Lighthouse 13.5.0 mobiel: 99/100/100/100, FCP 1,7 s, LCP 1,9 s, CLS 0 en TBT 0 ms.
- Publicatie: tweede versie lokaal gereed; GitHub-publicatie en live controle volgen.

## 2026-10-05 — toegankelijkere tweede versie live

- Commit `689065e383cb88487ddf145ed59c35da56fa824f` via GitHub `main` gepubliceerd; gekoppelde deployment `dpl_AGgK6WrTfUiVs4bKkE3Zxsv74zEb` is READY. Geen directe deployment gebruikt.
- Live 390 px: `color-scheme` start op light, de nieuwe hero en alle vier oplossingskaarten staan in de HTML, en `scrollWidth` is gelijk aan `clientWidth` (390 px).
- Live Lighthouse 13.5.0 mobiel: 99/100/100/100, FCP 1,4 s, LCP 1,7 s, CLS 0 en TBT 0 ms.

## 2026-10-05 — correctie naar aangeleverde volledige referentieopbouw

- De eigenaar verduidelijkte met een volledige screenshot dat niet alleen sfeer, maar vooral paginaopbouw, schaal en ritme moesten overeenkomen. De eerdere vrije interpretatie is daarom vervangen.
- Nieuwe structuur: donkere afgeronde beeldhero, compacte tweekolomsintro, oplossingenraster met zes tegels, twee afwisselende beeld/tekstsecties, techniekstrook, afgeronde contact-CTA, compacte projectkaarten en bestaande grote footer. Alle teksten, cases, kleuren en beelden zijn van MEDIADUSTRY.
- De hero gebruikt een eigen studiofoto op desktop en een kleinere eigen digitale visual op mobiel; dit voorkomt de dubbele websitetekst die tijdens de eerste visuele controle zichtbaar werd. Decoratieve pijlen blijven inline SVG en de overige vormen zijn CSS.
- Controle: ESLint, TypeScript/productiebuild en native-generator geslaagd. Volledige 1440px-pagina en mobiele 390px-hero visueel gecontroleerd, zonder horizontale overflow. Definitieve lokale Lighthouse na de mobiele beeldoptimalisatie: 99/100/100/100, FCP 1,5 s, LCP 2,0 s, CLS 0 en TBT 0 ms. Publicatie volgt.

## 2026-10-05 — screenshotgetrouwe correctie gepubliceerd

- Commit `0bc71284182513eb7e01ee50111ab5b3cb95b514` via GitHub `main`; deployment `dpl_CAHjGkuwUosn78MVT3WtZfEpefjP` READY. Geen directe deployment gebruikt.
- Live 390px-controle bevestigt de nieuwe hero, acht hoofdsecties, zes oplossingstegels en een documentbreedte van exact 390 px zonder horizontale overflow.

## 2026-10-06 — aangeleverde studiofoto op homepage

- De foto is opgenomen in de tweede beeld/tekstsectie, “Expertise wanneer je die nodig hebt”, ruim onder de hero. De bovenste sectie bleef ongewijzigd.
- Afbeelding opgeslagen als `public/img/home/mediadustry-studio-workspace.jpg`; originele PNG blijft daarnaast staan. De homepage gebruikt Next Image met beschrijvende alt-tekst, responsieve `sizes` en een uitsnede die op het onderwerp is gericht.
- Gewijzigd: `components/home/RealWorkHome.tsx`, `components/home/real-work-home.module.css`, `public/img/home/`.
- Controles: gerichte ESLint en Prettier-check geslaagd; `npm run build` geslaagd inclusief TypeScript en native-home-generator. Desktop-/mobiele browsercontrole niet uitgevoerd.
- Lokaal werk, niet gepubliceerd. Geen commit of deployment gemaakt.

## 2026-10-06 — conceptsite ingericht als vervangende homepage

- Opdracht van eigenaar: publiceer de nieuwe digitale-groei-homepage ter vervanging van de rootpagina, optimaliseer de SEO en streef opnieuw naar vier scores van100.
- Productiebron vastgelegd in `content/homepage/index.html`; bestaande buildgenerator aangepast om hiervan een zelfstandige native homepage te genereren. De productierewrites blijven `/` en `/index-digital-agency`; contact, case- en conceptpagina’s behouden hun bestaande Next-routes. De Next-paginametadata bijgewerkt met dezelfde titel en omschrijving.
- SEO: indexeerbare Nederlandse homepage, specifieke title/description, www-canonical, Open Graph, Twitter large card, Organization/WebSite JSON-LD. Generator controleert deze velden, H1/landmarks, vijf casebeelden met alt-tekst, lokale assets en JSON-LD parse.
- Lokale vier categorieën eerst 100/91/100/100 door onvoldoende tekstcontrast en focusbare inhoud in aria-hidden menu. Muted- en accentkleur aangepast; gesloten menu is inert gemaakt. Herhaalde Lighthouse 13.5.0-meting op lokale productiebuild: mobiel100/100/100/100 (FCP0,8 s, LCP1,2 s); desktop100/100/100/100 (FCP0,2 s, LCP0,3 s).
- Vier eerder ontworpen juridische footerpagina’s geplaatst als noindex-documenten. Privacy/cookie-inhoud gecorrigeerd voor het feitelijke Web3Forms-formulier en de werkelijke `template.theme` cookie/storage. Verwerker-/bewaar-/bedrijfsgegevens zijn nog onvolledig; pagina’s blijven expliciet concepten.
- Controles: `npm run build`, ESLint, Prettier, local Lighthouse mobiel/desktop en HTTP200 voor `/`, `/contact`, `/concept/alex-kamsma-parket` en `/privacy-policy.html`. Browser-AX-boom bevestigt scores, cases en footerlinks; Google PageSpeed en live browsercontrole wachten op GitHub-push.
- `README.md`, `docs/homepage-performance.md`, `status.md` en deze log bijgewerkt. Bestaande wijzigingen aan Next-homepagefoto en `sites/`-map zijn behouden; deze worden niet meegestaged, evenmin de 5,7MB bron-PNG.
- GitHub-publicatie en Vercel-hostingdeployment nog niet uitgevoerd; lokale meting niet als live- of Google-cloudscore voorstellen.

## 2026-10-06 — homepage via GitHub gepubliceerd en live PageSpeed 100

- Commit `83e80b35cc75df1b854b87406cab88df7b50b572` is via GitHub `main` gepusht. Vercel deployment `dpl_Gp3RydS58jb7d5YSVhtKLyN57N95` vanuit die commit is `READY` en heeft `www.mediadustry.com` en apex-alias.
- Live Lighthouse 13.5.0 en officiële Google PageSpeed Insights: mobiel én desktop alle vier categorieën100. PSI mobiel FCP0,8s/LCP0,8s/TBT0ms/CLS0,013; desktop FCP0,2s/LCP0,3s/TBT0ms/CLS0. Live Lighthouse run mobiel FCP1,0s/LCP1,1s; desktop FCP0,3s/LCP0,3s. Meetmomenten kunnen variëren.
- Officiële PSI-rapporten: https://pagespeed.web.dev/analysis/https-www-mediadustry-com/lz341wx5qi?form_factor=mobile en https://pagespeed.web.dev/analysis/https-www-mediadustry-com/lz341wx5qi?form_factor=desktop. De API-request zelf antwoordde met quota-HTTP429; de officiële PSI-webinterface leverde wél de hierboven genoemde rapporten.
- Live-controle: HTTP200 voor `/`, `/index-digital-agency`, `/contact`, `/concept/alex-kamsma-parket`, de vier footerpagina’s, `/robots.txt`, `/sitemap.xml` en de lokale hero-afbeelding. HTML bevat vier zichtbare waarden100; de PSI-audit controleerde ook toegankelijkheid, best practices en SEO.
- Documentatie/status bijgewerkt na de publicatie en metingen. Bestaande untracked `sites/` en `public/img/home/` blijven buiten de productiecommit. Juridische conceptpagina’s zijn noindex en hebben nog open bedrijfs-/verwerkingsgegevens.

## 2026-10-06 — mobiele navigatie hersteld

- De eigenaar meldde een foutieve mobiele weergave met screenshot. In `content/homepage/index.html` ontbraken basisregels voor het hamburgermenu, sluitknop, full-screen paneel en contactlink. Daardoor stond de navigatie als gewone documentinhoud boven de homepage en werd de menu-trigger als standaard rechthoek getoond.
- Toegevoegd: zichtbare ronde hamburger/sluitknoppen, vaste opaak-donkere schermvullende overlay, scrollbare layout met dynamische viewport- en safe-area-padding, en mobiele typegrootte waarbij `MEDIADUSTRY` heel blijft. De buildgenerator controleert nu dat essentiële menu-CSS aanwezig is.
- Lokale productiebuild, ESLint en Prettier geslaagd. Chrome mobiele tests320 en390px bevestigen viewportbreedte zonder overflow, volledige overlay, passende linkbreedtes, ronde knop, Escape/focus-state, herstelde scroll en geen browserfouten. Lighthouse lokaal na de wijziging blijft mobiel/desktop elk100/100/100/100 (LCP1,2s/0,3s).
- Commit `5ab5362d22d3f0f1813cb99d67fb02c8817d74a7` is via GitHub `main` gepubliceerd. Vercel deployment `dpl_EbTtuRCjv6NbNrfjvBnWtAxFi7kV` is `READY` en gekoppeld aan de publieke domeinen.
- Live mobiele Chrome-emulatie320/390 px: geen overflow; full-screen overlay, linkbreedtes en ronde knop kloppen; Escape sluit het menu en herstelt scroll. Geen JS-fouten. Verse Google PSI mobile en desktop: beide vier categorieën100; PSI mobile FCP/LCP0,8s/0,8s, desktop0,2s/0,2s. Live Lighthouse mobile/desktop eveneens 100/100/100/100. [Mobiel](https://pagespeed.web.dev/analysis/https-www-mediadustry-com/k5tlcbzvac?form_factor=mobile) · [Desktop](https://pagespeed.web.dev/analysis/https-www-mediadustry-com/k5tlcbzvac?form_factor=desktop).
- Eerdere niet-gecommitte homepagefoto-aanpassing en `sites/`-draft zijn behouden.

## 2026-10-06 — desktopopmaak en menuthemas hersteld

- De eigenaar meldde met een desktopscreenshot dat logo, hero-kop en vervolgsecties verkeerd over elkaar stonden. De native homepage bevatte wel mobiele overrides, maar vrijwel alle bijbehorende desktop-basisregels ontbraken.
- Hersteld in `content/homepage/index.html`: volledige desktoplayouts voor hero, merkintro, oplossingen, persoonlijke aanpak, expertise, technologiestrook en kwaliteitsmeters. De buildgenerator breekt voortaan af wanneer een van de essentiële desktopselectoren ontbreekt.
- Het navigatiemenu volgt nu de actuele kleurmodus: licht bij de lichte site en donker bij de donkere site. De sluitknop gebruikt in beide varianten passend contrast.
- De responsieve kwaliteitslayout is aanvullend gecorrigeerd naar één kolom op tablet en mobiel. Daarmee is de gevonden mobiele horizontale overflow verwijderd.
- Controle: productiebuild en TypeScript geslaagd; ESLint en Prettier geslaagd. Lokale productiebrowser desktop bevestigt geen overlap tussen logo en hero-kop, correcte sectielayout, correcte lichte en donkere menuvariant en geen browserlogs. Op 390 px is de documentbreedte binnen de viewport en blijft de hero correct uitgelijnd.
- Commit `8b95a5a` is via GitHub `main` gepubliceerd; de gekoppelde hosting heeft de nieuwe native CSS uitgerold. Live desktopcontrole bevestigt `display:flex` voor de hero, grid-layout voor de introductie, geen logo/kop-overlap en geen browserfouten. Het live menu is donker bij dark mode en wit bij light mode. Geen directe Vercel-deployment uitgevoerd.

## 2026-10-06 — persoonlijke-aanpaksectie opnieuw verankerd

- De tekstkaart “Direct contact maakt het verschil” en de blauwe notitie waren absoluut gepositioneerd zonder gepositioneerde ouder. Daardoor werden ze ten opzichte van de pagina geplaatst en verschenen ze onterecht boven in de hero.
- `position: relative` toegevoegd aan `.image-story-inner`, zodat beide overlays weer bij hun eigen wereldbeeldsectie horen.
- Controle: productiebuild en TypeScript geslaagd; ESLint en Prettier geslaagd. Desktopbrowser toont beeld links, tekstkaart rechts en notitie linksonder. Mobiele controle op 390 px toont de drie onderdelen in de bedoelde volgorde zonder horizontale overflow.
- Commit `38e7ca9` is via GitHub `main` gepubliceerd. De gekoppelde hosting bevat de correctie; live browsercontrole bevestigt `position: relative` op de sectiecontainer, correcte onderlinge beeld-/kaartposities, geen horizontale overflow en geen browserfouten. Geen directe Vercel-deployment uitgevoerd.

# 2026-10-09 — offerte Gastrobar Die Twie uitgewerkt

- Uitgewerkt in `app/offerte/dietwiej/page.tsx` en `app/offerte/dietwiej/offerte.module.css`: vertrouwelijke tweedelige offerte voor websitevernieuwing en Outlook 365. Pagina 1 bevat achtergrond, werkzaamheden, telefoonreservering, Outlook-installatievoorwaarden, jaarlijkse externe licentie, fotografie- en reviewadvies, bedragen, werkwijze en ondertekenruimte. Pagina 2 bevat de zelfstandige samenvatting met dezelfde bedragen en uitsluitingen.
- Bedragen gecontroleerd op briefing: € 2.150 + € 100 = € 2.250 excl. btw; 21% btw € 472,50; totaal € 2.722,50 incl. btw. De € 75 excl. btw per jaar is apart aangeduid als terugkerende leverancierslicentie. Fotografie en extra apparaatondersteuning zijn uitgesloten. Er is geen betaaltermijn, planningstermijn of garantie toegevoegd.
- Offertedatum 9 oktober 2026; metadata is noindex/nofollow. Geen contactgegevens toegevoegd; akkoord gebeurt via de invulbare naam-, datum- en handtekeningruimte.
- Controle: Prettier en gerichte ESLint geslaagd; `npm run build` geslaagd, inclusief TypeScript en statische generatie van `/offerte/dietwiej`. Lokale desktopweergave bekeken. Mobiele screenshotcontrole niet uitgevoerd.
- Basis: actuele GitHub-branch `origin/main` bij start (`16bcbca`), geïsoleerd in worktree/branch `codex/offerte-dietwiej`. Oorspronkelijke checkout met bestaande wijzigingen behouden. Niet gepusht; geen hostingdeployment uitgevoerd.

## 2026-10-09 — workflow vervolg geïndexeerd

- Architectuur geïnventariseerd voor digitale acceptatie en 50%-aanbetaling. In deze GitHub-basis is de site Next.js App Router; er is geen database, admin-authenticatie, admin-dashboard of API-routehandler. Het huidige contactformulier gebruikt Web3Forms. Er is geen actieve Resend-koppeling in de applicatie.
- Toegevoegd: `docs/offerte-workflow-plan.md` met genummerde fasen voor opslag/auth, offerte- en voorwaardenversies, acceptatiebewijs, betaling/SEPA-QR, beheer/verificatie, e-mail, juridische/privacyzaken, tests en GitHub-publicatie.
- De helft van het huidige offertetotaal € 2.722,50 incl. btw is € 1.361,25; het resterende bedrag is € 1.361,25. Geen echte acceptatie, bankinstructie, betaling of e-mail is geactiveerd.
- Geblokkeerd voor veilige volledige implementatie totdat database/auth, goedgekeurde voorwaarden en versie, beveiligde ING-gegevens, offerte-/klantidentificatie en Resend SMTP-configuratie bekend zijn. Zie de invoerlijst in het plan.
- Geen code- of workflowtests uitgevoerd in deze vervolgstap. Status en log bijgewerkt; `instructions.md` ongewijzigd. Niet gepusht of gepubliceerd.

## 2026-10-09 — backendkeuze onderzocht

- Op basis van officiële Supabase- en Vercel-documentatie is Supabase Postgres + Supabase Auth als voorstel toegevoegd aan `docs/offerte-workflow-plan.md`: één relationele datastore met login/RLS, gekoppeld aan Vercel. De klant blijft token-gebaseerd; adminaccounts worden afgeschermd. Nog niet geconfigureerd en wacht op keuze van de eigenaar.
- Officiële Supabase SSR/RLS-, Vercel Marketplace- en Resend SMTP-bronnen opgenomen. Resend-credentials zijn `smtp.resend.com`, poort 465, gebruikersnaam `resend` en een API-key als wachtwoord; geen sleutel uitgevraagd of verzonden.
- Historische projectnotities melden oudere Resend/Upstash-resources, maar hun actuele beschikbaarheid is niet geverifieerd. Geen externe resource aangepast, geen e-mail verstuurd, geen code- of workflowtest uitgevoerd.

## 2026-10-09 — offerteacceptatie en betaalworkflow lokaal geïmplementeerd

- Uitgewerkt in `app/offerte/dietwiej/`, `app/api/offerte/dietwiej/`, `app/admin/offertes/`, `app/api/admin/offertes/`, `lib/quotes/`, `db/schema.sql`, `.env.example`, `package.json` en `docs/offerte-workflow-plan.md`.
- Databaseontwerp: Neon Postgres server-only, vaste quote-/voorwaardenhash, append-only audit-events, betaling-ledger met dubbele-registratiebeperkingen en transactionele e-mailoutbox. SQL is voorbereid maar niet op een Neon-project uitgevoerd.
- Klantflow: onguessable tokenroute, print-naar-PDF, vier niet vooraf aangevinkte bevestigingen, voorwaardenlink, eenmalige acceptatie en betaalpagina. De route `/offerte/dietwiej` toont geen offertedetails zonder persoonlijke token.
- Betaalbeheer: 50%-bedragen in centen, betaalreferentie, SEPA QR voor geldige ingestelde IBAN, klantmelding zonder ontvangststatus, handmatige adminverificatie met controleur/tijdstip, projectstartactie en expliciet restantverzoek.
- Admin heeft een Vercel-env passwordlogin met ondertekende HTTP-only cookie, 8 uur sessie en database-loginlimiet. Resend gebruikt de server-side API met idempotency keys/outbox; SMTP is niet geïmplementeerd. Geen bank- of mailgeheimen ingevuld.
- Geen echte quote-ID, klantadres, voorwaarden, retentiebeleid, ING-gegevens, Neon-link, Resend-key of klanttoken beschikbaar; acceptatieknop blijft daardoor uitgeschakeld. Geen e-mail, acceptatie of betaling verwerkt.
- Controles: `npm run test:quote` 3/3 geslaagd; `npx tsc --noEmit` geslaagd; `npm run lint -- --no-cache` geslaagd; `npm run build` geslaagd. Browser op mobiele viewport390px toont documentbreedte390px zonder horizontale overflow; eerste controle vond stale stylesheet, herbouwd en opnieuw gecontroleerd. Geen echte Postgres-integratietest omdat Neon ontbreekt.
- IP-/user-agentmetadata is afzonderlijk opgeslagen met ingestelde vervaldatum; dagelijkse Vercel Cron verwijdert verlopen metadata en bewaart de niet-persoonlijke auditgebeurtenis. `QUOTE_EVIDENCE_RETENTION_DAYS` en `CRON_SECRET` blijven nog te configureren; de acceptatieknop vereist een positieve retentietermijn.
- Publicatiestatus: lokaal in branch/worktree `codex/offerte-dietwiej`; niet gecommit, gepusht of gedeployed. Oorspronkelijke checkout niet aangepast.

### Vervolg — versievaste offerte en eindcontrole

- De klantgerichte offerte-inhoud is gecentraliseerd in `lib/quotes/config.ts` en wordt op de tweepagina-offerte hergebruikt. De snapshot-hash omvat deze tekst. `ensureQuote` en `findQuoteByToken` controleren hash, JSON-inhoud en voorwaarden; een opgeslagen versie die niet overeenkomt met de ingestelde versie wordt niet getoond of geaccepteerd.
- Uitvoeringsindex en status bijgewerkt met deze versiecontrole en de werkelijk uitgevoerde eindcontroles.
- Eindcontrole lokaal: Prettier voor de aangepaste TS-bestanden, ESLint voor die bestanden, `npx tsc --noEmit`, `npm run test:quote` (3/3), `git diff --check` en `npm run build` geslaagd.
- Database-integratie blijft onbewezen zolang er geen Neon-database is gekoppeld. Geen mail, digitale acceptatie of betaling verstuurd/verwerkt; geen push, commit of deployment uitgevoerd.

## 2026-10-09 — offerte afgestemd op MEDIADUSTRY-stijl

- De gebruiker vroeg de offerte vorm te geven zoals de actuele site. Live homepage en projectbron bekeken: witte/lichtgrijze basis, donker inktblauw, helder blauw en warm oranje; Inter en JetBrains Mono.
- In `app/offerte/dietwiej/offerte.module.css` vervangen zand/terracotta-palette door de sitekleuren, een dunne donkere bovenrand toegevoegd, bestaande Next-fontvariabelen aangehouden, focuszichtbaarheid geaccentueerd en donkere samenvattingsvlakken in nachtblauw gezet. Expliciete heading/leadkleuren voorkomen dat globale siteregels witte tekst op wit tonen.
- Browsercontrole op desktop en 390×844 mobiel; geen horizontale overflow en titel/tekstcontrast zichtbaar. `npx prettier --write app/offerte/dietwiej/offerte.module.css`, `git diff --check` en `npm run build` geslaagd. Devserver gestopt en viewport gereset.
- Geen acceptatie-, betaling-, e-mail- of databaseactie; geen commit, push of deployment.

## 2026-10-09 — reserveringsadvies toegevoegd aan offerte

- De reserveringstekst ondersteunt de persoonlijke/telefonische aanpak van een dorpszaak en adviseert een online optie alleen als mogelijke aanvulling, zodat gasten keuze hebben. Een systeem, abonnement of technische koppeling is expliciet niet opgenomen in de huidige offerteprijs.
- De gedetailleerde pagina bevat bronlinks en nuanceert landelijke cijfers als niet-lokaal: NOS/Restaurant Monitor 79% online reserveringen in 2023; OOvB citeert een stijging boven 80% in 2024 van een niet nader genoemd reserveringsplatform; Lightspeed/Zenchef rapporteerde 77% zelf beheren en 87% grotere reserveringsneiging; een apart Lightspeed/OnePoll-onderzoek rapporteerde 72% voorkeur voor telefonisch reserveren.
- Gecorrigeerd: de 34% in het consumentenonderzoek zoekt via culinaire websites; 22% gebruikt apps om restaurants te ontdekken. Dit is niet hetzelfde als 34% zoeken via apps.
- Offerteversie verhoogd van 1.0 naar 1.1; alle kopij/bronverwijzingen vallen daardoor onder de nieuwe snapshot-hash.
- Controles: `npx prettier` op aangepaste TS/CSS, gerichte ESLint, `npx tsc --noEmit`, `npm run test:quote` (3/3), `git diff --check` en `npm run build` geslaagd. Mobiele browsercontrole op 390 px bevestigt geen horizontale overflow en leesbare reserveringssectie.
- Geen klantmail, acceptatie, betaling, databasewijziging, commit, push of deployment uitgevoerd.

## 2026-10-09 — offerte bijgewerkt naar exclusief btw en Alex-conceptstijl

- De offerte toont nu alleen de bedragen exclusief btw (€ 2.150, € 100 en € 2.250). De btw-regel en het inclusief-btw-totaal zijn verwijderd uit de detailofferte en samenvatting; het betalingsoverzicht toont geen totaal inclusief btw. De bevestigingsmail vermeldt geen inclusief-btw-bedrag. Interne berekening en termijnbedragen zijn behouden voor de bestaande acceptatie-/betalingsworkflow. Offerteversie verhoogd naar 1.2.
- De offerte gebruikt de Alex-conceptachtergrond `#eeeae8`, de bijbehorende inkt-/blauwkleuren en de vaste MEDIADUSTRY-homepageheader. De offerte heeft extra ruimte onder de absolute siteheader; dubbele interne logoheaders zijn verwijderd.
- Ingebouwde lokale Die Twie-ontwerpdemo in desktop- en mobielframe, met bediening, volledig-schermweergave en link naar de huidige openbare website. De demo gebruikt de openbare beeld- en bedrijfsinformatie; bronnotitie staat bij het voorbeeld. Demo niet bedoeld als live reserveringssysteem.
- Controles: `npm run test:quote` (3/3), `npx tsc --noEmit`, gerichte ESLint, Prettier-check, `git diff --check` en `npm run build` geslaagd. Browsercontrole productiebuild: homepageheader zichtbaar; Alex-achtergrondkleur bevestigd; twee previewframes laden; offerte bevat geen `incl.`/`inclusief btw`-/€ 2.722,50-vermelding. 390 px mobiele viewport bevestigt documentbreedte 390 px zonder horizontale overflow. Viewport teruggezet.
- Geen klantmail, acceptatie, betaling, databasewijziging, commit, push of deployment uitgevoerd. Lokale productiepreview draait op poort 3004; de bestaande poort 3002 was al bezet en is niet aangepast.

## 2026-10-09 — website-audit samengevat in de offerte

- De door de eigenaar aangeleverde audit van dietwie.nl is verwerkt in `app/offerte/dietwiej/page.tsx` en `app/offerte/dietwiej/offerte.module.css`. Direct na de hero staat een compacte top drie: reserveren (telefonisch makkelijk bereikbaar, online optioneel onderzoeken), mobiele navigatie en de menukaart ook als leesbare tekst.
- Onderaan, vóór de footer, staat een beknopte technische aanbevelingenchecklist voor SEO/crawlbaarheid, mobiel/toegankelijkheid, actualiteit/NAP, performance/security en vervolgcontrole. De tekst maakt duidelijk dat dit audit-aanbevelingen zijn en niet automatisch inbegrepen werkzaamheden. Lighthouse/Core Web Vitals en Google Bedrijfsprofiel waren volgens de audit niet gecontroleerd.
- De workflow-index is bijgewerkt met deze scope-afbakening. Geen wijziging aan prijs of VAT-berekening.
- Controles: Prettier, TypeScript, gerichte ESLint, `git diff --check` en `npm run build` geslaagd. Productiepreview op desktop toont de top drie na de offertehero en technische checklist onderaan. Geen e-mail, acceptatie, betaling, databasewijziging, commit, push of deployment uitgevoerd.
- Previewserver voor deze gewijzigde build draait lokaal op poort 3005; eerdere previewpagina op 3004 is een vorige build.

## 2026-10-09 — offerte vereenvoudigd

- Op verzoek van de eigenaar is de klantweergave teruggebracht tot één offertepagina en één centraal prijsoverzicht. De top drie verbeterpunten, waaronder reserveren, blijven vooraan staan.
- De uitgebreide landelijke reserveringscijfers/bronnen zijn standaard ingeklapt onder “Waarom een online optie onderzoeken?”; de persoonlijke/telefonische benadering en de aanbeveling voor online reserveren als aanvulling blijven zichtbaar. De technische auditdetails blijven onderaan ingeklapt.
- Offerteversie verhoogd van 1.2 naar 1.3 zodat wijzigingen in de klantweergave onder een nieuwe versie vallen. De bedragen € 2.150, € 100, € 2.250 en € 75/jaar staan elk één keer; btw wordt niet inclusief getoond.
- Gewijzigd: `app/offerte/dietwiej/page.tsx`, `app/offerte/dietwiej/offerte.module.css`, `lib/quotes/config.ts`, `docs/offerte-workflow-plan.md`, `status.md`.
- Controles: `npm run test:quote` (3/3), `npx tsc --noEmit`, gerichte ESLint, Prettier, `git diff --check` en `npm run build` geslaagd. Browsercontrole op desktop en mobiel 390 px; geen horizontale overflow, één offerte/prijsoverzicht, bedragen elk eenmaal en beide toelichtingssecties standaard gesloten.
- Lokale preview op poort 3008. Geen e-mail, acceptatie, betaling, commit, push of deployment uitgevoerd.

## 2026-10-09 — offerteheader, leesbaarheid en thema hersteld

- De eigenaar vroeg om dezelfde logo-/menu-/themaheader als op de homepage, grotere tekst en een werkende light/dark-schakelaar. De app gebruikt `Header1`, `ThemeSwitcher` en `MenuRuntimeShell`; de homepage is standalone HTML. De app-header is op de homepage afgestemd met dezelfde mark/wordmark, afmetingen en horizontale gutters, maan-/zon-SVG, ronde knoppen en driestreepsmenu. De route-eigen offertemasthead is verwijderd. `instructions.md` legt voortaan vast dat beide headerimplementaties synchroon blijven.
- `ThemeSwitcher` werkt nu met dezelfde maan-/zoniconen en toegankelijke omschakellabels als de homepage. De offerte heeft kleurvariabelen voor `[color-scheme="dark"]`, zodat zowel achtergrond als tekst/oppervlakken omschakelen. De compacte lopende teksten, labels en voetnoten zijn vergroot.
- Gewijzigd: `components/headers/ThemeSwitcher.tsx`, `components/headers/NavTrigger.tsx`, `components/headers/header.module.css`, `components/brand/MediadustryMark.tsx`, `app/offerte/dietwiej/page.tsx`, `app/offerte/dietwiej/offerte.module.css`, `instructions.md`, `docs/offerte-workflow-plan.md`, `status.md`.
- Browsercontrole: desktop 1440 px en mobiel 390 px; geen horizontale overflow. Op mobiel logo-uitlijning, ronde iconknoppen, 3-streepsmenu en tekstmaten gecontroleerd. Schakelen naar dark geeft `color-scheme=dark` en offertachtergrond `rgb(24,24,25)`; terugschakelen naar light werkt. Menu opent; Escape sluit het. Preview achtergelaten in light op poort 3008.
- `npm run test:quote` (3/3), `npx tsc --noEmit`, gerichte ESLint, Prettier, `git diff --check` en `npm run build` geslaagd. Niets gepubliceerd of gepusht.

## 2026-10-09 — automatische controle op gelijke header

- `scripts/build-native-home.mjs` controleert bij iedere homepagebuild de overeenkomst tussen homepage- en app-header voor beeldmerk-SVG, maan-/zon-/menuiconen, desktop-/mobiele maten en gutters. Een afwijking stopt de build met een gerichte foutmelding.
- De eerste controle telde ook het footerlogo mee; de selector is aangescherpt naar alleen het headerlogo. De herhaalde generator en volledige `npm run build` slaagden. Gerichte ESLint, TypeScript, `npm run test:quote` (3/3), Prettier en `git diff --check` slaagden ook.
- Gewijzigd: `scripts/build-native-home.mjs`. Preview blijft lokaal op poort 3008; niet gepusht of gedeployed.

## 2026-10-09 — twaalf browseropmerkingen offerte verwerkt

- Offerte v1.4: grotere header binnen offerteselector (10 px rem-basis versus 16 px live); grotere footer; hoofdpunten vernieuwing, warmere uitstraling en actueel gebruiksgemak. Homepagebron/config niet aangepast.
- Reserveren toegevoegd aan scopekopij en zichtbare 79%/ruim 80%/77%-statistiekkaarten. NOS, OOvB en RestaurantKrant-bronnen opnieuw gelezen; landelijke cijfers met bron/jaartal en afbakening weergegeven.
- Hosting € 300/jaar (€ 25/maand) excl. btw als terugkerende kost toegevoegd aan klantweergave en snapshot; geen korting en niet bij het eenmalige totaal opgeteld.
- Die Twie-preview gebruikt compacte toolbar zonder fullscreen/liveknop en zonder verwijzing naar verwijderde knop. Andere showcases behouden bediening.
- Losse papieren handtekeningsectie verwijderd. Digitaal akkoord heeft één gecombineerd akkoord, naamveld en actuele Amsterdamse datum. Server valideert naam en vier onderliggende verklaringen en slaat de naam op in acceptatiebewijs/audit. Activatievoorwaarden blijven vereist.
- Controles: productiebuild incl. TypeScript en generator geslaagd; gerichte ESLint, Prettier, git diff --check en geldtests 3/3 geslaagd. Browser desktop 1280 px en mobiel 390 px: breedte gelijk aan viewport, headerwoordmerk 23.04/18.4 px, footer 16 px, één checkbox; naamveld gevuld met voorbeeldtekst en daarna leeggemaakt. Geen overeenkomst geaccepteerd, mail of betaling verstuurd. Databasepad niet geïntegreerd getest.
- Lokale preview gestart op 3012 met niet-geheim testtoken; tijdelijke server op 3011 gestopt. Geen commit/push/deployment.

## 2026-10-09 — tweede browsercorrectieronde offerte

- Offerte v1.5: gemarkeerde scopeparagraaf verwijderd, reserveringsvoorselectie met Guestplan/GoTable/Zenchef toegevoegd aan kopij en snapshot. Officiële bronnen gelezen: Guestplan online-reservations/product-updates, GoTable-homepage, Zenchef Reserve with Google-help. Guestplan/Zenchef directe Google-integratie bevestigd; GoTable-details nog te controleren. Geen marktaandeelclaim toegevoegd.
- Percentages gewicht 800; prijskaart over volle inhoudsbreedte met accentkader en grotere bedragen. Hosting is op verzoek gecorrigeerd naar € 300 korting voor eerste hostingjaar (netto hosting jaar één € 0); jaarlijkse prijs vanaf tweede jaar € 300; eenmalige € 2.250 behouden. Snapshot aangepast.
- Build incl. TypeScript en generator, gerichte ESLint en git diff --check geslaagd. Browser bevestigt verwijderde tekst, kaarten gewicht 800, prijsblok/sectiebreedte beide 1084 px en mobiel 390 px zonder overflow. Previewserver 3012 herstart en browser herladen. Geen contract-, mail-, betaal-, commit- of publicatieactie.

## 2026-10-09 — typografie en uitlijning aangescherpt

- Bovenruimte en hero-ritme verkleind; kleine documentlabels en de prioriteiten/audittekst vergroot. Technische details en footer hebben grotere lopende tekst. De reserveringsopties zijn gelijkmatige drie kolommen op desktop en één kolom op mobiel.
- Prijskaart gebruikt de volledige sectiebreedte. Eenmalig totaal en eerstejaars hostingkorting hebben duidelijkere nadruk; totaal van € 2.250 excl. btw blijft ongewijzigd.
- Controle: `npm run build` geslaagd (inclusief TypeScript en statische paginageneratie). Productiepreview op poort 3012 ververst en visueel gecontroleerd op desktop en viewport 390 × 844; mobiele tekst, metadata en prioriteiten gestapeld zonder horizontale overflow. De reserveringskaarten en het brede prijsblok zijn op desktop visueel bekeken.
- Alleen lokaal; geen e-mail, acceptatie, betaling, commit, push of deployment uitgevoerd.

## 2026-10-09 — offertebedrag en materiaalafstemming aangepast

- Browseropmerkingen verwerkt in `lib/quotes/config.ts`, `app/offerte/dietwiej/page.tsx` en `app/offerte/dietwiej/offerte.module.css`.
- Verhoogd totaalbedrag aangepast naar € 1.950 excl. btw: websitevernieuwing € 1.850 en Outlook-inrichting € 100. Offerteversie verhoogd naar 1.6; de interne betaalberekening past 21% btw toe voor de 50/50-splitsing van het betaalbedrag: € 1.179,75 per termijn. Dit inclusief-btw-totaal staat niet in de klantofferte. Een eerder opgeslagen offerteversie wordt door de bestaande versiecontrole niet stilzwijgend vervangen.
- Hostingtoelichting heeft extra bovenruimte. Vervolgstap zegt nu dat beschikbare foto’s worden besproken en dat eventuele aanvullende fotografie plus kosten vooraf worden afgestemd; fotografie blijft uitgesloten van de vaste offerteprijs.
- Controles: Prettier, `git diff --check`, `npx tsc --noEmit` en `npm run build` geslaagd. Productiepreview op poort 3012 vernieuwd; browser bevestigt nieuwe fotografiecopy en vervolgtekst. Pagina en acceptatieformulier geladen. Geen acceptatie-, e-mail-, betaal- of databaseactie uitgevoerd.

## 2026-10-09 — offerte via GitHub in productie gezet

- De offerte v1.6 en bijbehorende workflow zijn als commit `4b3a359` naar GitHub `main` gepusht. De gekoppelde Vercel-productiondeployment `dpl_6qBQX9kwdduzbuMVkF3rL7JPyJQw` werd READY.
- In Vercel Production is een nieuw willekeurig `DIETWIEJ_ACCESS_TOKEN` als sensitive environment variable aangemaakt. De persoonlijke offertelink is live gecontroleerd: offertetitel, € 1.950 excl. btw, aanvullende-fotografiecopy en melding dat digitale acceptatie nog niet is ingericht waren aanwezig. De tokenwaarde is alleen in Vercel gezet en staat niet in Git of deze documentatie.
- De acceptatie-/betaalworkflow blijft geblokkeerd totdat Neon/database, voorwaarden, offerte-ID/contactgegevens, beheerlogin, bewaartermijn/cron en afzender-/betaalinstellingen zijn ingevuld. Er is geen klantbericht verstuurd en geen acceptatie of betaling verwerkt.
- Homepagebestanden (`content/homepage/index.html`, `app/page.tsx`, native-home output en homepage-assets) zijn niet gewijzigd. De homepagebron-diff tegen de basiscommit was leeg; de homepage blijft via de bestaande native-home rewrite lopen. Rootpagina kon na deployment worden opgehaald.
- Controles: `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd; Vercel-productiondeployment READY; live offertelink opgehaald en gecontroleerd.

## 2026-10-09 — externe conceptpreview aangevraagd

- De offertepreview is in `app/offerte/dietwiej/reservation-preview.tsx` gekoppeld aan `https://gastrobar-die-twie.chatgpt-busi-7152.chatgpt.site/?v=9`. Alleen deze exacte host is toegevoegd aan de toegestane iframe-hosts in `lib/showcase/iframe.ts`; de bestaande lokale previewtour wordt niet op de cross-origin pagina uitgevoerd.
- Een zichtbare melding noemt de ingebedde website een interactief concept en zegt dat inhoud en reserveringen voorlopig zijn. Dit is nodig omdat de bron onder meer TODO-velden en een Guestplan-demo toont.
- `npm run build` geslaagd. Git-diff bevat geen homepagebestanden. Rechtstreeks anoniem `curl` met browser User-Agent kreeg `401`; dat resultaat onderscheidt geen toegangsbeleid van botbescherming. De aangeleverde site staat niet in het ChatGPT Sites-overzicht van het actieve account, dus deelinstellingen konden niet worden gewijzigd.
- Alleen lokaal; niet gepusht of gedeployed totdat de anonieme browsertoegang tot de bron bevestigd kan worden. Volgende stap: eigenaar schakelt publieke toegang in of bevestigt dat de `401` niet voor gewone externe browserbezoekers geldt; daarna embed/anonymous access verifiëren en publiceren via GitHub.

## 2026-10-09 — offertepreview via GitHub en Vercel gepubliceerd

- Op verzoek is commit `fc9eced` (`Embed Die Twie concept preview in quotation`) via de verbonden GitHub-repository naar `main` gepusht; er is geen directe Vercel-deployment gestart.
- Vercel project `mediadustry-com` bouwde GitHub-commit `fc9eced21a0ae633c19e15a2c1c9e312f6352aaf`; deployment `dpl_7qxSNjZyJbiQDxoFbn8CZtCVCiFy` is READY.
- `https://www.mediadustry.com/` en `https://www.mediadustry.com/offerte/dietwiej` antwoorden HTTP 200. Homepagebestanden maakten geen deel uit van de commit. De anonieme toegankelijkheid van de ingebedde ChatGPT-site blijft onzeker door een eerdere HTTP 401; dit is niet opnieuw opgelost door de GitHub/Vercel-publicatie.
- Productiebouw, Prettier en `git diff --check` waren geslaagd vóór publicatie.

## 2026-10-09 — PDF-knop uit de offerte verwijderd

- De knop ‘Download offerte als PDF’ en de bijbehorende `PrintOfferButton`-component zijn verwijderd uit `app/offerte/dietwiej/page.tsx`; `app/offerte/dietwiej/print-button.tsx` is verwijderd. Alleen de PDF-knop gebruikte `.adminButton`, daarom is die styling ook verwijderd uit `app/offerte/dietwiej/offerte.module.css`. Akkoordfunctionaliteit en resterende pagina-inhoud blijven staan.
- Controles: `npm run build`, Prettier en `git diff --check` geslaagd. Lokale previewserver op poort 3012 (testtoken) antwoordt HTTP 200; gerenderde HTML bevat geen ‘Download offerte als PDF’ maar bevat de akkoord- en technische rapportsecties.
- Commit `eae559d` staat op GitHub `main`; Vercel-productiondeployment `dpl_Dyma8Vs2FCrsQr3cxPVTGzjF5zMR` is READY. Homepagebestanden zijn niet gewijzigd.

## 2026-10-09 — opt-ins voor projectcontact toegevoegd

- De acceptatie toont onafhankelijke, niet vooraf aangevinkte keuzes voor vrijwillige projectupdates per e-mail en telefoon. De keuzes zijn niet nodig voor het offerteakkoord. Als een kanaal wordt aangevinkt, valideert de API het bijbehorende adres/nummer; niet-aangevinkte invoer wordt niet meegestuurd of opgeslagen.
- De gekozen contactgegevens en kanaalkeuzes komen in `quote_workflow_acceptance_metadata`, zijn zichtbaar op de beveiligde admin-offertepagina en verlopen met de bestaande vervaldatum van acceptatiemetadata. Een versieaanduiding, tijdstip en kanaalkeuzes komen in het append-only acceptatiebewijs/audit-event. De bestaande transactionele Resend-mail blijft naar het vooraf ingestelde offerteadres gaan; er zijn geen marketing- of automatische project-/sms-berichten toegevoegd.
- `db/schema.sql` bevat voor nieuwe en bestaande installaties idempotente kolomtoevoegingen. Het Neon-schema is niet toegepast; de huidige acceptatie blijft uitgeschakeld totdat de database en overige configuratie gereed zijn.
- Controles: Prettier, `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Lokale preview op poort 3012 toont beide opt-ins standaard uit. Geen offerte geaccepteerd, geen database benaderd, geen e-mail of betaling verstuurd. Geen homepagebestanden gewijzigd; wijzigingen zijn lokaal en nog niet gepubliceerd.

### Publicatiestatus bijgewerkt

- Commit `81ec275` is naar GitHub `main` gepusht. GitHub rapporteert voor de gekoppelde Vercel-build status `success` en “Deployment has completed”. Er is geen Vercel CLI-deployment gestart. Database-/end-to-endacceptatie blijft open zoals hierboven beschreven.

## 2026-10-09 — contactvelden aangepast op verzoek eigenaar

- De eerdere vrijwillige opt-incheckboxes zijn verwijderd. Alleen de bestaande checkbox voor offerteakkoord blijft staan. Naam, e-mailadres en telefoonnummer zijn verplichte, vooraf ingevulde maar aanpasbare velden; het ingevulde e-mailadres wordt gebruikt voor acceptatie-/betaalberichten en de telefoon wordt opgenomen in aflopende acceptatiemetadata.
- Validatie aan client- en serverzijde vereist naam, geldig e-mailadres en geldig telefoonnummer. Admin toont e-mail en telefoon bij de offertegegevens. Acceptatie blijft afhankelijk van de database, voorwaarden, retentie en overige activatie-instellingen.
- Controles: `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. De lokale persoonlijke offertelink antwoordt HTTP 200; HTML bevat alle drie vooraf ingevulde waarden, precies één checkbox en geen opt-invelden/teksten. Geen acceptatie, databasewijziging, e-mail of betaling uitgevoerd.

### Publicatiestatus

- Commit `baf022b` is naar GitHub `main` gepusht. GitHub rapporteert voor de gekoppelde Vercel-build status `success` en “Deployment has completed”; geen directe Vercel-deployment gestart. De homepage is niet gewijzigd.

## 2026-10-09 — Resend-ontvangers voor offerteacceptatie

- De bestaande Resend API-outbox maakt bij digitale offerteacceptatie nu een interne notificatie aan `info@mediadustry.com`, naast de ontvangstbevestiging en aanbetalingsmail aan het ingevulde klantadres. De interne melding bevat klantnaam, contactgegevens, offerte-ID en bedrag. Aanbetalings-/betaalstatusupdates blijven uitsluitend naar de klant gaan. Geen CC/BCC of andere ontvangers toegevoegd.
- Verzendaanroepen blijven server-side, per bericht geïndexeerd/idempotent en vereisen `RESEND_API_KEY` plus een geverifieerde `RESEND_FROM_EMAIL`. Er is geen Resend-account- of afzenderconfiguratie bevestigd; geen echte e-mail verstuurd.
- Controles: `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Productiebuild heeft geen homepagebestanden gewijzigd.
- Commit `7e51b57` is naar GitHub `main` gepusht via de repository; gekoppelde Vercel Production-deployment `dpl_2W1eg83S1iXdM6NxbbLqCJQUTszw` staat READY en bevat de nieuwe commit. Homepagebestanden zijn niet gewijzigd.
- Acceptatie blijft afhankelijk van database, voorwaarden en overige vereiste configuratie. Resend-productiecredentials/afzender zijn niet geverifieerd; er is geen e-mail verstuurd.

## 2026-10-09 — offerteprijs teruggezet naar € 2.250

- Op verzoek het zichtbare offertebedrag aangepast naar € 2.250 excl. btw: websitevernieuwing € 2.150 en Outlook-inrichting € 100. Offerteversie verhoogd van 1.6 naar 1.7 zodat een eerder opgeslagen snapshot niet stilzwijgend wordt overschreven.
- De interne betaalbasis is aangepast naar € 2.722,50 incl. btw, verdeeld in twee termijnen van € 1.361,25. Het btw-bedrag in het immutable snapshot is bijgewerkt; de klantweergave blijft exclusief btw.
- Hostingtekst en offerteworkflowplan bijgewerkt. Alleen offerte-/workflowbestanden en projectdocumentatie gewijzigd; homepage ongemoeid.
- Controles: `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Lokale offertepreview op poort 3012 antwoordt HTTP 200; in gerenderde inhoud worden de zichtbare websiteprijs en het eenmalige totaal elk éénmaal getoond, ontbreken de oude bedragen en herhaalt de hostingtoelichting het totaal niet.
- Alleen offertecode en projectdocumentatie zijn gewijzigd; homepagebestanden zijn niet gewijzigd. Commit `4f7aa0b` staat op GitHub `main`; gekoppelde Vercel Production-deployment `dpl_GbBEzFH4nLAoqgUUfeJS5JasWuV8` is READY. Geen directe Vercel-deployment gestart.

## 2026-10-09 — logo voor e-mailhandtekening (lokaal)

- Op basis van het bestaande monochrome merkbeeld zijn `public/logo.svg` en een transparante PNG `public/logo.png` gemaakt. De PNG is 424×360 px; PNG is de aanbevolen e-mailhandtekeningvariant omdat ondersteuning voor SVG in e-mailclients wisselend is. De beoogde publieke adressen zijn `https://www.mediadustry.com/logo.png` en `https://www.mediadustry.com/logo.svg`.
- Werk op een nieuwe branch vanaf actuele `origin/main` (`codex/email-signature-logo`), omdat de bestaande lokale `main` 18 commits achterliep en ongerelateerde homepagewijzigingen bevat. Er is nog niets gepubliceerd; GitHub-push/PR en productie-URL-controle staan open.
- Controle: PNG gegenereerd met de bestaande Sharp-installatie; dimensies 424×360 en bestandsgrootte 3129 bytes bevestigd. Externe bereikbaarheid en e-mailclientweergave nog niet geverifieerd.
- Afrondingscontrole: `git diff --check` geslaagd; commit `f96f997` staat op GitHub branch `codex/email-signature-logo`. `https://www.mediadustry.com/logo.png` en `.svg` geven beide HTTP 404 (verwacht zolang niet in productie). In deze sessie is geen GitHub PR-tool beschikbaar; PR/merge en Vercel-productiepublicatie zijn dus niet bevestigd.

## 2026-10-09 — logo via GitHub naar Vercel gepubliceerd

- De logo-commits vanaf actuele GitHub `main` fast-forward naar `main` gepusht (geen force push); commit `7c79a8f` bevat PNG/SVG plus projectstatus. De bestaande lokale homepagewijzigingen in de oorspronkelijke werkmap zijn niet meegenomen.
- Vercel Production-deployment `dpl_BW4JMKe772n3YdKyKnWZ1snd2ZLt` is READY, bron `main` / commit `7c79a8f`, aliassen bevatten `www.mediadustry.com` en `mediadustry.com`.
- Live HTTP-controle: `/logo.png` → 200 `image/png` (3129 bytes); `/logo.svg` → 200 `image/svg+xml` (603 bytes); favicon blijft 200. De eerste requests tijdens build gaven 404; na deployment READY opnieuw gecontroleerd en beide logo-assets laden.

## 2026-10-09 — status van de offerteknop verduidelijkt

- De acceptatieknop bleef disabled omdat `isAcceptanceReady()` niet voldaan is; de checkbox zelf functioneert. De knop gaf daardoor een blauwe uitgeschakelde indruk zonder direct uit te leggen dat database, voorwaarden en betaal-/e-mailconfiguratie nog ingericht moeten worden.
- Knoptekst is bij incomplete configuratie aangepast naar “Akkoord tijdelijk niet beschikbaar”; er staat nu een concrete toelichting onder de knop. Uitgeschakelde knoppen hebben een neutrale grijze stijl, terwijl de actieve knop de accentkleur behoudt. `aria-describedby` koppelt de knop aan de uitleg.
- Controles: `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. De lokale offerte-preview op poort 3012 antwoordt HTTP 200; HTML toont de nieuwe knoptekst, uitleg en disabled-state. Geen acceptatie, databaseactie, e-mail of betaling uitgevoerd.
- Commit `8cdfaf4` is via GitHub naar `main` gepusht; gekoppelde Vercel Production-deployment `dpl_XkyiHLDqg6iAdmBoWPc5f5qHxPkd` is READY. Geen directe Vercel-deployment gestart. Homepagebestanden zijn niet gewijzigd.

## 2026-10-09 — aangeleverd MEDIADUSTRY-icon zwart gemaakt

- Bron: `/Users/mariohodzelmans/Desktop/Logo - MEDIADUSTRY - Icon.svg`. De SVG bevat twee polygonen; beide zijn expliciet `fill="#000000"` gegeven. De bestaande publieke `public/logo.svg` is vervangen en daaruit is met Sharp een transparante PNG op 1110×1099 px gemaakt als `public/logo.png`.
- De lokale SVG-bron is gelezen (421 bytes) en de gegenereerde PNG is als 1110×1099 RGBA gecontroleerd. GitHub/Vercel-publicatie en live controle staan nog open.
- Publicatie: commit `81be4b2` naar GitHub `main`; Vercel Production-deployment `dpl_9FPFyFK9bMaKp7mXEhefjqTe7cJY` READY met `www.mediadustry.com`-alias. Live `/logo.png` en `/logo.svg` geven 200 met respectievelijk `image/png` en `image/svg+xml`; beide zijn byte voor byte gelijk aan de nieuwe lokale bestanden. Een cache-busting controle bevestigde de nieuwe PNG op 1110×1099 px.

## 2026-10-09 — e-mailhandtekening en bevestiging offerteakkoord

- Een losse tabelgebaseerde HTML-handtekening toegevoegd in `docs/email-signature.html`, met de door de eigenaar aangeleverde merk-, contact-, adres- en legal-disclaimergegevens. Het logo verwijst naar het eerder via GitHub gepubliceerde PNG-bestand.
- De klantmail `quotation_accepted` heeft nu een verzorgde MEDIADUSTRY-opmaak, persoonlijke aanhef, vastgelegd akkoordmoment, offerteprijs exclusief btw en dezelfde Nederlandstalige handtekening. De plain-tekstvariant is eveneens bijgewerkt. Het offertebedrag wordt uit het subtotaal excl. btw opgebouwd; het interne betaalbedrag inclusief btw blijft alleen voor de betaalworkflow gebruikt.
- `lib/quotes/workflow.ts` voegt naam, akkoordmoment en subtotaal aan de klant- en interne acceptatie-outboxpayload toe. De bestaande losse aanbetalingsmail, interne melding, idempotency en ontvangers zijn niet veranderd.
- Documentatie bijgewerkt: `docs/offerte-workflow-plan.md` en `status.md`. Homepage is niet gewijzigd.
- Controles: Prettier, `npx tsc --noEmit`, `npm run build` en `git diff --check` geslaagd. Geen echte acceptatie of e-mail verstuurd; verzending blijft afhankelijk van de bestaande database-, voorwaarden-, Resend- en betaalconfiguratie.
- Eerst lokaal gecommit als `e695f8d`, daarna na integratie van twee nieuwere commits van `origin/main` gerebased tot `f60b862`. Via GitHub naar `main` gepusht. Vercel Production-deployment `dpl_ADwjYyvBFFebNQqroDUnrMCKuWCS` bouwde commit `f60b8625a892a133380cce4a49c2358044cde645` en is READY. Geen directe deployment gestart.

## 2026-10-09 — voorbeeldbevestiging per Resend geleverd

- Op expliciet verzoek een voorbeeld van de offertebevestigingsmail gestuurd naar de eigenaar. Het onderwerp vermeldt dat het een voorbeeld is; de mail zegt duidelijk dat geen echte offerteacceptatie heeft plaatsgevonden en gebruikt placeholders voor klantnaam en offertenummer.
- De afzender is gecontroleerd tegen een geverifieerd Resend-domein. Resend retourneerde e-mail-ID `01a12142-04c9-7b31-b710-6197d737743d`; een vervolgaanvraag meldt `delivered`. Er is geen databaseacceptatie, klantmail of betaling uitgevoerd.
- De productie-outbox gebruikt nog steeds `RESEND_FROM_EMAIL`; die variabele ontbreekt nog. De voorbeeldmail is een losse verzending via de reeds geconfigureerde afzender en maakt de acceptatieflow niet actief.

## 2026-10-09 — MEDIADUSTRY-headerlogo verkleind

- In de gedeelde app-header zijn het beeldmerk, de tussenruimte en het woordmerk verkleind op desktop en mobiel. De equivalente standalone homepage-header in `content/homepage/index.html` volgt dezelfde afmetingen; inhoud en andere homepage-elementen zijn niet aangepast. De build-pariteitscontrole is bijgewerkt naar de nieuwe mobiele beeldmerkomvang.
- Controles: `npx tsc --noEmit`, `npm run build` (inclusief generatie standalone homepage) en `git diff --check` geslaagd. Lokale offerte op poort 3012 is geopend; toegangstekst en offerte-inhoud aanwezig. Geen echte acceptatie, e-mail of betaling uitgevoerd.
- Publicatie naar GitHub en Vercel nog niet bevestigd.

## 2026-10-09 — klantbevestiging en akkoordtekst vereenvoudigd

- Klantbevestiging gebruikt voortaan alleen de eerste naam uit de akkoordgeversnaam. De tekst spreekt de klant aan met “akkoord”, vermeldt dat we uitkijken naar een lange samenwerking en zegt dat we vertrouwen hebben dat de investering zich terugverdient via de vernieuwde website.
- De e-mailbody en “Met vriendelijke groet” gebruiken dezelfde Arial-fontfamilie, 15 px tekstmaat en 24 px regelhoogte; naam en offertetotaal blijven visueel benadrukt. De knop/sectie in de offerte gebruikt nu “Akkoord” in plaats van “Digitaal akkoord”.
- Controles: Prettier, `npx tsc --noEmit`, `npm run build` inclusief header-pariteitscontrole en `git diff --check` geslaagd. Geen acceptatie, e-mail of betaling uitgevoerd.
- Commit `3d36d6c` is naar GitHub `main` gepusht. Vercel Production-deployment `dpl_Gow6pLmLAR8Z4x9MPUV3sRmnpVsx` voor deze commit is READY, met aliassen `www.mediadustry.com` en `mediadustry.com`. Geen directe deployment gestart.

## 2026-10-09 — persoonlijke Die Twie-offertelink vernieuwd

- Op akkoord van de eigenaar is `DIETWIEJ_ACCESS_TOKEN` in de Production-omgeving van Vercel geroteerd, omdat de bestaande geheime waarde niet kon worden uitgelezen. De oude link is daarmee ongeldig; nieuwe waarde staat alleen in Vercel en is niet in Git of projectdocumentatie opgenomen.
- De GitHub-push om Vercel de bijgewerkte environment value te laten laden volgt nu. Daarna wordt de persoonlijke route gecontroleerd en de link rechtstreeks aan de eigenaar gegeven. Acceptatie blijft volgens de bestaande configuratie uitgeschakeld; geen e-mail, akkoord of betaling uitgevoerd.
