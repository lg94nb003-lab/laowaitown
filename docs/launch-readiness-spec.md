# LAOWAITOWN Launch Readiness Spec

This checklist is the temporary spec for moving from feature development into launch readiness.

## Goal

Ship a clean static site that publishes only user-facing pages and assets, keeps policy-sensitive content source-backed, and gives the owner a repeatable pre-launch routine.

## In scope for this pass

- Keep deployment output separate from working files.
- Ensure generated SEO pages, sitemap, links, tools, and trust modules pass local checks.
- Remove unfinished public flows that lead to "coming soon" dead ends.
- Document owner-only launch tasks that require accounts or final policy judgment.

## Out of scope unless separately approved

- Editing protected policy datasets in `shared/visa-data.js`.
- Claiming that every policy detail is officially re-verified without a dedicated source audit.
- Submitting Google Search Console or Bing Webmaster changes without owner login.

## Release commands

On Windows PowerShell, prefer `npm.cmd` if script execution policy blocks `npm.ps1`.

```bash
npm.cmd run build
```

The build command runs:

1. `generate:seo` to regenerate SEO pages and `sitemap.xml`.
2. `check-site.js` to validate JS syntax, links, sitemap, tool entry points, and policy trust modules.
3. `build-public.js` to copy only deployable files into `public/`.
4. `check-site.js --root public` to validate the exact deploy output.

## Public deploy output

Wrangler serves `public/`, not the repository root. The output should include:

- `index.html`
- `style.css`
- `logo.png`
- `robots.txt`
- `sitemap.xml`
- `life/`
- `shared/`
- `visa/`

The output should not include:

- `docs/`
- `mockups/`
- `scripts/`
- `src/`
- `node_modules/`
- `index-v1-backup.html`

## Manual QA smoke test

Open these after `npm.cmd run build`:

- `/`
- `/#calculator`
- `/#currency`
- `/#timezone`
- `/#phrasebook`
- `/visa/`
- One country page.
- One 240-hour route page.
- One life page.

For each page, check:

- No blank page or console error.
- Navigation and primary buttons work.
- Canonical URL exists.
- Policy pages show source/trust notes.
- No visible "coming soon" dead end.

## Owner-only tasks

- Submit `https://laowaitown.com/sitemap.xml` in Google Search Console.
- Submit the sitemap in Bing Webmaster Tools.
- Decide whether to keep Google Analytics enabled before public launch.
- Approve any protected policy-data edits using `[approved-data-update]`.
