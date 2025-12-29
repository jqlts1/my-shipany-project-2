# Features Media 特性媒体区块配置说明

Features Media 区块侧重于单张大图展示，配合侧边的特性列表。与 Features List 不同，它更强调“媒体+子功能点”的组合。

## 配置参数 (Props)

Features Media 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features-media"` |
| `title` | `string` | 主标题 |
| `description` | `string` | 描述文本 |
| `image` | `object` | 主媒体图片 |
| &nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| `image_position` | `string` | 图片位置：`'left'` 或 `'right'` (默认 left) |
| `items` | `array` | 子特性列表 (显示在文字区域下方) |
| &nbsp;&nbsp;`title` | `string` | 子标题 |
| &nbsp;&nbsp;`description` | `string` | 子描述 |
| &nbsp;&nbsp;`icon` | `string` | 图标 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features-media": {
        "block": "features-media",
        "title": "Advanced Media Handling",
        "description": "Powerful media processing capabilities.",
        "image": {
          "src": "/imgs/features/media-editor.png",
          "alt": "Editor Interface"
        },
        "image_position": "left",
        "items": [
          {
            "title": "Smart Crop",
            "description": "Auto-detect subjects.",
            "icon": "Crop"
          },
          {
            "title": "Filters",
            "description": "Apply professional filters.",
            "icon": "Palette"
          }
        ]
      }
    }
  }
}
```
