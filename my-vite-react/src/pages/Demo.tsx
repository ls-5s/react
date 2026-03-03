import { useState } from "react";
import { produce } from "immer";

// 定义 Props 接口（规范类型）
interface Arr1Props {
  li: { sss: number };
}

interface UsProps {
  user: {
    id: number;
    name: string;
    age: number;
  };
}

// 简单的条件渲染组件
const Arr1 = ({ li }: Arr1Props) => {
  const { sss } = li;
  // 简化条件判断写法
  return <div>{sss === 2 ? 4 : 5}</div>;
};
interface Demo2Props {
  add: (num: number) => void;
}

// 子组件：触发加1操作
const Demo2 = ({ add }: Demo2Props) => {
  // 修复格式：换行、空格规范，绑定点击事件传参
  return (
    <button
      onClick={() => add(1)}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      点击加1
    </button>
  );
};

// 父组件：管理状态，定义加和函数
const Demo1 = () => {
  const [a, setA] = useState(0); // 优化命名：seta → setA（小驼峰）

  // 优化命名：sum → increment（语义更清晰），TS 类型标注完整
  const increment = (b: number) => {
    // 推荐使用函数式更新（避免闭包陷阱）
    setA((prevA) => prevA + b);
  };

  return (
    <div style={{ padding: "20px" }}>
      {" "}
      {/* 外层容器，避免 Fragment 冗余 */}
      <Demo2 add={increment} />
      <p style={{ marginTop: "10px" }}>当前数值：{a}</p>{" "}
      {/* 修复 {{a}} 错误，改为单大括号 */}
    </div>
  );
};

// 修复 Have 组件（补全未完成的逻辑，规范命名）
const Have = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 22 },
    { id: 3, name: "王五", age: 25 },
  ]);

  // 修复 Sum 函数命名（小驼峰），补全逻辑
  const addUserAge = () => {
    setUsers(
      produce((draft) => {
        const user = draft.find((u) => u.id === 1);
        if (user) {
          user.age = user.age + 1;
        }
      }),
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Have 组件（Immer 简单示例）：
      </h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.age}岁{/* 补全按钮，绑定点击事件 */}
            <button
              onClick={addUserAge}
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              给张三+1岁
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 抽离的用户列表项组件
const Us = ({ user }: UsProps) => {
  return (
    <li className="p-2 border-b" key={user.id}>
      {user.name}-{user.age}岁（Us组件）
    </li>
  );
};

// Immer 动态更新用户年龄组件
const DemoWithImmer = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 22 },
    { id: 3, name: "王五", age: 25 },
  ]);

  // 使用 immer 更新指定用户的年龄
  const updateUserAge = (userId: number, newAge: number) => {
    setUsers(
      produce((draft) => {
        const user = draft.find((u) => u.id === userId);
        if (user) {
          user.age = newAge;
        }
      }),
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Immer 动态更新年龄：</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.age}岁
            <button
              onClick={() => updateUserAge(user.id, user.age + 1)}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              年龄+1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 主组件
const Demo = () => {
  // 计数器状态
  const [count, setCount] = useState(0);

  // 计数器加一方法（规范命名）
  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  // 静态用户列表数据
  const staticUsers = [
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 22 },
    { id: 3, name: "王五", age: 25 },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* 计数器模块 */}
      <div className="mb-6">
        <button
          onClick={incrementCount}
          className="bg-purple-500 text-white px-4 py-2 rounded mb-2"
        >
          加一
        </button>
        <p className="text-base">计数器: {count}</p>
      </div>

      {/* 布局模块 */}
      <div className="flex justify-between mb-6">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <Arr1 li={{ sss: 111 }} />
      </div>

      {/* 基础列表模块 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">基础用户列表：</h3>
        <ul>
          {staticUsers.map((user) => (
            <li key={user.id} className="p-2 border-b">
              {user.name} - {user.age}岁
            </li>
          ))}
        </ul>
      </div>

      {/* 组件化列表模块 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">使用 Us 组件的列表：</h3>
        <ul>
          {staticUsers.map((user) => (
            <Us user={user} key={user.id} />
          ))}
        </ul>
      </div>

      {/* 引入其他组件 */}
      <Have />
      <DemoWithImmer />
      <Demo1 />
    </div>
  );
};

export default Demo;
