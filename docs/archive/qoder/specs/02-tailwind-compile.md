# 功能 Spec：Tailwind CSS 编译化

> 将 Tailwind Play CDN（运行时 JIT）替换为本地编译产出的静态 CSS 文件，
> 消除用户每次访问时 ~300KB 脚本下载 + 实时编译的开销。

---

## 🎯 AI 速览（每次开会话先读这块）

| 字段 | 值 |
|------|----|
| 功能编号 | F02 |
| 功能名 | Tailwind CSS 编译化（Play CDN → Static CSS） |
| 优先级 | P1（性能优化） |
| 涉及文件 | `index.html`、新增 `tailwind.config.js`、`src/input.css`、`style.css`、`package.json`、`.gitignore` |
| 一句话 | 把"用户每次打开网页时现场编译 CSS"改成"我们提前编译好一个 CSS 文件直接给用户" |
| 不做什么 | 不改页面功能、不改 HTML 结构、不改自定义 CSS 逻辑、不加 PostCSS/Autoprefixer |
| 预计工作量 | 4 个 Step，约 30 分钟 |
| 部署影响 | 无——style.css 提交仓库，Cloudflare Pages 照旧无构建步骤直出 |

---

## 一、用户故事

作为一名访问 LAOWAITOWN 的外国游客，
我希望网页能更快地显示出来，
而不需要等几秒钟下载和编译 CSS。

---

## 二、验收标准（AI 必须全部满足）

| # | 场景 | 期望结果 |
|---|------|----------|
| AC1 | 打开页面 | 所有样式与改动前视觉一致（无偏差） |
| AC2 | DevTools Network | 不再请求 `cdn.tailwindcss.com` 任何资源 |
| AC3 | 首屏速度 | 少加载 ~300KB 脚本，首次内容绘制（FCP）提前 2-3 秒 |
| AC4 | style.css 体积 | 编译产出文件 < 50KB（minified） |
| AC5 | 自定义 CSS | index.html 内 `<style>` 块中的自定义样式保持不变、正常生效 |
| AC6 | 日常开发 | 修改 class 后执行 `npx tailwindcss -i src/input.css -o style.css --minify` 即可更新 |
| AC7 | 部署 | Cloudflare Pages 无需新增构建命令，style.css 已在仓库中 |

---

## 三、技术方案

### 3.1 当前状态

```html
<!-- index.html 第 198、202 行 -->
<link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
<script src="https://cdn.tailwindcss.com"></script>
```

用户每次打开页面：
1. 下载 ~300KB 的 Tailwind JIT 运行时脚本
2. 脚本扫描整个页面所有 class 属性
3. 现场生成 CSS 注入 `<style>` 标签

### 3.2 目标状态

```html
<!-- 替换为 -->
<link rel="stylesheet" href="style.css">
```

构建时一次性编译，用户直接拿到 CSS 文件。

### 3.3 新增文件清单

| 文件 | 作用 |
|------|------|
| `package.json` | 记录 devDependency: tailwindcss |
| `tailwind.config.js` | 告诉编译器扫描哪些文件的 class |
| `src/input.css` | Tailwind 指令入口（@tailwind base/components/utilities） |
| `style.css` | 编译产出，提交到仓库 |

### 3.4 .gitignore 补充

```
node_modules/
```

### 3.5 编译命令

```bash
# 一次性编译（提交前执行）
npx tailwindcss -i src/input.css -o style.css --minify

# 开发时实时监听（可选）
npx tailwindcss -i src/input.css -o style.css --watch
```

### 3.6 tailwind.config.js 内容

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3.7 src/input.css 内容

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.8 index.html 改动点

| 操作 | 行号 | 内容 |
|------|------|------|
| 删除 | 198 | `<link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>` |
| 删除 | 202 | `<script src="https://cdn.tailwindcss.com"></script>` |
| 新增 | 原 202 位置 | `<link rel="stylesheet" href="style.css">` |

注意：index.html 内 `<style>` 块的自定义 CSS（:root 变量、.glass、.date-input-pill 等）全部保留不动。

---

## 四、不做什么（划清边界）

- ❌ 不引入 PostCSS / Autoprefixer（当前浏览器兼容性足够）
- ❌ 不改变 Cloudflare Pages 部署方式（不加 build command）
- ❌ 不抽取 index.html 的 `<style>` 到外部文件（那是多页面阶段做的事）
- ❌ 不做 CSS purge 以外的压缩（Tailwind 自带 tree-shaking 已够用）
- ❌ 不改任何页面功能或 HTML 结构

---

## 五、实施步骤（每步独立 commit）

| Step | 工作内容 | 验证方法 | Commit Message | 状态 |
|------|---------|---------|----------------|------|
| 1 | `npm init -y` + `npm install -D tailwindcss`，创建 `tailwind.config.js` 和 `src/input.css`，`.gitignore` 加 `node_modules/` | `npx tailwindcss --help` 正常输出 | `build(F02): init tailwindcss toolchain` | ✅ |
| 2 | 执行 `npx tailwindcss -i src/input.css -o style.css --minify` 生成 CSS | 检查 `style.css` 存在且 < 50KB | `build(F02): compile initial style.css` | ✅ |
| 3 | 修改 `index.html`：删除 CDN script + preconnect，加 `<link rel="stylesheet" href="style.css">` | 浏览器打开页面样式正常，Network 无 tailwindcss 请求 | `perf(F02): replace Tailwind CDN with compiled CSS` | ✅ |
| 4 | 最终验证：逐项检查 AC1-AC7，确认无回退 | 全部通过 | `chore(F02): verify tailwind compile migration` | ✅ |

---

## 六、回滚预案

- 每个 Step 完成立即 `git commit`
- 出问题时：
  - 撤销未提交修改：`git checkout -- .`
  - 回到上一步：`git reset --hard HEAD~1`
  - 最坏情况恢复 CDN：把删掉的两行加回 index.html 即可

---

## 七、日常开发须知

改动了 HTML 中的 Tailwind class 之后：

```bash
npx tailwindcss -i src/input.css -o style.css --minify
```

跑完后 `style.css` 会自动更新，刷新浏览器即可看到效果。
如果嫌每次手动跑麻烦，可以开一个终端后台运行 `--watch` 模式。

---

**最后更新**：2026-05-17
**状态**：✅ 已完成
