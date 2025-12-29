# Features 基础特性区块配置说明

Features 基础特性区块用于以网格形式展示一组核心功能点。这是最基础、最通用的特性展示方式。

## 配置参数 (Props)

Features 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述文本，通常位于标题下方 |
| `items` | `array` | 特性列表项 |
| &nbsp;&nbsp;`title` | `string` | 特性标题 |
| &nbsp;&nbsp;`description` | `string` | 特性描述 |
| &nbsp;&nbsp;`icon` | `string` | 特性图标 (Lucide icon name) |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features": {
        "block": "features",
        "title": "Why choose us?",
        "description": "Here are some of the reasons why our customers love us.",
        "items": [
          {
            "title": "High Performance",
            "description": "Optimized for speed and efficiency.",
            "icon": "Zap"
          },
          {
            "title": "Secure",
            "description": "Enterprise-grade security by default.",
            "icon": "Shield"
          },
          {
            "title": "Scalable",
            "description": "Grows with your business needs.",
            "icon": "Scaling"
          }
        ],
        "className": "custom-features-class"
      }
    }
  }
}
```
