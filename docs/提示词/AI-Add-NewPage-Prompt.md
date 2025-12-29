# AI 新增页面指令 (Page Generation Prompt)

此 Prompt 用于指示 AI **使用现有的系统区块**搭建一个新的落地页。

---

### 复制以下内容给 AI：

```markdown
# Role
你是一个专业的 Landing Page 搭建助手，熟悉本项目的配置化页面构建系统。

# Objective
请根据我的需求，帮我新增一个落地页。只需生成 JSON 配置代码和 index.ts 注册代码，无需编写 React 组件。

# Context & File Structure (CRITICAL)
本项目使用 JSON 配置驱动页面生成。为了确保参数正确，你必须参考以下文档：

1.  **核心参考文档 (必读)**: `docs/添加路由/系统默认区块.md`
    *   **重要**: 这是所有系统默认区块的**总索引**。
    *   **使用方法**: 该文档中列出了所有可用区块（如 `hero`, `features` 等），并提供了**指向详细配置文档的链接**（位于 `docs/添加路由/区块配置示例/` 目录下）。
    *   **你必须做的事情**: 在生成 JSON 之前，**必须**顺着这些链接去查看具体区块的详细文档。那里有每一个区块支持的完整 `props` 参数表和标准的 JSON 结构示例。**请严格复用文档中的 JSON 结构，不要臆造参数。**

2.  **配置文件路径规则**:
    `src/config/locale/messages/[locale]/pages/[page_name].json`
    - `[locale]`: 语言代码。默认为 `en` (英语)。如果用户指定中文，则为 `zh`。
    - `[page_name]`: 页面名称，如 `about`, `pricing`。请使用相对路径。

3.  **注册入口路径**:
    `src/config/locale/index.ts` 中的 `localeMessagesPaths` 数组。

# Task Steps
请严格按照以下步骤执行：

## Step 1: 确定语言与相对路径
根据用户的需求确定语言和文件名。
例如：用户需要中文的“关于我们”页。
路径 = `src/config/locale/messages/zh/pages/about.json`

## Step 2: 查阅文档与选择区块
1.  分析用户需求，决定通过哪些区块组合来实现页面（如 `hero` + `features` + `cta`）。
2.  **查找参数**: 对于每一个选定的区块，请去 `docs/添加路由/系统默认区块.md` 找到对应的详细文档链接。
3.  **验证参数**: 阅读详细文档中的 `JSON 示例` 和 `配置参数 (Props)`，每一层嵌套都必须准确。
4.  **如果现有区块无法满足**: 如果发现没有合适的积木来实现用户需求，请阅读 `docs/提示词/AI-新增区块Prompt.md`，它会指导你如何开发一个新的区块组件。

## Step 3: 生成页面配置文件
生成 JSON 文件代码。结构如下：

```json
{
  "metadata": {
    "title": "页面标题",
    "description": "SEO 描述"
  },
  "page": {
    "sections": {
      "区块ID_1": {
        "block": "hero",
        // TODO: 参数必须来自 docs/添加路由/区块配置示例/hero.md
      },
      // ... 更多区块
    }
  }
}
```

## Step 4: 注册页面路由
生成修改 `src/config/locale/index.ts` 的代码。
在 `localeMessagesPaths` 数组中添加新页面的路径引用（不含语言和后缀）。
格式：`"pages/[page_name]"`

# User Request
[在此处填写你的具体需求...]
```
