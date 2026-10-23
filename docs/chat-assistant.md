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

`position: fixed`, rechts en onder met `safe-area`-insets, `z-index: 45`. Dat ligt boven de homepageheader (4) en het menu (10) en onder de zwevende akkoordknop van conceptpagina’s (80). Bestaat `.showcase-floating-accept`, dan schuift de bubbel 132 px omhoog. Zodra de preview in beeld is en die knop verbergt, zakt de bubbel terug. De homepagefooter krijgt extra onderpadding zodat de juridische links niet onder de knop vallen.

De knop is een witte schijf met een dunne oranje rand (`#ff6438`), een donker chat-icoon en een oranje sparkle. 68 px op desktop, 60 px onder 720 px. Maten staan vast op 16 px, omdat andere pagina’s `html` op 10 px zetten. Het label is “Chat met MEDIADUSTRY”. Open is het een sluiticoon met label “Sluit chat”. Na ruim drie seconden verschijnt de uitnodiging “Vraag het onze AI-assistent”; die is wegklikbaar en komt in die sessie niet terug. Zolang de bezoeker de chat niet opent, beweegt de knop af en toe 3 px en toont een zachte oranje ring. `prefers-reduced-motion: reduce` zet die beweging uit. Op smalle schermen is het paneel een vel over de volle hoogte. Oranje blijft accent: de rand, de sparkle en de verstuurknop.

## Antwoorden

`POST /api/chat` gebruikt de Vercel AI SDK en AI Gateway. Standaardvolgorde: eerst `poolside/laguna-s-2.1-free`, daarna `reflection/beam-free`. `CHAT_MODEL` wordt het eerste model; de andere gratis modellen volgen, zonder dubbele id. Elk model krijgt één poging (`maxRetries: 0`). Een 5xx of een 403 voor een geblokkeerd model probeert het volgende id voordat er een antwoordchunk naar de bezoeker gaat. Een 429 blijft bij dat model. De server logt `[chat] model attempt`, `[chat] model request failed` en `[chat] model answered` met het model-id.

De preview van PR #4 (deployment `dpl_8WxpAMr4WR1C4r27SfwPKchaPUF2`, commit `9c32f67`) eindigde op 23 oktober 2026 om 08:35 en 08:37 Europe/Amsterdam met `AI_RetryError: Failed after 3 attempts` en als laatste fout `GatewayInternalServerError: Service temporarily unavailable` (503, retryable) voor `reflection/beam-free`. Drie pogingen is de SDK-standaard (`maxRetries` 2 plus de eerste call). `providerOptions.gateway.models` zit in diezelfde aanroep; de fout noemde Laguna niet. Daarom kiest de app zelf het volgende model, in plaats van te wachten tot de SDK hetzelfde model opnieuw probeert.

Gratis modellen kunnen alsnog uitvallen. Een betrouwbare productiechat met Grok vraagt betaalde AI Gateway-credits. Zonder die credits blijft een Grok-id de 403 geven.

Bewijs, catalogus van 23 oktober 2026, `GET https://ai-gateway.vercel.sh/v1/models` zonder authenticatie (484 modellen). Queryparameters zoals `freeTier` filteren die lijst niet. De publieke pagina `https://vercel.com/ai-gateway/models?freeTier=true` toonde ook `spacexai/grok-4.20-non-reasoning` en is daarom geen bewijs van de gratis laag. Modellen met de tag `free`:

- `convaiinnovations/laya` en `convaiinnovations/laya-free`: type evaluation, geen chatmodel.
- `reflection/beam`: language en tool-use, prijs `0`, maar `varies_by_provider: true`. Niet gebruikt.
- `poolside/laguna-s-2.1-free`: language, tool-use, prijs `0`. Dit is het eerste model, omdat Beam op de preview 503 gaf. Dat bewijst niet dat Laguna antwoordt.
- `reflection/beam-free`: language, tool-use, structured-output, prijs `0` zonder providerafhankelijke prijs. Naam in de catalogus: “Beam 1.0 (Free)”. Tweede poging.

Geen `spacexai`-, Grok- of xAI-model heeft de tag `free`. Productie wees `spacexai/grok-4.20-non-reasoning` af met `GatewayInternalServerError` / `RestrictedModelsError` 403: “Free tier users do not have access to this model”. De Vercel-FAQ zegt dat die 403 betekent dat het model buiten de gratis subset valt; credits kopen zet het team op de betaalde laag.

