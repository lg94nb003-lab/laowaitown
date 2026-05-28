# LAOWAITOWN Maintenance Rules
# 维护规则

This file is for the owner and future AI assistants. It keeps the project easy to change without accidentally weakening policy trust.

> 中文：本文件面向项目所有者和未来的 AI 助手。它确保项目可以轻松修改，同时不会意外削弱政策可信度。

## What can be edited normally / 可以正常编辑的内容

- Page layout, copy, SEO titles, descriptions, FAQ wording, and internal links.
- Homepage tool UI and interaction logic.
- Non-policy travel content such as payment, eSIM, maps, phrases, and emergency guidance.
- Generated SEO page templates in `scripts/generate-seo-pages.js`.
- Tool content/config in `shared/tool-config.js`.

> 中文：
> - 页面布局、文案、SEO 标题、描述、FAQ 措辞、内部链接
> - 首页工具 UI 和交互逻辑
> - 非政策类旅行内容（支付、eSIM、地图、短语、紧急电话等）
> - `scripts/generate-seo-pages.js` 中的 SEO 页面模板
> - `shared/tool-config.js` 中的工具内容/配置

## What needs explicit approval / 需要明确批准的内容

Core visa policy datasets in `shared/visa-data.js` are protected content.

> 中文：`shared/visa-data.js` 中的核心签证政策数据集是受保护内容。

Do not change these arrays unless the request clearly includes `[approved-data-update]`:

> 中文：除非请求中明确包含 `[approved-data-update]` 标记，否则不要修改以下数组：

- `visaFreeCountries`
- `transit240Countries`
- `transit240Provinces`
- `hainan59Countries`

When updating protected data, include:

> 中文：更新受保护数据时，必须包含：

- The official source link. / 官方来源链接
- The date checked. / 检查日期
- A short reason for the change. / 简短的修改原因
- A bilingual commit message. / 双语提交信息

## Policy page trust requirements / 政策页可信度要求

Every visa policy page should show:

> 中文：每个签证政策页面应显示：

- Status. / 状态
- Last verified date. / 最后核实日期
- Effective-since date when known. / 生效日期（已知时）
- Official source links. / 官方来源链接
- Independent-site disclaimer. / 独立站点免责声明

Core visa pages use `LWRenderStatus(...)` from `shared/nav-data.js`.
Generated SEO pages include a static trust block from `scripts/generate-seo-pages.js`.

> 中文：核心签证页使用 `shared/nav-data.js` 中的 `LWRenderStatus(...)`。生成的 SEO 页面包含 `scripts/generate-seo-pages.js` 中的静态可信度块。

## Navigation rules / 导航规则

Only publish top navigation items that have real pages.

> 中文：只发布有实际页面的顶部导航项。

Currently public / 当前已公开：

- Home
- Visa
- Life
- Tools

Future sections are kept in `LWNavData.futureCategories` until they have enough real content:

> 中文：未来板块保留在 `LWNavData.futureCategories` 中，直到它们有足够的实际内容：

- Travel / 旅行
- Business / 商务
- Study / 留学
- Legal / 法律

## Sitemap rules / Sitemap 规则

When adding or removing public pages:

> 中文：添加或删除公开页面时：

1. Update or regenerate `sitemap.xml`. / 更新或重新生成 `sitemap.xml`
2. Check every sitemap URL exists. / 检查 sitemap 中每个 URL 都存在
3. Make sure the page has a canonical URL. / 确保页面有 canonical URL
4. Make sure users can reach the page from a directory page or related link. / 确保用户可以从目录页或相关链接访问该页面

For the current SEO matrix, run:

> 中文：当前 SEO 矩阵维护命令：

```bash
npm run generate:seo
npm run check
```

## Homepage tool rules / 首页工具规则

Tool data lives in `shared/tool-config.js`.
Homepage rendering and interaction still live in `index.html` for now.

> 中文：工具数据在 `shared/tool-config.js` 中。首页渲染和交互逻辑目前仍在 `index.html` 中。

The following deep links must keep working:

> 中文：以下深度链接必须始终可用：

- `/#calculator`
- `/#stay`
- `/#timezone`
- `/#currency`
- `/#phrasebook`
- `/#phrases`

## Commit rules / 提交规则

Use bilingual commit messages so the owner can review history easily.

> 中文：使用双语提交信息，方便所有者查看历史。

Recommended format / 推荐格式：

```text
English summary / 中文总结

English detail if needed.
中文补充说明（如有需要）。
```

Example / 示例：

```text
Add SEO visa matrix and trust checks / 新增签证 SEO 页面矩阵和可信度检查

Generate country, port, route, and life guide pages with sitemap updates.
生成国家页、口岸页、路线页和生活指南页，并同步更新 sitemap。
```

## Pre-push checklist / 推送前检查清单

Run / 运行：

```bash
npm run check
```

Then quickly open / 然后快速打开以下页面检查：

- `/`
- `/#calculator`
- `/#currency`
- `/#timezone`
- `/#phrasebook`
- `/visa/`
- `/about.html`
- One generated country page. / 任意一个生成的国家页
- One generated life page. / 任意一个生成的生活指南页
