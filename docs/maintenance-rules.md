# LAOWAITOWN Maintenance Rules

This file is for the owner and future AI assistants. It keeps the project easy to change without accidentally weakening policy trust.

## What can be edited normally

- Page layout, copy, SEO titles, descriptions, FAQ wording, and internal links.
- Homepage tool UI and interaction logic.
- Non-policy travel content such as payment, eSIM, maps, phrases, and emergency guidance.
- Generated SEO page templates in `scripts/generate-seo-pages.js`.
- Tool content/config in `shared/tool-config.js`.

## What needs explicit approval

Core visa policy datasets in `shared/visa-data.js` are protected content.

Do not change these arrays unless the request clearly includes `[approved-data-update]`:

- `visaFreeCountries`
- `transit240Countries`
- `transit240Provinces`
- `hainan59Countries`

When updating protected data, include:

- The official source link.
- The date checked.
- A short reason for the change.
- A bilingual commit message.

## Policy page trust requirements

Every visa policy page should show:

- Status.
- Last verified date.
- Effective-since date when known.
- Official source links.
- Independent-site disclaimer.

Core visa pages use `LWRenderStatus(...)` from `shared/nav-data.js`.
Generated SEO pages include a static trust block from `scripts/generate-seo-pages.js`.

## Navigation rules

Only publish top navigation items that have real pages.

Currently public:

- Home
- Visa
- Life
- Tools

Future sections are kept in `LWNavData.futureCategories` until they have enough real content:

- Travel
- Business
- Study
- Legal

## Sitemap rules

When adding or removing public pages:

1. Update or regenerate `sitemap.xml`.
2. Check every sitemap URL exists.
3. Make sure the page has a canonical URL.
4. Make sure users can reach the page from a directory page or related link.

For the current SEO matrix, run:

```bash
npm run generate:seo
npm run check
```

## Homepage tool rules

Tool data lives in `shared/tool-config.js`.
Homepage rendering and interaction still live in `index.html` for now.

The following deep links must keep working:

- `/#calculator`
- `/#stay`
- `/#timezone`
- `/#currency`
- `/#phrasebook`
- `/#phrases`

## Commit rules

Use bilingual commit messages so the owner can review history easily.

Recommended format:

```text
English summary / 中文总结

English detail if needed.
中文补充说明（如有需要）。
```

Example:

```text
Add SEO visa matrix and trust checks / 新增签证 SEO 页面矩阵和可信度检查

Generate country, port, route, and life guide pages with sitemap updates.
生成国家页、口岸页、路线页和生活指南页，并同步更新 sitemap。
```

## Pre-push checklist

Run:

```bash
npm run check
```

Then quickly open:

- `/`
- `/#calculator`
- `/#currency`
- `/#timezone`
- `/#phrasebook`
- `/visa/`
- One generated country page.
- One generated life page.
