# MEDIADUSTRY — status

Bijgewerkt: 2026-10-06.

**Huidige opdracht:** herstel de kapotte desktopopmaak van de nieuwe homepage en laat het menu de gekozen lichte of donkere kleurmodus volgen.

**Lokaal uitgevoerd:** de ontbrekende desktop-basisstijlen voor hero, introductie, oplossingen, beeld-/tekstsecties, expertise, technologiestrook en kwaliteitsmeters zijn hersteld. Het menu gebruikt nu dezelfde lichte of donkere kleurmodus als de pagina. Tablet- en mobiele regels voor de kwaliteitsmeters voorkomen horizontale overflow. De productiebuild controleert voortaan ook de essentiële desktopselectoren.

**Gecontroleerd:** productiebuild, TypeScript, ESLint en Prettier geslaagd. Lokale productiebrowser op desktop: logo en hero-kop overlappen niet, alle hoofdsecties hebben hun layout terug en er zijn geen browserfouten. Licht menu is wit/donker schrift; donker menu is donker/licht schrift. Mobiel op 390 px heeft geen horizontale overflow en behoudt de bestaande hero-uitlijning.

**Publicatie:** de desktopcorrectie is lokaal gereed voor publicatie via GitHub. Live deployment en live browsercontrole volgen; er is geen directe Vercel-deployment uitgevoerd.

**Open:** de vier footerpagina’s blijven noindex-concepten zolang formele bedrijfs- en verwerkingsgegevens ontbreken. Bestaande losse wijzigingen aan Next-homepagefoto en de `sites/`-map zijn behouden.
