export interface Post {
  date: string
  title: string
  intro: string
  body: string
}

export interface Profile {
  name: string
  handle: string
  title: string
  tags: string[]
  skills: string[]
  bio: string[]
  meta: string
}

export const posts: Post[] = [
  {
    date: '2026-09-03',
    title: '用 project-manager 技能管理项目：把上下文变成项目资产',
    intro: '跨对话的上下文断裂是每个 AI 协作项目的痛点，而 project-manager 用一套轻量的文件体系把它变成了可复用的资产。',
    body: '<p>做过很多项目之后我发现一个问题：AI Agent 每次新开一个对话，对项目的了解都是零。上一个对话里讨论过的架构决策、踩过的坑、做过的取舍，在新对话里全部丢失，又要重新解释一遍——这就是常说的“上下文腐烂”。</p><p>后来我开始用 project-manager 这个技能来管理项目，它的核心思路很朴素：把项目的“概况”和“历程”沉淀成文件，让任何新对话都能快速加载、按需深入，而不是每次都从零开始。</p><h3>它是怎么做到的</h3><p>project-manager 采用三层渐进式信息架构，启动时只读最轻的两层，详情按需加载：</p><ul><li><b>L0 入口</b>：项目根目录的 AGENTS.md，任何 Agent 启动时第一眼就看到项目规则和导航顺序；</li><li><b>L1 概览</b>：manager/CONTEXT.md 索引文件，用不到 80 行回答“项目是什么、做到哪了、详情在哪”；</li><li><b>L2 详情</b>：manager/stages 记录每个开发阶段的需求、设计决策和复盘，manager/docs 沉淀架构、排查手册等专项文档。</li></ul><p>最有价值的是它强调“记录为什么比记录做了什么更重要”——每个阶段的取舍和踩坑都被留下来，跨对话也能延续上下文。</p><h3>我的实际感受</h3><p>用这个技能管理过多个项目后，最明显的收益是：无论隔多久、换哪个 Agent 接手，只要读一遍 CONTEXT.md 和阶段记录，项目的背景、进度、遗留问题都清清楚楚，几乎不需要重新讲解。它把项目概况和历程介绍得足够清楚，方便不同的 agent 跨对话了解项目背景，非常有效地避免了上下文腐烂。</p><p>当然，这也是在目前的工具链还不完善的情况下的一种辅助手段：通过把上下文“外置”成文件来对抗上下文腐烂。相信随着工具本身的进步，这套机制还会在这个基础上不断迭代完善。</p><p>技能发布在 SkillHub：{{skillhub链接}}</p>'
  },
  {
    date: '2026-03-05',
    title: '用 RSSHub 搭建属于自己的信息窗口',
    intro: '从一条 timeline 说起，为什么我认定它会是未来的信息获取方式。',
    body: '<p>信息爆炸的时代，主动订阅 &gt; 被动刷流。RSSHub 把几乎所有内容源归一化为可订阅的路由，RSS 让我们把这些路由收进一个安静、无广告、无算法的读库。</p><p>本文记录我的订阅方法论：分类、分级、去噪，以及如何用 folocli 在命令行里批量管理订阅。</p>'
  },
  {
    date: '2026-02-18',
    title: '0 成本搭建个人网站：从认识到落地',
    intro: '服务器不是必需品。一份 React 源码 + GitHub Pages，就是一套个人 IP 载体。',
    body: '<p>个人网站的意义在于“自己掌控”。用静态托管 + 前端工程化，我把成本压到接近 0 元，且无需备案、无需运维。</p><p>文章、联系、特效全部组件化实现，push 即自动发布。</p>'
  },
  {
    date: '2026-01-20',
    title: '思源笔记：我的第二大脑工作流',
    intro: '重度用户的使用心得：文档树、块引用、导出与自动化。',
    body: '<p>思源笔记以“块”为单位组织知识，配合图谱与导出能力，非常适合技术人做长期知识管理。</p><p>这篇记录我的目录结构、日记流与标签体系，以及如何与本地工具做联动。</p>'
  }
]

export const profile: Profile = {
  name: '蛋白酱',
  handle: 'DBJ',
  title: 'Java 开发者 · 数据科学 · 大数据',
  tags: ['Java 开发', '数据科学 / 大数据', 'AI · 自动化 · RSSHub', '思源笔记重度用户', '记录 · 分享 · 折腾'],
  skills: ['Java', '苍穹插件', 'SQL', 'Redis', 'Kafka', 'Docker', 'Vue', 'React', 'ECharts', 'AI/自动化', 'RSSHub'],
  bio: [
    '你好，我是 蛋白酱（DBJ），一名 Java 后端开发工程师，关注数据科学与大数据技术。',
    '我信奉“万物皆可订阅”——用 RSS 与 RSSHub 聚合信息流，把零散的资讯收敛成一个安静而高效的读库。我相信未来的信息获取窗口会越来越工具化、自动化。',
    '这里是我的个人名片与文章存档：记录技术、AI 动态、工具与思考。内容即个人 IP，我选择自己掌控它。'
  ],
  meta: '📍 China　·　💼 Java Developer　·　✍️ 记录于思源笔记'
}

export const typePhrases: string[] = [
  'Java Developer · 数据科学 · 大数据',
  '把世界订阅成一席安静的读库',
  '技术 · AI 动态 · 工具 · 思考',
  '以内容建立个人 IP，自己掌控它'
]