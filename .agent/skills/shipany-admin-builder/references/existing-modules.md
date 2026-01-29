# 现有后台模块索引

本文档列出所有现有的后台管理模块，供创建新模块时参考。

## 模块列表

| 模块 | 路径 | 功能 | 复杂度 |
|------|------|------|--------|
| users | `/admin/users` | 用户管理、角色分配、积分 | 高 |
| posts | `/admin/posts` | 文章管理（博客） | 中 |
| categories | `/admin/categories` | 分类管理 | 低 |
| roles | `/admin/roles` | 角色管理 | 中 |
| permissions | `/admin/permissions` | 权限管理 | 中 |
| payments | `/admin/payments` | 支付记录 | 低 |
| subscriptions | `/admin/subscriptions` | 订阅管理 | 中 |
| credits | `/admin/credits` | 积分管理 | 低 |
| apikeys | `/admin/apikeys` | API 密钥管理 | 低 |
| waitlist | `/admin/waitlist` | 等待列表 | 低 |
| chats | `/admin/chats` | 聊天记录 | 低 |
| ai-tasks | `/admin/ai-tasks` | AI 任务管理 | 中 |
| settings | `/admin/settings` | 系统设置 | 低 |

## 推荐参考模块

- **简单列表**：`categories` - 最简单的 CRUD 模块
- **标准模块**：`posts` - 包含列表、新增、编辑
- **复杂模块**：`users` - 包含角色分配、积分等高级功能

## 共享组件路径

```
src/shared/blocks/dashboard.tsx   # Header, Main, MainHeader
src/shared/blocks/table.tsx       # TableCard
src/shared/blocks/form/           # 表单组件
src/shared/models/                # 数据模型
src/core/rbac.ts                  # 权限定义
```
