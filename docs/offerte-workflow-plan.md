# Offerteacceptatie en betaalworkflow — uitvoeringsindex

Bijgewerkt: 2026-10-09. Dit is de actuele implementatie- en configuratie-index voor `/offerte/dietwiej`. Lokaal gebouwde code betekent niet dat externe infrastructuur is ingericht of dat acceptaties, betalingen of e-mails actief zijn.

## Architectuur

- De bestaande Next.js 16 App Router-site en vormgeving zijn behouden. De klantofferte gebruikt één pagina met één centraal prijsoverzicht; reserveringsbronnen en technische auditdetails zijn op verzoek inklapbaar.
- De offerte volgt de Alex Kamsma-conceptstijl (`#eeeae8`) en houdt de MEDIADUSTRY-homepageheader zichtbaar. De klantgerichte bedragen worden uitsluitend exclusief btw getoond en staan samen in één prijsoverzicht. Huidige offertetekst-/weergaveversie: 1.6.
- De app-route hergebruikt de globale `Header1`, `ThemeSwitcher` en `MenuRuntimeShell`; deze delen beeldmerk, wordmark, maan/zonicoon en driestreepsmenu met de standalone homepageheader. De offertekleuren volgen de globale `color-scheme` instelling.
- De website-audit van Die Twie is samengevat in drie verbeterprioriteiten bovenaan de offerte (reserveren, mobiele navigatie en tekstuele menukaart) en een compacte technische checklist onderaan. Deze auditpunten zijn aanbevelingen; alleen overeengekomen werkzaamheden vallen binnen de prijs.
- Reserveringstekst houdt telefonische, persoonlijke service expliciet open en adviseert online reserveren alleen als mogelijke aanvulling. De offerte benoemt landelijke onderzoeksbronnen en zegt expliciet dat systeem, abonnement en koppeling buiten de huidige offerteprijs vallen.
- De klantgerichte offertetekst staat centraal in `lib/quotes/config.ts`, wordt meegenomen in de SHA-256 snapshot en door de rendering hergebruikt. Databaselezen/initialiseren controleert de snapshot én voorwaardenversie; bij een versieverschil stopt de workflow en kan de klant geen afwijkende tekst accepteren.
- De route `/offerte/dietwiej` toont alleen een algemene melding. De volledige offerte staat op `/offerte/dietwiej/[unguessable-token]` en is niet indexeerbaar.
- Neon Postgres via de Vercel Marketplace is de voorgestelde database. Neon blijft de databaseprovider; de koppeling en billing zijn via Vercel Marketplace beschikbaar. Er is nog geen Neon-resource aangemaakt of gekoppeld.
- Server-only Neon toegang bewaart een vaste offerte-/voorwaardenversie, acceptatiebewijs, handmatige betalingen, audit-events en een transactionele e-mailoutbox. Gemaskeerd IP-/user-agentbewijs staat apart met een ingestelde vervaldatum; een dagelijkse Vercel Cron verwijdert alleen die metadata en schrijft een audit-event. `db/schema.sql` is een nog niet op een database toegepast schema.
- Adminlogin is lokaal uitgewerkt als één eigenaarspassword uit Vercel environment variables, met gesigneerde HTTP-only/SameSite-cookie en database-loginlimiet. Er is geen accountregistratie. Als de eigenaar uitsluitend Vercel OIDC-login wil, moet die keuze samen worden afgerond vóór productiegebruik.
- E-mail gebruikt de Resend server-side API met idempotency keys en een outbox. Dit is een Resend API-integratie, geen SMTP-transport. Er wordt niets verstuurd zolang API-key en geverifieerde afzender ontbreken.
- Bankbetaling is handmatige SEPA-overboeking naar de geconfigureerde ING-rekening. Een EPC-SEPA QR wordt alleen gegenereerd voor een geldige ingestelde IBAN. Een ING-betaallink is optioneel en wordt alleen getoond wanneer expliciet geconfigureerd.

## Lokaal geïmplementeerd

- Persoonlijke offerte-URL, noindex-beveiliging, print-naar-PDF actie, onvooraf aangevinkte akkoordbevestigingen en voorwaardenpagina.
- Acceptatie wordt server-side als één databasehandeling vastgelegd: snapshot-/voorwaardenhash, versies, bedrag incl. btw, tijdstip in UTC, klantbevestigingen, gemaskeerd IP-adres en user-agent; dubbele acceptatie wordt geweigerd.
- Het geaccepteerde betaalbedrag wordt intern in hele centen berekend, met 21% btw boven op het zichtbare offertetarief van € 1.950 excl. btw (€ 2.359,50 betaalbedrag). De aanbetaling en het restant zijn elk € 1.179,75. De offertetekst toont geen inclusief-btw-totaal.
- Klantbetaalpagina vermeldt dat een klik of overboeking nog geen ontvangen betaling betekent. De klant kan een overboeking melden; alleen admin kan na bankcontrole betaling ontvangen registreren.
- Adminlijst bevat filters voor wachten op akkoord/betaling, deelbetaling en volledig betaald. De detailpagina toont status, bedragen, referenties, betalingen, auditlog en e-mailoutbox.
- Het restant wordt alleen op een expliciet adminmoment gevraagd; er vindt geen automatische incasso plaats.
- E-mailmomenten: acceptatie, verzoek aanbetaling, verificatie aanbetaling, verzoek restant, volledige betaling. Providerverzoeken gebruiken stabiele Resend-idempotency keys.
- Append-only audit-events en database-triggers beschermen de geaccepteerde offerte-, voorwaarden- en betaalbedragen tegen mutatie in de applicatieroute.

