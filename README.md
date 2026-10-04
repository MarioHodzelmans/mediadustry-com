# MEDIADUSTRY

Website voor [www.mediadustry.com](https://www.mediadustry.com), gebouwd met Next.js App Router en React.

Op verzoek van de eigenaar is de vormgeving van vóór de optimalisatieronde teruggezet (broncommit `0310fef`). De oorspronkelijke homepage, navigatie, cases, contactpagina en templatepagina’s zijn hersteld. Het verbeterde Alex Kamsma-websitevoorstel blijft beschikbaar via het hoofdmenu en de Alex-case.

## Lokaal werken

```bash
npm ci
cp .env.example .env.local
npm run dev
```

De herstelde contactpagina gebruikt de oorspronkelijke Web3Forms-koppeling. Zonder `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` wordt geen bericht verstuurd en verschijnt het e-mailalternatief `info@mediadustry.com`. Sla geheimen alleen op in `.env.local` of de hostingomgeving.

## Controleren

```bash
npm run lint
npm run build
npm run start
```

Controleer de productieversie ook op mobiel, met toetsenbord en in beide kleurthema’s. Controleer de voorstelpreview met autoscroll, handmatige bediening, volledig scherm en Escape. Next.js en React behouden de reeds geïnstalleerde patchversies.

## Homepageprestaties

`npm run build` genereert eerst `styles/site-core.css`, bouwt de bestaande Next.js-componenten en maakt daaruit `public/native-home.html`. De productiehomepage en `/index-digital-agency` gebruiken deze vooraf gebouwde HTML met lichte native menu/themabediening uit `public/js/native-home.js`. De ontwikkelserver toont de bewerkbare Next.js-bron. De ontwerp- en inhoudsbron blijft `RealWorkHome`, de header en de originele footercompositie. `public/css/legacy-template.css` houdt de originele voorbeelden volledig intact. Voeg nieuwe templatepagina’s toe aan `LEGACY_ROUTES` in `TemplateRuntimeProvider`; onbekende URL’s gebruiken de lichte 404.

`npm run optimize:images` maakt de responsive AVIF-casebeelden opnieuw met Sharp. De homepage gebruikt serverbeelden, een direct beschikbaar mobiel hero-beeld en loading dicht bij de viewport voor latere cases. De oorspronkelijke WebP-bestanden blijven de fallback. [docs/font-subsets.md](docs/font-subsets.md) beschrijft de kleinere, gevalideerde homepagefonts en hun volledige fallbackfamilies.

## Voorstel en publicatie

De conceptpagina gebruikt een eigen `Proposal`-renderer en afgeschermde CSS. De oorspronkelijke demo’s en showcasepagina’s gebruiken `Showcase`. Zo blijft het voorstel werken naast de herstelde templatevormgeving. Homepage, cases, concepten en demo’s gebruiken native scroll. Contact en de oorspronkelijke templatevoorbeelden laden hun volledige CSS en animatieruntime pas bij bezoek. De light/dark-vormgeving blijft behouden; header, menu en homepagefooter gebruiken lichte bediening zonder animatieframework.

Zie [docs/showcase-engine.md](docs/showcase-engine.md) en [public/previews/alex-kamsma/SOURCE.md](public/previews/alex-kamsma/SOURCE.md) voor de lokale ontwerppreview en de bediening.

Publiceer via GitHub `MarioHodzelmans/mediadustry-com`, productiebranch `main`. De verbonden hosting bouwt vanuit Git; gebruik geen directe Vercel-deployment.

De nieuwe website-check en opt-infunnel zijn bij deze terugzetting verwijderd. [docs/contact-funnel.md](docs/contact-funnel.md) blijft bewaard als historische documentatie. Eerder ingerichte externe e-mailresources zijn niet gewijzigd; zij vormen geen actieve koppeling met deze website. [docs/resend-dns.md](docs/resend-dns.md) bewaart de eerdere DNS-informatie.
