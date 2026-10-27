# 开发工作流

> 一条路径、五个关卡。每关都有明确的「通过标志」，不靠感觉。
> 完整背景见 `ai-handoff.md`，红线见 `maintenance-rules.md`。

---

## 一、全流程

```
① 说需求  →  ② 改代码  →  ③ 跑自检  →  ④ 提交  →  ⑤ 推送并验证
```

| 关卡 | 动作 | 通过标志 |
|---|---|---|
| ① | 用下方模板 1 描述需求 | 目标 / 范围 / 禁区 / 验收 四项齐全 |
| ② | **只在 C 盘 worktree 里编辑** | `git status` 只出现预期的文件 |
| ③ | `npm run build` | 8 类校验全绿，无 `Missing publish file` |
| ④ | 用模板 2 写提交信息 | 钩子不拦，`git log -1` 一眼能读懂 |
| ⑤ | `git push origin HEAD:main` | 约 2 分钟内线上可见变化 |

---

## 二、模板 1：需求描述（你发给 AI）

```
【目标】一句话说清要解决什么问题
【范围】只改这些：<文件 / 页面>
【禁区】不要动：shared/visa-data.js、legal/、构建脚本、Cloudflare 配置
【验收】我怎么判断做对了：<可观察的结果>
【参考】风格参照：<某个已有页面>

先只读不写，把你打算改的文件和改法列出来，我确认后再动手。
```

**最后那句最重要。** 它把「AI 猜 → 改错 → 返工」变成「AI 说计划 → 你点头 → 一次做对」。

---

## 三、模板 2：提交信息

```
<type>(<scope>): <中文说明> / <English>
```

| type | 用于 |
|---|---|
| `feat` | 新功能、新页面 |
| `fix` | 修 bug |
| `content` | 改文案、改内容 |
| `data` | 改签证政策数据（须带 `[approved-data-update]`） |
| `chore` | 杂务、配置 |
| `docs` | 文档 |

| scope | 对应范围 |
|---|---|
| `homepage` / `visa` / `life` / `legal` | 对应页面区 |
| `shared` | 数据源与公共脚本 |
| `scripts` | 构建与校验脚本 |
| `ci` | 自动化流程 |

示例：

```
feat(visa): 新增 3 个 240h 过境路线页 / add 3 transit route pages
content(life): 更新支付宝绑卡流程 / update Alipay card binding steps
fix(homepage): 修复国籍下拉在移动端被截断 / fix country dropdown cutoff
```

---

## 四、常用命令

```bash
# 看当前状态
git status --short

# 确认自己是否落后于远端
git fetch origin main && git rev-list --count origin/main..HEAD

# 构建 + 全量校验（提交前必跑）
npm run build

# 只跑站点校验
node scripts/check-site.js

# 提交（示例）
git add <改动的文件>
git commit -m "content(life): 更新支付指南 / update payment guide"

# 推送并上线
git push origin HEAD:main

# 线上验证（示例）
curl -s https://laowaitown.com/about | grep -c "关键词"
```

---

## 五、必须停下来问的情况

遇到以下任一情况，**先停下来说明，不要自己决定**：

1. 需要改 `shared/visa-data.js` 的四个受保护数组
2. 需要删 `legal/`、`vendor/`、`shared/` 下的任何文件
3. `npm run build` 报错，且原因不在你刚改的文件里
4. push 被拒绝，且不是「本地落后」这个原因
5. 需要改动 Cloudflare、DNS、GitHub 的仓库设置
6. 需要新增超过 3 个页面

---

## 六、一次典型改动长什么样

以「改 240h 过境免签页的一句文案」为例：

```
① 你说：【目标】把结论句改得更明确
        【范围】只改 visa/240-hour-transit-visa.html
        【禁区】不动数据、不动其他页面
        【验收】首屏第一句话能直接回答"我能不能待 240 小时"

② 我改，然后 git status 确认只有 1 个文件变化

③ npm run build，8 项校验全绿

④ git commit -m "content(visa): 明确 240h 结论表述 / clarify 240h conclusion"

⑤ git push，约 90 秒后线上生效，curl 验证关键词出现
```

整个流程约 5-10 分钟，其中大部分时间在等你确认计划。
