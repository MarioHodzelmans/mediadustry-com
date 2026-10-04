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
