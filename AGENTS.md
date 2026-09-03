<!-- 以下内容由 project-manager 自动生成与维护 -->

## 项目管理

本项目使用 project-manager 规则进行推理型项目管理。任何 AI Agent 处理本项目任务时，须遵循以下规则。

### 启动顺序
1. 读取 `manager/CONTEXT.md`（项目索引，< 80 行）
2. 读取 `manager/agents.md`（项目约定）
3. 不支持 Skill 的工具（Aider/Claude Code 等）：在步骤 1 之前先读 `manager/SKILL.md` 获取完整规则
4. 按 CONTEXT.md 的「导航规则」按需读取其他文件，禁止预加载全部

### 触发项目管理的时机
- 开始新上下文或接手项目
- 需要了解项目当前状态
- 进入新开发阶段（新功能模块、架构变更、版本迭代等里程碑）
- 完成开发后更新项目记录
- 用户要求生成使用手册
- 用户提到"项目管家""更新项目记录""生成手册"

### 完成开发后必做
1. 更新 `manager/CONTEXT.md` 的「当前状态」（通常只改 2-3 行）
2. 在 `manager/stages/` 当前阶段文件追加关键决策和经验
3. 有复用价值的经验同步到 `manager/docs/experience.md`
4. 检查 CONTEXT.md 非阶段摘要区域是否超 80 行

### manager/ 目录
```
manager/
├── SKILL.md          ← 规则全文（不支持 Skill 的工具必读）
├── CONTEXT.md        ← 项目索引（启动必读，< 80 行）
├── agents.md         ← 项目约定（技术环境、编码规范）
├── privacy.md        ← 隐私映射（{{占位符}} → 真实数据，按需读取）
├── stages/           ← 阶段记录（按需读取）
├── docs/             ← 专项文档（按需读取）
└── user-manual/      ← 使用手册（面向所有角色）
```