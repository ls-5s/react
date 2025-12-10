# 创建react的两种方式
- 方式 1：官方脚手架 create-react-app（最经典）

这是 React 官方提供的脚手架，无需手动配置构建工具，适合新手快速上手：
创建项目
打开终端，执行命令（my-react-app 是项目名，可自定义）：
```bash

npx create-react-app my-react-app
```
进入项目目录
项目创建完成后，进入项目文件夹：
```bash
cd my-react-app
```
启动开发服务器
启动本地调试服务，自动打开浏览器预览：
```bash
npm start
```
启动后，浏览器会自动访问 http://localhost:3000，即可看到 React 默认页面。
- 方式 2：使用 Vite 创建（更高效，推荐）

Vite 是现代前端构建工具，比 create-react-app 启动 / 热更新更快，适合追求效率的场景：
创建项目
执行命令（my-vite-react 是项目名，--template react 指定 React 模板）：
```bash
npm create vite@latest my-vite-react -- --template react
```
进入项目目录
```bash
cd my-vite-react
```
安装依赖
Vite 创建项目后需手动安装依赖：
```bash
npm install
```
启动开发服务器
```bash
npm run dev
```
启动后，终端会显示访问地址（通常是 http://localhost:5173），打开浏览器即可预览。
# 你的第一个组件