# React + TypeScript 项目

项目路径：`nuxt-4/react`，使用 **Vite + React 19 + TypeScript** 脚手架。

## 常用命令

```bash
cd nuxt-4/react

pnpm dev      # 开发环境（默认 http://localhost:5173）
pnpm build    # 生产构建
pnpm preview  # 预览构建结果
pnpm lint     # ESLint 检查
```

## 目录结构

```
my-react-app/
├── node_modules/      # 依赖包（不变）
├── public/            # 静态资源（不变，可新增全局静态文件如img/fonts）
│   └── img/           # 全局图片（如logo、背景图，不会被Webpack处理）
├── src/               # 核心源码
│   ├── api/           # 接口封装（对应Vue的src/api）
│   │   ├── request.js # axios封装（拦截器、baseURL等）
│   │   ├── user.js    # 用户相关接口
│   │   └── post.js    # 文章相关接口
│   ├── assets/        # 静态资源（会被Webpack处理，如图片、字体、全局样式）
│   │   ├── img/       # 业务图片（如组件内用的图标、配图）
│   │   ├── fonts/     # 字体文件
│   │   └── styles/    # 全局样式（如reset.css、变量.scss）
│   ├── components/    # 通用公共组件（全局复用，对应Vue的src/components）
│   │   ├── Button/    # 组件按文件夹组织（单文件组件拆分）
│   │   │   ├── index.js # 组件入口
│   │   │   └── Button.css # 组件样式
│   │   ├── Loading/   # 加载组件
│   │   └── NavBar/    # 导航栏组件
│   ├── hooks/         # 自定义Hooks（React特色，抽离复用的逻辑）
│   │   ├── useApi.js  # 封装API调用的Hook
│   │   └── useAuth.js # 封装权限校验的Hook
│   ├── layouts/       # 布局组件（对应Vue的src/layouts）
│   │   ├── RootLayout.js # 根布局（包含Outlet，对应路由的父布局）
│   │   └── AdminLayout.js # 管理后台布局
│   ├── pages/         # 页面组件（对应Vue的src/views）
│   │   ├── Home/      # 首页（页面级组件，按文件夹组织）
│   │   ├── About/     # 关于页
│   │   ├── User/      # 用户中心模块
│   │   │   ├── Profile.js # 用户资料页
│   │   │   └── Settings.js # 用户设置页
│   │   ├── Admin/     # 管理后台模块
│   │   └── NotFound/  # 404页面
│   ├── router/        # 路由配置（对应Vue的src/router）
│   │   └── index.js   # 路由核心配置（createBrowserRouter）
│   ├── store/         # 状态管理（如Redux/Recoil/Pinia，对应Vue的src/store）
│   │   ├── slices/    # Redux Toolkit的切片
│   │   └── index.js   # 状态仓库配置
│   ├── utils/         # 工具函数（对应Vue的src/utils）
│   │   ├── format.js  # 格式化工具（如时间、金额）
│   │   └── storage.js # 本地存储工具（localStorage/sessionStorage）
│   ├── App.js         # 根组件（挂载路由Outlet）
│   ├── index.js       # 项目入口（挂载App到DOM）
│   └── index.css      # 全局样式
├── .env               # 环境变量（如开发环境API地址）
├── .env.production    # 生产环境变量
├── .gitignore         # git忽略配置
├── package.json       # 依赖+脚本
└── README.md          # 项目文档
```

## 技术栈

- **React 19** + **TypeScript**
- **Vite 7** 构建
- **ESLint** + **TypeScript ESLint**

# 描述UI
## 第一个组件
```ts
export default function Sum() {
    return (
        <h1>hello World</h1>
    )
}
```
## 组件的导入和导出
Gallery.ts
```ts
export default function P() {
    return (
        <> 
        <h1>hello World</h1>
        </>
    )
}
```
app.ts
```ts
import Gallery from './Gallery.ts'
export default function App() {
  return (
    <Gallery />
  );
}
```
## 使用 JSX 书写标签语言
规则
- 根元素规则：组件返回多个 JSX 元素时，必须用一个父元素（如<div>）或 React Fragment（<>...</>）包裹，仅能返回一个根元素。
- 标签闭合规则：所有 JSX 标签需严格闭合，自闭合标签（img/input 等）需写为<标签名 />，成对标签需包含开始和结束标签（如<li>内容</li>）。
- 属性命名规则：JSX 属性使用驼峰式命名，替换 JavaScript 保留字（class→className、for→htmlFor），连字符属性改为驼峰（stroke-width→strokeWidth）。
## 在 JSX 中通过大括号使用 JavaScript
```ts
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
## 将 Props 传递给组件
步骤 1: 将 props 传递给子组件 
首先，将一些 props 传递给 Avatar。例如，让我们传递两个 props：person（一个对象）和 size（一个数字）：
```ts
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
子
```ts
// Avatar.jsx
export default function Avatar({ person, size }) {
  // 从 person 对象中解构出 name 和 imageId
  const { name, imageId } = person;

  // 根据 imageId 拼接完整的图片 URL (以 imgur 为例)
  const imageUrl = `https://i.imgur.com/${imageId}.jpg`;

  return (
    // 使用接收到的 size prop 来设置图片的宽度和高度
    <img
      src={imageUrl}
      alt={name} // 使用 name 作为图片的替代文本
      width={size}
      height={size}
      style={{
        borderRadius: '50%', // 让图片变成圆形头像
        objectFit: 'cover',   // 确保图片在圆形内完整显示，不拉伸变形
        border: '2px solid #fff', // 可选：添加白色边框
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)' // 可选：添加轻微阴影
      }}
    />
  );
}
```
## 条件渲染
```ts
// Item.tsx
import React from 'react';

// 1. 为 Item 组件的 Props 定义一个接口
interface ItemProps {
  name: string;       // name 属性必须是字符串类型
  isPacked: boolean;  // isPacked 属性必须是布尔类型
}

// 2. 让组件的 Props 参数符合这个接口定义
function Item({ name, isPacked }: ItemProps) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default Item;
```
```ts
// PackingList.tsx
import React from 'react';
import Item from './Item'; // 导入 TS 版本的 Item 组件

// 父组件 PackingList 没有接收 Props，所以可以简化定义
export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        {/* TypeScript 会自动检查传递的 Props 是否符合 ItemProps 接口定义 */}
        <Item isPacked={true} name="宇航服" />
        <Item isPacked={true} name="带金箔的头盔" />
        <Item isPacked={false} name="Tam 的照片" />
        {/* 如果传递错误的类型，比如 isPacked="yes"，TypeScript 会在编译时报错 */}
      </ul>
    </section>
  );
}
```
- 选择性地返回 null 
在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 null。
## 渲染列表
```ts
// 1. 定义 Person 接口，明确数组项的类型结构
interface Person {
  id: number;
  name: string;
  profession: string;
  // 补充 accomplishment 字段（原代码用到但未定义）
  accomplishment?: string;
}

// 2. 定义 people 数组并指定类型（TS 会自动推导，但显式注解更清晰）
const people: Person[] = [{
  id: 0,
  name: '凯瑟琳·约翰逊',
  profession: '数学家',
  accomplishment: '计算航天轨道'
}, {
  id: 1,
  name: '马里奥·莫利纳',
  profession: '化学家',
  accomplishment: '发现臭氧层空洞成因'
}, {
  id: 2,
  name: '穆罕默德·阿卜杜勒·萨拉姆',
  profession: '物理学家',
  accomplishment: '弱电统一理论'
}, {
  id: 3,
  name: '珀西·莱温·朱利亚',
  profession: '化学家',
  accomplishment: '有机合成化学贡献'
}, {
  id: 4,
  name: '苏布拉马尼扬·钱德拉塞卡',
  profession: '天体物理学家',
  accomplishment: '钱德拉塞卡极限'
}];

// 3. 定义 getImageUrl 函数的类型（原代码用到但未实现）
const getImageUrl = (person: Person): string => {
  // 模拟图片 URL 生成逻辑（可根据实际需求修改）
  return `./images/${person.id}.jpg`;
};

