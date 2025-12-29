# Features Flow 特性流程区块配置说明

Features Flow 区块用于以"Z字形"（左文右图 / 左图右文）交替排列的方式展示一系列详细特性。适合讲故事或展示步骤流程。

## 配置参数 (Props)

Features Flow 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features-flow"` |
| `title` | `string` | 区块主标题 |
| `sr_only_title` | `string` | 屏幕阅读器专用标题 (可选) |
| `description` | `string` | 描述文本 |
| `items` | `array` | 流程步骤/特性项列表 |
| &nbsp;&nbsp;`title` | `string` | 步骤标题 |
| &nbsp;&nbsp;`description` | `string` | 步骤描述 |
| &nbsp;&nbsp;`image` | `object` | 配图 |
| &nbsp;&nbsp;&nbsp;&nbsp;`src` | `string` | 图片路径 |
| &nbsp;&nbsp;&nbsp;&nbsp;`alt` | `string` | 图片替代文本 |
| &nbsp;&nbsp;`image_position` | `string` | 图片位置：`'left'` 或 `'right'` (控制该行布局) |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features-flow": {
        "block": "features-flow",
        "title": "How it works",
        "description": "Simple 3-step process.",
        "items": [
          {
            "title": "Step 1: Upload",
            "description": "Upload your data to our secure platform.",
            "image": {
              "src": "/imgs/steps/step1.png",
              "alt": "Upload"
            },
            "image_position": "right"
          },
          {
            "title": "Step 2: Process",
            "description": "Our AI engine processes your data automatically.",
            "image": {
              "src": "/imgs/steps/step2.png",
              "alt": "Process"
            },
            "image_position": "left"
          }
        ]
      }
    }
  }
}
```
