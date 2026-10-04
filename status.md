# MEDIADUSTRY — status

Bijgewerkt: 2026-10-04 23:24 Europe/Amsterdam.

**Opdracht:** herstelde homepage ongeveer gelijk houden, light/dark behouden, menuknop eenvoudiger en optimaliseren naar vier 100-scores. De eigenaar vraagt nu om afronden en alles in Markdown opslaan.

**Lokaal gereed:** dezelfde ontwerp-/inhoudsbronnen, native vooraf gebouwde productiehomepage, lichte menu/themabediening, beperkte CSS en losse legacy-runtime, responsive AVIF’s met native/nabije lazy loading, gevalideerde kleinere fonts, juiste www-canonical, focus/skiplink en mobiele case/404-correcties. Het Alex-voorstel blijft behouden. Geen nieuwe e-mailfunnel geactiveerd.

**Werkelijk gemeten:** Lighthouse 13.5.0, lokale productiehomepage: mobiel **100/100/100/100**, FCP1,1s/LCP1,7s/TBT0/CLS0; desktop **100/100/100/100**, FCP0,3s/LCP0,4s/TBT0/CLS0. Uitgangspunt live mobiel86/100/100/100. De officiële Google-API HTTP429 en webinterface Unable to resolve (ook web.dev): Google-cloudscore nog onbevestigd.

**Controles:** volledige ESLint, TypeScript/productiebuild en native HTML-generator geslaagd. Onafhankelijke320/390px-QA light/dark, opslag/herladen, focuscyclus/Escape/inert/scrollherstel, alle vijf beelden, contact→home→Back/Forward zonder RSC-fouten en alle21 lokale assets HTTP200. Voorstelautoscroll/fullscreen/Escape behouden. Afzonderlijk JavaScript-uitcontrole: alle vijf noscript-beelden zichtbaar/geladen, geen overflow. Geen browserfouten. Laatste native verhaalcontrole bevestigt ook bfcache-thema, contactterugkeer, daadwerkelijke voorstelautoscroll en fullscreen/Escape zonder consolewaarschuwingen. Alle subagenttestsessies zijn gesloten.

**Opslag:** [docs/homepage-performance.md](docs/homepage-performance.md) bevat implementatie, scores, controles en open grenzen. [docs/font-subsets.md](docs/font-subsets.md), README, instructions en showcase-engine bijgewerkt. Volledige HTML/JSON-rapporten lokaal in artifacts/pagespeed/2026-10-04, buiten Git; historische logentries behouden.

**Volgende en laatste stap:** commit/push via GitHub main, verbonden deployment controleren en live mobiel/desktop meten; officiële PageSpeed één keer opnieuw proberen. Daarna publicatiebewijs in deze status/log/rapport opslaan en eigen testsessies/server afsluiten. Nog geen live100-score van de nieuwe versie geclaimd.
