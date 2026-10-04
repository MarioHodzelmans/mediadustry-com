<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project instructions

- Use inline SVG or CSS-drawn shapes for decorative arrows and icons that could render as emoji on iOS. Do not use bare Unicode diagonal arrows as icons. Decorative SVGs must use `aria-hidden="true"`, `focusable="false"`, CSS sizing and `currentColor`. Verify mobile alignment.
- Publish website and app changes through the connected GitHub repository so the hosting platform deploys from Git. Do not deploy directly to Vercel unless the user explicitly asks for a direct deployment.
