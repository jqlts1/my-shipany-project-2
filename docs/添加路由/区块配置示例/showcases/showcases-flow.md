# Showcases Flow 瀑布流展示区块配置说明

Showcases Flow 区块用于展示大图案例，支持全屏预览（Lightbox）和键盘导航切换。适合展示高清图片、设计稿或精细的 UI 界面。

## 配置参数 (Props)

Showcases Flow 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"showcases-flow"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述 |
| `groups` | `array` | 分组标签列表（可选） |
| &nbsp;&nbsp;`name` | `string` | 分组标识符 |
| &nbsp;&nbsp;`title` | `string` | 分组显示名称 |
| `items` | `array` | 展示项目列表 (瀑布流布局) |
| &nbsp;&nbsp;`title` | `string` | 项目标题 (预览时显示) |
| &nbsp;&nbsp;`description` | `string` | 项目描述 (预览时显示) |
| &nbsp;&nbsp;`image` | `object` | 项目图片 (支持点击放大) |
| &nbsp;&nbsp;`group` | `string` | 所属分组 |
| &nbsp;&nbsp;`button` | `object` | 按钮配置 (预览大图时显示) |
| `buttons` | `array` | 区块顶部的全局操作按钮（位于描述下方） |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "showcases-flow": {
        "block": "showcases-flow",
        "title": "Design Gallery",
        "description": "Explore our latest designs.",
        "groups": [
          { "name": "all", "title": "All" },
          { "name": "mobile", "title": "Mobile" },
          { "name": "web", "title": "Web" }
        ],
        "items": [
          {
            "title": "Mobile App UI",
            "description": "Clean and modern mobile interface.",
            "image": {
              "src": "/imgs/gallery/mobile1.png",
              "alt": "Mobile App"
            },
            "group": "mobile"
          },
          {
            "title": "Web Dashboard",
            "description": "Data visualization dashboard.",
            "image": {
              "src": "/imgs/gallery/web1.png",
              "alt": "Dashboard"
            },
            "group": "web",
            "button": {
              "title": "Live Preview",
              "url": "#",
              "icon": "Eye"
            }
          }
        ]
      }
    }
  }
}
```
