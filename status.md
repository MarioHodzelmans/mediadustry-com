# MEDIADUSTRY — status

Bijgewerkt: 2026-10-06.

**Huidige opdracht:** herstel het mobiele hoofdmenu op de gepubliceerde nieuwe homepage.

**Lokaal uitgevoerd:** ontbrekende basis-CSS voor het schermvullende menu, cirkelvormige menu-/sluitknoppen en safe-area-afstanden toegevoegd. Kleine mobiele schermen krijgen beter passende menutekst. De productiebuild controleert voortaan aanwezigheid van de essentiële menustijlen.

**Gecontroleerd:** productiebuild, ESLint en Prettier geslaagd. Chrome mobiele emulatie320/390 px: geen horizontale overflow; overlay vult de viewport; links passen; Escape sluit menu, herstelt scrollen en maakt het menu inert. Lighthouse mobiel/desktop: beide 100/100/100/100. Laatste mobiele LCP1,2s; desktop LCP0,3s.

**Publicatie:** mobiele fix is lokaal en nog niet gepusht. Publiceer via GitHub `main`; verifieer daarna de productieversie en Google PageSpeed mobiel. Eerder gepubliceerde versie staat live.

**Open:** de vier footerpagina’s blijven noindex-concepten zolang formele bedrijfs- en verwerkingsgegevens ontbreken. Bestaande losse wijzigingen aan Next-homepagefoto en de `sites/`-map zijn behouden.
