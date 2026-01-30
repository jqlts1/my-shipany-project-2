# 项目工厂规则

这是一个 **Web 项目工厂**，用于快速创建和管理基于 ShipAny 模板的 Web 项目。

---

## 核心 Skill

### `project-scaffold` - 创建新项目

**触发词**：
- "创建一个xxx项目"
- "新建项目"
- "帮我开一个新项目"

**执行流程**：
1. 分析项目类型，确定分类目录（如 SaaS / Tools / Health）
2. 克隆模板到分类目录
3. 创建 GitHub 私有仓库
4. 配置同步脚本
5. 收集项目信息
6. 生成首页

**参考**：`.agent/skills/project-scaffold/SKILL.md`

---

## 重要说明

> ⚠️ **页面创建、后台开发等功能**是在项目创建完成后（clone 后）才可用的。
> 
> 新项目会自动包含以下 Skills：
> - `shipany-page-builder` - 创建前台页面
> - `shipany-admin-builder` - 创建后台模块

---

## 分类目录

项目按类型分类存放，常见分类：

| 分类 | 适用类型 |
|------|---------|
| `SaaS` | B2B/B2C 软件服务 |
| `Tools` | 实用工具类 |
| `Ecommerce` | 电商相关 |
| `Health` | 健康/健身 |
| `Education` | 教育/学习 |

默认路径：`/Users/zhangte/Documents/WebProjects/<分类>/<项目名>`

---

## 禁止事项

- ❌ 不要手动创建项目目录，使用 `project-scaffold`
- ❌ 不要跳过分类判断步骤
- ❌ 不要在未 clone 的情况下尝试创建页面