// 4. 过滤出所有化学家（TS 会自动推导 chemists 类型为 Person[]）
const chemists: Person[] = people.filter((person: Person) => 
  person.profession === '化学家'
);

// 5. 生成列表项（假设是 React 组件场景，补充 React 类型）
// 若不是 React 场景，可将 JSX 改为普通字符串拼接
import React from 'react'; // React 项目需引入
const listItems = chemists.map((person: Person) => (
  <li key={person.id}> {/* React 列表需加 key 属性 */}
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}:</b>
      {' ' + person.profession + ' '}
      因{person.accomplishment || '突出贡献'}而闻名世界
    </p>
  </li>
));

// 6. 返回列表（React 组件中使用）
const ChemistList = () => {
  return <ul>{listItems}</ul>;
};

export default ChemistList;
```
# 添加交互
## 响应事件
方法 1：箭头函数包裹（最常用，适合单个按钮）
直接在 onClick 里用箭头函数调用事件处理函数，并传入参数，直观易懂。
```jsx
export default function Button() {
  // 定义带参数的事件处理函数
  function handleClick(message) {
    alert(message);
  }

  return (
    {/* 用箭头函数包裹，点击时才会调用 handleClick 并传参 */}
    <button onClick={() => handleClick('你点击了我！这是带参的提示～')}>
      点我
    </button>
  );
}
```
如果需要传多个参数，同样用箭头函数传递即可：
```jsx
export default function Button() {
  function handleClick(buttonId, buttonText) {
    alert(`你点击了按钮【${buttonId}】：${buttonText}`);
  }

  return (
    <button onClick={() => handleClick(1, "提交按钮")}>
      点我
    </button>
  );
}
```
```ts
import React from 'react';

// Props 接口保持不变（核心类型约束）
interface ButtonProps {
  onSmash: () => void;
  leftIcon?: React.ReactNode;
  content: React.ReactNode;
  suffix?: React.ReactNode;
}

// 仅指定参数类型，去掉返回值注解（TS 自动推导返回值）
const Button = ({
  onSmash,
  leftIcon,
  content,
  suffix,
}: ButtonProps) => { // 删掉 : React.ReactElement
  return (
    <button
      onClick={onSmash}
      style={{
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
      }}
    >
      {leftIcon}
      {content}
      {suffix}
    </button>
  );
};

// 无参数 + 无返回值注解（TS 自动推导）
const VIPTag = () => (
  <span style={{
    background: '#ff0000',
    color: '#ffffff',
    fontSize: '12px',
    padding: '0 4px',
    borderRadius: '2px',
  }}>
    VIP
  </span>
);

// 根组件：无参数 + 无返回值注解
const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Button
        onSmash={() => alert('正在播放！')}
        leftIcon={<span>🎬</span>}
        content="播放电影"
        suffix={<VIPTag />}
      />

      <Button
        onSmash={() => alert('正在上传！')}
        content="上传图片"
      />
    </div>
  );
};

export default App;
```
阻止传播 
事件处理函数接收一个 事件对象 作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 e.stopPropagation() ：
阻止默认行为 
某些浏览器事件具有与事件相关联的默认行为。例如，点击 <form> 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：
```ts
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
和ref 使用是差不多的
```ts
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
## state 如同一张快照
```ts
// 从React库中导入useState钩子，用于管理组件状态
import { useState } from 'react';

// 定义并导出Counter组件（默认导出）
export default function Counter() {
  // 初始化状态：
  // number → 当前渲染批次的state快照，初始值为0
  // setNumber → 修改state的函数，调用后触发组件重渲染（但不会立即改变当前的number快照）
  const [number, setNumber] = useState(0);

  return (
    <>
      {/* 渲染当前的number快照值（页面显示的数字） */}
      <h1>{number}</h1>
      
      {/* 按钮点击事件：尝试通过三次setNumber让number+3 */}
      <button onClick={() => {
        // 【核心：state是快照】
        // 此时number是当前渲染的快照（初始值0），三次setNumber都基于这个旧快照计算
        setNumber(number + 1); // 基于number=0 → 预约新值1（但当前number仍为0）
        setNumber(number + 1); // 还是基于number=0 → 预约新值1（覆盖上一次的预约）
        setNumber(number + 1); // 还是基于number=0 → 预约新值1（最终只生效这一次）
        
        // 执行完这三行，当前作用域的number依然是0（快照特性），组件重渲染后才会变成1
      }}>+3</button>
    </>
  )
}

// 【补充说明】
// 实际效果：点击按钮后，页面数字只会从0→1，而非预期的3
// 解决方法（用prev拿最新值）：
// <button onClick={() => {
//   setNumber(prev => prev + 1); // prev=0 → 1
//   setNumber(prev => prev + 1); // prev=1 → 2
//   setNumber(prev => prev + 1); // prev=2 → 3
// }}>+3</button>
```
## 把一系列 state 更新加入队列
```ts
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```
## 更新 state 中的对象
immer
```ts
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```
## 更新 state 中的数组
```ts
// array-demo.ts
import { produce } from 'immer';
import type { Todo, TodoState } from './types';

// 初始化原始状态
const originalState: TodoState = {
  todos: [
    { id: 1, content: '学习 Immer', completed: false },
    { id: 2, content: '编写 TS 代码', completed: true },
  ],
  filter: 'all',
};

// ==============================================
// 场景1：使用 Immer 操作数组（推荐写法）
// ==============================================
const newState = produce(originalState, (draft) => {
  // 1. 新增数组元素（push/unshift 直接用）
  draft.todos.push({ id: 3, content: '测试数组操作', completed: false });

  // 2. 修改指定索引的对象属性（嵌套更新，无需展开）
  draft.todos[0].completed = true;

  // 3. 删除元素：根据索引删除（splice）
  // draft.todos.splice(1, 1);

  // 4. 条件删除：过滤未完成任务（直接赋值替换数组）
  draft.todos = draft.todos.filter((item) => !item.completed);

  // 5. 批量更新：遍历修改所有任务状态
  draft.todos.forEach((item) => {
    item.completed = false;
  });

  // 6. 清空数组
  // draft.todos = [];
});

// ==============================================
// 对比：原生不可变更新写法（嵌套越深越繁琐）
// ==============================================
const nativeNewState = {
  ...originalState,
  todos: originalState.todos.map((item) =>
    item.id === 1 ? { ...item, completed: true } : item
  ),
};

// 验证结果：原始状态不变，新状态已更新
console.log('原始状态长度：', originalState.todos.length); // 2
console.log('新状态长度：', newState.todos.length); // 3
console.log('引用是否相同：', originalState === newState); // false
```
# 状态管理
## 用 State 响应输入
好的，我帮你把“声明式地考虑UI”这5个步骤拆开解释，并用一个完整的React样例来串联演示，让你看得更清楚。

---

- 核心思想
“声明式地考虑UI”是React这类框架的核心思路：你不需要手动操作DOM去更新界面，只需要**描述UI在不同状态下应该是什么样子**，框架会自动帮你完成DOM的更新。

---
- 步骤1：定位组件中不同的视图状态
**解释**：先梳理你的UI会呈现哪些不同的显示状态，也就是“不同场景下，用户看到的内容有什么不一样”。
**样例**：
假设我们做一个“点赞按钮”，它有2种核心状态：
- 未点赞：显示 `👍 点赞`
- 已点赞：显示 `❤️ 已点赞`

---

- 步骤2：确定是什么触发了这些状态的改变
**解释**：找到导致状态切换的用户行为或外部事件，比如点击、输入、接口返回等。
**样例**：
对于点赞按钮，状态改变的唯一触发条件就是**用户点击按钮**这个动作。

---

- 步骤3：通过 `useState` 表示内存中的 state
**解释**：用React的 `useState` Hook 把UI状态转化为可管理的变量，让状态和UI关联起来。
**样例**：
```jsx
import { useState } from 'react';

