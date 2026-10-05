# MEDIADUSTRY — status

Bijgewerkt: 2026-10-06.

**Huidige opdracht:** vervang de root-homepage door de aangeleverde conceptsite, werk SEO bij, meet mobiel/desktop op vier Google PageSpeed-categorieën en publiceer via GitHub `main`.

**Lokaal uitgevoerd:** productiebron `content/homepage/index.html`; generator controleert SEO-metadata, JSON-LD, cases en lokale assets. Lokale assets gekopieerd naar `public/homepage-assets/`; footerpagina’s geplaatst onder `public/` als noindex-documenten. Bestaande contact-, case- en concept-routes blijven actief.

**Gecontroleerd:** `npm run build`, `npm run lint` en Prettier geslaagd. Officiële Google PageSpeed Insights op live mobiel en desktop: allebei 100/100/100/100. Directe live Lighthouse ook 100/100/100/100 op beide. HTTP 200 voor homepage, contact, Alex-concept, vier juridische documenten, robots.txt, sitemap.xml en hero-asset. Browserstructuur bevat de vier scores, vijf portfolio-items en footerlinks.

**Publicatie:** commit `83e80b35cc75df1b854b87406cab88df7b50b572` staat op GitHub `main`; gekoppelde productie-deployment `dpl_Gp3RydS58jb7d5YSVhtKLyN57N95` is `READY`, met `www.mediadustry.com`-alias. Geen directe Vercel-deployment.

**Open:** de vier juridische pagina’s zijn concepten/noindex. Web3Forms-verwerkers-, retentie- en verwerkingslocatiegegevens en formele bedrijfsgegevens moeten nog definitief worden bevestigd. Een lokale Lighthouse-score is geen Google PageSpeed-live-uitslag. De bestaande `sites/`-map en studiofoto-PNG zijn behouden en niet onderdeel van deze publicatie.
