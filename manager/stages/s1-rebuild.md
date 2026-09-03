<!-- 定位：项目阶段开发记录，记录该阶段的需求、设计、实现决策和复盘 -->

# 阶段 S1：工程化重构 + CI 自动部署上线

## 目标
把单文件 `index.html` 个人站重构为 Vite+React 工程，构建产物（"老三样" index.html/css/js）交给 GitHub Actions 自动部署到 GitHub Pages。

## 需求（用户）
- 从单文件站改为 html/css/js"老三样"加工程化分组
- 用 React 工程，编译产物作为网页
- 0 成本、省心、push 即发布

## 设计决策
- **构建工具**：Vite 5 + React 18，后从 JS 迁移为 TypeScript（见下方「TS 迁移」）
- **base**：`/`（用户页部署在根路径）
- **部署**：GitHub Actions（ubuntu + setup-node + build + upload-pages-artifact + deploy-pages），仓库名 = `protein-zhang.github.io` → Pages 自动启用，改为 build_type=workflow
- **内容数据**：集中放 `src/content/site.js`（posts/profile/tags），改这一处即可发文章
- **候选排除**：Astro/Hugo（对用户过重）；继续单文件（不满足工程化诉求）

## 实现
- 组件：Hero / About / Posts / Contact / Footer / ParticleBackground；hook：useReveal / useTypewriter
- 本地验证：`npm run build` 产物 = index.html + assets/index.css + assets/index.js（gzip ~50KB）
- CI 部署已验证成功，线上已是新产物

## 遗留/进行中
- 线上"纯黑背景"问题已定位并修复：`useTypewriter` 参数解构缺 `={}` 导致渲染抛错，已改为默认值并重新部署，验证通过。（详情见 docs/troubleshooting.md）

## TS 迁移（jsx→tsx / js→ts，2026-09-03）
- **决策**：将工程从 JS 迁移为 TS。安装 dev 依赖 `typescript + @types/react + @types/react-dom + @types/node`；新增 `tsconfig.json`（strict、moduleResolution=bundler、jsx=react-jsx、allowImportingTsExtensions）；`vite.config.js → vite.config.ts`；`build` 脚本升级为 `tsc --noEmit && vite build`（CI 里同时做类型检查）。
- **迁移清单**：`.jsx→.tsx`（main/App/6 组件）、`content/site.js→site.ts`（导出 `Post`/`Profile` 接口）、`hooks/useReveal.js→useReveal.ts`（泛型 `useReveal<T extends HTMLElement>()`）。
- **踩坑记录**：
  - `.npmrc` 仅含镜像源（npmmirror）无 token，安全可入库；但 `manager/privacy.md` 按 skill 要求 `git rm --cached` + 加入 `.gitignore`，绝不进版本库。
  - 类型报错：`index.html` 仍引用 `/src/main.jsx` 需同步改 `.tsx`；CSS 副作用导入需 `src/vite-env.d.ts`（`/// <reference types="vite/client" />`）；canvas ctx 闭包内可能 null 用 `getContext('2d')!` 收窄。
- **验证**：`npm run build` 通过（39 modules，产物 gzip ~50KB），类型检查零错误。

## 复盘
- 教训：不要用户问"放心了吗"才自查；上线后应主动用浏览器验证渲染，而不是只验 HTTP 200 + 产物哈希。
- 教训：`vite build`/CI 只编译不运行，**运行时错误必须靠浏览器实载验证**才能暴露。
- 教训：更新后 CDN/浏览器缓存会导致短暂"还是旧的/黑屏"，先确认线上 HTML 引用的是新哈希再判定是否真出问题。