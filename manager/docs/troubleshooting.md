<!-- 定位：问题排查手册，面向开发者，记录常见问题、错误现象、原因分析、解决方案 -->

# 问题排查

## 常见问题表

| 问题 | 原因 | 解决 |
|------|------|------|
| 线上黑屏/整页无内容 | React 渲染时抛错未捕获，组件树为空；或浏览器/CDN 缓存了旧 bundle | 见下方第 1 条、第 2 条 |
| 更新后仍看到旧页面 | Pages CDN 边缘缓存 + 浏览器缓存 | 硬刷新 / 加 `?cachebust=时间戳` 参数访问 |

## 1. 线上黑屏（首次出现的根因）
- **现象**：`#root` 为空（`childElementCount=0`），页面纯黑背景，无可见文字。
- **根因**：`src/components/Hero.jsx` 的 `useTypewriter(phrases, { typing=72, deleting=42, hold=1500 })` 第二参数解构**未给对象默认值 `={}`**；实际调用 `useTypewriter(typePhrases)` 只传一个参数，解构 `undefined` 抛出 `Cannot read properties of undefined (reading 'typing')`，React 整树不渲染。
- **为什么 `vite build`/CI 没发现**：构建只做编译与打包，**不执行 JS**，运行时错误无法被构建捕获。
- **解决**：参数默认值改为 `...} = {}`。**核心经验：上线后必须用浏览器实际加载验证渲染**，不能只看 HTTP 200 与产物哈希。

## 2. 更新后白屏/旧内容
- **现象**：代码已推送、Actions 已部署成功，但仍看到旧页面或黑屏。
- **根因**：浏览器缓存旧 bundle（Vite 产物文件名变化了，但 HTML 若被缓存则仍引用旧 js）。
- **解决**：
  - 硬刷新（Ctrl+F5）或访问 `https://protein-zhang.github.io/?cachebust=任意数字`
  - 已确认线上 HTML 引用新哈希（`/assets/index-<hash>.js`）即部署已生效，问题仅在本地缓存。