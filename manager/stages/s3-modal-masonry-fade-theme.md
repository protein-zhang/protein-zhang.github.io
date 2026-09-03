<!-- 定位：项目阶段开发记录，记录该阶段的需求、设计、实现决策和复盘 -->

# 阶段 S3：弹窗文章详情 + 瀑布流列表 + 滚动渐入渐出 + 主题切换

## 目标

四项交互/视觉优化：① 点击文章改为弹窗展示详情（页面不跳转、不回到顶部）；② 压缩主界面空白 + 文章列表改瀑布流；③ 四大区块（Hero/关于/文章/联系）滚动渐入渐出；④ 新增「淡雅黄昏」配色并提供切换按钮。

## 需求（用户）

见目标。

## 设计决策

- **详情弹窗化**：`PostDetail` 从「替换 Posts 区块的内嵌视图」改为 `position:fixed` 模态浮层（z-index:50），打开/关闭不改变页面滚动位置；保留 hash 路由 `#/post/<index>` 可分享/直达/前进后退。打开时 `body.overflow:hidden` 锁定背景滚动，支持 Esc/点击遮罩/关闭按钮/返回按钮关闭；移动端全屏化（border-radius 归 0）。

- **瀑布流**：纯 CSS `column-count` 方案（3→2→1 列响应式），零依赖；卡片 `break-inside:avoid` + 渐变封面头（4 种高度轮换）制造错落感。参考 Ant Design Masonry 的视觉形态，但不引入组件库（项目约定不引多余 UI 框架）。

- **空白压缩**：`.wrap` 840→1000px、`--section-pad` 70px→46px、Hero `88vh→72vh`。修复了 Hero 因 `display:flex` 导致 `.wrap` 不拉伸、与其它区块宽度不一致的历史遗留问题（`header.hero .wrap{width:100%}`）。

- **渐入渐出**：新 hook `useSectionFade`，scroll/resize 同步计算透明度（顶缘越过视口顶部渐隐、底缘进入视口渐显、中心偏离产生轻微漂移）。曾先实现 rAF 节流版，但在无渲染帧环境（headless/非激活 tab）rAF 不执行导致不更新，改为同步直写（仅 4 个区块，开销可忽略）。

- **主题系统**：CSS 变量双主题（`:root` 深色 / `[data-theme="dusk"]` 黄昏），`useTheme` hook 管理 `documentElement.dataset.theme` + localStorage 持久化；index.html 内联脚本防刷新闪烁；粒子背景颜色改由 `--particle` 变量驱动跟随主题；替换了硬编码色（头像渐变、技能标签、主按钮文字色）。

  - 黄昏色系：bg `#241a26`、accent `#f0a35e`（暖橙）、accent2 `#e18fae`（粉紫），保留 Apple 圆角/毛玻璃风格。

- **候选排除**：Masonry 组件库（引入体积/依赖 vs 纯 CSS 已满足）、路由级切换区块（与"页面常驻"需求冲突）。

## 实现

- 新增：`src/hooks/useTheme.ts`、`src/hooks/useSectionFade.ts`、`src/components/ThemeToggle.tsx`

- 重写：`src/components/Posts.tsx`（瀑布流）、`src/components/PostDetail.tsx`（模态）

- 修改：`src/App.tsx`（页面常驻 + 弹窗叠加）、`src/index.css`（主题变量/间距）、`Hero/About/Contact`（渐入渐出 + 主题化）、`ParticleBackground.tsx`（跟随主题）、`index.html`（防闪烁脚本）

- 删除：`src/hooks/useReveal.ts`（被 useSectionFade 取代）

- 验证：`npm run build` 通过（43 modules）；本地 dev 浏览器实测——主题切换/持久化/刷新、弹窗开关（背景保留、滚动位置保持、body 锁定）、瀑布流 3 列、Hero 宽度对齐

## 复盘

- headless/非激活 tab 下 `requestAnimationFrame` 与 `element.scrollIntoView`、`window.scrollTo` 派发的事件都不可靠，验证动画逻辑依赖渲染帧时，优先用「挂载时同步计算」或降级为同步事件监听，避免线上行为与验证结论不一致。

- 渐变淡出的 `topFade/bottomFade` 交乘公式会同时受上下边界影响，长区块在视口中部保持不透明，短区块会在滚动中先淡底再淡顶（连续淡出不含硬台阶）。

- 弹窗化保留 hash 路由后，「点击卡片 → 弹窗」与「分享 URL 直达 → 弹窗」共用同一渲染路径，无分支逻辑。

## 遗留/待办
- [ ] 用户确认首批预设值（见对话交付清单，如封面渐变高度/黄昏色值/按钮位置）
- [ ] 知犀思维导图 skill（zhixi-manager-skill）链接用途待确认（已登记 privacy.md）
- [x] （延续 S2）skillhub 链接占位符已替换为 project-manager-v6 真实链接
- [x] 渐入渐出位移动画已按用户反馈移除（改为纯透明度淡出被覆盖）

