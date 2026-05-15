# 🔒 受保护数据规则（Protected Data Rule）

> **本规则适用范围：所有 AI 协作场景**
> **强制等级：必须遵守（Must Follow）**

---

## 一、什么是"受保护数据"

本项目存在四组**核心政策数据**，其内容直接关系到用户法律决策（出入境政策），任何错误都可能误导用户。
因此约定：**未经用户明确授权，AI 不得修改这些数据的任何字段（code / zh / en / continent / 数组成员的增删）。**

### 受保护清单

| 文件 | 数组名 | 当前规模 | 内容 |
|------|--------|---------|------|
| `index.html` | `visaFreeCountries` | 50 国 | 30 天免签入境名单 |
| `index.html` | `transit240Countries` | 55 国 | 240 小时过境免签名单 |
| `index.html` | `transit240Provinces` | 24 省 / 65 口岸 | 240 小时过境开放口岸 |
| `index.html` | `hainan59Countries` | 59 国 | 海南 30 天免签名单 |

每个数组的源代码处都有 `🔒 PROTECTED DATA` 封条注释，请勿移除。

---

## 二、AI 行为准则

### 默认行为：只读不写
- 任何任务中，AI **可以读取**这 4 个数组（如用于匹配、统计、渲染）。
- AI **不得**：增删数组成员、修改 `code/zh/en/continent` 字段、调整顺序、重命名数组。
- 即使是看似"无害"的操作（如修改注释、统一缩进、规范化措辞），也禁止。

### 触发授权解锁的条件（同时满足）
1. **用户明确发起更新指令**，包含以下之一的关键词：
   - "请根据 XX 更新 visaFreeCountries（或 transit240/海南 等）"
   - "新政策已发布，更新免签国家列表"
   - "[授权:更新政策]" 显式标记
2. **用户提供变更依据**：
   - 政策原文截图 / PDF / 链接
   - 或文字版本的"新增 X、删除 Y"清单

只有 **(1) 且 (2)** 同时满足，AI 才进入"修改授权态"。

### 授权态下的工作流
1. AI 先朗读用户提供的依据，**逐条列出**计划要做的修改。
2. 等用户回复 "确认" 才动手。
3. 修改后 commit message **必须包含** `[approved-data-update]` 标记。
4. 同步更新 `测试报告.md` 或 wiki 中的国家数量统计。

### 拒绝模板
当 AI 在非授权态下被请求修改受保护数据时，必须回复：

```
⚠️ 此为受保护核心数据（visaFreeCountries / transit240Countries / 等）。
根据 .qoder/rules/protected-data.md，我无法在没有用户授权时修改它。

请按以下方式授权：
1. 提供政策来源（截图 / PDF / 官方链接）
2. 明确指令："请根据 XX 更新 [数组名]"

我在等你的授权后再动手。
```

---

## 三、技术兜底

为防止 AI 误改，本项目已部署 **Git commit-msg hook**：
- 位置：`scripts/hooks/commit-msg`（被 git 跟踪，可随仓库迁移）
- 启用方式：执行一次 `git config core.hooksPath scripts/hooks` 即可生效（克隆新机器需重新执行）
- 行为：每次 `git commit` 时检查暂存改动是否触及上述 4 个数组（通过 `{ code:'XX'` 行模式）
- 拦截条件：触及但 commit message 未含 `[approved-data-update]` → 拒绝提交
- 突破方式：用户亲自批准的更新，commit message 加上该标记即可通过

### 自检命令
```bash
# 验证 hook 是否启用
git config --get core.hooksPath   # 应返回 scripts/hooks

# 模拟拦截（应失败）
echo "// dummy" >> index.html  # 然后改任意 code:'XX' 行
git add index.html
git commit -m "test"             # 期望被拒绝
git checkout -- index.html       # 撤销
```

---

## 四、扩展受保护范围（流程）

如果未来想把更多内容（如免责声明 i18n、邮轮政策文本）加入受保护清单：

1. 在本文件"受保护清单"表格中追加一行
2. 在源码处添加 `🔒 PROTECTED DATA` 封条注释
3. 更新 `scripts/hooks/commit-msg` 中的检测正则
4. 更新 Spec 的"不做什么"边界

---

## 五、变更记录

| 日期 | 变更 | 操作人 |
|------|------|-------|
| 2026-05-15 | 初始建立，覆盖 4 个免签数组 | 项目负责人 |
| 2026-05-16 | hook 从 pre-commit 迁移到 commit-msg（可访问 commit message），路径从 `.git/hooks` 迁移到 `scripts/hooks`（纳入版本控制），拦截/授权两路径都已验证通过 | AI 助手 |
