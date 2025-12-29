# Header 导航栏区块配置

`header` 区块通常位于页面顶部，用于展示品牌 Logo、导航菜单、用户操作（登录/注册）以及主题/语言切换等功能。

通常在动态页面的 JSON 配置中，`header` 是作为一个顶层字段配置的（与 `sections` 平级），但也可以作为一个独立区块使用。

## 配置示例

```json
{
  "header": {
    "block": "header",
    "id": "header",
    "brand": {
      "title": "ShipAny Two",
      "logo": {
        "src": "/logo.png",
        "alt": "ShipAny Two",
        "width": 100,
        "height": 100
      },
      "url": "/"
    },
    "nav": {
      "items": [
        {
          "title": "Features",
          "url": "/#features",
          "icon": "Sparkles"
        },
        {
          "title": "Showcases",
          "url": "/showcases",
          "icon": "Box"
        },
        {
          "title": "Pricing",
          "url": "/pricing",
          "icon": "DollarSign"
        },
        {
          "title": "AI",
          "icon": "RiRobot2Line",
          "children": [
            {
              "title": "AI Image Generator",
              "description": "Use AI to generate images",
              "url": "/ai-image-generator",
              "icon": "RiImage2Line"
            },
            {
              "title": "AI Music Generator",
              "description": "Use AI to generate music",
              "url": "/ai-music-generator",
              "icon": "RiMusic2Line"
            },
            {
              "title": "AI Video Generator",
              "description": "Use AI to generate videos",
              "url": "/ai-video-generator",
              "icon": "RiVideoLine"
            },
            {
              "title": "AI Chatbot",
              "description": "Chat with AI chatbot",
              "url": "/chat",
              "icon": "RiMessage2Line"
            }
          ]
        },
        {
          "title": "Content",
          "icon": "FileText",
          "children": [
            {
              "title": "Blog",
              "description": "Read Blog Posts",
              "url": "/blog",
              "icon": "Newspaper"
            },
            {
              "title": "Updates",
              "description": "Read Update Logs",
              "url": "/updates",
              "icon": "Clock"
            },
            {
              "title": "Docs",
              "description": "Read Documentation",
              "url": "/docs",
              "icon": "BookOpenText"
            }
          ]
        }
      ]
    },
    "buttons": [
       {
        "title": "Get Started",
        "url": "/login",
        "variant": "default",
        "icon": "Zap"
      }
    ],
    "user_nav": {
      "show_name": true,
      "show_credits": true,
      "show_sign_out": true,
      "items": [
        {
          "title": "Billing",
          "url": "/settings/billing",
          "icon": "CreditCard"
        },
        {
          "title": "Activity",
          "url": "/activity",
          "icon": "Activity"
        }
      ]
    },
    "show_sign": true,
    "show_theme": true,
    "show_locale": true
  }
}
```

## 字段说明

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"header"` |
| `id` | `string` | 区块唯一标识符 |
| `brand` | `object` | 品牌信息，包含 `title`, `logo`, `url` |
| `nav` | `object` | 导航菜单配置 |
| `nav.items` | `array` | 导航项列表。支持嵌套 `children` 以显示下拉菜单 |
| `nav.items[].icon` | `string` | 菜单图标名称（支持 Lucide 图标或 RemixIcon） |
| `buttons` | `array` | 导航栏右侧的操作按钮（如 "Get Started"） |
| `buttons[].variant` | `string` | 按钮样式，可选 `"default"`, `"outline"`, `"ghost"` 等 |
| `user_nav` | `object` | 登录后的用户菜单配置 |
| `user_nav.items` | `array` | 用户下拉菜单中的自定义链接项 |
| `show_sign` | `boolean` | 是否显示登录/注册按钮（或用户信息） |
| `show_theme` | `boolean` | 是否显示主题切换器 |
| `show_locale` | `boolean` | 是否显示语言切换器 |