`include_availability` op dezelfde catalogus vroeg om een bearer-token (401). In deze omgeving stond geen `AI_GATEWAY_API_KEY` en geen Vercel CLI. Er is dus geen geslaagde generatie tegen de gateway van dit team gedaan. De tag `free` plus een vaste nulprijs is het catalogusbewijs, geen live antwoord van Beam.

Beide gratis taalmodellen zijn reasoning-modellen. Het zichtbare antwoord verbergt de redeneerstroom (`sendReasoning: false`). De outputgrens is 800 tokens, zodat een kort antwoord niet meteen wegvalt achter die redenering.

Op Vercel autoriseert OIDC de gateway. Lokaal is `AI_GATEWAY_API_KEY` nodig, of een verse OIDC-token via `vercel env pull`.

Zonder gatewaygegevens antwoordt de route met een korte Nederlandse tekst en status 503. Een limiet van de gateway of van deze server krijgt een aparte tekst over te veel berichten. Een geblokkeerd model krijgt de tekst dat de assistent tijdelijk niet beschikbaar is. De pagina blijft heel. De UI verwijst dan naar de contactpagina en `info@mediadustry.com`. De server logt soort, model-id, foutnaam en status, zonder sleutels of berichtinhoud.

`CHAT_MOCK=1` geeft buiten productie een vast testantwoord. In productie doet die vlag niets.

De instructie staat in `lib/chat/system-prompt.ts` en gebruikt alleen `lib/chat/site-facts.ts`. Mag: diensten, expertise, aanpak, vijf cases, homepage-Lighthouse mét de kanttekening, KvK, btw en e-mail. Mag niet: prijzen, planning, garanties, een boekingslink, verzonnen contactgegevens, of beweren dat webshops, GEO of onderhoudscontracten een product op de site zijn.

## Leads

Het hulpmiddel `submitLead` vraagt naam, e-mail of telefoon, en een vraag. Het paneel toont de `visitorMessage` die de server teruggeeft, ook als de mail niet weggaat. De server stuurt die gegevens via Resend (`POST https://api.resend.com/emails`) vanaf `CONTACT_FROM_EMAIL` naar `CONTACT_TO_EMAIL`. Dat is dezelfde eigenaarsmail als de vroegere `/api/contact`-service. De live contactpagina post nog naar Web3Forms; die route bestaat in productie niet meer en `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` staat niet in Vercel. Zonder `RESEND_API_KEY` of `CONTACT_FROM_EMAIL`, of als Resend de mail weigert, wordt niets opgeslagen en krijgt de bezoeker het e-mailadres en de contactpagina. Een dubbele lead binnen 30 minuten gaat niet nog eens weg.

## Spraak

Microfoon: Web Speech API, standaard `nl-NL`, tussentijdse tekst zichtbaar, de eindzin wordt verstuurd. Ontbreekt de API, dan blijft de knop zichtbaar, uitgeschakeld, met uitleg. Voorlezen: `speechSynthesis`, uit tot het gesprek via de microfoon begint of de bezoeker de luidspreker aanzet. Markdown en links worden voor het uitspreken verwijderd. Sluiten, typen of zelf gaan praten stopt het voorlezen.

| Browser      | Inspreken                                                   | Voorlezen  |
| ------------ | ----------------------------------------------------------- | ---------- |
| Chrome, Edge | Ja, vaak via de leverancier (in Chrome bijvoorbeeld Google) | Ja         |
| Safari       | Ja op recente versies                                       | Ja         |
| Firefox      | Nee; de microfoonknop legt dat uit                          | Meestal ja |

Er is geen server-spraak. Gateway-modellen voor spraak zijn niet aangesloten.

## Grenzen

- Berichten: 2000 tekens van de bezoeker, 16 berichten geschiedenis, 800 outputtokens.
- Tempo: 20 chatverzoeken per 10 minuten en 5 leads per uur per IP, in het geheugen van die serverinstantie. Een herstart of een tweede instantie telt opnieuw.
- Geen cookie, geen localStorage, geen bewaarde transcriptie.
- De privacy- en cookietekst van 23 oktober 2026 is een concept en hoort juridisch nagekeken te worden.

## Commando’s

`npm run test:chat` dekt de vlag, sanitizing, lead, spraaktekst, promptgrenzen en de mockroute. `npm run dev` en `npm run build` maken eerst `public/chat/config.js` en `public/chat/widget.js`. Die twee bestanden staan in `.gitignore`.
