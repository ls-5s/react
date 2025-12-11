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

## 使用 JSX 书写标签语言
JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。虽然还有其它方式可以编写组件，但大部分 React 开发者更喜欢 JSX 的简洁性，并且在大部分代码库中使用它。

**JSX 规则**

1. 只能返回一个根元素 
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。

例如，你可以使用一个 <div> 标签：
```jsx
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```
如果你不想在标签中增加一个额外的 <div>，可以用 <> 和 </> 元素来代替：
2. 标签必须闭合 
JSX 要求标签必须正确闭合。像 <img> 这样的自闭合标签必须书写成 <img />，而像 <li>oranges 这样只有开始标签的元素必须带有闭合标签，需要改为 <li>oranges</li>

3. 属性使用驼峰式命名 & 特殊属性替换

JSX 的属性名遵循小驼峰命名法，且 JavaScript 保留字 / HTML 带连字符的属性需要替换：
HTML 的class → JSX 的className（class是 JS 保留字）
HTML 的for → JSX 的htmlFor（for是 JS 保留字）
HTML 的onclick → JSX 的onClick（驼峰式）
HTML 的stroke-width → JSX 的strokeWidth（连字符转驼峰）
HTML 的font-size → JSX 的fontSize（连字符转驼峰）
```jsx
// 正确：使用className、htmlFor、onClick、fontSize
<div className="box" style={{ fontSize: '16px' }}>
  <label htmlFor="username">用户名：</label>
  <input id="username" type="text" onClick={() => {}} />
</div>

// 错误：使用class、for、onclick、font-size
<div class="box" style={{ font-size: '16px' }}>
  <label for="username">用户名：</label>
  <input id="username" type="text" onclick={() => {}} />
</div>
```
**注意**

- JSX and React 是相互独立的 东西。但它们经常一起使用，但你 可以 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。
- 为什么多个 JSX 标签需要被一个父元素包裹？
JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。
- 为什么要使用驼峰式？两个关键限制
1. 限制 1：JavaScript 中，对象键名不能包含连字符（-）
在 JavaScript 里，连字符-是减法运算符，如果对象键名写stroke-width，会被解析成stroke - width（即变量stroke减去变量width），导致语法错误。
2. 限制 2：JavaScript 的保留字不能作为标识符
JavaScript 有一系列保留字（如class、for、if、else等），这些单词被语言本身占用，不能直接作为变量名或对象键名。

## 在 JSX 中通过大括号使用 JavaScript