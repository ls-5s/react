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
JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript。

**使用引号传递字符串**
```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

**可以在哪使用大括号**

在 JSX 中，只能在以下两种场景中使用大括号：

- 用作 JSX 标签内的文本：<h1>{name}'s To Do List</h1> 是有效的，但是 <{tag}>Gregorio Y. Zara's To Do List</{tag}> 无效。
- 用作紧跟在 = 符号后的 属性：src={avatar} 会读取 avatar 变量，但是 src="{avatar}" 只会传一个字符串 {avatar}。
  
**使用 “双大括号”：JSX 中的 CSS 和 对象** 

除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 { name: "Hedy Lamarr", inventions: 5 }。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：person={{ name: "Hedy Lamarr", inventions: 5 }}。

**注意**
内联 style 属性 使用驼峰命名法编写。例如，
```HTML 
<ul style="background-color: black"> 在你的组件里应该写成 <ul style={{ backgroundColor: 'black' }}>。
```
## 将 Props 传递给组件
React 组件使用 props 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

- 步骤 1：创建子组件文件 Avatar.jsx
在该文件中定义并导出子组件Avatar（命名导出 / 默认导出均可，这里用默认导出）：
```jsx
// src/components/Avatar.jsx
// 子组件 Avatar：定义并默认导出
export default function Avatar({ person, size }) {
  const { name, imageId } = person;
  const imageUrl = `https://i.imgur.com/${imageId}.jpg`;

  return (
    <img
      src={imageUrl}
      alt={name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
}
```
- 步骤 2：在父组件文件 Profile.jsx 中导入子组件
在父组件文件中通过import语句引入Avatar组件，然后使用：
```jsx
// src/components/Profile.jsx
// 导入子组件 Avatar（路径根据文件实际位置调整）
import Avatar from './Avatar';

// 父组件 Profile：默认导出
export default function Profile() {
  return (
    <div style={{ padding: '20px' }}>
      <Avatar
        person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
        size={100}
      />
    </div>
  );
}
```

- 先理解 React 组件的 props 本质
React 函数组件的参数本质上是一个props 对象，这个对象包含了父组件传递过来的所有属性。比如：当父组件这样使用你的 Avatar 组件时：
```jsx
<Avatar person={{ name: '张三', img: 'xxx.jpg' }} size={40} />
你的 Avatar 组件接收到的参数其实是一个完整的对象，长这样：
javascript
运行
{
  person: { name: '张三', img: 'xxx.jpg' },
  size: 40
}
```
- 使用 JSX 展开语法传递 props
有时候，传递 props 会变得非常重复：
```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
改成
```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
## 条件渲染
通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 if 语句、&& 和 ? : 运算符来选择性地渲染 JSX。

**if/else 语句的使用**
如果 isPacked 属性是 true，这段代码会返回一个不一样的 JSX。通过这样的改动，一些物品的名字后面会出现一个勾选符号：
```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

```
Sally Ride 的行李清单
宇航服 ✅
带金箔的头盔 ✅
Tam 的照片

**子和父组件在同一个页面是否有先后顺序**
- 语法层面：顺序不强制（函数声明的 “提升” 特性）

在你的代码中，Item和PackingList都是函数式组件（采用函数声明的方式：function 组件名() {}）。而 JavaScript 有一个函数声明提升（Hoisting） 的特性：
- 特殊情况：顺序会强制要求（函数表达式 / 箭头函数）

如果你的组件采用函数表达式（或箭头函数）的方式定义（比如const Item = () => {}），那么必须先定义子组件，再定义父组件，因为函数表达式没有 “提升” 特性，未定义就使用会直接报错。

**选择性地包含 JSX**
- 解决重复代码问题
- 解决思路

核心思路是：把重复的 JSX 部分（<li className="item">...</li>）提取为公共部分，只对变化的部分（✅标记）进行条件控制。具体有两种常用的实现方式，都能达到消除重复的目的。

=======================================

先定义变量存储动态内容（适合新手理解）
我们可以先创建一个变量来存储 “物品名称 + 可选的✅”，然后将这个变量嵌入到公共的<li>标签中，这样就只需要写一次<li className="item">。
```jsx
import React from 'react';

function Item({ name, isPacked }) {
  // 定义变量存储动态内容：根据isPacked决定是否添加✅
  let itemContent = name;
  if (isPacked) {
    itemContent = `${name} ✅`; // 也可以写为 itemContent = name + " ✅";
  }

  // 只返回一次公共的<li>标签，嵌入动态内容
  return <li className="item">{itemContent}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item isPacked={true} name="宇航服" />
        <Item isPacked={true} name="带金箔的头盔" />
        <Item isPacked={false} name="Tam 的照片" />
      </ul>
    </section>
  );
}
```
**三目运算符（? :）**
除了这样：
```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```
你还可以这样实现：
```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```
**与运算符（&&）**
```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

```
在 JavaScript 中，A && B的执行逻辑是：
如果A为真（true），则表达式返回B；
如果A为假（false），则表达式返回false（React 会自动忽略false、null、undefined这些值，不会渲染到页面上）。

**注意**
切勿将数字放在 && 左侧.
- JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

- 例如，一个常见的错误是 messageCount && <p>New messages</p>。其原本是想当 messageCount 为 0 的时候不进行渲染，但实际上却渲染了 0。

- 为了更正，可以将左侧的值改成布尔类型：messageCount > 0 && <p>New messages</p>。

## 渲染列表
你可能经常需要通过 JavaScript 的数组方法 来操作数组中的数据，从而将一个数据集渲染成多个相似的组件。在这篇文章中，你将学会如何在 React 中使用 filter() 筛选需要渲染的组件和使用 map() 把数组转换成组件数组。
