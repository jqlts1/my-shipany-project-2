# Stats 统计数据区块配置说明

Stats 区块用于展示关键业务指标，如用户数量、收入增长、下载量等，通常以大号数字呈现。

## 配置参数 (Props)

Stats 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"stats"` |
| `title` | `string` | 区块主标题 |
| `description` | `string` | 区块描述 |
| `items` | `array` | 统计项列表 |
| &nbsp;&nbsp;`title` | `string` | 统计数值 (如 "10k+", "$1M") |
| &nbsp;&nbsp;`description` | `string` | 指标说明 (如 "Active Users", "Revenue") |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "stats": {
        "block": "stats",
        "title": "Trusted by Developers",
        "description": "Our numbers speak for themselves.",
        "items": [
          {
            "title": "100k+",
            "description": "Downloads"
          },
          {
            "title": "99.9%",
            "description": "Uptime"
          },
          {
            "title": "500+",
            "description": "Components"
          }
        ]
      }
    }
  }
}
```
