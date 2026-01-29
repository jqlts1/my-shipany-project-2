---
name: shipany-admin-builder
description: Create new admin dashboard modules (CRUD pages) for the ShipAny backend. Use when: (1) adding new admin pages like user management, order management, etc., (2) creating list/edit/add pages for database entities, (3) building admin panel features with tables, forms, and permissions.
---

# ShipAny Admin Builder

本技能用于在 ShipAny 项目的后台管理面板中创建新的 CRUD 模块。

## 适用场景

- 新增后台管理页面（如订单管理、产品管理等）
- 为数据库实体创建列表/编辑/新增页面
- 添加带权限控制的后台功能

## v1 编辑范围

仅允许在以下目录创建/修改文件：

```
src/app/[locale]/(admin)/admin/<module>/     # 页面文件
src/shared/models/<entity>.ts                # 数据模型（可选）
src/config/locale/messages/*/admin/<module>/ # 翻译文件
```

**禁止**：
- 修改 `core/rbac.ts` 的权限定义（仅使用现有权限或在 DB 中配置）
- 修改现有模块的代码

## 模块结构标准

一个完整的后台模块包含以下文件：

```
admin/<module>/
├── page.tsx           # 列表页（必需）
├── add/page.tsx       # 新增页（可选）
└── [id]/
    └── edit/page.tsx  # 编辑页（可选）
```

## 参考现有模块

在创建新模块前，**必须**阅读以下现有模块代码：

- **列表页参考**: `src/app/[locale]/(admin)/admin/users/page.tsx`
- **新增页参考**: `src/app/[locale]/(admin)/admin/posts/add/page.tsx`
- **编辑页参考**: `src/app/[locale]/(admin)/admin/posts/[id]/edit/page.tsx`

## 列表页模板

```tsx
import { getTranslations } from 'next-intl/server';
import { PERMISSIONS, requirePermission } from '@/core/rbac';
import { Header, Main, MainHeader } from '@/shared/blocks/dashboard';
import { TableCard } from '@/shared/blocks/table';
import { type Table } from '@/shared/types/blocks/table';

export default async function AdminModulePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const { locale } = await params;

  // 1. 权限检查
  await requirePermission({
    code: PERMISSIONS.MODULE_READ, // 使用对应权限
    redirectUrl: '/admin/no-permission',
    locale,
  });

  const t = await getTranslations('admin.module');

  // 2. 分页参数
  const { page: pageNum, pageSize } = await searchParams;
  const page = pageNum || 1;
  const limit = pageSize || 30;

  // 3. 获取数据
  const total = await getItemsCount();
  const items = await getItems({ page, limit });

  // 4. 面包屑
  const crumbs = [
    { title: t('list.crumbs.admin'), url: '/admin' },
    { title: t('list.crumbs.module'), is_active: true },
  ];

  // 5. 表格配置
  const table: Table = {
    columns: [
      { name: 'id', title: t('fields.id'), type: 'copy' },
      { name: 'name', title: t('fields.name') },
      { name: 'createdAt', title: t('fields.created_at'), type: 'time' },
      {
        name: 'actions',
        title: t('fields.actions'),
        type: 'dropdown',
        callback: (item) => [
          {
            name: 'edit',
            title: t('list.buttons.edit'),
            icon: 'RiEditLine',
            url: `/admin/module/${item.id}/edit`,
          },
        ],
      },
    ],
    data: items,
    pagination: { total, page, limit },
  };

  return (
    <>
      <Header crumbs={crumbs} />
      <Main>
        <MainHeader title={t('list.title')} />
        <TableCard table={table} />
      </Main>
    </>
  );
}
```

## 关键组件说明

| 组件 | 用途 | 来源 |
|------|------|------|
| `Header` | 顶部面包屑导航 | `@/shared/blocks/dashboard` |
| `Main`, `MainHeader` | 主内容区布局 | `@/shared/blocks/dashboard` |
| `TableCard` | 数据表格 | `@/shared/blocks/table` |
| `requirePermission` | 权限检查 | `@/core/rbac` |

## 表格列类型

参考 `src/shared/types/blocks/table.ts`：

- `copy` - 可复制文本
- `time` - 时间戳格式化
- `image` - 图片显示
- `label` - 标签样式
- `dropdown` - 操作下拉菜单

## 执行流程

1. **确定模块名称**：如 `orders`, `products`
2. **阅读参考模块**：理解代码结构和风格
3. **创建页面文件**：按模板编写 `page.tsx`
4. **添加翻译文件**：`messages/{locale}/admin/{module}.json`
5. **验证构建**：`pnpm build`
