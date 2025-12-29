# Footer 页脚区块配置

`footer` 区块用于页面底部的导航、版权信息、社交链接等展示。

## 配置示例

```json
{
  "footer": {
    "block": "footer",
    "id": "footer",
    "className": "bg-background",
    "brand": {
      "title": "ShipAny Two",
      "description": "ShipAny 是专为 AI SaaS 创业项目打造的 NextJS 模板。<br/>丰富模板与组件，极速交付你的产品。",
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
          "title": "关于我们",
          "children": [
            {
              "title": "功能亮点",
              "url": "/#features",
              "target": "_self"
            },
            {
              "title": "案例展示",
              "url": "/showcases",
              "target": "_self"
            },
            {
              "title": "价格",
              "url": "/pricing",
              "target": "_self"
            }
          ]
        },
        {
          "title": "资源",
          "children": [
            {
              "title": "文档",
              "url": "/docs",
              "target": "_self"
            },
            {
              "title": "博客",
              "url": "/blog",
              "target": "_self"
            },
            {
              "title": "对话",
              "url": "/chat",
              "target": "_blank"
            }
          ]
        },
        {
          "title": "合作伙伴",
          "children": [
            {
              "title": "ShipAny",
              "url": "https://shipany.ai",
              "target": "_blank"
            },
            {
              "title": "ThinkAny",
              "url": "https://thinkany.ai",
              "target": "_blank"
            },
            {
              "title": "MCP.so",
              "url": "https://mcp.so",
              "target": "_blank"
            }
          ]
        }
      ]
    },
    "social": {
      "items": [
        {
          "title": "X",
          "icon": "RiTwitterXFill",
          "url": "https://x.com/your-app-name",
          "target": "_blank"
        },
        {
          "title": "Github",
          "icon": "Github",
          "url": "https://github.com/your-app-name",
          "target": "_blank"
        },
        {
          "title": "Discord",
          "icon": "RiDiscordFill",
          "url": "https://discord.gg/your-app-name",
          "target": "_blank"
        },
        {
          "title": "邮箱",
          "icon": "Mail",
          "url": "mailto:support@your-domain.com",
          "target": "_self"
        }
      ]
    },
    "agreement": {
      "items": [
        {
          "title": "隐私政策",
          "url": "/privacy-policy"
        },
        {
          "title": "服务条款",
          "url": "/terms-of-service"
        }
      ]
    },
    "copyright": "© 2024 ShipAny. All rights reserved.",
    "show_built_with": true,
    "show_theme": true,
    "show_locale": true
  }
}
```

## 字段说明

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"footer"` |
| `id` | `string` | 区块的唯一标识符，可用于锚点定位 |
| `className` | `string` | 自定义 CSS 类名 |
| `brand` | `object` | 品牌信息，包含 `title`, `description`, `logo`, `url` |
| `brand.description` | `string` | 品牌描述，支持 HTML 标签 |
| `nav` | `object` | 底部导航菜单配置 |
| `nav.items` | `array` | 导航列列表 |
| `social` | `object` | 社交媒体链接配置 |
| `social.items` | `array` | 社交媒体图标列表，`icon` 支持 Lucide 图标或自定义图标名 |
| `agreement` | `object` | 底部协议链接（如隐私政策、服务条款） |
| `copyright` | `string` | 自定义版权信息，支持 HTML。如果不填，默认使用 `brand` 信息生成 |
| `show_built_with` | `boolean` | 是否显示 "Built with" 信息，默认为 `true` |
| `show_theme` | `boolean` | 是否显示主题切换器，默认为 `true` |
| `show_locale` | `boolean` | 是否显示语言切换器，默认为 `true` |
