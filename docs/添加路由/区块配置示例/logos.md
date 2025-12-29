# Logos 区块配置说明

Logos 区块用于展示合作伙伴、客户或技术栈的 Logo 列表。通常用于增强信任感 (Social Proof)。

## 配置参数 (Props)

Logos 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"logos"` |
| `title` | `string` | 区块标题，通常用于说明这些 Logo 是什么（例如 "Trusted by teams at"） |
| `items` | `array` | Logo 列表项 |
| &nbsp;&nbsp;`image` | `object` | Logo 图片配置 |
| &nbsp;&nbsp;&nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;&nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| `className` | `string` | 自定义 CSS 类名 |

> **注意**：默认样式下，Logo 图片在深色模式下会自动反转颜色 (`dark:invert`)。建议使用黑色或深灰色的单色 Logo 透明 PNG 图片，这样在浅色模式下显示为深色，深色模式下自动变为白色。

## 配置示例

```json
{
  "page": {
    "sections": {
      "logos": {
        "block": "logos",
        "title": "Trusted by teams at",
        "items": [
          {
            "image": {
              "src": "/imgs/logos/nextjs.svg",
              "alt": "Next.js"
            }
          },
          {
            "image": {
              "src": "/imgs/logos/tailwind.svg",
              "alt": "Tailwind CSS"
            }
          },
          {
            "image": {
              "src": "/imgs/logos/typescript.svg",
              "alt": "TypeScript"
            }
          },
          {
            "image": {
              "src": "/imgs/logos/vercel.svg",
              "alt": "Vercel"
            }
          }
        ],
        "className": "custom-logos-class"
      }
    }
  }
}
```
