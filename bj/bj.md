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
**特殊传值**
- 一、场景 1：组件标签包裹的内容（children不能直接换名）
children是 React 的内置特殊 props，专门用来接收组件标签对之间包裹的内容。比如你原来的写法：
```jsx
===================
// 子组件：把 children 重命名为 btnText
function AlertButton({ message, children: btnText }) 
====================
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
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
- 简化写法：filter() + map() 链式调用
```jsx
import React from 'react';

function AdultUserList() {
  const users = [
    { id: 1, name: '张三', age: 20 },
    { id: 2, name: '李四', age: 17 },
    { id: 3, name: '王五', age: 25 },
  ];

  return (
    <div>
      <h3>成年用户列表</h3>
      <ul>
        {users
          // 先筛选：只保留成年用户
          .filter((user) => user.age > 18)
          // 再转换：生成组件
          .map((user) => (
            <li key={user.id}>
              姓名：{user.name}，年龄：{user.age}岁
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AdultUserList;
```
**注意**
因为箭头函数会隐式地返回位于 => 之后的表达式，所以你可以省略 return 语句。
```jsx
const listItems = chemists.map(person =>
  <li>...</li> // 隐式地返回！
);
```
不过，如果你的 => 后面跟了一对花括号 { ，那你必须使用 return 来指定返回值！
```jsx
const listItems = chemists.map(person => { // 花括号
  return <li>...</li>;
});
```
箭头函数 => { 后面的部分被称为 “块函数体”，块函数体支持多行代码的写法，但要用 return 语句才能指定返回值。假如你忘了写 return，那这个函数什么都不会返回！

- 为每个列表项显示多个 DOM 节点
如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 <> </> 无法接受 key 值，所以你只能要么把生成的节点用一个 <div> 标签包裹起来，要么使用长一点但更明确的 <Fragment> 写法：
```jsx
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```
- 直接放在 map() 方法里的 JSX 元素一般都需要指定 key 值！

## 保持组件纯粹(看的有点云里雾里的)

# 添加交互
## 响应事件
使用 React 可以在 JSX 中添加 事件处理函数。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。
**添加事件处理函数**
按照如下三个步骤，即可让它在用户点击时显示消息：

1. 在 Button 组件 内部 声明一个名为 handleClick 的函数。
2. 实现函数内部的逻辑（使用 alert 来显示消息）。
3. 添加 onClick={handleClick} 到 <button> JSX 中。
```jsx
export default function app () {

  function s () {
    alert("jjjjjjjjjj")
  }
  return (
    <button onClick={s}>点击<button>
  )
}
```

**在事件处理函数中读取 props**
```jsx
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
    </div>
  );
}
```
**阻止传播**
这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation() ：
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}

```
**阻止默认行为**
某些浏览器事件具有与事件相关联的默认行为。例如，点击 <form> 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：
你可以调用事件对象中的 e.preventDefault() 来阻止这种情况发生：
```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```
## State：组件的记忆
组件通常需要根据交互更改屏幕上显示的内容。输入表单应该更新输入字段，单击轮播图上的“下一个”应该更改显示的图片，单击“购买”应该将商品放入购物车。组件需要“记住”某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 state。
**怎么去使用它**
```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

```
**注意**
Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。 你不能在条件语句、循环语句或其他嵌套函数内调用 Hook。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。
**State 是隔离且私有的**
State 是屏幕上组件实例内部的状态。换句话说，如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！改变其中一个不会影响另一个。

## 渲染和提交
组件显示到屏幕之前，其必须被 React 渲染。理解这些处理步骤将帮助你思考代码的执行过程并能解释其行为。
想象一下，你的组件是厨房里的厨师，把食材烹制成美味的菜肴。在这种场景下，React 就是一名服务员，他会帮客户们下单并为他们送来所点的菜品。这种请求和提供 UI 的过程总共包括三个步骤：

1.触发 一次渲染（把客人的点单分发到厨房）
2.渲染 组件（在厨房准备订单）
3.提交 到 DOM（将菜品放在桌子上）

**步骤 1: 触发一次渲染**
有两种原因会导致组件的渲染:
1.组件的 初次渲染。
2.组件（或者其祖先之一）的 状态发生了改变。
**步骤 2: React 渲染你的组件**
在你触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。“渲染中” 即 React 在调用你的组件。

- 在进行初次渲染时, React 会调用根组件。
- 对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件。
**注意：**
渲染必须始终是一次 纯计算:
输入相同，输出相同。 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
只做它自己的事情。 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）
否则，随着代码库复杂性的增加，你可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。

**步骤 3: React 把更改提交到 DOM 上**
在渲染（调用）你的组件之后，React 将会修改 DOM。

- 对于初次渲染，React 会使用 appendChild() DOM API 将其创建的所有 DOM 节点放在屏幕上。
- 对于重渲染，React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。

## state 如同一张快照
也许 state 变量看起来和一般的可读写的 JavaScript 变量类似。但 state 在其表现出的特性上更像是一张快照。设置它不会更改你已有的 state 变量，但会触发重新渲染。
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```
简单来说：setTimeout 的回调函数捕获的是事件处理函数执行时的 number 快照，而不是状态更新后的最新值。
一个 state 变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是异步的。在 那次渲染的 onClick 内部，number 的值即使在调用 setNumber(number + 5) 之后也还是 0。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。
**函数式更新突破快照的限制（合理利用快照特性）**
```jsx
import { useState } from 'react';

export default function SnapshotDemo3() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 函数式更新：参数 prevCount 是上一次更新后的 state 快照
    setCount(prevCount => prevCount + 1); // 基于快照0 → 1
    setCount(prevCount => prevCount + 1); // 基于快照1 → 2
    setCount(prevCount => prevCount + 1); // 基于快照2 → 3
    // 最终 count 会变成3，因为每次更新都基于前一次的最新快照
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>点击+3</button>
    </div>

  );
}
```
- 函数式更新的参数 prevCount 是 React 帮我们保存的上一次更新后的 state 快照，而不是当前渲染的快照。
- 三次调用中，每次的 prevCount 都是前一次更新后的结果，所以最终能实现累加 3 的效果。
- 这是 React 在快照特性下，为我们提供的既保持快照的稳定性，又能实现连续更新的优雅方案。

## 把一系列 state 更新加入队列
设置组件 state 会把一次重新渲染加入队列。但有时你可能会希望在下次渲染加入队列之前对 state 的值执行多次操作。为此，了解 React 如何批量更新 state 会很有帮助。
**React 会对 state 更新进行批处理**
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    // 三次直接传值更新，都基于初始的number=0
    setNumber(number + 1); // 0+1=1
    setNumber(number + 1); // 0+1=1（覆盖上一个）
    setNumber(number + 1); // 0+1=1（再覆盖）
  };

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>增加数字</button>
    </>
  );
}
```
**在下次渲染前多次更新同一个 state**
```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    // 三次直接传值更新，都基于初始的number=0
    setNumber(number + 1); // 0+1=1
    setNumber(number + 1); // 0+1=1（覆盖上一个）
    setNumber(number + 1); // 0+1=1（再覆盖）
  };

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>增加数字</button>
    </>
  );
}
```

## 更新 state 中的对象