function LikeButton() {
  // 定义状态变量 isLiked，初始值为 false（未点赞状态）
  const [isLiked, setIsLiked] = useState(false);

  // ...后续逻辑
}
```

---

- 步骤4：删除任何不必要的 state 变量
**解释**：检查状态变量是否可以通过已有数据推导出来。如果一个状态可以由其他状态计算得到，就不需要单独存为 state，避免冗余。
**样例**：
- ❌ 冗余写法（不推荐）：同时存 `isLiked` 和 `likeText` 两个 state
  ```jsx
  const [isLiked, setIsLiked] = useState(false);
  const [likeText, setLikeText] = useState('👍 点赞');
  ```
- ✅ 优化写法（推荐）：删除 `likeText`，用 `isLiked` 直接推导文字
  ```jsx
  const buttonText = isLiked ? '❤️ 已点赞' : '👍 点赞';
  ```

---

- 步骤5：连接事件处理函数以设置 state
**解释**：给触发状态变化的事件绑定处理函数，在函数里调用 `setState` 更新状态，让UI自动重新渲染。
**样例**：
```jsx
import { useState } from 'react';

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  // 点击按钮时触发的处理函数
  const handleClick = () => {
    // 切换 isLiked 的状态
    setIsLiked(!isLiked);
  };

  // 用 isLiked 推导按钮文字
  const buttonText = isLiked ? '❤️ 已点赞' : '👍 点赞';

  // 声明式渲染：UI 会根据 isLiked 的值自动显示对应内容
  return <button onClick={handleClick}>{buttonText}</button>;
}
```

---

- 完整运行效果
当用户点击按钮时：
1. `handleClick` 触发，调用 `setIsLiked(!isLiked)` 切换状态
2. `isLiked` 从 `false` 变成 `true`（或反之）
3. React 自动重新渲染组件，`buttonText` 会根据新的 `isLiked` 值更新，按钮文字随之变化
4. 整个过程你不需要手动修改DOM，只需要描述“状态→UI”的映射关系

---

如果你需要，我可以帮你写一个**带输入框验证的完整组件**，把这5个步骤再完整走一遍，让你更深入理解。需要吗？

## 选择 State 结构
- 核心思想
构建state的核心目标是：让你的状态**简洁、可预测、易于维护**，减少冗余和矛盾，避免后续出现难以排查的bug。

---

- 1. 合并关联的 state
当多个状态变量是**强关联、会一起变化**的时候，把它们合并成一个对象/数组，而不是拆成多个独立的 `useState`。这样可以避免状态不同步，让逻辑更清晰。

 Demo：移动的坐标点
```jsx
// ✅ 推荐：合并关联的 state
import { useState } from 'react';

function MovingDot() {
  // 把 x、y 坐标合并成一个 position 对象
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (direction) => {
    setPosition(prev => {
      switch (direction) {
        case 'up': return { ...prev, y: prev.y - 10 };
        case 'down': return { ...prev, y: prev.y + 10 };
        case 'left': return { ...prev, x: prev.x - 10 };
        case 'right': return { ...prev, x: prev.x + 10 };
        default: return prev;
      }
    });
  };

  return (
    <div>
      <div style={{ 
        position: 'absolute', 
        left: position.x, 
        top: position.y,
        width: 20,
        height: 20,
        backgroundColor: 'red'
      }} />
      <button onClick={() => handleMove('up')}>上</button>
      <button onClick={() => handleMove('down')}>下</button>
      <button onClick={() => handleMove('left')}>左</button>
      <button onClick={() => handleMove('right')}>右</button>
    </div>
  );
}
```

---

- 2. 避免矛盾的 state
 解释
不要用多个布尔值表示互斥的状态（比如 `isLoading` 和 `isError` 不能同时为 `true`）。应该用**枚举类型的单一状态**来表示所有可能的情况，让状态变化更清晰。

Demo：数据请求状态
```jsx
// ✅ 推荐：用单一 status 表示所有状态
import { useState, useEffect } from 'react';

function DataFetcher() {
  // 用枚举值表示状态：idle → loading → success/error
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        const res = await fetch('https://api.example.com/data');
        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (err) {
        setError(err);
        setStatus('error');
      }
    };
    fetchData();
  }, []);

  if (status === 'loading') return <div>加载中...</div>;
  if (status === 'error') return <div>出错了：{error.message}</div>;
  if (status === 'success') return <div>数据：{JSON.stringify(data)}</div>;
  return <div>初始状态</div>;
}
```

---

- 3. 避免冗余的 state
 解释
不要存储可以通过**现有state/props计算出来的值**。冗余的state会增加维护成本，还可能导致数据不一致。
 Demo：购物车总价
```jsx
// ✅ 推荐：总价通过计算得到，不单独存为 state
import { useState } from 'react';

function Cart() {
  const [quantity, setQuantity] = useState(1);
  const price = 99;

  // 总价通过 quantity * price 计算，不需要单独存为 state
  const total = quantity * price;

  return (
    <div>
      <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
      <span>数量：{quantity}</span>
      <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      <div>总价：¥{total}</div>
    </div>
  );
}
```

---

- 4. 避免重复的 state
 解释
不要在多个组件（或组件的多个地方）存储相同的数据。应该遵循**单一数据源原则**，把共享状态提升到最近的公共父组件，子组件通过props接收。

 Demo：Todo 列表（单一数据源）
```jsx
// ✅ 推荐：父组件存 todos，子组件通过 props 接收
import { useState } from 'react';

// 子组件：只负责渲染单个 Todo
function TodoItem({ todo, onToggle }) {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
      />
      <span>{todo.text}</span>
    </div>
  );
}

// 父组件：作为单一数据源，存储所有 todos
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习React', completed: false },
    { id: 2, text: '写Demo', completed: false }
  ]);

  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  );
}
```

---

- 5. 避免深度嵌套的 state
 解释
尽量用**扁平化的结构**存储state，避免多层嵌套对象（比如 `user.profile.address.city`）。嵌套过深会让状态更新和读取变得复杂，也容易引发不可变更新的bug。

 Demo：用户信息（扁平存储）
```jsx
// ✅ 推荐：扁平化存储用户信息
import { useState } from 'react';

function UserProfile() {
  // 扁平存储，而非嵌套对象 { user: { profile: { name: '', email: '' } } }
  const [name, setName] = useState('张三');
  const [email, setEmail] = useState('zhangsan@example.com');
  const [city, setCity] = useState('北京');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={city} onChange={(e) => setCity(e.target.value)} />
    </div>
  );
}
```

---

如果你需要，我可以帮你写一个**综合了所有原则的完整Todo应用Demo**，让你一次性看到这些原则在真实项目里的结合用法。需要吗？

## 在组件间共享状态
```ts
import { useState } from 'react';

// 子组件：摄氏度输入框
function CelsiusInput({ value, onTemperatureChange }) {
  const handleChange = (e) => {
    // 调用父组件传递的更新函数
    onTemperatureChange(Number(e.target.value));
  };

  return (
    <div>
      <label>摄氏度：</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="输入摄氏度"
      />
    </div>
  );
}

// 子组件：华氏度输入框
function FahrenheitInput({ value, onTemperatureChange }) {
  const handleChange = (e) => {
    // 调用父组件传递的更新函数
    onTemperatureChange(Number(e.target.value));
  };

  return (
    <div>
      <label>华氏度：</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="输入华氏度"
      />
    </div>
  );
}

