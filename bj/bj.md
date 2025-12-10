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
# 描述 UI
## 你的第一个组件
```js
function App () {
    return (
        <div>hello world</div>
    )
}
export default function Sum() {
    return (
        <App/>
    )
}
```
**注意：**
- React 组件是常规的 JavaScript 函数，但 组件的名称必须以大写字母开头，否则它们将无法运行！

但是，如果你的标签和 return 关键字不在同一行，则必须把它包裹在一对括号中，如下所示：
```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```
- 没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！
- 组件可以渲染其他组件，但是 请不要嵌套他们的定义：
```js
export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
```
- 上面这段代码 非常慢，并且会导致 bug 产生。因此，你应该在顶层定义每个组件：
```js
export default function Gallery() {
  // ...
}

// ✅ 在顶层声明组件
function Profile() {
  // ...
}
```
- 当子组件需要使用父组件的数据时，你需要 通过 props 的形式进行传递，而不是嵌套定义。

## 组件的导入与导出
组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

1. 具名导出（推荐：多组件 / 精准复用场景）
这是你之前代码里的写法，适合一个文件导出多个成员（比如同时导出 Gallery 和 Profile）：
```jsx
// Gallery.js - 顶层定义 + 具名导出 Profile
export default function Gallery() { // Gallery 用默认导出（核心组件）
  return <div><Profile /></div>;
}

// Profile 用具名导出（次要/复用组件）
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

// 外部导入：精准导入 Profile
import { Profile } from './Gallery.js';
// 同时导入 Gallery（默认）+ Profile（具名）
import Gallery, { Profile } from './Gallery.js';
```
2. 默认导出（推荐：单组件独立文件场景）
如果把 Profile 拆成独立文件（比如 Profile.js），用默认导出更简洁（一个文件只导出一个核心组件）：
```jsx
// Profile.js - 独立文件 + 默认导出
export default function Profile() { // 无需要花括号，直接默认导出
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

// 外部导入：可自定义名称（无需和原名称匹配）
import Profile from './Profile.js';
// 甚至可以重命名（比如避免冲突）
import UserProfile from './Profile.js';
```