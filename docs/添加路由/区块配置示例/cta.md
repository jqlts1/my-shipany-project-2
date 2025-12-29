# CTA 行动号召区块配置说明

CTA (Call to Action) 区块通常位于页面底部，用于引导用户进行最终转化（如注册、购买、下载）。

## 配置参数 (Props)

CTA 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"cta"` |
| `title` | `string` | 主标题 (通常是一句有力的口号) |
| `description` | `string` | 描述文本，支持 HTML |
| `buttons` | `array` | 按钮列表 |
| &nbsp;&nbsp;`title` | `string` | 按钮文本 |
| &nbsp;&nbsp;`url` | `string` | 链接地址 |
| &nbsp;&nbsp;`variant` | `string` | 样式变体 |
| &nbsp;&nbsp;`size` | `string` | 尺寸 |
| &nbsp;&nbsp;`icon` | `string` | 图标名称 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "cta": {
        "block": "cta",
        "title": "Ready to get started?",
        "description": "Join thousands of satisfied users today.",
        "buttons": [
          {
            "title": "Get Started for Free",
            "url": "/signup",
            "variant": "default",
            "size": "lg"
          },
          {
            "title": "Contact Sales",
            "url": "/contact",
            "variant": "outline",
            "size": "lg"
          }
        ]
      }
    }
  }
}
```