// 父组件：管理共享状态，实现状态提升
export default function TemperatureConverter() {
  // 父组件保存共享状态（以摄氏度为基准值）
  const [celsius, setCelsius] = useState('');

  // 摄氏度转华氏度的计算函数
  const toFahrenheit = (c) => {
    return c * 9 / 5 + 32;
  };

  // 华氏度转摄氏度的计算函数
  const toCelsius = (f) => {
    return (f - 32) * 5 / 9;
  };

  // 处理摄氏度变化的函数
  const handleCelsiusChange = (newCelsius) => {
    setCelsius(newCelsius);
  };

  // 处理华氏度变化的函数
  const handleFahrenheitChange = (newFahrenheit) => {
    setCelsius(toCelsius(newFahrenheit));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>温度转换器（状态提升 Demo）</h2>
      {/* 子组件通过 props 接收父组件的状态和更新函数 */}
      <CelsiusInput
        value={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <FahrenheitInput
        value={celsius ? toFahrenheit(celsius) : ''}
        onTemperatureChange={handleFahrenheitChange}
      />
      <p>当前温度：{celsius} °C = {celsius ? toFahrenheit(celsius) : ''} °F</p>
    </div>
  );
}
```
核心逻辑解释
状态提升的本质
原本如果两个输入框各自管理自己的状态，数据会不同步。
现在我们把共享状态（摄氏度数值）提升到了它们的公共父组件 TemperatureConverter 中。
父组件成为了唯一的数据源，子组件只负责渲染和触发更新。
数据流走向
父组件通过 props 把状态和更新函数传递给子组件。
子组件输入变化时，调用父组件的更新函数修改父组件的状态。
父组件状态更新后，再通过 props 把新值传递给所有子组件，实现同步。
受控组件的体现两个输入框都是受控组件：它们的值完全由父组件的状态决定，自身不保存状态，只负责触发更新。这也是 React 表单的最佳实践。
## 对 state 进行保留和重置
- 相同位置的相同组件会使得 state 被保留下来
- 相同位置的不同组件会使 state 重置
  
==========================================================、
- 在相同位置重置 state 
使用 key 来重置 state 
```ts
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div style={{ padding: '20px' }}>
      {/* 核心：给两个分支的 Counter 分配唯一 key */}
      {isPlayerA ? (
        <Counter key="taylor" person="Taylor" />
      ) : (
        <Counter key="sarah" person="Sarah" />
      )}
      <button 
        onClick={() => setIsPlayerA(!isPlayerA)}
        style={{ padding: '8px 16px', cursor: 'pointer', marginTop: '10px' }}
      >
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) className += ' hover';

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}
    >
      <h1>{person} 的分数：{score}</h1>
      <button 
        onClick={() => setScore(score + 1)}
        style={{ padding: '6px 12px', cursor: 'pointer' }}
      >
        加一
      </button>
    </div>
  );
}
```
## 迁移状态逻辑至 Reducer 中
```TS
import { useReducer } from 'react';

// 1. 定义reducer：纯函数，处理所有状态更新逻辑
function counterReducer(state, action) {
  switch (action.type) {
    // 加1
    case 'increment':
      return { count: state.count + 1 };
    // 减1
    case 'decrement':
      return { count: state.count - 1 };
    // 重置为0
    case 'reset':
      return { count: 0 };
    // 兜底：未知操作返回原状态
    default:
      return state;
  }
}

function Counter() {
  // 2. 初始化状态：使用对象存储count
  const initialState = { count: 0 };
  // 3. 使用useReducer
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ padding: '20px' }}>
      <h2>计数器：{state.count}</h2>
      {/* 4. 通过dispatch派发action，触发状态更新 */}
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })} style={{ margin: '0 10px' }}>重置</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
    </div>
  );
}

export default Counter;
```
这段代码是**React 中 `useReducer` Hook 的标准实践案例**，实现了一个带加减、重置功能的计数器，我会按照代码标注的步骤，结合核心概念逐行拆解讲解，同时补充关键原理和注意事项，帮你完整理解逻辑。

- 整体功能概述
你这段代码通过 `useReducer` 管理组件状态，替代了基础的 `useState`，实现了计数器的 **+1、-1、重置为0** 功能，是学习复杂状态管理的入门示例。

---

- 步骤1：定义 Reducer 纯函数
```javascript
// 1. 定义reducer：纯函数，处理所有状态更新逻辑
function counterReducer(state, action) {
  switch (action.type) {
    // 加1
    case 'increment':
      return { count: state.count + 1 };
    // 减1
    case 'decrement':
      return { count: state.count - 1 };
    // 重置为0
    case 'reset':
      return { count: 0 };
    // 兜底：未知操作返回原状态
    default:
      return state;
  }
}
```
- 核心定义与规则
1. **Reducer 本质**：**纯函数**（相同输入一定返回相同输出，无副作用、不修改外部变量、不调用异步接口），是 `useReducer` 的核心。
2. **固定参数**：
   - `state`：组件**当前的最新状态**，只读，**禁止直接修改原状态**（遵循 React 不可变数据原则）；
   - `action`：一个描述「要执行什么操作」的普通对象，**必须包含 `type` 字段**（字符串类型，标识操作类型）。
3. **执行逻辑**：
   - 通过 `switch` 匹配 `action.type`，分支处理不同业务逻辑；
   - 每个分支**返回一个全新的状态对象**，替代原状态；
   - `default` 兜底：匹配到未知操作类型时，直接返回原状态，避免状态异常。
4. **不可变性原则**：代码中返回 `{ count: xxx }` 是新建对象，而非修改 `state.count`，这是 React 状态更新的核心要求。

---

- 步骤2：初始化组件状态
```javascript
// 2. 初始化状态：使用对象存储count
const initialState = { count: 0 };
```
1. 定义**初始状态值**，作为组件挂载时的默认状态；
2. 采用**对象格式**存储状态（而非单纯数字），优势是后续可轻松扩展状态（比如新增 `step: 2`、`isDisabled: false` 等字段）；
3. 该变量定义在组件内部，仅当前组件可用。

---

- 步骤3：使用 `useReducer` 关联状态与逻辑
```javascript
// 3. 使用useReducer
const [state, dispatch] = useReducer(counterReducer, initialState);
```
这是 Hook 的核心调用语法，**解构赋值**返回两个核心变量：
- `useReducer` 参数
- 第一个参数：`counterReducer`，步骤1定义的状态处理函数；
- 第二个参数：`initialState`，步骤2定义的初始状态。

- 返回值解析
1. **`state`**：组件的**当前状态**，和 `useState` 的状态值用法一致，可在 JSX 中直接读取（如 `state.count`）；
2. **`dispatch`**：一个**触发状态更新的函数**，是组件与 Reducer 通信的唯一入口。

---

- 步骤4：渲染UI + 通过 `dispatch` 派发 Action
```jsx
return (
  <div style={{ padding: '20px' }}>
    <h2>计数器：{state.count}</h2>
    {/* 4. 通过dispatch派发action，触发状态更新 */}
    <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
    <button onClick={() => dispatch({ type: 'reset' })} style={{ margin: '0 10px' }}>重置</button>
    <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
  </div>
);
```
UI 渲染逻辑
1. 直接读取 `state.count` 展示当前计数值；
2. 为三个按钮绑定 `onClick` 点击事件，实现交互。

 `dispatch` 工作流程
1. 调用格式：`dispatch( action对象 )`，本例中 action 仅包含必填的 `type` 字段；
2. 执行链路：
   - 点击按钮 → 执行 `dispatch` → 将 action 传递给 `counterReducer`；
   - Reducer 根据 `action.type` 计算并返回**新状态**；
   - React 检测到状态变化 → 触发组件重新渲染 → UI 更新为最新值。

---

- 补充：组件导出
```javascript
export default Counter;
```
将计数器组件作为**默认导出**，其他页面/组件可以通过 `import Counter from './路径'` 引入并使用。

---

- 关键补充知识点
 1. 为什么用 `useReducer` 而不是 `useState`？
| 场景              | `useState`                | `useReducer`               |
| ----------------- | ------------------------- | -------------------------- |
| 状态结构          | 简单单个值（数字/字符串） | 复杂对象/多关联状态        |
| 更新逻辑          | 分散在组件各处            | 集中收敛到 Reducer 函数中  |
| 可维护性/可测试性 | 适合简单组件              | 适合复杂业务、便于单元测试 |

本例用 `useState` 也能实现，但 `useReducer` 更适合**状态逻辑复杂、多操作类型**的场景。

- 2. 核心规范
- Reducer 必须是纯函数，**不能修改入参 `state`**，只能返回新状态；
- Action 对象建议标准化：`{ type: '操作类型', payload: 附加数据 }`（本例无附加数据，仅用 `type`）；
- 必须编写 `default` 分支，避免未知操作导致状态丢失。

---

- 总结
1. **Reducer**：统一处理所有状态更新规则的纯函数，根据 `action` 计算新状态；
2. **初始状态**：定义组件挂载时的默认值，推荐用对象格式方便扩展；
3. **useReducer**：关联 Reducer 和初始状态，返回「当前状态」和「派发函数」；
4. **dispatch**：组件触发状态更新的唯一方式，通过传递 `action` 通知 Reducer 执行对应逻辑；
5. 整个流程遵循 **「派发 Action → Reducer 计算新状态 → 组件重渲染」** 的单向数据流，逻辑清晰易维护。
##  使用 Context 深层传递参数
// 导入核心 API
```ts
import { createContext, useContext } from 'react';

