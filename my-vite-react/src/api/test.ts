import instance from "../utils/http";
interface Data {
  message: string;
  // 直接在数组里定义对象类型，不用单独写 Item 接口
  items: Array<{
    id: number;
    name: string;
    value: number;
  }>;
}

// // 定义泛型接口：T 代表 items 数组中元素的类型
// interface Data<T> {
//   message: string;
//   items: T[]; // 用泛型 T 替代固定的对象类型，更灵活
// }

// // 1. 定义当前接口的 items 元素类型（按需调整）
// type Item = {
//   id: number;
//   name: string;
//   value: number;
// };
export const test = async () => {
  // 泛型 <Data> 告诉 TS：response.data 是 Data 类型
  const response = await instance.get<Data>("/data");
  // 只返回业务数据（符合实际开发习惯）
  return response.data;
};
