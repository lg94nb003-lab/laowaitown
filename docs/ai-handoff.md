# AI 交接说明

> 每次开新会话，先让 AI 读这一份。目的是让它 30 秒内搞清楚「代码在哪、怎么发布、认证怎么走」，不要从头猜。

---

## 1. 项目是什么

**LAOWAITOWN** —— 面向来华外国人的签证政策工具 + 生活指南静态站，线上 `laowaitown.com`。
原生 HTML/CSS/JS，无框架。数据单一真相源在 `shared/*.js`，页面由 `scripts/generate-seo-pages.js` 生成，`scripts/check-site.js` 做 8 类校验。

---

## 2. 代码在哪（重点，AI 最容易搞错）

| 位置 | 角色 |
|---|---|
| `D:/AIdocument/lg1/waiguoren1` | 主仓库（真正存放 `.git` 的地方） |
| `C:/Users/86152/WorkBuddy/Worktrees/waiguoren1/main-4d15d3f8` | 当前工作副本，git worktree，分支 `workbuddy/main-4d15d3f8` |

两者共享同一个 `.git`，不是两份独立仓库。

**三条红线：**

1. **只在 C 盘 worktree 改代码。** 主仓库只当仓库本体，不要在里面开编辑器改文件——它可能落后于远端，改了会打架。
2. **D 盘目录不得移动、不得删除。** C 盘这份 worktree 依附它的 `.git`，主仓库一旦被挪走，C 盘副本立即失效。
3. **每月检查主仓库是否落后：**
   ```bash
   cd D:/AIdocument/lg1/waiguoren1 && git fetch origin main && git rev-list --count HEAD..origin/main
   ```
   结果大于 0 就执行 `git pull --ff-only`。

> 文档总入口是 `docs/README.md`，开工前先读它，再读本文件。

---

## 3. 发布链路（单向，记住方向）

```
本地改文件 → git push → GitHub (lg94nb003-lab/laowaitown) → Cloudflare Pages 自动部署 → laowaitown.com
```

- 推 `main` 就是**真实上线**，约 1.5-2 分钟后生效。
- Cloudflare 只是 GitHub 的下游读者。**改 Cloudflare 配置、重新绑定仓库，对 push 失败毫无帮助。**

---

## 4. Git 认证事实（已实测，不要再去"修"）

- remote 地址：`https://github.com/lg94nb003-lab/laowaitown.git`（**HTTPS，不是 SSH**）
- `credential.helper = manager`（Git Credential Manager）
- Windows 凭据管理器 `git:https://github.com` 中存有用户 `lg94nb003-lab` 的 PAT，实测可取用
- `git pull` / `git push` 实测正常，push 耗时约 7 秒

**禁止事项：**

- ❌ 不要生成 SSH 密钥
- ❌ 不要建议把 remote 改成 `git@github.com:...`
- ❌ 不要动 Windows 凭据管理器
- ❌ 不要说"需要重新配置 Cloudflare"

用户历史上一直能顺利 push，遇到问题时**先假设是自己判断错了，而不是环境坏了**。

---

## 5. 推送失败的正确排查顺序

按顺序做，不要跳步：

1. `git status --short` —— 工作区脏不脏
2. `git fetch origin main` —— 拉取远端最新
3. `git rev-list --count origin/main..HEAD` —— 本地领先几个提交
4. 如果 push 报 `Updates were rejected because the remote contains work` → **是本地落后，先 `git pull --ff-only`**
5. 只有以上全部正常，才轮到怀疑网络。检查 `git ls-remote --heads origin` 是否返回分支列表
6. **绝对不要**一上来就查 `~/.ssh`、下"缺密钥"结论

---

## 6. 构建与校验

```bash
npm run build           # 生成 SEO 页 → 8 类校验 → 复制白名单到 public/ → 再校验
node scripts/check-site.js   # 单独跑站点校验
```

`public/` 是构建产物，由 `wrangler.jsonc` 发布，不手工编辑。

---

## 7. 项目红线

- `shared/visa-data.js` 的 4 个受保护数组（免签 50 国 / 240h 55 国 / 24 省 65 口岸 / 海南 59 国）：改动须带官方来源 + 核查日期 + `[approved-data-update]` 标记。
  注意：`scripts/hooks/commit-msg` 目前只检查 `index.html`，对 `shared/visa-data.js` **不生效**（已知缺陷，待修）。
- `visa/`、`life/` 下的页面由脚本生成，手改会被下次 `npm run build` 覆盖。
- 生产分支是 `main`，谨慎直接推。需要试验时先推临时分支。

---

## 8. 给 AI 的开场提示词（直接复制粘贴）

```
这是 LAOWAITOWN 项目（laowaitown.com）。开工前请先读 docs/ai-handoff.md。

关键背景：
- 这是 git worktree，主仓库在 D:/AIdocument/lg1/waiguoren1
- 发布链路是 push main → GitHub → Cloudflare Pages 自动部署
- Git 走 HTTPS + Git Credential Manager，令牌已存在，不需要 SSH
- 我之前一直能正常 push，如果现在推不上去，请先按 docs/ai-handoff.md 第 5 节的顺序排查，
  尤其是"本地是否落后于远端"，不要先怀疑网络或密钥

请先只读不写，把当前状态确认清楚再动手。
```
