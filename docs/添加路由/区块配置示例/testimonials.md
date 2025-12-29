# Testimonials 用户评价区块配置说明

Testimonials 区块用于展示客户证言、用户评价，以卡片墙的形式排列。

## 配置参数 (Props)

Testimonials 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"testimonials"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述 |
| `items` | `array` | 评价列表 |
| &nbsp;&nbsp;`name` | `string` | 用户姓名 |
| &nbsp;&nbsp;`role` | `string` | 用户职位/身份 (可选) |
| &nbsp;&nbsp;`quote` | `string` | 评价内容 (如果不传，也会尝试读取 description) |
| &nbsp;&nbsp;`description` | `string` | 评价内容 (备选字段) |
| &nbsp;&nbsp;`image` | `object` | 用户头像 |
| &nbsp;&nbsp;&nbsp;&nbsp;`src` | `string` | 头像路径 |
| &nbsp;&nbsp;&nbsp;&nbsp;`alt` | `string` | 头像替代文本 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "testimonials": {
        "block": "testimonials",
        "title": "Loved by Community",
        "description": "Here's what our users are saying.",
        "items": [
          {
            "name": "Alice Johnson",
            "role": "Product Designer",
            "quote": "This tool has completely transformed my workflow. Highly recommended!",
            "image": {
              "src": "/imgs/avatars/alice.jpg",
              "alt": "Alice"
            }
          },
          {
            "name": "Bob Smith",
            "role": "Developer",
            "quote": "The best developer experience I've had in years.",
            "image": {
              "src": "/imgs/avatars/bob.jpg",
              "alt": "Bob"
            }
          }
        ]
      }
    }
  }
}
```
