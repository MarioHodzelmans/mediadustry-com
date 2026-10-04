# MEDIADUSTRY — status

Bijgewerkt: 2026-10-04 22:30 Europe/Amsterdam.

**Huidige opdracht:** eerdere website terugzetten; alleen het verbeterde offertevoorstel behouden. De eerdere opdracht voor een volledige opt-infunnel is hiermee vervangen.

**Gepubliceerd:** oorspronkelijke vormgeving en pagina’s hersteld uit commit `0310fef` (vóór optimalisatiecommit `e91f3da`). Homepage, navigatie, themawisselaar, cases, contactpagina en oorspronkelijke template/showcasepagina’s zijn terug. De nieuwe homepage, website-check, opt-inpagina’s en funnelbackend zijn verwijderd. Bestaande externe e-mailresources zijn niet gewijzigd en zijn geen actieve websitekoppeling.

**Behouden voorstel:** `/concept/alex-kamsma-parket` met eigen `Proposal`-renderer en CSS, lokale desktop/mobiele preview, zichtbaarheidsgestuurde autoscroll, pauze/herstart, handmatige bediening, volledig scherm en Escape. Bereikbaar via het oorspronkelijke hoofdmenu en de Alex-case. De conceptpagina gebruikt native scroll, terwijl de oorspronkelijke site de eigen template-runtime behoudt. Next.js/React blijven op de reeds geïnstalleerde patchversies.

**Werkelijk gecontroleerd:** volledige ESLint en Next.js-productiebuild inclusief TypeScript geslaagd. Bronvergelijking bevestigt dat de hoofdvormgeving, homepage, rootlayout en themawisselaar overeenkomen met `0310fef`. Desktop: beide thema’s, routewissel homepage → voorstel → homepage, echte autoscroll in beide previewframes, volledig scherm en Escape gecontroleerd. Onafhankelijke mobiele controle: homepage/menu op 390 px en voorstel op 320 px zonder horizontale overflow; vijf menulinks passen; SVG-uitlijning en toegankelijkheidsattributen correct; fullscreenpreview op 286 px, Escape vanuit iframe sluit en herstelt focus/body-scroll. Robots noindex/nofollow/nocache behouden. Geen browserfouten. Geen nieuwe Lighthouse-score gemeten.

**Contact:** oorspronkelijke Web3Forms-formulier terug. Werkelijke ontvangst is niet geverifieerd. Zonder publieke Web3Forms-key claimt het formulier geen verzending en verwijst het naar info@mediadustry.com. Eerdere Resend-/opt-indocumentatie is als archief gemarkeerd; geen verdere e-mailactivering onderdeel van deze terugzetopdracht.

**Publicatiebewijs:** commit `60ce6bde7b22e07f2ef73884712024361bab09bb` gepusht naar GitHub main. Verbonden hostingdeployment `dpl_DciokHmRwfu8G1rcVngEZwAA2Qmu` heeft status READY, met www.mediadustry.com en mediadustry.com als aliases. Alleen Git-publicatie gebruikt. Live homepage op 1280 px visueel gecontroleerd: oorspronkelijke vormgeving en menu terug. Live voorstel op 320 px: geen overflow, native scroll, lokale frames geladen, beide autoscrollposities daadwerkelijk gewijzigd, fullscreenframe286 px, Escape/focus/body-scroll correct, noindex behouden. Live Alex-case op 390 px: geen overflow en juiste voorstelverwijzing. Geen browserfouten.

**Afgerond:** terugzetopdracht uitgevoerd en live geverifieerd. Projectdocumentatie bijgewerkt; eigen testbrowsers en lokale productieserver op poort3000 opgeruimd. Voor deze opdracht zijn geen open stappen. E-mailontvangst is niet als werkend geclaimd; verdere activering vraagt een nieuwe opdracht.
