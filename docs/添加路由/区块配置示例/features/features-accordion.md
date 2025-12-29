# Features Accordion 特性折叠区块配置说明

Features Accordion 区块使用手风琴（折叠面板）交互方式，左侧列出特性标题和描述，右侧动态展示对应特性的图片预览。

## 配置参数 (Props)

Features Accordion 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features-accordion"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 描述文本 |
| `items` | `array` | 特性列表项 |
| &nbsp;&nbsp;`title` | `string` | 特性标题 (折叠面板标题) |
| &nbsp;&nbsp;`description` | `string` | 特性详细描述 (折叠面板内容) |
| &nbsp;&nbsp;`icon` | `string` | 图标名称 |
| &nbsp;&nbsp;`image` | `object` | **关键配置**：选中该项时右侧显示的图片 |
| &nbsp;&nbsp;&nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;&nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features-accordion": {
        "block": "features-accordion",
        "title": "Interactive Features",
        "description": "Click on each feature to see details.",
        "items": [
          {
            "title": "Real-time Analytics",
            "description": "Monitor your data in real-time with our advanced dashboard.",
            "icon": "BarChart",
            "image": {
              "src": "/imgs/features/analytics.png",
              "alt": "Analytics"
            }
          },
          {
            "title": "Team Collaboration",
            "description": "Work together with your team seamlessly.",
            "icon": "Users",
            "image": {
              "src": "/imgs/features/collaboration.png",
              "alt": "Collaboration"
            }
          }
        ]
      }
    }
  }
}
```
