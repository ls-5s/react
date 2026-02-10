# 博客后端服务

基于 Express + TypeScript 构建的 RESTful API 服务，提供用户认证和文章管理功能。

## ✨ 功能特性

### 用户认证
- ✅ 用户注册（用户名、邮箱、密码）
- ✅ 用户登录（支持用户名或邮箱登录）
- ✅ JWT Token 认证
- ✅ 获取当前用户信息
- ✅ 密码加密存储（bcryptjs）

### 文章管理
- ✅ 获取文章列表（支持分页和搜索）
- ✅ 获取文章详情
- ✅ 创建文章
- ✅ 更新文章
- ✅ 删除文章

### 安全特性
- ✅ JWT Token 认证机制
- ✅ 密码加密存储
- ✅ 请求参数验证
- ✅ 统一错误处理
- ✅ CORS 跨域支持

## 🛠️ 技术栈

### 核心框架
- **Express** - 快速、极简的 Node.js Web 框架
- **TypeScript** - 类型安全的 JavaScript

### 认证与安全
- **jsonwebtoken** - JWT Token 生成和验证
- **bcryptjs** - 密码加密和验证

### 其他
- **CORS** - 跨域资源共享支持
- **tsx** - TypeScript 执行工具（开发环境）

## 📦 项目结构

```
server/
├── src/
│   ├── data/              # 数据存储（内存模拟）
│   │   ├── posts.ts       # 文章数据
│   │   └── users.ts       # 用户数据
│   ├── middleware/        # 中间件
│   │   ├── auth.ts        # JWT 认证中间件
│   │   ├── errorHandler.ts # 错误处理中间件
│   │   └── validator.ts  # 请求验证中间件
│   ├── routes/            # 路由定义
│   │   ├── authRoutes.ts  # 认证路由
│   │   └── postRoutes.ts  # 文章路由
│   ├── utils/             # 工具函数
│   │   ├── jwt.ts         # JWT 工具
│   │   └── password.ts    # 密码加密工具
│   └── index.ts           # 服务器入口
├── package.json
├── tsconfig.json          # TypeScript 配置
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

## ⚙️ 环境变量

可在项目根目录创建 `.env` 文件配置环境变量：

```env
# 服务器端口
PORT=3002

# JWT 密钥（生产环境必须修改）
JWT_SECRET=your-secret-key-change-in-production

# JWT 过期时间
JWT_EXPIRES_IN=7d

# CORS 允许的来源
CORS_ORIGIN=*

# 运行环境
NODE_ENV=development
```

## 📡 API 接口文档

### 基础信息

- **Base URL**: `http://localhost:3002`
- **Content-Type**: `application/json`
- **认证方式**: Bearer Token（在请求头中添加 `Authorization: Bearer <token>`）

### 统一响应格式

所有接口返回统一的 JSON 格式：

```json
{
  "code": 200,
  "message": "success",
  "success": true,
  "data": {}
}
```

### 认证接口

#### 1. 用户注册

```
POST /api/auth/register
```

**请求体：**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**验证规则：**
- `username`: 3-20 个字符
- `email`: 有效的邮箱格式
- `password`: 6-50 个字符

