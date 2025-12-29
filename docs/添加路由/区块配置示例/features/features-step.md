# Features Step 特性步骤区块配置说明

Features Step 区块用于带有明确顺序的步骤展示，每个步骤会有数字指示器和连接箭头。

## 配置参数 (Props)

Features Step 区块接收 `Section` 类型的配置，支持以下字段：

| 字段名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `block` | `string` | 固定为 `"features-step"` |
| `label` | `string` | 小标签 (通常显示在标题上方，如 "PROCESS") |
| `title` | `string` | 区块标题 |
| `description` | `string` | 区块描述 |
| `items` | `array` | 步骤列表 |
| &nbsp;&nbsp;`title` | `string` | 步骤标题 |
| &nbsp;&nbsp;`description` | `string` | 步骤详情 |
| &nbsp;&nbsp;`icon` | `string` | 步骤图标 |
| `className` | `string` | 自定义 CSS 类名 |

## 配置示例

```json
{
  "page": {
    "sections": {
      "features-step": {
        "block": "features-step",
        "label": "Working Process",
        "title": "From Idea to Launch",
        "description": "See how we transform your concept into reality.",
        "items": [
          {
            "title": "Discovery",
            "description": "We analyze your requirements.",
            "icon": "Search"
          },
          {
            "title": "Design",
            "description": "Creating the visual system.",
            "icon": "PenTool"
          },
          {
            "title": "Development",
            "description": "Building the robust code.",
            "icon": "Code"
          },
          {
            "title": "Launch",
            "description": "Go live to the world.",
            "icon": "Rocket"
          }
        ]
      }
    }
  }
}
```
