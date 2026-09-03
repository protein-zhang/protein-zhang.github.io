<!-- 定位：项目架构说明，面向开发者，描述系统架构、模块划分、数据流、技术选型理由 -->

# 架构说明

## 系统架构
```
[开发者] 本地编辑 src/  →  git commit/push(main)
    → GitHub Actions: npm ci → vite build → upload-pages-artifact → deploy-pages
    → GitHub Pages 静态托管 https://protein-zhang.github.io/
```
- **纯前端**，无后端、无数据库、无服务器，静态资源由 Pages 全球 CDN 分发。

## 目录结构
```
src/
├─ main.jsx / App.jsx        # 入口 / 根组件
├─ index.css                 # 全局样式 + CSS 变量主题
├─ content/site.js           # ★文章/简介/打字文案，发内容只改这里
├─ hooks/useReveal.js        # IntersectionObserver 滚动渐显
└─ components/               # Hero About Posts Contact Footer ParticleBackground(canvas粒子)
dist/                        # 构建产物（index.html + assets/*.css + assets/*.js）
.github/workflows/deploy.yml # CI 自动构建部署
manager/                     # 项目管理（project-manager 规则）
```

## 技术选型表
| 技术 | 选型理由 |
|------|----------|
| Vite 5 | 快、标准、产物即"老三样" |
| React 18 | 组件化，用户熟悉 |
| GitHub Actions + Pages | 0 成本、push 即自动发布 |
| npmmirror | 国内拉依赖加速 |