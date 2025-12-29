# Subscribe 订阅区块配置说明

Subscribe 区块提供一个简易的邮件订阅表单，用于收集用户邮箱（如 Newsletter 订阅）。

## 配置参数 (Props)

Subscribe 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"subscribe"` |
| `title` | `string` | 标题 |
| `description` | `string` | 描述 |
| `submit` | `object` | 提交表单配置 |
| &nbsp;&nbsp;`action` | `string` | 表单提交的 API 接口 URL (POST 请求) |
| &nbsp;&nbsp;`input` | `object` | 输入框配置 |
| &nbsp;&nbsp;&nbsp;&nbsp;`placeholder` | `string` | 输入框占位符 |
| &nbsp;&nbsp;`button` | `object` | 提交按钮配置 |
| &nbsp;&nbsp;&nbsp;&nbsp;`title` | `string` | 按钮文本 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "subscribe": {
        "block": "subscribe",
        "title": "Stay Updated",
        "description": "Get the latest news and updates delivered to your inbox.",
        "submit": {
          "action": "/api/subscribe",
          "input": {
            "placeholder": "Enter your email address"
          },
          "button": {
            "title": "Subscribe"
          }
        }
      }
    }
  }
}
```
