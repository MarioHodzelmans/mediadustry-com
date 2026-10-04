# MEDIADUSTRY — status

Bijgewerkt: 2026-10-04, afsluiting na verzoek eigenaar wegens resterende credits.

**Gepubliceerd:** geoptimaliseerde homepage via GitHub main, codecommit `6255fab4e8d5507cc1624538c33672fbd67c5f43`; deployment `dpl_DDvJ6JKEPpfAeMXHenMycwGmLWTA` READY op www.mediadustry.com. Geen directe Vercel-deployment. Bestaande vormgeving/light/dark en het Alex-offertevoorstel behouden; eenvoudiger SVG-menu.

**Gemeten:** lokaal Lighthouse13.5.0 mobiel én desktop100/100/100/100. Laatste live meting: mobiel98/100/100/100 (FCP1.3 s,LCP1.7 s,SI4.0 s,TBT0 ms,CLS0); desktop100/100/100/100. Vier live100-scores op mobiel nog niet bevestigd. Officiële Google-API429/webinterface Unable to resolve (ookweb.dev); geen Google-cloudscore geclaimd.

**Gecontroleerd:** volledige lint/TypeScript/productiebuild/native-generator;320/390/1280px light/dark, focus/Tab/Escape/inert/bodyherstel, themageheugen en bfcache, contact↔home zonder RSC-fouten, alle21 assets200, vijf AVIF-casebeelden ook zonderJavaScript, native404/casebacklink. Voorstelautoscroll/fullscreen/Escape/focusherstel werken. Geen browserfouten. Hostingadapterbestandsnaam hersteld; laatste codebuild geslaagd.

**Opgeslagen:** README, instructions.md, log.md, [meetrapport](docs/homepage-performance.md), [fontdocumentatie](docs/font-subsets.md) en showcase-engine bijgewerkt. Volledige HTML/JSON-rapporten lokaal in artifacts/pagespeed/2026-10-04 buiten Git.

**Afgesloten:** alle eigen browser-/subagenttestsessies en lokale productiepoort3000 gestopt. Andere projecten niet gewijzigd. Documentatie wordt nog naar GitHub gepusht; een daardoor gestarte nieuwe build wordt niet als al gecontroleerd vermeld.

**Open voor een latere opdracht:** officiële Google-meting en eventuele laatste mobiele98→100-verbetering. Geen actieve opt-in/e-mailopvolging toegevoegd; oude funnelhistorie en DNS-documenten bewaard. Vijf npm-advisories in bestaande ontwikkeltoolketen beschreven in het meetrapport.