// 1. 创建上下文容器（设置默认兜底值）
const DemoContext = createContext('默认数据');

// 最深层子组件：消费 Context 数据
const DeepChild = () => {
  // 2. 使用 useContext 钩子获取共享数据
  const contextData = useContext(DemoContext);
  return <p>深层子组件获取到的数据：{contextData}</p>;
};

// 中间层组件：无需传递任何 props，完全解耦
const MiddleChild = () => {
  return <DeepChild />;
};

// 根组件：提供 Context 数据
function App() {
  return (
    <div style={{ padding: 20 }}>
      <h3>父组件</h3>
      {/* 3. 使用 Provider 包裹组件树，通过 value 传递数据 */}
      <DemoContext.Provider value="Hello Context!">
        {/* 中间组件无需透传 props */}
        <MiddleChild />
      </DemoContext.Provider>
    </div>
  );
}

export default App;
```
创建：createContext 生成上下文容器
提供：根组件用 XXXContext.Provider 包裹子组件，value 属性定义共享数据
消费：后代组件用 useContext 直接获取数据，跳过所有中间层

进阶极简 Demo：可修改的 Context
在基础版上扩展，支持子组件修改共享数据，同样单文件实现：

```ts
import { createContext, useContext, useState } from 'react';

// 1. 创建上下文
const CountContext = createContext(0);

// 深层子组件：读取数据 + 调用修改方法
const Counter = () => {
  // 解构出数据和修改函数
  const { count, increment } = useContext(CountContext);
  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={increment}>点击+1</button>
    </div>
  );
};

// 中间组件：无任何 props 透传
const Middle = () => {
  return <Counter />;
};

// 根组件：管理状态 + 提供数据和修改方法
function App() {
  const [count, setCount] = useState(0);
  // 定义修改状态的方法
  const increment = () => setCount(prev => prev + 1);

  return (
    <div style={{ padding: 20 }}>
      <h3>可修改的 Context 示例</h3>
      {/* 将状态和修改方法一起传入上下文 */}
      <CountContext.Provider value={{ count, increment }}>
        <Middle />
      </CountContext.Provider>
    </div>
  );
}

