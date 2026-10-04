# MEDIADUSTRY — status

Bijgewerkt: 2026-10-04 22:27 Europe/Amsterdam.

**Huidige opdracht:** eerdere website terugzetten; alleen het verbeterde offertevoorstel behouden. De eerdere opdracht voor een volledige opt-infunnel is hiermee vervangen.

**Lokaal gereed:** oorspronkelijke vormgeving en pagina’s hersteld uit commit `0310fef` (vóór optimalisatiecommit `e91f3da`). Homepage, navigatie, themawisselaar, cases, contactpagina en oorspronkelijke template/showcasepagina’s zijn terug. De nieuwe homepage, website-check, opt-inpagina’s en funnelbackend zijn verwijderd. Bestaande externe e-mailresources zijn niet gewijzigd en zijn geen actieve websitekoppeling.

**Behouden voorstel:** `/concept/alex-kamsma-parket` met eigen `Proposal`-renderer en CSS, lokale desktop/mobiele preview, zichtbaarheidsgestuurde autoscroll, pauze/herstart, handmatige bediening, volledig scherm en Escape. Bereikbaar via het oorspronkelijke hoofdmenu en de Alex-case. De conceptpagina gebruikt native scroll, terwijl de oorspronkelijke site de eigen template-runtime behoudt. Next.js/React blijven op de reeds geïnstalleerde patchversies.

**Werkelijk gecontroleerd:** volledige ESLint en Next.js-productiebuild inclusief TypeScript geslaagd. Bronvergelijking bevestigt dat de hoofdvormgeving, homepage, rootlayout en themawisselaar overeenkomen met `0310fef`. Desktop: beide thema’s, routewissel homepage → voorstel → homepage, echte autoscroll in beide previewframes, volledig scherm en Escape gecontroleerd. Onafhankelijke mobiele controle: homepage/menu op 390 px en voorstel op 320 px zonder horizontale overflow; vijf menulinks passen; SVG-uitlijning en toegankelijkheidsattributen correct; fullscreenpreview op 286 px, Escape vanuit iframe sluit en herstelt focus/body-scroll. Robots noindex/nofollow/nocache behouden. Geen browserfouten. Geen nieuwe Lighthouse-score gemeten.

**Contact:** oorspronkelijke Web3Forms-formulier terug. Werkelijke ontvangst is niet geverifieerd. Zonder publieke Web3Forms-key claimt het formulier geen verzending en verwijst het naar info@mediadustry.com. Eerdere Resend-/opt-indocumentatie is als archief gemarkeerd; geen verdere e-mailactivering onderdeel van deze terugzetopdracht.

**Publicatie:** nog lokaal; de live website draait op de eerdere Git-versie. Volgende stap: deze terugzetting committen/pushen naar GitHub main, wachten op de verbonden hostingdeployment en live homepage/voorstel controleren. Geen directe deployment uitvoeren.
