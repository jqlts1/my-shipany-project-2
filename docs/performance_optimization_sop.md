# 前端性能优化标准作业程序 (SOP)

本文档基于 Breathwave 项目的实战优化经验，总结了针对 Next.js + React 项目的性能优化标准流程。请开发团队在后续开发中严格参考执行。

## 1. 动画性能优化 (Animation Performance)

### 🔴 问题 (Problem)
使用 `framer-motion` 的默认导入方式（`import { motion } from 'framer-motion'`）会将整个动画库（包含手势、物理引擎等）打包进主包，导致首屏 JS 体积过大。

### ✅ 解决方案 (Solution)
始终使用 `LazyMotion` 和 `domAnimation` 来按需加载动画功能。

**代码规范：**

```tsx
// ❌ 避免使用 (除非必须用到 layout 动画)
import { motion } from 'framer-motion';

// ✅ 推荐使用
import { LazyMotion, domAnimation, m } from 'motion/react';

export function MyComponent() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Content
      </m.div>
    </LazyMotion>
  );
}
```

---

## 2. 背景与视觉特效优化 (Visual Effects)

### 🔴 问题 (Problem)
使用大量的 CSS `filter: blur(...)` 或 `mix-blend-mode` 在主线程进行动画渲染（如动态光晕、Aurora 效果），会严重占用 CPU/GPU 资源，导致页面掉帧和 TBT (Total Blocking Time) 升高。

### ✅ 解决方案 (Solution)
1.  **静态化复杂背景**：对于复杂的模糊渐变，优先使用静态 CSS `linear-gradient` / `radial-gradient` 或 pre-rendered 的高清图片/视频。
2.  **CSS Keyframes 动画**：如果必须动，优先使用 CSS `@keyframes` 配合 transform (GPU 加速)，而不是 JS 驱动的动画。

**代码规范：**

```css
/* ✅ 使用 CSS Animation 代替 JS 循环 */
@keyframes aurora {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-aurora {
  animation: aurora 60s linear infinite;
}
```

---

## 3. 组件懒加载 (Lazy Loading)

### 🔴 问题 (Problem)
非首屏可见的重组件（如代码高亮器、富文本编辑器、各种 Effect 库）如果直接导入，会阻塞首屏渲染。

### ✅ 解决方案 (Solution)
使用 Next.js 的 `dynamic` 导入，并根据需要设置 `ssr: false`。

**代码规范：**

```tsx
import dynamic from 'next/dynamic';

// ✅ 懒加载重型组件
const Highlighter = dynamic(() => import('@/shared/components/ui/highlighter').then(mod => mod.Highlighter), {
  ssr: false,
  loading: () => <span className="skeleton">...</span>
});
```

---

## 4. 国际化与内容路由 (Content Localization)

### 🔴 问题 (Problem)
当新增语言（如日语 `ja`）时，如果对应的 MDX 页面或 JSON 翻译缺失，系统可能会因为无法 resolve message 而崩溃。

### ✅ 解决方案 (Solution)
对于静态内容页面（如 Privacy Policy），**必须**为每种语言创建对应的 `.mdx` 文件或对应的 JSON 配置，确保路由降级逻辑有内容可寻。

*   `content/pages/privacy-policy.mdx` (English)
*   `content/pages/privacy-policy.ja.mdx` (Japanese - 确保已创建)

---

## 5. 打包体积检测 (Build Monitoring)

在发版前，开发人员应关注构建产物：

1.  运行 `pnpm build`。
2.  观察 Next.js 输出的 JS shared by all 大小。
3.  利用 `@next/bundle-analyzer` 定期分析依赖，剔除冗余包。
