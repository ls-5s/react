import { useRef, useEffect, createContext, useContext } from "react";

/**
 * 1. 修复：设置贴合数据结构的默认值，避免访问属性时报错
 * 替代原来的 createContext(null)，提升代码健壮性
 */
const UserContext = createContext({
  id: 0,
  name: "",
  age: 0,
});

/**
 * 2. 修复：语义化组件命名，明确组件功能
 * 原 User → UserNameDisplay（展示用户名的组件）
 */
const UserNameDisplay = () => {
  const user = useContext(UserContext);
  // 可选：增加边界判断，进一步避免报错
  if (!user.name) return <div>暂无用户名</div>;
  return <div>{user.name}</div>;
};

/**
 * 3. 修复：语义化命名 + 清理冗余代码 + 规范格式
 * 原 Ass → UserProviderComponent（提供用户上下文的容器组件）
 */
const UserProviderComponent = () => {
  // 若无需使用 ref，直接删除（修复冗余代码）
  // 若需要使用 ref，需绑定到 DOM 元素，示例：
  // const domRef = useRef(null);

  // 模拟用户数据（实际开发中可能来自接口请求）
  const user = { id: 1, name: "张三", age: 18 };

  useEffect(() => {
    // 若保留 ref，需先绑定到 DOM，否则注释/删除该逻辑
    // console.log(domRef.current);
    console.log("组件挂载完成，用户数据已提供");
  }, []);

  return (
    <UserContext.Provider value={user}>
      {/* 若使用 ref，绑定到 DOM 元素：<UserNameDisplay ref={domRef} /> */}
      <UserNameDisplay />
    </UserContext.Provider>
  );
};

export default UserProviderComponent;
