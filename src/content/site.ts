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
    date: '2026-09-02',
    title: 'agent-card：用 Markdown 一处定义你的 Agent 设定，编译分发到多个 harness',
    intro: 'Agent 设定散落在各个工具的配置里，改一处要同步 N 处。agent-card 用"卡片 → 设定集 → 条目/知识"两级索引，把设定变成可复用、可分发的资产。',
    body: '<p>AI Agent 用得越多，越会碰到一个实际问题：我在不同工具（TRAE、Claude、Codex、DSH……）里的"身份设定"——交互风格、文件安全原则、任务治理方式、上下文纪律——其实是同一套东西，却要在每个地方各写一份，改一处就要同步 N 处。</p><p>agent-card 是我为解决这个问题做的工具：以 <b>Markdown 为单一事实源</b>，一处定义 Agent 设定，编译后分发给多个 harness。</p><h3>它怎么组织</h3><p>采用"卡片 → 设定集 → 设定条目 + 知识集"两级索引链，而不是简单的一堆配置文件平铺：</p><ul><li><b>名片（cards/）</b>：一个可分发复用的 Agent 定义，只写 ID、中英文名、描述、使用引导，以及它引用的唯一设定集，不直接写设定和知识；</li><li><b>设定集（sets/）</b>：唯一索引层，一个 YAML 文件索引它需要的设定条目 id 与知识集 id，变体选择（比如"环境信息处理"用 YAML 还是 Nacos）发生在这层；</li><li><b>设定条目库（settings/）</b>：按 <code>层级/类别/方案</code> 三级目录组织，层级分 L1 项目健康 / L2 思考方向 / L3 文本结构 / L4 可选；同类别的不同处理方式是同一目录下的不同文件，不会平铺爆炸；</li><li><b>知识集（knowledge/）</b>：按领域陈列知识，公有条目用链接或仓库文件，私有条目只存指针，真值绝不进 git。</li></ul><p>编译器沿这条索引链把名片装配成 4 种产物：<b>AGENTS.md</b>（放到项目根目录被多数 harness 自动读取）、<b>SKILL.md</b>（单文件 skill 形态）、<b>agent-card.json</b>（A2A 风格机器可读名片）、<b>prompt.txt</b>（扁平系统提示词）。</p><h3>关键设计取舍</h3><ul><li><b>编译产物是适配器，不是源</b>：改设定永远只改 Markdown，产物每次编译重新生成；</li><li><b>私有知识只提交指针</b>：编译默认跳过私有注入，显式 <code>--resolve-private</code> 且本地文件存在时才注入，产物头部带 WARNING 标记；</li><li><b>dist/ 永不进 git</b>：本地产物可能含私有内容，分享前先确认；</li><li><b>两种消费模式</b>：本地克隆放 AGENTS.md 是最稳的方式；harness 具备取远程文件工具时（如 TRAE 的 Gitee 插件 <code>get_file_content</code>），可以按产物内索引从云端按需读取，免克隆、始终最新；远期预留 A2A 协议化发现取用。</li></ul><h3>怎么演化过来的</h3><p>S1 先落成三资源层雏形，发现卡片平铺引用设定数组会"平铺爆炸"；S2 重构出"卡片 → 设定集 →（条目 + 知识）"两级索引，设定条目库改为三级目录，变体只加方案文件、新语义才新增类别；S3 把我自己在 TRAE 里的用户级设定（交互友好、不确定性管理、情绪中立、文件系统安全、复杂任务执行、上下文纪律、版本管理）整理入库，收敛成单卡 <code>trae-agent</code> 作为示例样板。</p><p>整个过程最有价值的方法论是：<b>先求证协议与同类项目再定 schema</b>——A2A AgentCard 字段对齐、AGENTS.md 标准、Anthropic Skills 约定、DSH 插件实践都成了设计参考，避免自造轮子。</p>'
  },
  {
    date: '2026-08-13',
    title: 'AI Work：从零自研一个 Java Agent Harness 学习框架',
    intro: '不引 Spring AI，模型网关、Function Calling、MCP 客户端、向量记忆全部用 WebClient 手写。一次把"让模型真正干活"的每条链路都走通的学习旅程。',
    body: '<p>AI Work 是我个人自用的 Agent Harness（智能体执行框架）学习项目，目标就一句话——"能 work 的对话框"：让模型不只是聊天，而是真的调用工具、执行计划、完成复杂任务。</p><p>它不是一个聊天软件，核心价值在整套<b>自研</b>的执行框架：模型网关、工具调度、MCP 热插拔、Plan-Execute 编排、向量记忆、Docker 沙箱，全部从零实现。</p><h3>为什么全自研，不引 Spring AI</h3><p>立项时确实选过 Spring AI，但 S4 开发时发现它当时与 Spring Boot 3.3.7 存在类缺失问题（如 <code>ChatCompletionObservationConvention</code>），于是果断放弃，改用 <b>WebClient 直连 OpenAI 兼容 API</b>，模型调用、Function Calling、SSE 流式解析全部手工实现。后来用代码级核验确认：pom.xml 里没有任何 spring-ai 依赖，AI 能力全部自研。</p><p>这个决定反而让我把每条链路都吃透了——模型网关怎么写、tool_calls 增量怎么累积、SSE 怎么解析、工具怎么注册调度，不再是被框架封装的黑盒。</p><h3>技术栈与能力</h3><ul><li><b>后端</b>：Spring Boot 3（WebClient 自研网关）+ MyBatis-Plus + Flyway；</li><li><b>前端</b>：React 19 + TypeScript + Vite，SSE 流式渲染 Markdown/代码高亮/HTML 沙箱预览；</li><li><b>存储</b>：MySQL（业务数据）+ Redis（会话/限流）+ Qdrant（向量记忆）；</li><li><b>工具调用</b>：current_time / calculator / web_search / write_file / shell_exec 等 6 个内置工具 + <b>MCP Server 热插拔</b>（自研 stdio JSON-RPC 客户端）；</li><li><b>Plan-Execute 编排</b>：模型动态生成任务清单，逐条执行直到完成，前端任务面板实时展示；</li><li><b>向量记忆</b>：会话内容向量化存 Qdrant，可选勾选"加入记忆"，跨会话语义检索注入；</li><li><b>沙箱隔离</b>：shell 命令在 Docker 容器内执行，本机文件零暴露，支持文件上传/下载。</li></ul><h3>一次对话的完整链路</h3><p>用户发消息 → 加载会话配置（模型/工具/记忆锁定状态）→ 若锁定记忆则检索 Qdrant top5 注入 system prompt → Agent Harness 组装 Prompt → 模型网关调用（SSE 流式）→ 模型或直接回复、或调用 memory_search / MCP 工具并回灌结果 → 持久化消息与 token 统计 → 本轮内容异步向量化入库。</p><h3>为什么停更了，以及我的判断</h3><p>项目推进到 S11 后，我的重心转向了 <b>DeepSeek Harness（DSH）</b>——完全开源、社区化、可参与开发的 agent harness。DSH 把模型、工具、沙箱、会话存储、UI、甚至 Agent 循环本身都做成了插件，这种成熟度远超个人项目单打独斗。</p><p>结论很清晰：个人自用 harness 的维护意义让位于插件化生态，AI Work 转入低投入维护模式，我后续的沉淀打算转向 <b>DSH 插件开发</b>。这段旅程留下的最大财富，是那 9 篇按主题整理的踩坑经验（模型网关与上下文管理、SSE 流式与消息重复、工具调用与沙箱安全、Java 异步与 Reactor……），以及"让模型真正干活"这件事的整体认知。</p>'
  },
  {
    date: '2026-09-03',
    title: '用 project-manager 技能管理项目：把上下文变成项目资产',
    intro: '跨对话的上下文断裂是每个 AI 协作项目的痛点，而 project-manager 用一套轻量的文件体系把它变成了可复用的资产。',
    body: '<p>做过很多项目之后我发现一个问题：AI Agent 每次新开一个对话，对项目的了解都是零。上一个对话里讨论过的架构决策、踩过的坑、做过的取舍，在新对话里全部丢失，又要重新解释一遍——这就是常说的“上下文腐烂”。</p><p>后来我开始用 project-manager 这个技能来管理项目，它的核心思路很朴素：把项目的“概况”和“历程”沉淀成文件，让任何新对话都能快速加载、按需深入，而不是每次都从零开始。</p><h3>它是怎么做到的</h3><p>project-manager 采用三层渐进式信息架构，启动时只读最轻的两层，详情按需加载：</p><ul><li><b>L0 入口</b>：项目根目录的 AGENTS.md，任何 Agent 启动时第一眼就看到项目规则和导航顺序；</li><li><b>L1 概览</b>：manager/CONTEXT.md 索引文件，用不到 80 行回答“项目是什么、做到哪了、详情在哪”；</li><li><b>L2 详情</b>：manager/stages 记录每个开发阶段的需求、设计决策和复盘，manager/docs 沉淀架构、排查手册等专项文档。</li></ul><p>最有价值的是它强调“记录为什么比记录做了什么更重要”——每个阶段的取舍和踩坑都被留下来，跨对话也能延续上下文。</p><h3>我的实际感受</h3><p>用这个技能管理过多个项目后，最明显的收益是：无论隔多久、换哪个 Agent 接手，只要读一遍 CONTEXT.md 和阶段记录，项目的背景、进度、遗留问题都清清楚楚，几乎不需要重新讲解。它把项目概况和历程介绍得足够清楚，方便不同的 agent 跨对话了解项目背景，非常有效地避免了上下文腐烂。</p><p>当然，这也是在目前的工具链还不完善的情况下的一种辅助手段：通过把上下文“外置”成文件来对抗上下文腐烂。相信随着工具本身的进步，这套机制还会在这个基础上不断迭代完善。</p><p>技能发布在 SkillHub：<a href="https://skillhub.cn/skills/user_2731c9a4/project-manager-v6" target="_blank" rel="noreferrer">project-manager-v6</a></p>'
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
  title: 'Java 开发者 · AI Agent 工程化',
  tags: ['Java 后端', 'AI Agent · Agent Harness', 'DSH 插件开发', 'RSS / RSSHub 自动化', '思源笔记 · 知识管理'],
  skills: ['Java', 'Spring Boot', '苍穹插件', 'SQL', 'Redis', 'Kafka', 'Docker', 'Vue', 'React', 'ECharts', 'Agent Harness', 'MCP', 'Qdrant 向量库', 'RSS / RSSHub'],
  bio: [
    '你好，我是 蛋白酱（DBJ），一名 Java 后端开发工程师。当前技术重心在 AI Agent 工程化：从自研 Java Agent Harness，到关注 DeepSeek Harness（DSH）这类把模型、工具、Agent 循环全部插件化的开源框架。',
    '两个自用项目记录了我的探索：agent-card 以 Markdown 为单一事实源，把我的 Agent 设定一处定义、编译分发给多个 harness；AI Work 则是我用 Java + Spring Boot 3 自研的 Agent Harness 学习框架，覆盖 Function Calling、MCP 热插拔、Plan-Execute 编排、向量记忆与 Docker 沙箱。DSH 出现后，个人 harness 的维护意义让位于插件化生态，后续的沉淀打算转向 DSH 插件开发。两个项目的完整介绍见文章：<a href="#/post/0" style="color:var(--accent)">agent-card</a> 与 <a href="#/post/1" style="color:var(--accent)">AI Work</a>。',
    '信息获取上我信奉“万物皆可订阅”——用 RSS 与 RSSHub 聚合信息流，把零散的资讯收敛成一个安静而高效的读库。这里是我的个人名片与文章存档：记录技术、AI 动态、工具与思考。内容即个人 IP，我选择自己掌控它。'
  ],
  meta: '📍 China　·　💼 Java Developer　·　✍️ 记录于思源笔记'
}

export const typePhrases: string[] = [
  'Java Developer · AI Agent 工程化',
  '自研 Agent Harness → DSH 插件开发',
  '把世界订阅成一席安静的读库',
  '以内容建立个人 IP，自己掌控它'
]