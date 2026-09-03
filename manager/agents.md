<!-- 定位：项目约定，记录技术环境、编码规范、开发流程等对所有任务通用的项目级约定 -->

# 个人网站 项目约定

## 技术环境
- **语言/版本**：JavaScript（ESM）+ React 18.3
- **构建工具**：Vite 5（本地构建到 dist/）
- **部署**：GitHub Pages + GitHub Actions（main 分支 push 即自动构建部署）
- **运行时**：Node >= 18（本机 D:\DBJ\node-js，v22.x）

## 编码规范
- **结构**：组件放 src/components/，数据放 src/content/site.js，通用 hook 放 src/hooks/
- **样式**：CSS 采用组件内 <style> 与小量全局 index.css（CSS 变量驱动主题）
- **主题**：深色极简、Apple 圆角、留白；主色 #7aa2ff / #a8e6cf

## 开发流程
- **分支策略**：main 即发布分支，直接 push 触发 CI
- **提交规范**：无强制前缀，但需语义清晰
- **发布**：本地 git commit + push → Actions 自动 npm ci + build + deploy

## 工具偏好
- **优先使用**：Vite 官方插件体系，不引入多余 UI 框架
- **依赖源**：registry 走 npmmirror 镜像（.npmrc）

## 领域知识
- "老三样"：指构建产物 index.html + css + js
- 用户页 URL：https://protein-zhang.github.io/（仓库名即账号.github.io）