<!-- 定位：项目阶段开发记录，记录该阶段的需求、设计、实现决策和复盘 -->

# 阶段 S1：工程化重构 + CI 自动部署上线

## 目标
把单文件 `index.html` 个人站重构为 Vite+React 工程，构建产物（"老三样" index.html/css/js）交给 GitHub Actions 自动部署到 GitHub Pages。

## 需求（用户）
- 从单文件站改为 html/css/js"老三样"加工程化分组
- 用 React 工程，编译产物作为网页
- 0 成本、省心、push 即发布

## 设计决策
- **构建工具**：Vite 5 + React 18（JS 非 TS）——用户为 Java 背景但此需求保持简单，node>=18 满足
- **base**：`/`（用户页部署在根路径）
- **部署**：GitHub Actions（ubuntu + setup-node + build + upload-pages-artifact + deploy-pages），仓库名 = `protein-zhang.github.io` → Pages 自动启用，改为 build_type=workflow
- **内容数据**：集中放 `src/content/site.js`（posts/profile/tags），改这一处即可发文章
- **候选排除**：Astro/Hugo（对用户过重）；继续单文件（不满足工程化诉求）

## 实现
- 组件：Hero / About / Posts / Contact / Footer / ParticleBackground；hook：useReveal / useTypewriter
- 本地验证：`npm run build` 产物 = index.html + assets/index.css + assets/index.js（gzip ~50KB）
- CI 部署已验证成功，线上已是新产物

## 遗留/进行中
- 线上出现"纯黑背景无内容"：疑似 JS 运行时错误或资源未加载，浏览器诊断进行中 → 见 docs/troubleshooting.md

## 复盘
- 教训：不要用户问"放心了吗"才自查；上线后应主动用浏览器验证渲染，而不是只验 HTTP 200 + 产物哈希。