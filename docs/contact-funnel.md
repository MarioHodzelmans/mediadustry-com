# Contact and opt-in funnel — historical archive

**Archived on 4 October 2026:** the owner requested restoration of the earlier website, retaining only the improved proposal. The website-check, opt-in, unsubscribe and thank-you pages, API handlers, backend code and funnel tests described below have been removed. The current `/contact` page uses its original Web3Forms implementation. Existing external Resend resources and hosting variables were not changed. The following content records the earlier implementation and must not be treated as current activation instructions.

The website offers a project inquiry at `/contact` and a personal website-review request at `/website-check`. The website-check is reviewed by Mario; it does not generate an automatic scan report. Both forms use `/api/contact`.

## Activation

### Prepared configuration — 4 October 2026

The connected Vercel project has a native Resend resource in EU/Ireland, a dedicated `MEDIADUSTRY bevestigde website-updates` segment, the three contact properties below, and a random server signing secret. No credentials are stored in this repository. Resend's official diagnostic recipient accepted a test send and reported delivery; owner inbox receipt has not been verified.

The current sender is `MEDIADUSTRY <website@mariohodzelmans.nl>`, using the owner's already verified domain. Replies go to `info@mediadustry.com`. The branded `mail.mediadustry.com` domain is awaiting the DNS records in `docs/resend-dns.md`.

The free Upstash integration is awaiting the account holder's own acceptance of the [integration terms](https://vercel.com/mario-hodzelmans-projects/~/integrations/accept-terms/upstash?source=cli). No automatic paid upgrade has been requested. Until the persistent database is provisioned, online submission is unavailable and the forms provide a prefilled email alternative; no application submission or marketing enrollment is claimed.

After accepting, provision the free Redis resource through the linked project and pull its environment variables. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` exist for production, preview and development, then publish a new Git commit so the build-time form notice updates. Complete the authorized diagnostic confirmation/unsubscribe checks before considering activation verified.

### Required server variables

Set the server-only variables in `.env.example` for the connected hosting project, then publish the repository changes through GitHub. Build-time form availability is derived from the email and Redis configuration. Changing these variables requires a new Git-backed deployment to update that notice.

- `RESEND_API_KEY`: full-access key; an email-sending-only key cannot manage contacts or segment membership.
- `CONTACT_FROM_EMAIL`: a sender on a Resend-verified domain. DNS instructions for the project sender are in `docs/resend-dns.md` when available.
- `CONTACT_TO_EMAIL`: the owner inbox; defaults to `info@mediadustry.com`.
- `CONTACT_SITE_URL`: canonical HTTPS origin, used for confirmation links and origin validation.
- `CONTACT_TOKEN_SECRET`: at least 32 cryptographically random characters. Rotating it invalidates existing confirmation and unsubscribe links.
- `RESEND_SEGMENT_ID`: a dedicated MEDIADUSTRY segment.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: persistent Redis database. Production never falls back to memory when this service is unavailable.
- `CONTACT_ALLOWED_ORIGINS`: optional comma-separated, exact trusted origins. Canonical MEDIADUSTRY origins, generated Vercel deployment/branch URLs, and local development port 3000 are allowed explicitly. Request Host headers are not used as an authorization source.

Create these Resend contact properties with type `string` before activating opt-in:

1. `md_consent_version`
2. `md_consent_source`
3. `md_confirmed_at`

The owner notification must be accepted by Resend before the website reports receipt. The user's transactional acknowledgment is a separate send; if it fails, the website still confirms the received inquiry and explicitly explains the missing acknowledgment. Provider acceptance does not certify delivery to the final inbox.

## Marketing consent

The marketing checkbox is optional and initially unchecked. The inquiry is handled independently of this choice. The exact consent wording and version live in `lib/funnel.ts`.

When selected, the server records the consent request in Redis and adds a purpose-bound, signed confirmation link to the transactional acknowledgment. The link expires 24 hours after the first server processing timestamp. The initial request never creates an active Resend marketing contact or adds one to the segment.

Opening `/opt-in?token=...` changes nothing. The recipient explicitly submits the confirmation button, and `/api/opt-in` verifies the signature, purpose, expiry, current state and nonce. Only then is the contact added to the dedicated segment and the server confirmation time stored. A first welcome email supplies three website-improvement questions and an unsubscribe link. No recurring marketing campaign is automatically enabled.

Opening `/afmelden?token=...` also changes nothing. The recipient explicitly confirms the unsubscribe. The server invalidates pending confirmation state and removes only the MEDIADUSTRY segment membership. This preserves other projects' global Resend consent. A Resend contact that is already globally unsubscribed is never automatically resubscribed by this funnel.

Both changes use a distributed per-email Redis lock. Consumed confirmation links are idempotent while the same confirmation is current, and cannot reactivate a contact after unsubscribing. If confirmation persistence fails after adding segment membership, the handler attempts compensating removal and reports a failure. Revocation state is persisted before a provider removal attempt; a temporary provider error requires retrying the unsubscribe or manual follow-up.

**Every future marketing broadcast must target this dedicated segment and include Resend's native unsubscribe footer.** The custom welcome link removes the MEDIADUSTRY segment; Resend's native unsubscribe may apply the account-wide subscription setting. Do not send promotional transactional emails to the general contact inbox list. Editorial campaigns/nurture schedules must be configured separately; no unconfigured automation is claimed to be running.

## Reliability and data

The browser keeps a request UUID for retries with unchanged field values. Changing the payload generates a new UUID. The backend caches a digest, first processing timestamp and final received result for 24 hours. Deterministic Resend idempotency keys prevent duplicate notifications/receipts. Rate limits use atomic Redis counters on a SHA-256 IP identifier with a ten-minute expiry; raw IP addresses are not saved by this application. Vercel's trusted forwarding header is preferred.

Pending consent expires from Redis after 24 hours. Confirmed and revoked consent evidence is persistent until manually removed under the business's retention policy. Redis keys use a hash of the email, while the signed email links contain an encoded email address. User-submitted project content is delivered to the owner by Resend and is not stored in Redis. The receipt marker in browser session storage contains only source, receipt/marketing status and timestamp, expires after 30 minutes, and is used solely to display `/bedankt` after confirmed receipt.

The form validates field limits, email format, website scheme, source and strict opt-in booleans on the server. It rejects a honeypot, implausible timing and untrusted origins, and permits five inquiry submissions per IP identifier per ten minutes. Resend requests have bounded retries for 429/5xx inside a 48-second total deadline; locks have a 90-second lease. Errors preserve input and provide a prefilled mailto alternative. The alternate email is sent by the visitor in their own email program.

## Verification

Run `node scripts/test-funnel.mjs` to compile only the backend into a temporary directory and run mocked provider/Redis tests. No real email, contact or Redis record is created. Tests cover invalid data, provider/configuration failures, origins, replay, idempotence, optional consent, token expiry/purpose, full server-clock link lifetime, compensation and shared limits.

Use Resend's diagnostic sink addresses for a real provider test. Verify a production inquiry, acknowledgment, explicit confirmation, unsubscribe and replay only with an authorized test address. Never activate real customer contacts as part of testing. Publish changes by pushing the connected GitHub repository; do not run a direct deployment command.
