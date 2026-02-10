// 模拟文章数据 - 直接使用后端字段名
export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  author_id: number;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'React 入门指南',
    content: `React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发，现在已经成为最流行的前端框架之一。

React 的核心概念包括：
1. 组件化开发 - 将 UI 拆分成独立、可复用的组件
2. 虚拟 DOM - 提高渲染性能
3. 单向数据流 - 数据从父组件流向子组件
4. JSX 语法 - 在 JavaScript 中编写类似 HTML 的代码

学习 React 需要掌握：
- JSX 语法
- 组件和 Props
- State 和生命周期
- Hooks（useState, useEffect 等）
- 事件处理
- 条件渲染和列表渲染

React 生态系统非常丰富，包括：
- React Router（路由管理）
- Redux/Zustand（状态管理）
- Next.js（服务端渲染框架）
- React Native（移动端开发）`,
    slug: 'react-introduction',
    author_id: 1,
    author_name: '张三',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: 'TypeScript 在 React 中的应用',
    content: `TypeScript 是 JavaScript 的超集，为 JavaScript 添加了静态类型检查。在 React 项目中使用 TypeScript 可以：

1. 提供更好的代码提示和自动补全
2. 在编译时发现错误，而不是运行时
3. 提高代码可维护性和可读性
4. 更好的重构支持

在 React 中使用 TypeScript 的基本语法：

代码示例：
interface Props {
  name: string;
  age?: number;
}

const Component: React.FC<Props> = ({ name, age }) => {
  return <div>{name} {age && '(' + age + ')'}</div>;
};

常见类型定义：
- React.FC - 函数组件类型
- React.ReactNode - 可以渲染的内容
- React.MouseEvent - 鼠标事件类型
- useState, useEffect 等 Hooks 的类型推断`,
    slug: 'typescript-in-react',
    author_id: 1,
    author_name: '张三',
    created_at: '2024-01-20T14:20:00Z',
    updated_at: '2024-01-20T14:20:00Z',
  },
  {
    id: 3,
    title: 'Zustand 状态管理入门',
    content: `Zustand 是一个轻量级的状态管理库，相比 Redux 更加简洁易用。

Zustand 的特点：
- 简单直观的 API
- 不需要 Provider 包裹
- 支持 TypeScript
- 体积小（约 1KB）

基本使用：

import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

在组件中使用：
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}

Zustand 还支持：
- 持久化存储（persist）
- 中间件
- 异步操作
- 选择器优化性能`,
    slug: 'zustand-state-management',
    author_id: 2,
    author_name: '李四',
    created_at: '2024-01-25T09:15:00Z',
    updated_at: '2024-01-25T09:15:00Z',
  },
  {
    id: 4,
    title: 'Tailwind CSS 实用技巧',
    content: `Tailwind CSS 是一个实用优先的 CSS 框架，通过组合类名来构建界面。

Tailwind 的优势：
- 快速开发，无需写自定义 CSS
- 响应式设计简单
- 一致的间距和颜色系统
- 按需打包，体积小

常用类名：
- 布局：flex, grid, container
- 间距：p-4, m-2, gap-4
- 颜色：bg-blue-500, text-gray-700
- 响应式：md:flex, lg:text-xl

实用技巧：
1. 使用 @apply 提取重复样式
2. 自定义主题配置
3. 使用 JIT 模式提高性能
4. 组合使用 hover:, focus: 等状态修饰符

示例：
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 class="text-2xl font-bold text-gray-900">标题</h2>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    按钮
  </button>
</div>`,
    slug: 'tailwind-css-tips',
    author_id: 2,
    author_name: '李四',
    created_at: '2024-02-01T16:45:00Z',
    updated_at: '2024-02-01T16:45:00Z',
  },
  {
    id: 5,
    title: 'React Hooks 深入理解',
    content: `React Hooks 是 React 16.8 引入的新特性，允许在函数组件中使用状态和生命周期。

常用 Hooks：

1. useState - 管理组件状态
const [count, setCount] = useState(0);

2. useEffect - 处理副作用
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  };
}, [dependencies]);

3. useContext - 使用上下文
4. useReducer - 复杂状态管理
5. useMemo - 缓存计算结果
6. useCallback - 缓存函数

Hooks 规则：
- 只能在函数组件顶层调用
- 不能在条件语句中调用
- 依赖数组要完整

自定义 Hooks：
可以将逻辑提取到自定义 Hook 中复用：
function useCounter(initialValue: number) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}`,
    slug: 'react-hooks-deep-dive',
    author_id: 1,
    author_name: '张三',
    created_at: '2024-02-05T11:30:00Z',
    updated_at: '2024-02-05T11:30:00Z',
  },
  {
    id: 6,
    title: '前端代码优化实践',
    content: `代码优化是前端开发中的重要环节，可以提高性能和可维护性。

优化原则：
1. 直接使用后端原始数据，不做字段映射
2. 简化逻辑，移除冗余代码
3. 精简 DOM 结构
4. 命名规范，沿用后端字段语义
5. 扁平化条件判断

性能优化：
- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo 和 useCallback 缓存计算结果
- 代码分割和懒加载
- 虚拟滚动处理长列表

代码质量：
- TypeScript 类型安全
- ESLint 代码检查
- 组件拆分和复用
- 统一的代码风格

示例：
// 优化前：多层嵌套
if (user) {
  if (user.role === 'admin') {
    if (user.permissions.includes('write')) {
      // 逻辑
    }
  }
}

// 优化后：扁平化
if (!user || user.role !== 'admin' || !user.permissions.includes('write')) {
  return;
}
// 逻辑`,
    slug: 'frontend-code-optimization',
    author_id: 3,
    author_name: '王五',
    created_at: '2024-02-10T13:20:00Z',
    updated_at: '2024-02-10T13:20:00Z',
  },
];

