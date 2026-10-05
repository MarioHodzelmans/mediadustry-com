# MEDIADUSTRY — status

Bijgewerkt: 2026-10-06.

**Huidige opdracht:** vervang de root-homepage door de aangeleverde conceptsite, werk SEO bij, meet mobiel/desktop op vier Lighthouse-categorieën en publiceer via GitHub `main`.

**Lokaal uitgevoerd:** productiebron `content/homepage/index.html`; generator controleert SEO-metadata, JSON-LD, cases en lokale assets. Lokale assets gekopieerd naar `public/homepage-assets/`; footerpagina’s geplaatst onder `public/` als noindex-documenten. Bestaande contact-, case- en concept-routes blijven actief.

**Gecontroleerd:** `npm run build`, `npm run lint` en Prettier geslaagd. Lokale Lighthouse mobiel en desktop beide 100/100/100/100; FCP/LCP mobiel 0,8/1,2 s en desktop 0,2/0,3 s. HTTP 200 voor `/`, `/contact`, `/concept/alex-kamsma-parket` en `/privacy-policy.html`. Browserstructuur bevat de vier scores, vijf portfolio-items en footerlinks.

**Publicatie:** nog lokaal; GitHub-commit/push, hostingdeployment en openbare live/PageSpeed-meting moeten nog worden uitgevoerd en bevestigd. Geen directe Vercel-deployment.

**Open:** de vier juridische pagina’s zijn concepten/noindex. Web3Forms-verwerkers-, retentie- en verwerkingslocatiegegevens en formele bedrijfsgegevens moeten nog definitief worden bevestigd. Een lokale Lighthouse-score is geen Google PageSpeed-live-uitslag. De bestaande `sites/`-map en studiofoto-PNG zijn behouden en niet onderdeel van deze publicatie.
