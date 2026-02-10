# 个人博客 - React 学习项目

一个使用 React + TypeScript + Tailwind CSS + Zustand 构建的简单个人博客项目。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Zustand** - 状态管理
- **React Router** - 路由管理
- **Axios** - HTTP 请求
- **Vite** - 构建工具

## 项目特点

- ✅ 直接使用后端原始数据，不做字段映射
- ✅ 简化逻辑，避免冗余代码
- ✅ 精简 DOM 结构，保持布局简洁
- ✅ 命名规范，沿用后端字段语义
- ✅ 扁平化条件判断，提升可读性

## 快速开始

### 1. 启动后端服务

```bash
cd ../server
npm install
npm run dev
```

后端服务将运行在 `http://localhost:3001`

### 2. 启动前端项目

```bash
npm install
npm run dev
```

前端开发服务器已配置代理，会自动转发 `/api` 请求到后端服务器。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── api/           # API 接口
├── pages/          # 页面组件
├── store/          # Zustand 状态管理
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
├── router/         # 路由配置
└── main.tsx        # 入口文件
```

## 环境变量

如果需要自定义后端地址，在项目根目录创建 `.env` 文件：

```
VITE_API_BASE_URL=http://localhost:3001
```

默认情况下，Vite 开发服务器已配置代理，无需设置环境变量。

## 功能说明

- **文章列表页** (`/`) - 显示所有文章，支持搜索和分页
- **文章详情页** (`/post/:id`) - 显示文章详细内容

## 学习要点

1. **React Hooks** - useState, useEffect
2. **状态管理** - Zustand 的使用
3. **路由管理** - React Router 的使用
4. **TypeScript** - 类型定义和类型安全
5. **Tailwind CSS** - 实用优先的 CSS 框架
6. **API 请求** - Axios 的使用和拦截器

