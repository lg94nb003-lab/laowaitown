# LAOWAITOWN Monitoring Playbook

This playbook turns launch monitoring into a weekly operating loop.

## What Is Already Wired In

- GA4 measurement ID: `G-YY4T3B3MHR`
- Shared analytics entrypoint: `shared/analytics.js`
- All sitemap HTML pages include the shared analytics script.
- Build generation runs `scripts/ensure-analytics.js`.
- Local quality check runs `scripts/check-site.js`.
- Live URL monitor is available with `npm run monitor:live`.

## GA4 Events To Mark As Key Events

Mark these in GA4 Admin > Data display > Events after GA4 has received them at least once:

- `tool_open`
- `search_submit`
- `stay_calculate`
- `phrase_copy`
- `email_click`
- `official_source_click`
- `page_feedback`

Keep these as normal diagnostic events:

- `currency_convert`
- `translate_open`
- `map_query`
- `cta_click`
- `outbound_click`
- `phone_click`
- `phrase_fullscreen_open`
- `phrase_scene_select`

## Clarity Setup

Create a Microsoft Clarity project, then set the project ID in `shared/analytics.js`:

```js
clarityProjectId: 'YOUR_CLARITY_PROJECT_ID'
```

Use Clarity weekly to review:

- Homepage search behavior
- Tool panel usage on mobile
- Dead clicks on buttons or cards
- Rage clicks around policy summaries
- Scroll depth on long visa pages
- Sessions with `page_feedback` down votes

## Uptime Monitoring

Create external uptime monitors for:

- `https://laowaitown.com/`
- `https://laowaitown.com/sitemap.xml`
- `https://laowaitown.com/visa/visa-free-entry`
- `https://laowaitown.com/visa/240-hour-transit-visa`
- `https://laowaitown.com/life/`
- `https://laowaitown.com/legal/`

Alert channels:

- Email for all downtime
- SMS or push for homepage downtime
- Weekly summary email if your monitor supports it

## Daily Checklist

Time needed: 5 minutes.

- Confirm uptime monitor has no unresolved outage.
- In GA4 Realtime or yesterday report, confirm data is still coming in.
- Check whether `tool_open`, `search_submit`, and `stay_calculate` dropped to zero.
- Check Search Console for urgent indexing, security, or manual action warnings.
- If deployed yesterday, run `npm run monitor:live`.

## Weekly Checklist

Time needed: 45-60 minutes.

- GA4: top pages by views.
- GA4: top pages by key events.
- GA4: pages with high views and low key events.
- Search Console: queries with high impressions and low CTR.
- Search Console: queries ranking 8-20.
- Clarity: mobile recordings for homepage and top visa pages.
- Clarity: dead clicks and rage clicks.
- Pick 1-3 page changes for the next week.

## Monthly Checklist

Time needed: 2-4 hours.

- Compare visa, life, and legal sections by traffic and key events.
- Pick the next content cluster to expand.
- Rewrite titles/descriptions for high-impression low-CTR pages.
- Improve pages that get traffic but no `tool_open`, `official_source_click`, or feedback.
- Review policy source pages for changes.
- Run `npm run build` before publishing.

## Useful Commands

```bash
npm run check
npm run build
npm run monitor:live
```

`npm run monitor:live` requires network access and checks live production URLs from `sitemap.xml`.
