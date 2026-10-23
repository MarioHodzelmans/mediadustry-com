# Chatassistent op mediadustry.com

De site toont rechtsonder een chatbubbel. Een bezoeker kan daar vragen stellen over wat MEDIADUSTRY op de website publiceert. De assistent verzint geen prijzen, levertijden, garanties of cases, en geeft een lead door als e-mail naar `CONTACT_TO_EMAIL`.

## Zichtbaarheid

De bubbel staat aan, tenzij `NEXT_PUBLIC_CHAT_ENABLED` exact `false` is. Een lege waarde blijft aan. De vlag wordt bij de build ingebakken. Verbergen vraagt een nieuwe deployment.

Dezelfde controle zit op drie plekken:

- `lib/chat/enabled.ts` voor Next-routes
- `scripts/prepare-chat-widget.mjs` voor `public/chat/config.js`
- `scripts/build-native-home.mjs` voor de statische homepage

## Waar de bubbel staat

- Next-routes, inclusief contact, werk, concept, offerte en admin: `ChatWidget` in `app/layout.tsx`. De knop wordt met de pagina meegestuurd. Het paneel laadt pas bij de eerste klik.
- Productiehomepage (`content/homepage/index.html`, via `public/native-home.html`): `boot.js` plaatst alleen de knop. De klik laadt `/chat/widget.js`.
- Statische juridische pagina’s in `public/`: dezelfde `boot.js`. Ontbreekt `config.js`, dan blijft de chat aan.
- `public/previews/` krijgt de chat niet.

`position: fixed`, rechts en onder met `safe-area`-insets, `z-index: 45`. Dat ligt boven de homepageheader (4) en het menu (10) en onder de zwevende akkoordknop van conceptpagina’s (80). Bestaat `.showcase-floating-accept`, dan schuift de bubbel 7.5rem omhoog. Zodra de preview in beeld is en die knop verbergt, zakt de bubbel terug. De homepagefooter krijgt extra onderpadding zodat de juridische links niet onder de knop vallen.

De knop is een witte schijf met oranje rand (`#ff6438`) en een donker icoon, 64 px op desktop en 56 px op smalle schermen. Maten staan vast op 16 px, omdat andere pagina’s `html` op 10 px zetten. Het label is “Chat met MEDIADUSTRY”. Open is het een sluiticoon met label “Sluit chat”.

## Antwoorden

`POST /api/chat` gebruikt de Vercel AI SDK en AI Gateway. Standaardmodel: `spacexai/grok-4.20-non-reasoning` (`CHAT_MODEL` overschrijft dit). Op Vercel autoriseert OIDC de gateway. Lokaal is `AI_GATEWAY_API_KEY` nodig, of een verse OIDC-token via `vercel env pull`.

Zonder gatewaygegevens antwoordt de route met een korte Nederlandse tekst en status 503. De pagina blijft heel. De UI verwijst dan naar de contactpagina en `info@mediadustry.com`.

`CHAT_MOCK=1` geeft buiten productie een vast testantwoord. In productie doet die vlag niets.

De instructie staat in `lib/chat/system-prompt.ts` en gebruikt alleen `lib/chat/site-facts.ts`. Mag: diensten, expertise, aanpak, vijf cases, homepage-Lighthouse mét de kanttekening, KvK, btw en e-mail. Mag niet: prijzen, planning, garanties, een boekingslink, verzonnen contactgegevens, of beweren dat webshops, GEO of onderhoudscontracten een product op de site zijn.

## Leads

Het hulpmiddel `submitLead` vraagt naam, e-mail of telefoon, en een vraag. De server stuurt die gegevens via Resend (`POST https://api.resend.com/emails`) vanaf `CONTACT_FROM_EMAIL` naar `CONTACT_TO_EMAIL`. Dat is dezelfde eigenaarsmail als de vroegere `/api/contact`-service. De live contactpagina post nog naar Web3Forms; die route bestaat in productie niet meer en `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` staat niet in Vercel. Zonder `RESEND_API_KEY` of `CONTACT_FROM_EMAIL`, of als Resend de mail weigert, wordt niets opgeslagen en krijgt de bezoeker het e-mailadres en de contactpagina. Een dubbele lead binnen 30 minuten gaat niet nog eens weg.

## Spraak

Microfoon: Web Speech API, standaard `nl-NL`, tussentijdse tekst zichtbaar, de eindzin wordt verstuurd. Ontbreekt de API, dan blijft de knop zichtbaar, uitgeschakeld, met uitleg. Voorlezen: `speechSynthesis`, uit tot het gesprek via de microfoon begint of de bezoeker de luidspreker aanzet. Markdown en links worden voor het uitspreken verwijderd. Sluiten, typen of zelf gaan praten stopt het voorlezen.

| Browser      | Inspreken                                                   | Voorlezen  |
| ------------ | ----------------------------------------------------------- | ---------- |
| Chrome, Edge | Ja, vaak via de leverancier (in Chrome bijvoorbeeld Google) | Ja         |
| Safari       | Ja op recente versies                                       | Ja         |
| Firefox      | Nee; de microfoonknop legt dat uit                          | Meestal ja |

Er is geen server-spraak. Gateway-modellen voor spraak zijn niet aangesloten.

## Grenzen

- Berichten: 2000 tekens van de bezoeker, 16 berichten geschiedenis, 450 outputtokens.
- Tempo: 20 chatverzoeken per 10 minuten en 5 leads per uur per IP, in het geheugen van die serverinstantie. Een herstart of een tweede instantie telt opnieuw.
- Geen cookie, geen localStorage, geen bewaarde transcriptie.
- De privacy- en cookietekst van 23 oktober 2026 is een concept en hoort juridisch nagekeken te worden.

## Commando’s

`npm run test:chat` dekt de vlag, sanitizing, lead, spraaktekst, promptgrenzen en de mockroute. `npm run dev` en `npm run build` maken eerst `public/chat/config.js` en `public/chat/widget.js`. Die twee bestanden staan in `.gitignore`.