export default App;
```
# 脱围机制
## 使用 ref 引用值
```ts
const ref = useRef(0);
一般使用useState
```
## 使用 ref 操作 DOM

```ts
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  // 1. 创建ref容器，用于存储DOM节点
  const inputRef = useRef(null);

  // 2. 组件挂载后，拿到真实DOM节点并调用focus()
  useEffect(() => {
    // inputRef.current 就是React渲染出的<input>真实DOM节点
    inputRef.current?.focus(); 
  }, []);

  // 3. 把ref绑定到需要操作的DOM元素上
  return <input ref={inputRef} placeholder="页面加载后自动聚焦我" />;
}
```
## 使用 Effect 进行同步
操作类型	React 写法	Vue 写法
初始化操作	useEffect(() => {}, [])	onMounted
依赖更新操作	useEffect(() => {}, [依赖])	watch(依赖, 回调)
清理资源	在 useEffect 内返回清理函数	onUnmounted
- 🧩 React useEffect 核心概念
useEffect 是 React 提供的副作用钩子，用于处理组件生命周期中的副作用操作，比如：
数据获取（API 请求）
订阅事件（如定时器、WebSocket）
手动操作 DOM
清理资源（取消订阅、清除定时器）
它的核心作用是：让函数组件也能像类组件一样，精准控制代码在组件挂载、更新、卸载时的执行时机。
- 基本语法
```ts
useEffect(effect,dependcies)
```
effect：要执行的副作用函数，可以返回一个清理函数。
dependencies：依赖数组，用于控制 effect 的执行时机。
空数组 []：仅在组件挂载时执行一次，卸载时执行清理函数。
包含状态 / 属性 [a, b]：当 a 或 b 变化时，执行 effect。
不提供依赖数组：每次组件渲染后都会执行 effect。
- 1. 组件挂载时执行（类似 componentDidMount）
场景：页面加载时请求初始数据。
```ts
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 空依赖数组，仅在挂载时执行一次
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch('https://api.example.com/user/1');
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []); // 空数组 → 仅挂载时执行

  if (loading) return <div>加载中...</div>;
  return <div>用户名：{user.name}</div>;
}
```
空依赖数组 [] 表示这个副作用只在组件首次渲染后执行一次，适合做初始化操作。
异步请求放在 effect 中，避免在渲染阶段执行副作用。
-  依赖状态更新时执行（类似 componentDidUpdate）
```ts
import { useState, useEffect } from 'react';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  // 依赖 keyword，当 keyword 变化时执行
  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      // 模拟搜索请求
      fetch(`https://api.example.com/search?q=${keyword}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }, 500); // 防抖：500ms 内不再输入才发起请求

    // 清理函数：清除定时器，避免重复请求
    return () => clearTimeout(timer);
  }, [keyword]); // 依赖 keyword → 每次 keyword 变化时执行

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="输入关键词搜索"
      />
      <ul>
        {results.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}
```
依赖数组 [keyword] 表示只有当 keyword 变化时，才会重新执行这个 effect。
返回的清理函数会在 effect 重新执行前或组件卸载时执行，用于清除上一次的定时器，避免重复请求。
- 组件卸载时清理（类似 componentWillUnmount）
```ts
import { useState, useEffect } from 'react';

function Notification() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 订阅事件
    const handleNotification = () => setCount(prev => prev + 1);
    window.addEventListener('notification', handleNotification);

    // 清理函数：卸载时取消订阅
    return () => {
      window.removeEventListener('notification', handleNotification);
    };
  }, []); // 空数组 → 仅挂载时订阅，卸载时取消

  return <div>收到通知：{count} 次</div>;
}
```
effect 返回的函数会在组件卸载时执行，用于清理资源（如取消订阅、清除定时器）。
如果不清理，会导致内存泄漏或意外行为。
## 使用自定义 Hook 复用逻辑

- 核心规则
1. 命名必须以 use 开头：比如 useFetch、useOnlineStatus（React 靠这个识别 Hook，确保 Hook 规则生效）；
2. 内部可调用其他 Hook：自定义 Hook 本质是 “Hook 的组合”，可以自由使用 useState、useEffect 等内置 Hook；
3. 复用逻辑而非 UI：每个使用自定义 Hook 的组件，都会拥有独立的状态（Hook 是逻辑复用，不是状态共享）；
4. 可返回任意值：可以返回状态、函数、对象等，组件按需接收即可。
- 通用数据请求 Hook → useFetch
这是最常用的自定义 Hook，封装 “请求数据 + loading 状态 + 错误处理 + 取消请求” 的通用逻辑，可在任意组件中复用。
```ts
// hooks/useFetch.js（建议抽离到单独文件，方便全局复用）
import { useState, useEffect, useCallback } from 'react';

/**
 * 通用数据请求 Hook
 * @param {string} url - 请求地址
 * @param {object} options - 请求配置（可选，如 method、headers 等）
 * @returns {object} - 返回 { data, loading, error, refetch }
 */
export function useFetch(url, options = {}) {
  // 定义请求相关的状态（每个使用该Hook的组件，状态都是独立的）
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 封装请求逻辑（useCallback 缓存函数，避免重复创建）
  const fetchData = useCallback(async () => {
    if (!url) return; // 无url时不请求

    setLoading(true);
    setError(null);

    // 创建 AbortController 用于取消请求
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      // 合并请求配置，加入取消信号
      const res = await fetch(url, { ...options, signal });
      if (!res.ok) throw new Error(`请求失败：${res.status}`);
      const result = await res.json();
      
      // 避免更新已取消/卸载的组件状态
      if (!signal.aborted) {
        setData(result);
      }
    } catch (err) {
      // 忽略“请求取消”的错误（正常业务逻辑）
      if (err.name !== 'AbortError' && !signal.aborted) {
        setError(err.message);
      }
    } finally {
      // 仅在请求未取消时结束loading
      if (!signal.aborted) {
        setLoading(false);
      }
    }

    // 返回取消函数，供清理逻辑使用
    return () => controller.abort();
  }, [url, options]); // 依赖url/options，变化时重新创建函数

  // 首次挂载/url/options变化时，执行请求
  useEffect(() => {
    const abortRequest = fetchData();
    // 组件卸载/依赖变化时，取消请求
    return () => abortRequest?.();
  }, [fetchData]);

  // 暴露refetch方法，供组件手动触发重新请求
  const refetch = useCallback(() => fetchData(), [fetchData]);

  // 返回组件需要的状态和方法
  return { data, loading, error, refetch };
}
```
在组件中复用 useFetch 
```ts
// components/UserList.js
import { useFetch } from '../hooks/useFetch';

// 组件1：获取用户列表
function UserList() {
  // 复用useFetch逻辑，仅需传入url
  const { data: users, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) return <div>加载用户列表中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <div>
      <h3>用户列表</h3>
      <button onClick={refetch}>刷新列表</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 组件2：获取单条用户数据（复用同一个useFetch）
function UserDetail() {
  // 复用useFetch逻辑，传入不同的url
  const { data: user, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  if (loading) return <div>加载用户详情中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <div>
      <h3>用户详情</h3>
      <p>姓名：{user?.name}</p>
      <p>邮箱：{user?.email}</p>
    </div>
  );
}

// 父组件：同时使用两个复用了useFetch的组件
function App() {
  return (
    <div>
      <UserList />
      <hr />
      <UserDetail />
    </div>
  );
}
```
- useCallback
```ts
// useFetch 核心代码（加 useCallback 的情况）
export const useFetch = (url) => {
  // 1. 用 useCallback 缓存 fetchData → 引用稳定
  const fetchData = useCallback(async () => {
    console.log('发起请求：', url);
    // 实际请求逻辑...
  }, [url]); // 只有 url 变了，fetchData 才会生成新引用

  // 2. useEffect 依赖 fetchData
  useEffect(() => {
    fetchData();
  }, [fetchData]); // 只有 fetchData 引用变了，才重新执行

  // ...其他逻辑
};
```

# 路由
## 路由的配置
```ts
/**
 * 路由配置文件
 * 
 * 功能特性：
 * 1. 懒加载：使用 React.lazy() 实现代码分割，提升首屏加载速度
 * 2. 嵌套路由：支持多层级路由结构
 * 3. 路由守卫：使用 ProtectedRoute 保护需要登录的路由
 * 4. 动态路由：支持路径参数（如 /user/:id）
 * 5. 路由重定向：使用 Navigate 实现自动跳转
 * 6. 404 处理：捕获所有未匹配的路由
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/Loading';

// ==================== 懒加载组件 ====================
// 使用 React.lazy() 实现代码分割，只有在访问对应路由时才加载组件
// 这样可以减少初始包大小，提升首屏加载速度

// 基础页面
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 用户中心相关页面
const UserLayout = lazy(() => import('../pages/User/UserLayout'));
const UserProfile = lazy(() => import('../pages/User/Profile'));
const UserSettings = lazy(() => import('../pages/User/Settings'));
const UserPosts = lazy(() => import('../pages/User/Posts'));

// 文章相关页面
const PostDetail = lazy(() => import('../pages/Post/PostDetail'));

// 管理后台页面
const AdminLayout = lazy(() => import('../pages/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/Admin/Users'));
const AdminPosts = lazy(() => import('../pages/Admin/Posts'));

/**
 * 创建路由配置
 * createBrowserRouter 使用 HTML5 History API，URL 更清晰（无 # 号）
 */
export const router = createBrowserRouter([
  {
    // 根路由，所有子路由都会在 App 组件中渲染
    path: '/',
    element: <App />,
    // 错误边界：当路由出错时显示 404 页面
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    // 子路由配置
    children: [
      // ==================== 公开路由（无需登录） ====================
      
      /**
       * 首页
       * 路径: /
       * index: true 表示这是父路由的默认子路由
       */
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      
      /**
       * 关于页面
       * 路径: /about
       */
      {
        path: 'about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      
      /**
       * 登录页面
       * 路径: /login
       * 登录成功后会自动跳转到之前想访问的页面
       */
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      // ==================== 受保护路由（需要登录） ====================
      
      /**
       * 用户中心 - 嵌套路由
       * 路径: /user
       * 
       * ProtectedRoute 会检查用户是否已登录
       * - 未登录：自动跳转到 /login，并保存当前路径
       * - 已登录：正常显示页面
       * 
       * 嵌套路由说明：
       * - UserLayout 作为父组件，包含导航栏等公共部分
       * - children 中的路由会在 UserLayout 的 <Outlet /> 位置渲染
       */
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <UserLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          /**
           * 默认路由：访问 /user 时自动重定向到 /user/profile
           * replace: true 表示替换历史记录，而不是添加新记录
           */
          {
            index: true,
            element: <Navigate to="/user/profile" replace />,
          },
          /**
           * 个人资料页面
           * 路径: /user/profile
           */
          {
            path: 'profile',
            element: (
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            ),
          },
          /**
           * 设置页面
           * 路径: /user/settings
           */
          {
            path: 'settings',
            element: (
              <Suspense fallback={<Loading />}>
                <UserSettings />
              </Suspense>
            ),
          },
          /**
           * 我的文章页面
           * 路径: /user/posts
           */
          {
            path: 'posts',
            element: (
              <Suspense fallback={<Loading />}>
                <UserPosts />
              </Suspense>
            ),
          },
        ],
      },
      
      /**
       * 动态路由 - 查看其他用户资料
       * 路径: /user/:id
       * 
       * :id 是路径参数，可以通过 useParams() 获取
       * 示例：访问 /user/123，可以通过 useParams() 获取 { id: '123' }
       * 
       * 注意：这个路由在 /user 之后，所以不会匹配 /user/profile 等子路由
       */
      {
        path: 'user/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile />
          </Suspense>
        ),
      },
      /**
       * 文章详情 - 多参数动态路由
       * 路径: /posts/:id/:slug
       * 
       * 支持多个路径参数
       * 示例：访问 /posts/123/my-article
       * 可以通过 useParams() 获取 { id: '123', slug: 'my-article' }
       * 
       * slug 通常用于 SEO 友好的 URL
       */
      {
        path: 'posts/:id/:slug',
        element: (
          <Suspense fallback={<Loading />}>
            <PostDetail />
          </Suspense>
        ),
      },
      
      /**
       * 管理后台 - 嵌套路由，需要登录权限
       * 路径: /admin
       * 
       * 同样使用 ProtectedRoute 保护，只有登录用户才能访问
       * 如果需要更细粒度的权限控制（如管理员权限），
       * 可以在 ProtectedRoute 组件中添加角色检查逻辑
       */
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          /**
           * 默认路由：访问 /admin 时自动重定向到 /admin/dashboard
           */
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          /**
           * 仪表盘
           * 路径: /admin/dashboard
           */
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          /**
           * 用户管理
           * 路径: /admin/users
           */
          {
            path: 'users',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminUsers />
              </Suspense>
            ),
          },
          /**
           * 文章管理
           * 路径: /admin/posts
           */
          {
            path: 'posts',
            element: (
              <Suspense fallback={<Loading />}>
                <AdminPosts />
              </Suspense>
            ),
          },
        ],
      },
      
      // ==================== 404 处理 ====================
      
      /**
       * 404 页面 - 捕获所有未匹配的路由
       * 路径: * (通配符，匹配所有路径)
       * 
       * 这个路由必须放在最后，因为它会匹配所有路径
       * 如果放在前面，会拦截所有其他路由
       */
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

```
嵌套路由（Outlet）
Outlet 组件是子路由的渲染出口。
在 Users 组件中使用 <Outlet />，当访问 /users/1 时，UserDetail 组件会渲染在 Users 组件内部。
这非常适合实现侧边栏 + 内容区的布局。
## 路由的使用
### 方式 1：声明式导航（<Link> / <NavLink>）—— 点击链接跳转
```ts
import {Link,NavLink} from 'react-router-dom'
function Sum () {
  return (
    <Link to = "/about">1111 <Link>
       <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        关于我们
      </NavLink>
  }
}
// 配合CSS
// .active { color: red; font-weight: bold; }
```
### 命令式导航
```ts
import {useNavigate} from "react-router-dom"

export function Aboubt () {
  const navigate = useNavigate()
  const op = () => {
    navigate('/about',{
      state: {name:'qqq',age:11}
    })
  }
  return (
    <buttton onClick = {op}> 跳转 <button> 
  )
}

// 目标页（/user/1，完整可运行）
import { useLocation } from 'react-router-dom'; // import 移到顶部！
function UserDetail() {
  // 1. 获取当前路由的location对象（包含state、pathname等信息）
  const location = useLocation();
  
  // 2. 解构state参数，加 || {} 避免state为undefined时报错
  const { name, age } = location.state || {};
  
  // 3. 渲染获取到的参数
  return (
    <div>
      <h1>用户1详情</h1>
      <p>姓名：{name}</p> {/* 显示：张三 */}
      <p>年龄：{age}</p> {/* 显示：20 */}
    </div>
  );
}

```
# api
# zustand(store)
安装依赖
```ts
npm install zustand
```
```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. 定义类型接口（核心：TypeScript 类型约束）
interface UserInfo {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean; // 是否登录
  user: UserInfo | null;    // 用户信息
  token: string | null;     // 登录令牌
  // 同步方法
  login: (userInfo: UserInfo, token: string) => void;
  logout: () => void;
  updateUserInfo: (partialInfo: Partial<UserInfo>) => void;
  // 重置状态
  resetAuth: () => void;
}

// 2. 创建持久化认证 Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 初始状态
      isAuthenticated: false,
      user: null,
      token: null,

      // 登录：同步修改状态
      login: (userInfo, token) => {
        set({
          isAuthenticated: true,
          user: userInfo,
          token: token,
        });
      },

      // 登出：重置状态
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      // 更新用户信息：函数式更新（依赖当前状态）
      updateUserInfo: (partialInfo) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...partialInfo } : null,
        }));
      },

      // 重置认证状态（开发中常用：比如切换账号）
      resetAuth: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage 的 key
      // 可选：自定义存储位置（比如 sessionStorage）
      // storage: sessionStorage,
      // 可选：只持久化部分状态（比如不持久化 token）
      // partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }),
    }
  )
);
```
使用它
```ts
import { useAuthStore } from '../store/authStore';

export default function AuthComponent() {
  // 按需获取状态（优化重渲染：仅依赖的状态变化才重渲染）
  const { isAuthenticated, user, login, logout, updateUserInfo, resetAuth } = useAuthStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login: state.login,
      logout: state.logout,
      updateUserInfo: state.updateUserInfo,
      resetAuth: state.resetAuth,
    })
  );

  // 模拟登录（传入测试数据）
  const handleLogin = () => {
    login(
      { id: 'user-1001', name: '前端开发者', email: 'dev@test.com', avatar: 'https://avatar.com/1001' },
      'token-xxxx-123456'
    );
  };

  // 更新用户头像（演示部分更新）
  const handleUpdateAvatar = () => {
    updateUserInfo({ avatar: 'https://avatar.com/new-1001' });
  };

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #eee' }}>
      <h2>🔐 认证管理（持久化）</h2>
      {isAuthenticated ? (
        <div>
          <p>当前用户：{user?.name}</p>
          <p>邮箱：{user?.email}</p>
          <p>头像：{user?.avatar || '无'}</p>
          <button onClick={handleUpdateAvatar} style={{ marginRight: '10px' }}>
            更新头像
          </button>
          <button onClick={logout} style={{ marginRight: '10px' }}>
            登出
          </button>
          <button onClick={resetAuth}>重置认证状态</button>
          <p style={{ color: '#999', fontSize: '12px' }}>
            ✨ 刷新页面后状态不会丢失（persist 持久化）
          </p>
        </div>
      ) : (
        <button onClick={handleLogin}>模拟登录</button>
      )}
    </div>
  );
} 
```
# 常见的hook
在 React 开发中，除了我们反复提到的 `useState`、`useEffect`、`useCallback` 外，还有一批**高频实用的 Hook**，覆盖「基础操作、性能优化、状态管理、跨组件通信、DOM 操作」等 90% 的开发场景。下面按「使用频率+核心场景」分类讲解，每个 Hook 都包含「核心作用+使用场景+极简示例+关键注意点」，新手也能快速理解。


- 1. useRef
**核心作用**：
保存「跨渲染周期的变量」（比如 DOM 元素、定时器、首次渲染标记），且修改 `ref.current` 不会触发组件重渲染（这是和 `useState` 的核心区别）。

**使用场景**：
- 获取 DOM 元素（比如输入框聚焦、修改 DOM 样式）；
- 保存定时器/计时器（避免每次渲染重新创建）；
- 标记“首次渲染”（配合 `useEffect` 区分初始化和更新）。

**极简示例**：
```jsx
import { useState, useRef, useEffect } from 'react';

function InputDemo() {
  // 1. 保存 DOM 元素
  const inputRef = useRef(null);
  // 2. 保存定时器
  const timerRef = useRef(null);
  // 3. 标记首次渲染
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 首次渲染：聚焦输入框
    if (isFirstRender.current) {
      inputRef.current.focus(); // 操作 DOM
      isFirstRender.current = false;
    }

    // 启动定时器，保存到 ref
    timerRef.current = setInterval(() => {
      console.log('定时器运行中');
    }, 1000);

    // 卸载时清除定时器
    return () => clearInterval(timerRef.current);
  }, []);

  return <input ref={inputRef} placeholder="自动聚焦" />;
}
```

**关键注意点**：
- `ref.current` 的值变化不会触发重渲染，所以不要用它存储需要驱动视图更新的状态（比如列表数据）；
- 服务端渲染时，`useRef` 也能正常使用（不会报错）。

- 2. useContext
**核心作用**：
跨组件共享状态（比如全局主题、用户登录信息），避免「Props 钻取」（多层组件手动传参）。

**使用场景**：
- 全局状态（如用户信息、主题切换、语言设置）；
- 中大型组件树的状态共享（替代逐层传 props）。

**极简示例**：
```jsx
import { createContext, useContext } from 'react';

// 1. 创建 Context（定义全局状态容器）
const UserContext = createContext(null);

// 父组件：提供 Context 数据
function App() {
  const user = { name: '张三', isLogin: true };
  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
}

// 子组件：消费 Context 数据（无需 props 传参）
function Child() {
  // 2. 使用 useContext 获取全局状态
  const user = useContext(UserContext);
  return <div>当前用户：{user?.name}</div>;
}
```

**关键注意点**：
- 当 `Provider` 的 `value` 变化时，所有消费该 Context 的组件都会重渲染；
- 可以配合 `useMemo` 缓存 `value`，避免不必要的重渲染。


- 1. useMemo
**核心作用**：
缓存「复杂计算的结果」，避免组件每次渲染时重复计算（比如大数据过滤、数学运算）。
（和 `useCallback` 对比：`useMemo` 缓存**值**，`useCallback` 缓存**函数**）。

**使用场景**：
- 复杂数据处理（如长列表过滤、排序）；
- 耗时计算（如金额换算、数据格式化）；
- 避免传递给子组件的复杂对象/数组重复创建（配合 `React.memo`）。

**极简示例**：
```jsx
import { useState, useMemo } from 'react';

function BigList() {
  const [list, setList] = useState([1,2,3,...,10000]); // 模拟大数据
  const [keyword, setKeyword] = useState('');

  // 用 useMemo 缓存过滤结果：仅 keyword 变化时重新计算
  const filteredList = useMemo(() => {
    console.log('执行过滤计算'); // 仅 keyword 变时打印
    return list.filter(item => item.toString().includes(keyword));
  }, [list, keyword]); // 依赖：list 或 keyword 变化才重新计算

  return (
    <div>
      <input onChange={(e) => setKeyword(e.target.value)} />
      <div>{filteredList.length} 条结果</div>
    </div>
  );
}
```

**关键注意点**：
- 不要滥用 `useMemo`：简单计算（如 `a + b`）没必要用，反而增加内存开销；
- 依赖数组必须写全：计算中用到的所有变量都要加入，否则会拿到旧值。

- 2. React.memo（高阶组件，配合 Hook 用）
**核心作用**：
缓存组件，仅当 `props` 引用/值变化时才重渲染（配合 `useCallback/useMemo` 效果最佳）。

**使用场景**：
- 子组件频繁重渲染（比如列表项、按钮组件）；
- 子组件接收的 props 是函数/对象（需配合 `useCallback/useMemo` 缓存）。

**极简示例**：
```jsx
import { useState, useCallback } from 'react';

// 用 React.memo 包裹子组件：仅 props 变化时重渲染
const Button = React.memo(({ onClick }) => {
  console.log('按钮重渲染');
  return <button onClick={onClick}>点击</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // 用 useCallback 缓存函数：避免每次渲染创建新引用
  const handleClick = useCallback(() => {
    console.log('点击按钮');
  }, []);

  return (
    <div>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count+1)}>无关按钮({count})</button>
    </div>
  );
}
```


- 1. useReducer
**核心作用**：
替代 `useState` 处理「复杂状态逻辑」（比如多状态联动、状态切换规则复杂），遵循 Redux 风格的「action + reducer」模式。

**使用场景**：
- 表单多字段管理（如登录表单：用户名、密码、验证码）；
- 状态切换逻辑复杂（如购物车：加购、减购、清空）；
- 组件状态多且联动（如弹窗：显示/隐藏/加载/错误）。

**极简示例**：
```jsx
import { useReducer } from 'react';

// 1. 定义 reducer 函数：根据 action 处理状态
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    case 'MINUS':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function Cart() {
  // 2. 使用 useReducer：初始状态 + reducer 函数
  const [state, dispatch] = useReducer(cartReducer, { count: 0 });

  return (
    <div>
      <p>数量：{state.count}</p>
      {/* 3. 分发 action 触发状态变化 */}
      <button onClick={() => dispatch({ type: 'ADD' })}>+1</button>
      <button onClick={() => dispatch({ type: 'MINUS' })}>-1</button>
    </div>
  );
}
```

- 2. useLayoutEffect
**核心作用**：
和 `useEffect` 功能几乎一致，但执行时机不同：
- `useEffect`：DOM 更新后 **异步** 执行（不阻塞浏览器绘制）；
- `useLayoutEffect`：DOM 更新后 **同步** 执行（在浏览器绘制前）。

**使用场景**：
- 获取 DOM 布局信息（如元素宽高、位置），避免视觉闪烁；
- 同步修改 DOM 样式（如调整元素位置）。

**关键注意点**：
- 尽量用 `useEffect`：`useLayoutEffect` 会阻塞渲染，可能导致页面卡顿；
- 服务端渲染时，`useLayoutEffect` 会报警告（改用 `useEffect` 或忽略）。

- 3. useId
**核心作用**：
生成「跨服务端/客户端的唯一 ID」，解决服务端渲染时 ID 不匹配的问题（替代手动写 `Math.random()`）。

**使用场景**：
- 表单 `label` 和 `input` 的 `id` 绑定；
- 多个相同组件的唯一标识（如多个弹窗的 `aria-labelledby`）。

**极简示例**：
```jsx
import { useId } from 'react';

function FormInput() {
  // 生成唯一 ID
  const inputId = useId();
  return (
    <div>
      <label htmlFor={inputId}>用户名：</label>
      <input id={inputId} type="text" />
    </div>
  );
}
```
-  4. useTransition / useDeferredValue（React 18+ 新增）
**核心作用**：
标记「非紧急更新」，避免耗时操作阻塞页面渲染（比如大数据列表筛选、搜索框实时联想）。

**使用场景**：
- 大数据量筛选/排序（如 10 万条数据的列表过滤）；
- 搜索框实时联想（输入时不阻塞输入框响应）。

**极简示例（useTransition）**：
```jsx
import { useState, useTransition } from 'react';

function BigListFilter() {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition(); // 标记非紧急更新

  // 输入时立即更新输入框，筛选逻辑标记为非紧急
  const handleChange = (e) => {
    setKeyword(e.target.value); // 紧急更新：优先执行
    // 非紧急更新：不阻塞输入框
    startTransition(() => {
      const filtered = [...Array(100000)].filter(item => /* 复杂筛选 */);
      setList(filtered);
    });
  };

  return (
    <div>
      <input value={keyword} onChange={handleChange} />
      {isPending && <div>筛选中...</div>}
      <div>{list.length} 条结果</div>
    </div>
  );
}
```

- 四、常用 Hook 优先级/使用总结
| 优先级 | Hook 名称       | 核心使用场景                          | 新手必学？ |
|--------|-----------------|---------------------------------------|------------|
| 最高   | useState        | 组件状态管理                          | ✅ 必学    |
| 最高   | useEffect       | 副作用/生命周期处理                   | ✅ 必学    |
| 最高   | useRef          | 获取 DOM/保存跨渲染变量               | ✅ 必学    |
| 高     | useContext      | 跨组件状态共享                        | ✅ 必学    |
| 高     | useCallback     | 缓存函数（避免 useEffect/子组件重执行） | ✅ 必学    |
| 高     | useMemo         | 缓存计算结果（避免重复计算）| ✅ 必学    |
| 中     | useReducer      | 复杂状态管理                          | ⚠️ 进阶    |
| 中     | useId           | 生成唯一 ID（兼容 SSR）| ⚠️ 进阶    |
| 低     | useLayoutEffect | 同步处理 DOM 布局                     | ❌ 按需学  |
| 低     | useTransition   | 非紧急更新（大数据处理）| ❌ 按需学  |

- 五、核心总结（关键点回顾）
1. **基础必备**：`useState/useEffect/useRef/useContext` 是新手必掌握的核心，覆盖 80% 基础场景；
2. **性能优化**：`useCallback/useMemo/React.memo` 配合使用，解决重复渲染/计算问题；
3. **高级场景**：`useReducer` 处理复杂状态，`useId` 兼容 SSR，`useTransition` 优化大数据操作；
4. **使用原则**：按需使用，不要滥用（比如简单计算不用 `useMemo`，普通副作用不用 `useLayoutEffect`）。

这些 Hook 覆盖了 React 开发中 95% 以上的场景，掌握后再结合自定义 Hook 封装，就能高效解决几乎所有业务需求。