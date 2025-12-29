# Hero 区块配置说明

Hero 区块通常位于页面的顶部，用于展示最核心的价值主张。它支持标题、描述、按钮、公告、背景图以及响应式展示图片（支持深色/浅色模式切换）。

## 配置参数 (Props)

Hero 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"hero"` |
| `title` | `string` | 主标题文本 |
| `highlight_text` | `string` | 标题中需要高亮显示的文本（会使用主题色下划线高亮） |
| `description` | `string` | 副标题/描述文本，支持 HTML 标签 (如 `<br/>`) |
| `announcement` | `object` | 顶部公告胶囊 |
| &nbsp;&nbsp;`title` | `string` | 公告文本 |
| &nbsp;&nbsp;`url` | `string` | 公告链接 |
| &nbsp;&nbsp;`target` | `string` | 链接打开方式 (如 `_blank`) |
| `buttons` | `array` | 操作按钮列表 |
| &nbsp;&nbsp;`title` | `string` | 按钮文本 |
| &nbsp;&nbsp;`url` | `string` | 按钮链接 |
| &nbsp;&nbsp;`variant` | `string` | 样式变体: `default` (实心), `outline` (描边), `ghost` (幽灵), `secondary` (次级) |
| &nbsp;&nbsp;`size` | `string` | 尺寸: `default`, `sm`, `lg`, `icon` |
| &nbsp;&nbsp;`icon` | `string` | 图标名称 (Lucide icon name) |
| `tip` | `string` | 按钮下方的提示小字，支持 HTML |
| `show_avatars` | `boolean` | 是否显示社交头像组 (通常用于展示信任度) |
| `avatars_tip` | `string` | 社交头像旁的提示文本 |
| `image` | `object` | 主展示图片 (浅色模式默认) |
| &nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| &nbsp;&nbsp;`width` | `number` | 图片宽度 |
| &nbsp;&nbsp;`height` | `number` | 图片高度 |
| `image_invert` | `object` | 深色模式下显示的图片 (可选，若不传则沿用 `image`) |
| `background_image` | `object` | 背景大图 |
| &nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;`alt` | `string` | 背景图替代文本 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "hero": {
        "block": "hero",
        "title": "电影级别的AI壁纸生成器",
        "highlight_text": "立即",
        "description": "Prompt -> style -> 4K wallpaper in seconds. <br/>Built for creators, gamers, and teams who want a futuristic look.",
        "announcement": {
          "title": "New v2 is live",
          "url": "/updates",
          "target": "_self"
        },
        "buttons": [
          {
            "title": "Start Generating",
            "url": "#generator",
            "icon": "Wand2",
            "variant": "default",
            "size": "default"
          },
          {
            "title": "View Gallery",
            "url": "#showcases_flow",
            "icon": "Sparkles",
            "variant": "outline"
          }
        ],
        "tip": "无需信用卡，免费开始使用",
        "show_avatars": true,
        "avatars_tip": "10,000+ creators love us",
        "image": {
          "src": "/imgs/hero/dashboard-light.png",
          "alt": "Dashboard Preview",
          "width": 1200,
          "height": 630
        },
        "image_invert": {
          "src": "/imgs/hero/dashboard-dark.png",
          "alt": "Dashboard Preview Dark Mode",
          "width": 1200,
          "height": 630
        },
        "background_image": {
          "src": "/imgs/bg/tree.jpg",
          "alt": "AI Wallpaper Hero Background"
        },
        "className": "custom-hero-class"
      }
    }
  }
}
```