# LAOWAITOWN 文档总入口

> 这是唯一的文档入口。开新会话的 AI **先读这里，再读 `ai-handoff.md`**。
> 其他任何地方（包括归档区）的文档都不能覆盖这里的约定。

---

## 项目一句话

面向来华外国人的**签证政策工具 + 生活指南**静态站，线上 `laowaitown.com`。
原生 HTML/CSS/JS，无框架；数据真相源在 `shared/*.js`，页面由脚本生成，`check-site.js` 做 8 类校验。

---

## AI 开工前必读（按顺序，约 2 分钟）

| 顺序 | 文档 | 解决什么问题 |
|---|---|---|
| 1 | `ai-handoff.md` | 代码在哪、怎么发布、认证怎么走、推不上去怎么排查 |
| 2 | `maintenance-rules.md` | 什么能直接改、什么必须审批 |
| 3 | `protected-data-rules.md` | 改签证政策数据的制度与拒绝模板 |

读完这三篇之前，不要动任何文件。

---

## 我要做某件事，该看哪篇

| 你要做的事 | 读这篇 |
|---|---|
| 改页面文案 / 样式 / 布局 | `maintenance-rules.md` + `page-template.md` |
| 改签证政策数据（国家名单、口岸、省份） | **`protected-data-rules.md`（强制）** |
| 新写一个 SEO 页面 | `page-template.md` |
| 日常怎么提交、怎么上线、用什么模板 | `workflow.md` |
| 上线前逐项对照检查 | `launch-readiness-spec.md` |
| 上线后监控与每周巡检 | `monitoring-ops-playbook.md` |
| 核对某条政策的官方来源 | `policy-source-audit.md` |
| 看业务方向、架构演进、变现路径 | `strategy-2026-2027.md` |

---

## 目录约定（三条硬规矩）

1. **`docs/` 是唯一文档区。** 新文档放这里，不要放项目根目录。
2. **`docs/archive/` 是历史资料，不要据此开发。** 里面的 wiki 描述的是已经不存在的旧架构。
3. **项目根目录只放工程文件。** 不放教程、不放笔记、不放备份。

---

## 现行文档清单（9 篇）

| 文件 | 性质 | 最后更新 |
|---|---|---|
| `README.md` | 本文件，总入口 | 2026-10-28 |
| `ai-handoff.md` | AI 交接说明 | 2026-10-28 |
| `maintenance-rules.md` | 维护红线 | 2026-05 |
| `protected-data-rules.md` | 数据审批制度 | 2026-05 |
| `page-template.md` | 新页面骨架 | 2026-05 |
| `workflow.md` | 工作流与模板 | 2026-10-28 |
| `launch-readiness-spec.md` | 上线检查清单 | 2026-05 |
| `monitoring-ops-playbook.md` | 监控运维手册 | 2026-05 |
| `policy-source-audit.md` | 政策来源审计 | 2026-05-27 |
| `strategy-2026-2027.md` | 战略与架构演进 | 2026-10-22 |

> 历史规划稿 `reorg-plan.md` 记录的是本次整理的过程，可作为参考，但不是现行规范。
