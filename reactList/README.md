# React 博客应用

一个功能完整的个人博客系统，使用现代 React 技术栈构建，支持用户认证、文章管理、搜索和分页等功能。

## ✨ 功能特性

### 用户认证
- ✅ 用户注册
- ✅ 用户登录
- ✅ 自动登录（基于 localStorage）
- ✅ 路由保护（未登录用户无法访问受保护页面）
- ✅ 用户信息持久化

### 文章管理
- ✅ 文章列表展示（支持分页）
- ✅ 文章搜索
- ✅ 文章详情查看
- ✅ 创建新文章
- ✅ 编辑文章
- ✅ 删除文章
- ✅ 文章作者信息显示

### 用户体验
- ✅ 响应式设计
- ✅ 加载状态提示
- ✅ 错误处理与提示
- ✅ 空状态展示
- ✅ 页面懒加载
- ✅ 流畅的页面动画

## 🛠️ 技术栈

### 核心框架
- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具

### 状态管理
- **Zustand** - 轻量级状态管理库

### 路由
- **React Router v7** - 声明式路由管理

### 样式
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库

### HTTP 请求
- **Axios** - 基于 Promise 的 HTTP 客户端

### 代码质量
- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具

## 📦 项目结构

```
reactList/
├── src/
│   ├── api/              # API 接口封装
│   │   ├── authApi.ts    # 认证相关 API
│   │   └── postApi.ts    # 文章相关 API
│   ├── components/       # 可复用组件
│   │   ├── AuthForm.tsx      # 认证表单
│   │   ├── Button.tsx        # 按钮组件
│   │   ├── EmptyState.tsx    # 空状态组件
│   │   ├── ErrorBoundary.tsx # 错误边界
│   │   ├── ErrorMessage.tsx  # 错误提示
│   │   ├── Loading.tsx       # 加载组件
│   │   ├── Navbar.tsx       # 导航栏
│   │   ├── Pagination.tsx    # 分页组件
│   │   ├── PostCard.tsx     # 文章卡片
│   │   ├── PostForm.tsx     # 文章表单
│   │   ├── ProtectedRoute.tsx # 路由保护
│   │   └── SearchBar.tsx    # 搜索栏
│   ├── pages/            # 页面组件
│   │   ├── About.tsx         # 关于页面
│   │   ├── CreatePost.tsx    # 创建文章页
│   │   ├── EditPost.tsx      # 编辑文章页
│   │   ├── Home.tsx          # 博客首页
│   │   ├── Index.tsx         # 首页
│   │   ├── Login.tsx         # 登录页
│   │   ├── NotFound.tsx      # 404 页面
│   │   ├── PostDetail.tsx    # 文章详情页
│   │   └── Register.tsx      # 注册页
│   ├── router/           # 路由配置
│   │   └── index.tsx
│   ├── store/            # Zustand 状态管理
│   │   ├── authStore.ts      # 认证状态
│   │   └── postStore.ts      # 文章状态
│   ├── types/            # TypeScript 类型定义
│   │   └── api.ts
│   ├── utils/            # 工具函数
│   │   └── request.ts        # Axios 请求封装
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 应用入口
│   └── index.css         # 全局样式
├── package.json
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
├── tailwind.config.js    # Tailwind 配置
└── README.md
```

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动后端服务

确保后端服务已启动并运行在 `http://localhost:3002`（可在 `vite.config.ts` 中配置）。

```bash
cd ../server
npm install
npm run dev
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（Vite 默认端口）。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## ⚙️ 配置

### 后端 API 地址

开发环境下的 API 代理配置在 `vite.config.ts` 中：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3002',
      changeOrigin: true,
    },
  },
}
```

如需修改后端地址，请编辑 `vite.config.ts` 文件。

### 环境变量

如需自定义配置，可在项目根目录创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:3002
```

## 📱 路由说明

| 路径 | 说明 | 是否需要登录 |
|------|------|-------------|
| `/` | 首页 | ❌ |
| `/blog` | 博客列表页 | ❌ |
| `/post/:id` | 文章详情页 | ❌ |
| `/login` | 登录页 | ❌ |
| `/register` | 注册页 | ❌ |
| `/create` | 创建文章 | ✅ |
| `/post/:id/edit` | 编辑文章 | ✅ |
| `/about` | 关于页面 | ❌ |
| `*` | 404 页面 | ❌ |

## 🎯 核心功能实现

### 状态管理

使用 Zustand 进行状态管理，分为两个 Store：

- **authStore**: 管理用户认证状态（登录、注册、登出）
- **postStore**: 管理文章数据（列表、详情、CRUD 操作）

### 路由保护

使用 `ProtectedRoute` 组件保护需要登录的页面：

```tsx
<ProtectedRoute>
  <CreatePost />
</ProtectedRoute>
```

### API 请求

所有 API 请求通过 Axios 封装，统一处理：
- 请求拦截器：自动添加认证 Token
- 响应拦截器：统一错误处理
- 类型安全：完整的 TypeScript 类型定义

### 数据持久化

用户认证信息存储在 `localStorage` 中，实现自动登录功能。

## 🎨 设计原则

- ✅ **直接使用后端字段**：不做字段映射，保持数据一致性
- ✅ **简化逻辑**：避免冗余代码，保持代码简洁
- ✅ **精简 DOM**：保持布局简洁，提升性能
- ✅ **命名规范**：沿用后端字段语义，提升可读性
- ✅ **扁平化条件判断**：提升代码可读性

## 📝 开发规范

### 代码格式化

```bash
npm run format
```

### 代码检查

```bash
npm run lint
```

## 🔧 常见问题

### 1. 后端连接失败

确保后端服务已启动，并检查 `vite.config.ts` 中的代理配置是否正确。

### 2. 登录后无法访问受保护页面

检查 `localStorage` 中是否有有效的认证信息，或尝试重新登录。

### 3. 构建失败

确保所有依赖已正确安装，并检查 TypeScript 类型错误。

## 📄 许可证

MIT License

## 👨‍💻 作者

个人学习项目

---

**注意**：这是一个学习项目，用于实践 React 和相关技术栈的使用。
