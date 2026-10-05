# MEDIADUSTRY — status

Bijgewerkt: 2026-10-06.

**Huidige opdracht:** herstel het mobiele hoofdmenu op de gepubliceerde nieuwe homepage.

**Lokaal uitgevoerd:** ontbrekende basis-CSS voor het schermvullende menu, cirkelvormige menu-/sluitknoppen en safe-area-afstanden toegevoegd. Kleine mobiele schermen krijgen beter passende menutekst. De productiebuild controleert voortaan aanwezigheid van de essentiële menustijlen.

**Gecontroleerd:** productiebuild, ESLint en Prettier geslaagd. Chrome mobiele emulatie320/390 px: geen horizontale overflow; overlay vult de viewport; links passen; Escape sluit menu, herstelt scrollen en maakt het menu inert. Lighthouse mobiel/desktop: beide 100/100/100/100. Laatste mobiele LCP1,2s; desktop LCP0,3s.

**Publicatie:** commit `5ab5362d22d3f0f1813cb99d67fb02c8817d74a7` is naar GitHub `main` gepusht; productie-deployment `dpl_EbTtuRCjv6NbNrfjvBnWtAxFi7kV` staat `READY`. Mobiele livebrowsercontrole en verse Google PSI-meting zijn afgerond; beide mobiele en desktopmetingen geven 100/100/100/100.

**Open:** de vier footerpagina’s blijven noindex-concepten zolang formele bedrijfs- en verwerkingsgegevens ontbreken. Bestaande losse wijzigingen aan Next-homepagefoto en de `sites/`-map zijn behouden.
