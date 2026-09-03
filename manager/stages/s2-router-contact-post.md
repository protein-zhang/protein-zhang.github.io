<!-- 定位：项目阶段开发记录，记录该阶段的需求、设计、实现决策和复盘 -->

# 阶段 S2：文章详情路由 + 真实联系方式 + 技能介绍文章

## 目标
让网站支持"通过不同路由显示不同页面"，点击文章进入独立详情视图（镶嵌在整体网页中、可返回）；填上真实联系方式；新增一篇介绍 project-manager 技能的文章。

## 需求（用户）
- 确认 GitHub Pages 是否支持网页路由（不同 URL 显示不同页面）
- 点击文章 → 跳转对应详情页；详情页镶嵌在整体网页中，是独立控件，可通过返回按钮返回
- 新增联系方式：微信 z1099281623 / QQ 1099281623 / 邮箱 1099281623@qq.com / GitHub=本仓库地址
- 写一篇文章介绍 project-manager 技能（找 skillhub 链接放入并介绍），说明其对抗上下文腐烂的价值

## 设计决策
- **路由方案**：Hash 路由（`#/post/<index>`），不引入 react-router。理由：GitHub Pages 是纯静态托管，SPA history 路由直接刷新会 404（无服务端 rewrite），而 hash 路由不需要服务端配合，刷新/分享/浏览器前进后退都可用。
- **详情视图**：新组件 `PostDetail`，替换 Posts 区块显示（Hero/About/Contact/Footer 保留），带顶部+底部返回按钮，打开时滚动到顶部。符合"镶嵌在整体网页中、独立控件、可返回"。
- **路由 hook**：`src/hooks/useHashRoute.ts` 极简实现（parseHash + hashchange 监听 + navigate）。
- **联系方式**：`Contact.tsx` 改为展示微信/QQ/邮箱(mailto)/GitHub(外链) 四卡片。
- **候选排除**：MPA 多页（每文一 HTML，维护重）；history+404 兜底（GitHub Pages 无自定义 rewrite，方案脆弱）。

## 实现
- 新增：`src/hooks/useHashRoute.ts`、`src/components/PostDetail.tsx`
- 修改：`App.tsx`（路由分发）、`Posts.tsx`（列表项点击进详情，去掉内联展开）、`Contact.tsx`（真实联系方式）、`src/content/site.ts`（新增第 4 篇文章）
- 文章"用 project-manager 技能管理项目：把上下文变成项目资产"已发布，正文含 `{{skillhub链接}}` 占位符
- 本地验证：`npm run build` 通过（41 modules）
- skillhub 链接：搜索验证多个候选 slug（project-context-manager / project-manager / project-management-hub）均非本项目使用的"项目管家 v12"，无法确认真实链接，文章暂用 `{{skillhub链接}}` 占位，待用户提供

## 复盘
- 教训：用户描述的技能在 skillhub 上无法通过关键词精确检索定位（站内搜索为 SPA），不能凭"同名相似"猜测链接放入文章，否则会传播错误信息。未知即占位、待用户确认。
- 经验：纯静态托管（GitHub Pages）下，SPA 多页面用 hash 路由是最低成本方案，history 路由必须要有服务端 rewrite。

## 遗留/待办
- [x] 用户确认 skillhub 链接后替换文章中的 `{{skillhub链接}}` → 已替换为 https://skillhub.cn/skills/user_2731c9a4/project-manager-v6（S3 阶段完成）
