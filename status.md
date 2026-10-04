# MEDIADUSTRY — status

Bijgewerkt: 2026-10-04 21:48 Europe/Amsterdam.

**Laatste websiteopdracht afgerond:** bestaand Alex Kamsma-websitevoorstel geïntegreerd en scrolldemo hersteld. De oorspronkelijke e-mailactivering blijft open; zie hieronder.

**Gepubliceerd:** voorstel via het hoofdmenu en de Alex-case; zelfstandige desktop/mobiele preview uit de eigen klantrepository; begrensde autoscroll die pauzeert buiten beeld, in een verborgen tab en bij handmatige bediening; pauze/herstart; native volledig-schermdialoog en Escape; aangepaste titel en compacte akkoordknop. Previewbron en werkwijze staan in docs/showcase-engine.md en public/previews/alex-kamsma/SOURCE.md.

**Werkelijk gecontroleerd:** volledige ESLint, TypeScript en productiebuild geslaagd. Menu en caseknop getest op 320 en 390 px, zonder horizontale overflow en met correct uitgelijnde SVG. Productiepreview getest: autoscroll, menu/sectielinks, voltooiing bovenaan, pauze/herstart, handmatig scrollen, Escape, volledig scherm en reduced-motion. Gemeten: nul animatiecallbacks bij buiten beeld, pauze en na voltooiing. De terugkeerknop staat onder het venster en overlapt de mobiele navigatie niet meer. Live site op 1280 en 320 px opnieuw gecontroleerd: voorstel via menu/case, echte autoscroll, fonts geladen, volledig scherm/Escape, geen overflow of browserfouten.

**Publicatiebewijs:** GitHub `main` gepusht met commit f51fe82b288a93d8bdeaf128abbc948e12f2176c. Verbonden hostingdeployment dpl_4NbEndcTaaPL6iTHSsNJqchnNT7o heeft status READY en aliases www.mediadustry.com/mediadustry.com. Geen directe deployment gebruikt. Live resultaat: https://www.mediadustry.com/concept/alex-kamsma-parket.

**Eerder gepubliceerd:** optimalisatie en opt-inimplementatie via GitHub, commit e91f3dad84ab3a15e7c41bf801e0ac3d9c569c8f, hostingdeployment READY. De toen uitgevoerde mobiele Lighthouse-meting gaf 98 performance en 100 accessibility/best practices/SEO. Dit is een meting van die versie, geen nieuwe meting van de huidige lokale wijziging.

**Open activering e-mail:** Resend is ingericht, maar Redis-opslag voor echte formulierontvangst en double opt-in ontbreekt nog. Upstash-integratie vraagt persoonlijke voorwaardenacceptatie van de gebruiker; deze is nog niet gegeven. Formulieren tonen daarom eerlijk een melding en e-mailalternatief. De eigen mail.mediadustry.com-afzender wacht op DNS; details in docs/resend-dns.md. Terugkerende marketingcampagnes zijn niet ingericht.

**Laatste afronding:** lokale preview verkleind van 704.261 naar 334.894 bytes (52%); WOFF2 behoudt alle oorspronkelijke glyphs. Smalle volledig-schermpreview op 320 px gecontroleerd: telefoon op één regel, menu vrij, fonts geladen, geen overflow of browserfouten. Escape herstelt focus en body-scroll. De zwevende akkoordknop verdwijnt zolang de preview zichtbaar is. Laatste productiebuild geslaagd. Lokale conceptmeting na compressie: transfer 818→569 KB, geen idle animatiecallbacks, performance 84, accessibility/best practices 100; dit is geen nieuwe score voor de homepage.

**Volgende stap:** voor deze websiteopdracht zijn geen open codewijzigingen. Voor de oorspronkelijke opt-infunnel moet de gebruiker zelf de Upstash-integratievoorwaarden accepteren; daarna vrije Redis-resource koppelen, configuratie controleren, publiceren via Git en de ontvangst/bevestiging/afmelding verifiëren. De eigen e-maildomein-DNS en terugkerende campagnes blijven afzonderlijke open punten. Accepteer geen externe integratievoorwaarden namens de gebruiker.
