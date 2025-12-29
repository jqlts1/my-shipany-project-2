# Showcases 展示区块配置说明

Showcases 区块用于以网格卡片形式展示产品案例、模板或项目。支持分组过滤（Tabs）。

## 配置参数 (Props)

Showcases 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"showcases"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述 |
| `groups` | `array` | 分组标签列表（可选） |
| &nbsp;&nbsp;`name` | `string` | 分组标识符 (如 `all`, `app`, `web`) |
| &nbsp;&nbsp;`title` | `string` | 分组显示名称 |
| `items` | `array` | 展示项目列表 |
| &nbsp;&nbsp;`title` | `string` | 项目标题 |
| &nbsp;&nbsp;`description` | `string` | 项目描述 |
| &nbsp;&nbsp;`image` | `object` | 项目封面图 |
| &nbsp;&nbsp;`group` | `string` | 所属分组标识符 |
| &nbsp;&nbsp;`url` | `string` | 点击跳转链接（如果未配置 button） |
| &nbsp;&nbsp;`button` | `object` | 按钮配置（可选，配置后卡片内会显示按钮） |
| &nbsp;&nbsp;&nbsp;&nbsp;`title` | `string` | 按钮文本 |
| &nbsp;&nbsp;&nbsp;&nbsp;`url` | `string` | 按钮链接 |
| &nbsp;&nbsp;&nbsp;&nbsp;`icon` | `string` | 按钮图标 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "showcases": {
        "block": "showcases",
        "title": "Built with ShipAny",
        "description": "See what others are building.",
        "groups": [
          { "name": "all", "title": "All" },
          { "name": "saas", "title": "SaaS" },
          { "name": "blog", "title": "Blog" }
        ],
        "items": [
          {
            "title": "Project Alpha",
            "description": "A powerful SaaS platform.",
            "image": {
              "src": "/imgs/showcases/project1.png",
              "alt": "Project Alpha"
            },
            "group": "saas",
            "url": "https://example.com/alpha"
          },
          {
            "title": "Tech Blog",
            "description": "Minimalist blog template.",
            "image": {
              "src": "/imgs/showcases/blog1.png",
              "alt": "Tech Blog"
            },
            "group": "blog",
            "button": {
              "title": "View Demo",
              "url": "https://example.com/blog",
              "icon": "ExternalLink"
            }
          }
        ]
      }
    }
  }
}
```
