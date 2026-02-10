# 博客后端服务

基于 Express + TypeScript 的简单博客后端 API 服务。

## 技术栈

- **Express** - Web 框架
- **TypeScript** - 类型安全
- **CORS** - 跨域支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run dev
```

服务器将运行在 `http://localhost:3002`

### 构建生产版本

```bash
npm run build
npm start
```

## API 接口

### 获取文章列表

```
GET /api/post/list
```

服务器默认运行在 `http://localhost:3002`

查询参数：
- `page` - 页码（默认：1）
- `page_size` - 每页数量（默认：10）
- `keyword` - 搜索关键词（可选）

响应示例：
```json
{
  "code": 200,
  "message": "success",
  "success": true,
  "data": {
    "list": [...],
    "total": 6,
    "page": 1,
    "page_size": 10
  }
}
```

### 获取文章详情

```
GET /api/post/:id
```

响应示例：
```json
{
  "code": 200,
  "message": "success",
  "success": true,
  "data": {
    "id": 1,
    "title": "文章标题",
    "content": "文章内容",
    "slug": "article-slug",
    "author_id": 1,
    "author_name": "作者名",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

## 数据格式

所有接口返回的数据字段使用下划线命名（snake_case），与前端保持一致：
- `author_id` - 作者ID
- `author_name` - 作者名称
- `created_at` - 创建时间
- `updated_at` - 更新时间
- `page_size` - 每页数量

## 项目结构

```
server/
├── src/
│   ├── data/
│   │   └── posts.ts        # 模拟文章数据
│   ├── routes/
│   │   └── postRoutes.ts   # 文章路由
│   └── index.ts            # 服务器入口
├── package.json
├── tsconfig.json
└── README.md
```

