# MEDIADUSTRY Showcase Engine

The Showcase Engine is a repository-driven presentation system for public cases, private concepts and reusable industry demos. It lives alongside the existing MEDIADUSTRY site and does not alter Shopify or require a CMS/database.

## Routes

- `/work` — public portfolio overview
- `/work/[slug]` — indexable completed case
- `/concept/[slug]` — personalised proposal, always `noindex, nofollow`
- `/demo/[slug]` — reusable industry direction; indexing is configured per item

All detail routes render the same `Showcase` and `ShowcaseBlocks` architecture.

## Content

Showcases currently live in `content/showcases.ts`. Each object contains identity, metadata, a scoped theme and an ordered `blocks` array. `lib/showcase/types.ts` is the source of truth for the schema.

Types:

- `case`: completed work, normally without pricing or acceptance
- `concept`: prospect-specific presentation with proposal ID, version and validity
- `demo`: reusable industry direction that can be cloned into a concept

## Theme system

Each showcase maps its theme to scoped CSS variables on the showcase root:

```css
--showcase-bg
--showcase-fg
--showcase-accent
--showcase-muted
--showcase-surface
--showcase-heading
--showcase-body
--showcase-radius
```

These values never override the global MEDIADUSTRY theme. Fonts should use existing loaded font variables unless a separately optimised font is deliberately added through `next/font`.

## Blocks

Supported block types:

`hero`, `intro`, `statement`, `problem`, `solution`, `gallery`, `image`, `browserDemo`, `mobileDemo`, `beforeAfter`, `services`, `process`, `timeline`, `results`, `testimonial`, `pricing`, `options`, `acceptance`, `cta`.

The renderer is `components/showcase/ShowcaseBlocks.tsx`. Add a type to the union first, then add its rendering branch and responsive styles.

## Interactive demos and iframe safety

`ShowcaseBrowserDemo` supports an inline iframe and an accessible fullscreen dialog with Escape handling, focus return and scroll restoration.

Relative URLs are allowed. Absolute iframe URLs must match `SHOWCASE_IFRAME_HOSTS`. Add trusted hosts as a comma-separated list:

```env
SHOWCASE_IFRAME_HOSTS=*.vercel.app,mediadustry.com,*.mediadustry.com
```

If a host is not allowed, the UI shows a polished external-link fallback. A permitted host can still block embedding through its own CSP or `X-Frame-Options`; in that situation use the external link.

## Analytics hooks

`lib/showcase/analytics.ts` defines:

- `showcase_view`
- `showcase_demo_open`
- `showcase_demo_fullscreen`
- `showcase_pricing_view`
- `showcase_accept_click`

The helper emits a `mediadustry:analytics` browser event with `showcase_slug` and `showcase_type`. No analytics dependency was added because the repository currently has no Umami integration. A future adapter can subscribe to this event.

## Future proposal acceptance

Acceptance is deliberately presentation-only. Future form/data logic must live outside display blocks and persist proposal ID/version, contact identity, consent, timestamp, amount, currency and audit metadata. Never log this data in the browser.

`createProposalCheckout()` is an intentionally unimplemented boundary. It must only be connected to the existing Shopify architecture when a clean server-side checkout flow is available. Never expose Shopify secrets in client code.

## Creating a public case

1. Add a `type: "case"` configuration.
2. Add optimised WebP/AVIF assets under `public/img`.
3. Set accurate title, description, alt text, category and year.
4. Compose only relevant blocks; omit pricing and acceptance.
5. Verify `/work` and `/work/[slug]`.

## Creating a demo

1. Copy the closest demo configuration.
2. Give it a unique slug and industry-specific theme.
3. Replace fictional content and imagery.
4. Configure indexing explicitly.
5. Verify the demo at mobile, tablet and desktop widths.

## Creating a new proposal with Codex

1. Copy an appropriate demo/content structure.
2. Create a new `concept` configuration.
3. Set a unique, non-guessable slug.
4. Add the prospect-specific theme.
5. Replace all copy and alt text.
6. Add and allowlist the demo URL.
7. Add pricing and validity information.
8. Confirm the page emits `noindex, nofollow`.
9. Test at 375px, 768px and 1440px, including fullscreen and Escape.
10. Deploy through the normal repository/Vercel workflow.

## Current examples

- `/work/mediadustry-digital-foundation`
- `/demo/construction-01`
- `/concept/example-construction-x82k`

## Next steps

- Connect the analytics event bridge when an analytics platform is selected.
- Add authenticated/private proposal access before using sensitive commercial content.
- Add database-backed proposal acceptance and audit records.
- Connect Shopify deposit checkout server-side only after acceptance storage exists.