**响应示例：**
```json
{
  "code": 200,
  "message": "注册成功",
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

#### 2. 用户登录

```
POST /api/auth/login
```

**请求体：**
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**说明：** `username` 字段可以是用户名或邮箱

**响应示例：**
```json
{
  "code": 200,
  "message": "登录成功",
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

#### 3. 获取当前用户信息

```
GET /api/auth/me
```

**请求头：**
```
Authorization: Bearer <token>
```

**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "success": true,
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 文章接口

#### 1. 获取文章列表

```
GET /api/post/list
```

**查询参数：**
- `page` - 页码（默认：1）
- `page_size` - 每页数量（默认：10）
- `keyword` - 搜索关键词（可选，搜索标题和内容）

**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "title": "文章标题",
        "content": "文章内容",
        "slug": "article-slug",
        "author_id": 1,
        "author_name": "作者名",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 6,
    "page": 1,
    "page_size": 10
  }
}
```

#### 2. 获取文章详情

```
GET /api/post/:id
```

**路径参数：**
- `id` - 文章 ID（整数）

**响应示例：**
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

#### 3. 创建文章

```
POST /api/post
```

**请求体：**
```json
{
  "title": "文章标题",
  "content": "文章内容",
  "author_id": 1,
  "author_name": "作者名"
}
```

**验证规则：**
- `title`: 1-200 个字符，不能为空
- `content`: 1-10000 个字符，不能为空
- `author_id`: 可选，默认为 1
- `author_name`: 可选，默认为 "匿名用户"

**响应示例：**
```json
{
  "code": 200,
  "message": "创建成功",
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

#### 4. 更新文章

```
PUT /api/post/:id
```

**路径参数：**
- `id` - 文章 ID（整数）

**请求体：**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容"
}
```

**验证规则：**
- `title`: 1-200 个字符，不能为空
- `content`: 1-10000 个字符，不能为空

**响应示例：**
```json
{
  "code": 200,
  "message": "更新成功",
  "success": true,
  "data": {
    "id": 1,
    "title": "更新后的标题",
    "content": "更新后的内容",
    "slug": "article-slug",
    "author_id": 1,
    "author_name": "作者名",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T11:00:00Z"
  }
}
```

#### 5. 删除文章

```
DELETE /api/post/:id
```

**路径参数：**
- `id` - 文章 ID（整数）

**响应示例：**
```json
{
  "code": 200,
  "message": "删除成功",
  "success": true,
  "data": null
}
```

### 健康检查

```
GET /api/health
```

**响应示例：**
```json
{
  "code": 200,
  "message": "服务运行正常",
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

## 📝 数据格式

所有接口返回的数据字段使用下划线命名（snake_case），与前端保持一致：

- `author_id` - 作者ID
- `author_name` - 作者名称
- `created_at` - 创建时间（ISO 8601 格式）
- `updated_at` - 更新时间（ISO 8601 格式）
- `page_size` - 每页数量

## 🔒 认证机制

### JWT Token

- Token 通过 `Authorization` 请求头传递
- 格式：`Authorization: Bearer <token>`
- Token 默认有效期为 7 天（可通过环境变量配置）

### 需要认证的接口

目前所有文章接口都是公开的，但认证中间件已实现，可根据需要添加认证保护。

## 🎯 核心实现

### 中间件

1. **认证中间件** (`auth.ts`)
   - 验证 JWT Token
   - 解析用户信息并附加到请求对象

2. **验证中间件** (`validator.ts`)
   - 验证请求参数
   - 提供详细的错误信息

3. **错误处理中间件** (`errorHandler.ts`)
   - 统一错误响应格式
   - 404 路由处理

### 工具函数

1. **JWT 工具** (`jwt.ts`)
   - 生成 Token
   - 验证 Token

2. **密码工具** (`password.ts`)
   - 密码加密（bcryptjs）
   - 密码验证

### 数据存储

当前使用内存存储（数组），数据在服务器重启后会丢失。生产环境建议使用数据库（如 PostgreSQL、MongoDB 等）。

## 🐛 错误处理

所有错误都返回统一的格式：

```json
{
  "code": 400,
  "message": "错误信息",
  "success": false,
  "data": null
}
```

常见错误码：
- `400` - 请求参数错误
- `401` - 未授权（Token 无效或缺失）
- `404` - 资源不存在
- `500` - 服务器内部错误

## 🔧 开发说明

### 默认用户

服务器启动时会自动创建默认用户：
- 用户名：`admin`
- 邮箱：`admin@example.com`
- 密码：`admin123`

### 请求日志

开发环境下会自动打印请求日志：
```
GET /api/post/list
POST /api/auth/login
```

## 📄 许可证

MIT License

## 👨‍💻 作者

个人学习项目

---

**注意**：这是一个学习项目，使用内存存储，不适合生产环境使用。生产环境请使用数据库并配置适当的安全措施。
