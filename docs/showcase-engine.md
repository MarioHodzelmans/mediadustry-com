# MEDIADUSTRY Showcase Engine

The Showcase Engine is a repository-driven presentation system for public cases, private concepts and reusable industry demos. It lives alongside the existing MEDIADUSTRY site and does not alter Shopify or require a CMS/database.

## Routes

- `/#werk` — public portfolio overview
- `/werk/[slug]` — indexable completed case
- `/concept/[slug]` — personalised proposal, always `noindex, nofollow`
- `/demo/[slug]` — reusable industry direction; indexing is configured per item
- `/work` and `/work/[slug]` — restored original showcase routes

After the owner-requested restoration on 4 October 2026, concept routes use `Proposal`, `ProposalBlocks` and `proposal.module.css`. Demos and the original `/work` routes use the restored `Showcase`, `ShowcaseBlocks` and `showcase.module.css`. Public `/werk` cases use their original case layout. There are no production redirects for these original routes. The production homepage is a lightweight HTML document generated from the existing Next.js homepage after each build. Its menu/theme/image controls use native JavaScript; links back to it are normal anchors. Public cases, work/showcase, concept and demo routes use native scrolling. Contact and the explicitly listed legacy template examples load their complete stylesheet and motion runtime on demand; both are removed when leaving those routes. Concept previews retain their independent native iframe scrolling. Unknown paths use a lightweight native 404.

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

The concept renderer is `components/showcase/ProposalBlocks.tsx`; original demo/showcase content uses `components/showcase/ShowcaseBlocks.tsx`. Add a type to the union first, then add its rendering branch and responsive styles to the relevant renderer.

## Interactive demos and iframe safety

`ShowcaseBrowserDemo` renders separate desktop and mobile viewports and a native fullscreen dialog with Escape handling, focus return and body scroll locking. Inline frames only receive pointer and keyboard interaction after explicit activation, so normal page scrolling passes over inactive previews. Activating a preview pauses the automatic demo; Escape or “Terug naar voorstel” returns control to the proposal.

The return control sits below the device frame, keeping client navigation unobstructed. The floating proposal acceptance link is hidden while the preview is visible and returns when the visitor leaves that section.

An optional `previewUrl` identifies a same-origin, repository-owned snapshot. Only this local preview receives an automatic tour: one scroll through the page, a safe in-page navigation demonstration and a return to the top. The tour pauses offscreen or in a hidden tab, stops after completion, and is disabled for reduced-motion preferences. “Pauzeer demo” and “Herstart demo” provide explicit controls. External frames are never polled or controlled across origins.

The Alex Kamsma snapshot is under `public/previews/alex-kamsma`, with source provenance in `SOURCE.md`. It preserves the client homepage content and local assets without loading its framework, tracking or remote assets. The proposal labels it as an interactive design preview and links separately to the actual live website. Update the snapshot from the client project when the approved design changes.

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
5. Verify `/#werk` and `/werk/[slug]`.

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
10. Publish through GitHub so the connected hosting platform builds from Git.

## Current examples

- `/werk/alex-kamsma-design-parket`
- `/demo/construction-01`
- `/concept/alex-kamsma-parket` — linked from the site menu and the Alex case

## Next steps

- Connect the analytics event bridge when an analytics platform is selected.
- Add authenticated/private proposal access before using sensitive commercial content.
- Add database-backed proposal acceptance and audit records.
- Connect Shopify deposit checkout server-side only after acceptance storage exists.
