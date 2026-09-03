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