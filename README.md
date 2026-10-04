# MEDIADUSTRY

Website voor [www.mediadustry.com](https://www.mediadustry.com), gebouwd met Next.js App Router en React. De homepage, echte portfoliozaken, website-check, contact en privacyverklaring gebruiken een lichte eigen vormgeving. De oorspronkelijke templatevoorbeelden blijven lokaal beschikbaar; productieroutes leiden naar de relevante MEDIADUSTRY-pagina's.

## Lokaal werken

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Vul alleen beschikbare serverconfiguratie in. Zonder Resend en Redis tonen de formulieren een duidelijke melding en een e-mailalternatief. Geheimen blijven in `.env.local` of de hostingomgeving en komen nooit in Git.

## Controleren

```bash
npm run lint
npm run test:funnel
npm run build
npm run start
```

De funneltests gebruiken nagebootste Resend- en Redis-antwoorden en versturen geen echte e-mail. Controleer de productieversie ook op mobiel, met toetsenbord en in beide kleurthema's. Template-redirects zijn actief in productie, niet in `next dev`.

## Publiceren en e-mail activeren

Publiceer via de gekoppelde GitHub-repository `MarioHodzelmans/mediadustry-com`. De hostingomgeving bouwt de productiebranch `main` vanuit Git. Voer geen directe Vercel-deployment uit.

De contact- en double opt-inflow, verplichte configuratie en opslag staan in [docs/contact-funnel.md](docs/contact-funnel.md). De DNS-records voor `mail.mediadustry.com` staan in [docs/resend-dns.md](docs/resend-dns.md). Na een wijziging in omgevingsvariabelen is een nieuwe Git-deployment nodig om de formuliermelding bij te werken.

Bevestiging en afmelding vereisen een bewuste knopactie. Een aanvraag wordt los van de optionele e-mailaanmelding behandeld. Alleen bevestigde aanmeldingen gaan naar het aparte MEDIADUSTRY-segment. De welkomstmail is ingericht; terugkerende marketingcampagnes vereisen eigen inhoud en planning.
