# Homepageoptimalisatie — 4 oktober 2026

## Opdracht en resultaat

De eigenaar wil de herstelde homepage ongeveer gelijk houden, de light/dark-vormgeving behouden, een eenvoudigere menuknop en vier PageSpeed-scores van 100. Vervolgens gevraagd om af te ronden en alles in Markdown vast te leggen.

De lokale productieversie haalt met Lighthouse 13.5.0 **100/100/100/100 op mobiel en desktop**. De officiële Google PageSpeed-API gaf HTTP 429; de officiële webinterface meldde `Unable to resolve`, ook voor de controle-URL `https://web.dev/`. Dit is geen bevestigde Google-cloudscore. Live publicatie en live metingen worden hieronder pas ingevuld na controle.

| Meting                               | Performance | Accessibility | Best practices | SEO | FCP   | LCP   | TBT  | CLS |
| ------------------------------------ | ----------: | ------------: | -------------: | --: | ----- | ----- | ---- | --- |
| Live uitgangspunt, mobiel            |          86 |           100 |            100 | 100 | 2,5 s | 3,6 s | 0 ms | 0   |
| Live uitgangspunt, desktop           |         100 |           100 |            100 | 100 | 0,4 s | 0,8 s | 0 ms | 0   |
| Definitieve lokale homepage, mobiel  |         100 |           100 |            100 | 100 | 1,1 s | 1,7 s | 0 ms | 0   |
| Definitieve lokale homepage, desktop |         100 |           100 |            100 | 100 | 0,3 s | 0,4 s | 0 ms | 0   |

Scores zijn metingen van deze versie, dit meetmoment en de standaard Lighthouse-instellingen. De mobiele homepage draagt circa 109 KiB over. Er is geen speciale behandeling van Lighthouse, Google, een user-agent of een bezoekerstype.

## Implementatie

- De homepage gebruikt dezelfde bestaande Next.js-ontwerp- en inhoudsbronnen: `RealWorkHome`, de header, menustructuur en oorspronkelijke footercompositie. De bestaande `real-work-home.module.css` is behouden. Kleuren, gradients, grids, projectpresentatie en teksten zijn niet opnieuw ontworpen.
- `npm run build` genereert beperkte CSS, bouwt Next.js en maakt daarna de productiehomepage uit `.next/server/app/index.html`. De generator verwijdert frameworkscripts en React-payload, bewaart metadata, JSON-LD, vroeg themascript, CSS, alle inhoud, links, beelden en noscript-fallbacks. Validaties laten de build falen bij ontbrekende inhoud of onopgeloste streamsegmenten.
- `public/native-home.html` is een gegenereerd, Git-genegeerd buildbestand. Productierewrites sturen `/` en `/index-digital-agency` hierheen. Ontwikkeling houdt de bewerkbare Next.js-bron. `public/js/native-home.js` verzorgt menu, focus, Escape, inert, scrollvergrendeling, themavoorkeur, opslag/cookie, bfcache en het laden van latere beelden. Links naar de homepage zijn gewone anchors, ook vanuit Next.js-pagina’s.
- De menuknop gebruikt twee SVG-strepen. Decoratieve iconen gebruiken aria-hidden, focusable=false en CSS/currentColor. Het menu heeft een focuscyclus, een eigen sluitknop en correct focusherstel. De actieve donkere menulink heeft beter contrast.
- Responsive AVIF-varianten zijn ingecheckt; `npm run optimize:images` regenereert ze. Het mobiele hero-beeld wordt met de HTML geleverd. Latere cases laden binnen 400 px van de viewport. De telefoonpreview blijft direct beschikbaar. Zonder JavaScript worden de volledige beelden via noscript getoond. Originele WebP’s blijven de fallback.
- De homepagefonts bevatten de daadwerkelijk gebruikte letters en behouden glyphs, outlines, breedtes, variabele gewichten en OpenType-shaping. Volledige oorspronkelijke fonts blijven beschikbaar. Samen 35.224 in plaats van 88.912 bytes, 60,4% minder. Zie [font-subsets.md](font-subsets.md) voor script, licenties en controles.
- Publieke cases, concepten, demo’s en onbekende URL’s gebruiken native scroll. Contact en bekende templatevoorbeelden laden hun volledige CSS/GSAP/Lenis alleen bij bezoek. Verwijderde Lenis-instanties kunnen niet meer vanuit menu-cleanup worden herstart.
- Canonical, sitemap, robots en social URLs gebruiken `https://www.mediadustry.com`. Skiplink, landmarks en zichtbare toetsenbordfocus toegevoegd. De mobiele case-teruglink overlapt het logo niet meer; de native 404 past ook op 320 px.

## Werkelijk uitgevoerde controles

