# AI 新增区块指令 (Block Creation Prompt)

此 Prompt 用于指示 AI **开发一个新的自定义区块组件**（React）。

---

### 复制以下内容给 AI：

```markdown
# Role
你是一个资深的前端工程师，负责为本项目的 Design System 开发新的区块组件（Block）。

# Objective
请根据我的需求，开发一个新的 React 区块组件。

# Context & Key Rules (CRITICAL)

1.  **极简架构 (Simple Configuration)**:
    *   本项目的区块架构非常简单，不要过度设计。
    *   **核心签名**: 组件一律使用 `export function BlockName({ section }: { section: Section })`。
    *   **数据来源**: 所有配置数据（标题、图片、列表等）都通过 `section` props 传入。不要自己请求 API，不要引入复杂的 Context。
    *   **类型定义**: 引用 `import { Section } from '@/shared/types/blocks/landing';`。

2.  **视觉风格一致性 (Style Consistency)**:
    *   **必须执行**: 在写代码之前，请先阅读当前主题目录 (`src/themes/<当前主题>/blocks/`) 下现有的区块代码（推荐阅读 `hero.tsx` 或 `features.tsx`）。
    *   **提取规范**: 观察并复用现有的 Tailwind CSS 类名规范，包括：
        *   **间距**: `section` 的 padding（通常是 `py-12` 或 `py-20`），容器的 `container mx-auto`。
        *   **颜色**: 文本颜色（`text-foreground`, `text-muted-foreground`），背景色（`bg-background`, `bg-muted`）。
        *   **排版**: 标题大小（`text-3xl`, `font-bold`），正文大小。
        *   **圆角**: 图片或卡片的圆角（`rounded-lg`, `rounded-xl`）。
    *   **禁止**: 禁止随意发明颜色或尺寸，必须复用现有系统的视觉语言。

3.  **文件路径与主题识别 (Critical)**:
    *   **动态定位主题**: 不要只盯着 `default`！你必须先检查项目根目录下的 `.env.development` 或 `.env` 文件，查找 `NEXT_PUBLIC_THEME` 变量。
    *   **路径规则**: 如果 `NEXT_PUBLIC_THEME=ocean`，则组件文件必须创建在 `src/themes/ocean/blocks/<kebab-case-name>.tsx`。
    *   只有在找不到环境变量时，才回退到 `src/themes/default/blocks/`。
    *   **严禁**将新文件分散在错误的主题目录下，这会导致组件无法加载。

4.  **防御性 Prop 提取 (Defensive Prop Extraction) - CRITICAL BUG FIX**:
    *   **背景**: 本项目的路由引擎 (`dynamic-page.tsx`) 在渲染区块时，由于 JSON 数据包组织格式的不同，有时会将数据结构展平通过 props 传递给区块 (`{...data}`)，有时则会放在 `section` 对象中传递。
    *   **强制规定**: 组件的 Props 签名必须同时接受顶层属性和 `section` 对象。在提取数据时，**必须双重求值**，以防出现空壳 UI。
    *   **正确范例**: `const title = props.title || props.section?.title;`
    *   **错误范例**: 直接认定数据必然存在于 `props.title` 或必然存在于 `props.section.title`。

# Task Steps

## Step 1: 视觉风格分析
请先确认当前主题（通过读取 .env），然后读取 `src/themes/<当前主题>/blocks/hero.tsx` (或其他现有区块)，分析并总结出当前的 **UI Design Tokens**（如：标题用什么类？副标题用什么颜色？卡片阴影是怎样的？）。

## Step 2: 编写组件代码
编写 `.tsx` 文件。确保：
1.  文件名使用 kebab-case (e.g., `my-new-block.tsx`).
2.  导出组件名为 PascalCase (e.g., `MyNewBlock`).
3.  使用 Tailwind CSS 实现布局，并应用 Step 1 总结的视觉规范。
4.  从 `section` 对象中从容错地读取属性 (e.g., `section.title`, `section.items`).

## Step 3: 提供 JSON 配置示例
为了方便我测试这个新区块，请同时提供一段 JSON 配置代码，展示如何在 `page.sections` 中使用这个新区块。

```json
"my_new_block": {
  "block": "my-new-block",
  "title": "...",
  // ...其他你在组件里用到的字段
}
```

# User Request
[在此处填写你的具体需求，例如：开发一个带有 3D 轮播图的案例展示区块，风格要现代...]
```
