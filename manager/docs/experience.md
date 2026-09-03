<!-- 定位：项目级经验沉淀，具有跨阶段复用价值的心得/坑位，按主题分类追加 -->

# 项目经验

## 浏览器自动化验证
- 远程浏览器（含 headless / 非激活标签页）下：`requestAnimationFrame` 不执行、`window.scrollTo`/`scrollIntoView` 派发的 scroll 事件不可靠、CSS 过渡时钟冻结（transition 不推进，读到的计算样式停留在旧值）。
- 应对：动画类逻辑优先「挂载时同步计算一次」或直接监听事件同步执行（不做 rAF 节流）；验证 CSS 过渡时临时设 `transition:none` 再取值；写测试脚本时在每次 `scrollTo` 后 `await sleep(30~50ms)` 让滚动事件落地。

## 纯 CSS 瀑布流
- `column-count` + `break-inside:avoid` 即可零依赖实现瀑布流，3 列宽度自动均衡；不同卡片高度（封面渐变 4 档高度轮换）制造错落视差。要保证子元素不因栏目分割断裂。

## 静态站 hash 路由弹窗化
- SPA 详情改为弹窗（`position:fixed` 浮层 + hash 路由）是纯静态托管的最低成本方案：URL 可分享直达、前进后退可用、页面滚动位置与 DOM 状态天然保留，无需路由 state 管理。

## CSS 变量驱动双主题
- 用 `:root` + `[data-theme="x"]` 两套变量即可切换主题；需要被 JS 读取/驱动的颜色（如 canvas 粒子色）存成 CSS 变量（如 `--particle:140,175,255`），JS 取 `getComputedStyle(document.documentElement).getPropertyValue()` 读取。
- 防止刷新闪烁：把「按 localStorage 恢复主题」的内联脚本放进 index.html `<head>`，在 React 加载前先设置 `data-theme`。