- Volledige ESLint, TypeScript en productiebuild geslaagd, inclusief statische HTML-generatie.
- Lighthouse uitgevoerd op de productieversie met alle vier categorieën, standaard mobiele simulatie en afzonderlijk desktoppreset. Geen gewijzigde scoring, throttling of scoregerichte inhoudsverberging.
- Homepage visueel gecontroleerd op 1280 px en 320/390 px, in beide thema’s. Geen horizontale overflow. De opgeslagen donkere voorkeur blijft na herladen behouden.
- Menu: SVG-uitlijning, focuscyclus, Shift+Tab, Escape, sluiten, inert en focus/body-herstel gecontroleerd.
- Home → contact → home: oorspronkelijke contactanimatie en Lenis werken; bij terugkeer verdwijnen legacy-stylesheet en Lenis. Geen late terugkerende Lenis-klasse.
- Alle vijf casebeelden laden werkelijk bij scrollen. Een afzonderlijke Chrome/Playwright-controle met JavaScript uit bevestigt vijf zichtbare geladen AVIF-beelden, verborgen placeholders en pagina-breedte 390 px.
- Het behouden Alex-voorstel toont daadwerkelijke autoscroll in beide frames. Fullscreen, Escape vanuit het iframe, focusherstel en body-scroll werken. `noindex/nofollow/nocache` blijven behouden.
- Geen browserfouten in de uitgevoerde controles. Definitieve native bediening, bfcache-thema, contactterugkeer en voorstelautoscroll/fullscreen/Escape zijn onafhankelijk opnieuw bevestigd; live publicatie wordt apart in het log vastgelegd.

## Rapporten en herhalen

Volledige Lighthouse HTML/JSON-rapporten staan lokaal in `artifacts/pagespeed/2026-10-04/`, buiten Git. Het oorspronkelijke tijdelijke meetpad is `/tmp/mediadustry-pagespeed-20261004/`.

```bash
npm run lint
npm run build
npm run start -- --port 3000
npx --yes lighthouse http://localhost:3000/ --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path=/tmp/home-mobile --quiet
```

Gebruik voor desktop aanvullend `--preset=desktop`. Meet productie ook op `https://www.mediadustry.com/` na de GitHub-deployment. Houd de volledige rapporten en noteer de werkelijk gemeten scores.

## Grenzen en onderhoud

- De officiële Google-cloudmeting is nog onbevestigd wegens de genoemde externe fouten. Geen permanente scoregarantie afgeven.
- E-mailontvangst, opt-in en automatische opvolging zijn niet geactiveerd met deze homepageopdracht. De eerder teruggezette contactpagina en het behouden voorstel zijn de uitgangsversie; historische funnelinformatie blijft in de bestaande documenten.
- Een npm-audit toont vijf bestaande hoge meldingen in de ESLint/fast-glob/micromatch/braces-ontwikkelketen. Er is geen force-downgrade van Next.js/ESLint uitgevoerd; deze meldingen zijn geen browser-PageSpeed-score. Geen nieuw runtimeadvies gemeld door die controle.
- Bij wijziging van het eerste project: update hero/preloadbron en regenereer beeldvarianten. Bij nieuwe homepageletters: zo nodig fontsubset uitbreiden; de volledige fallback blijft werken.
- Houd `LEGACY_ROUTES` bij voor nieuwe templatevoorbeelden. Verander gedeelde componenten in de Next.js-bron en bouw daarna de native homepage opnieuw. Publiceer uitsluitend via de verbonden GitHub-repository.

## Publicatie

Codecommit `6255fab4e8d5507cc1624538c33672fbd67c5f43` via GitHub gepubliceerd; verbonden productie-deployment `dpl_DDvJ6JKEPpfAeMXHenMycwGmLWTA` is READY met www.mediadustry.com/mediadustry.com. Live HTML gebruikt native-home.js en bevat geen React-payload. Geen directe Vercel-deployment gebruikt.

| Live meting | Performance | Accessibility | Best practices | SEO | FCP   | LCP   | Speed Index | TBT  | CLS |
| ----------- | ----------: | ------------: | -------------: | --: | ----- | ----- | ----------- | ---- | --- |
| mobile      |          98 |           100 |            100 | 100 | 1.3 s | 1.7 s | 4.0 s       | 0 ms | 0   |
| desktop     |         100 |           100 |            100 | 100 | 0.3 s | 0.4 s | 0.3 s       | 0 ms | 0   |

**Vier keer100 is lokaal op beide apparaten en live op desktop gemeten. De laatste live mobiele meting is98/100/100/100; dus het volledige live100-doel is nog niet bevestigd.** Op verzoek van de eigenaar wordt nu afgerond vanwege resterende credits. Geen verdere optimalisatieronde gestart. Officiële Google-cloudmeting blijft onbevestigd.

De eerste hostingbuilds faalden omdat adapter-builds gehashte route-cachebestandsnamen gebruiken. De generator herkent nu de homepage op gevalideerde inhoud in Next/Vercel-output en schrijft waar nodig ook naar adapter-static-output. De uiteindelijke build is geslaagd.

Alle eigen browsersessies en het lokale productieproces zijn afgesloten. Documentatie-update wordt ook via GitHub opgeslagen; een daardoor gestarte nieuwe documentatiebuild is geen nieuwe bevestigde meting.
