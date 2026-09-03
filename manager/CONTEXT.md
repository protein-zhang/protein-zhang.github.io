<!-- 定位：项目上下文索引，L1 启动时加载的唯一索引文件，回答"是什么、做到哪、详情在哪" -->

# 蛋白酱 · DBJ 个人网站 - 上下文索引

## 项目身份
- **目标**：0 成本、纯前端的个人名片/博客站，托管于 GitHub Pages
- **技术栈**：Vite 5 + React 18 + TypeScript（GitHub Actions 自动构建部署）
- **创建时间**：2026-09-03

## 当前状态
- **阶段**：S1-工程化重构+上线（已完成）
- **进度**：100%
- **正在做**：无（站点已正常上线）
- **阻塞项**：无

## 已完成阶段摘要
| 阶段 | 做了什么 | 详情 |
|------|----------|------|
| S1   | 单文件站 → Vite+React 工程化，接入 CI 自动部署并上线 | → stages/s1-rebuild.md |

## 导航规则
- 修改页面/样式/文章 → 读 src/content/site.js 与 src/components/
- 排查线上渲染/部署问题 → 读 docs/troubleshooting.md
- 了解整体架构/构建产物 → 读 docs/architecture.md
- 需要本地开发/部署操作 → 读 user-manual/development.md + setup.md
- 遇到 `{{占位符}}` 或需写入敏感信息 → 读 privacy.md

## 遗留问题
- 自定义域名/CDN 国内加速为可选项（未做）
- 浏览器/CDN 缓存可能导致更新后短暂白屏，需硬刷新（详见 docs/troubleshooting.md）