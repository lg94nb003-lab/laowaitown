# LAOWAITOWN Launch Readiness Spec
# 上线就绪检查清单

This checklist is the temporary spec for moving from feature development into launch readiness.

> 中文：这份清单是从功能开发阶段过渡到上线就绪的临时规范。

## Goal / 目标

Ship a clean static site that publishes only user-facing pages and assets, keeps policy-sensitive content source-backed, and gives the owner a repeatable pre-launch routine.

> 中文：发布一个干净的静态站点，只发布面向用户的页面和资源，保持政策敏感内容有来源支撑，并给所有者提供一个可重复的上线前例行流程。

## In scope for this pass / 本次范围

- Keep deployment output separate from working files.
- Ensure generated SEO pages, sitemap, links, tools, and trust modules pass local checks.
- Remove unfinished public flows that lead to "coming soon" dead ends.
- Document owner-only launch tasks that require accounts or final policy judgment.

> 中文：
> - 部署产物与工作文件分离
> - 确保生成的 SEO 页面、sitemap、链接、工具和可信度模块通过本地检查
> - 移除未完成的公开流程（避免用户看到"即将推出"的死胡同）
> - 记录需要账户或最终政策判断的所有者专属任务

## Out of scope unless separately approved / 不在本次范围内（除非另行批准）

- Editing protected policy datasets in `shared/visa-data.js`.
- Claiming that every policy detail is officially re-verified without a dedicated source audit.
- Submitting Google Search Console or Bing Webmaster changes without owner login.

> 中文：
> - 修改 `shared/visa-data.js` 中的受保护政策数据集
> - 在没有专门来源审计的情况下声称每条政策细节已被官方重新验证
> - 在没有所有者登录的情况下提交 Google Search Console 或 Bing 站长工具变更

## Release commands / 发布命令

On Windows PowerShell, prefer `npm.cmd` if script execution policy blocks `npm.ps1`.

> 中文：在 Windows PowerShell 上，如果脚本执行策略阻止了 `npm.ps1`，请使用 `npm.cmd`。

```bash
npm.cmd run build
```

The build command runs:

> 中文：build 命令依次执行：

1. `generate:seo` to regenerate SEO pages and `sitemap.xml`. / 重新生成 SEO 页面和 sitemap.xml
2. `check-site.js` to validate JS syntax, links, sitemap, tool entry points, and policy trust modules. / 校验 JS 语法、链接、sitemap、工具入口和可信度模块
3. `build-public.js` to copy only deployable files into `public/`. / 只把可部署文件复制到 `public/`
4. `check-site.js --root public` to validate the exact deploy output. / 对部署产物再次校验

## Public deploy output / 部署产物

Wrangler serves `public/`, not the repository root. The output should include:

> 中文：Cloudflare (Wrangler) 部署的是 `public/` 目录，不是仓库根目录。应包含：

- `index.html`
- `about.html`
- `style.css`
- `logo.png`
- `robots.txt`
- `sitemap.xml`
- `life/`
- `shared/`
- `visa/`

The output should not include:

> 中文：不应包含：

- `docs/`
- `mockups/`
- `scripts/`
- `src/`
- `node_modules/`
- `index-v1-backup.html`

## Manual QA smoke test / 手动 QA 冒烟测试

Open these after `npm.cmd run build`:

> 中文：build 完成后打开以下页面检查：

- `/`
- `/#calculator`
- `/#currency`
- `/#timezone`
- `/#phrasebook`
- `/visa/`
- `/about.html`
- One country page. / 任意一个国家页
- One 240-hour route page. / 任意一个 240h 路线页
- One life page. / 任意一个生活指南页

For each page, check:

> 中文：对每个页面检查：

- No blank page or console error. / 无空白页或控制台报错
- Navigation and primary buttons work. / 导航和主要按钮正常
- Canonical URL exists. / 存在 canonical URL
- Policy pages show source/trust notes. / 政策页面显示来源/可信度信息
- No visible "coming soon" dead end. / 无可见的"即将推出"死胡同

## Owner-only tasks / 所有者专属任务

- Submit `https://laowaitown.com/sitemap.xml` in Google Search Console. / 在 Google Search Console 提交 sitemap
- Submit the sitemap in Bing Webmaster Tools. / 在 Bing 站长工具提交 sitemap
- Decide whether to keep Google Analytics enabled before public launch. / 决定正式上线前是否保留 Google Analytics
- Approve any protected policy-data edits using `[approved-data-update]`. / 使用 `[approved-data-update]` 标记批准任何受保护政策数据的修改
