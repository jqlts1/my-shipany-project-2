# Features List 特性列表区块配置说明

Features List 区块结合了左侧大图展示和右侧详细特性列表，适用于展示产品的核心概览和具体优势。

## 配置参数 (Props)

Features List 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features-list"` |
| `title` | `string` | 主标题 |
| `description` | `string` | 描述文本 |
| `image` | `object` | 左侧展示大图 |
| &nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| `buttons` | `array` | 操作按钮组 |
| &nbsp;&nbsp;`title` | `string` | 按钮文本 |
| &nbsp;&nbsp;`url` | `string` | 链接地址 |
| &nbsp;&nbsp;`icon` | `string` | 图标名称 |
| `items` | `array` | 底部特性网格列表 |
| &nbsp;&nbsp;`title` | `string` | 特性标题 |
| &nbsp;&nbsp;`description` | `string` | 特性描述 |
| &nbsp;&nbsp;`icon` | `string` | 特性图标 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features-list": {
        "block": "features-list",
        "title": "Complete Design System",
        "description": "Everything you need to build great apps. A complete design system for your next project.",
        "image": {
          "src": "/imgs/features/dashboard-preview.png",
          "alt": "Dashboard"
        },
        "buttons": [
          {
            "title": "Get Started",
            "url": "/login",
            "variant": "default"
          }
        ],
        "items": [
          {
            "title": "Responsive",
            "description": "Works on all devices",
            "icon": "Smartphone"
          },
          {
            "title": "Accessible",
            "description": "Follows WAI-ARIA standards",
            "icon": "Accessibility"
          }
        ]
      }
    }
  }
}
```
