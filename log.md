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
