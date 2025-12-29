# FAQ 常见问题区块配置说明

FAQ 区块用于以折叠面板（Accordion）的形式展示常见问题解答。

## 配置参数 (Props)

FAQ 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"faq"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述 |
| `tip` | `string` | 底部提示文本，支持 HTML (例如联系客服的链接) |
| `items` | `array` | 问题列表 |
| &nbsp;&nbsp;`question` | `string` | 问题文本 (也可使用 `title`) |
| &nbsp;&nbsp;`answer` | `string` | 回答文本 (也可使用 `description`) |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "faq": {
        "block": "faq",
        "title": "Frequently Asked Questions",
        "description": "Got questions? We've got answers.",
        "items": [
          {
            "question": "Is there a free trial?",
            "answer": "Yes, we offer a 14-day free trial on all plans."
          },
          {
            "question": "Can I cancel anytime?",
            "answer": "Absolutely. You can cancel your subscription at any time."
          }
        ],
        "tip": "Still have questions? <a href='/contact' class='underline'>Contact support</a>"
      }
    }
  }
}
```