## Uit te voeren stappen voor activatie

1. **Neon aanmaken via Vercel Marketplace.** Koppel de resource aan het juiste Vercel-project en controleer dat `DATABASE_URL` beschikbaar is voor de juiste omgevingen. Kosten/plan zijn niet gecontroleerd of gewijzigd.
2. **Schema toepassen.** Voer `db/schema.sql` eenmalig uit via Neon SQL Editor of een gecontroleerde migratie. Controleer daarna de tabellen/views en voer een query uit op `quote_workflow_admin_overview`. Dit is nog niet uitgevoerd.
3. **Adminlogin kiezen.** Bevestig de huidige één-beheerder-passwordlogin of kies samen een Vercel OIDC-login. Vóór activatie moeten `QUOTE_ADMIN_PASSWORD` (minimaal 20 tekens), `QUOTE_ADMIN_SECRET` (minimaal 32 bytes) en `QUOTE_ADMIN_ID` veilig in Vercel worden gevuld. Deel wachtwoorden of geheimen niet in chat of commit.
4. **Offertegegevens bevestigen.** Vul het echte `DIETWIEJ_QUOTE_ID` en `DIETWIEJ_CUSTOMER_EMAIL` in. Een ID of e-mailadres is niet afgeleid of verzonnen.
5. **Voorwaarden en bewaartermijn vaststellen.** Lever goedgekeurde offertevoorwaarden met `DIETWIEJ_TERMS_VERSION` en `DIETWIEJ_TERMS_TEXT`, plus het door de eigenaar goedgekeurde aantal bewaartermijndagen in `QUOTE_EVIDENCE_RETENTION_DAYS`. Dit staat nu leeg; de app schakelt acceptatie zonder een positieve termijn uit. De dagelijkse Vercel Cron vraagt ook om `CRON_SECRET`. Laat consumentenvereisten en Nederlandse B2B-voorwaarden juridisch toetsen.
6. **Persoonlijke toegang instellen.** Maak een willekeurige token van minimaal 32 bytes, zet die uitsluitend als `DIETWIEJ_ACCESS_TOKEN` in Vercel en deel na publicatie zelf de persoonlijke URL met de klant. Token staat niet in de broncode of database in leesbare vorm; alleen de SHA-256-hash wordt opgeslagen. `CRON_SECRET` moet ook minimaal 32 bytes zijn.
7. **Resend instellen.** Zet `RESEND_API_KEY` en een bij Resend geverifieerde `RESEND_FROM_EMAIL` in Vercel. De code gebruikt Resend API (niet SMTP), verstuurt vanuit de server en houdt resultaten/fouten in de outbox bij. Geen sleutel per chat of e-mail uitwisselen.
8. **ING-configuratie instellen.** Zet de juiste `ING_BENEFICIARY_NAME` en `ING_IBAN` als server-only secrets. Controleer begunstigde, IBAN en QR in een preview. `ING_PAYMENT_URL` blijft leeg tenzij de eigenaar een bestaande betaallink bevestigt.
9. **Preview en end-to-endcontrole.** Test login/autorisatie, één acceptatie, dubbele/concurrente acceptatie, outbox/idempotency, betaalstatussen, dubbele betaalregistratie, restverzoek en e-mails met een expliciet testadres. Geen echte acceptatie, klantmail of betaling testen.
10. **Publicatie via GitHub.** Review de wijzigingsset en laat de gekoppelde Vercel-hosting vanaf de GitHub-branch deployen. Er is niet gepusht, gecommit of rechtstreeks gedeployed.

Environment-key lijst en lege voorbeeldwaarden staan in `.env.example`. De acceptatieknop blijft uit zolang vereiste database, ID, klantmail, voorwaarden, beheerderslogin, Resend of ING-configuratie ontbreekt.

## Verificatie uitgevoerd

- `npm run test:quote`: 3 controles geslaagd voor even/oneven centverdeling en ongeldige bedragen.
- `npx tsc --noEmit`: geslaagd.
- `npm run lint -- --no-cache`: geslaagd.
- `npm run build`: geslaagd, inclusief Next.js productiebouw. De homepage wordt nu direct door de App Router gerenderd en gebruikt de globale gedeelde header; de losse native-home-generator is niet langer onderdeel van de build.
- Browsercontrole op 390 px met lokaal tijdelijk testtoken: de persoonlijke offerte is volledig aanwezig, de acceptatie blijft uitgeschakeld zonder configuratie, en document-/bodybreedte is 390 px bij viewport 390 px. Deze controle verstuurde geen e-mail en maakte geen databasewijziging.
- Geen Neon-koppeling beschikbaar: SQL-syntax, transactieconcurrentie en betaal-/mailstatussen zijn niet tegen een echte Postgres-database geïntegreerd getest. Mobiel is getest; desktopflow voor dit volledige nieuwe formulier niet apart beoordeeld.
