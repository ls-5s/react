import { useState } from "react";
import { produce } from "immer";
import { usea } from "../store/test";
import Modal from "../components/Modal";
import { test } from "../api/test";

interface User {
  id: number;
  name: string;
  age: number;
}

const About = () => {
  const { count, increment } = usea();

  const [sum, setSum] = useState<number>(0);

  const [list, setList] = useState<User[]>([
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 22 },
    { id: 3, name: "王五", age: 25 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const add = () => {
    setSum((prev) => prev + 1);
  };

  const updateUserAge = (userId: number) => {
    setList(
      produce((draft) => {
        const user = draft.find((u) => u.id === userId);
        if (user) {
          user.age += 1;
        }
      }),
    );
  };
  const sss = async () => {
    const res = await test();
    console.log(res);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <button onClick={add} className="w-20 h-7 bg-amber-300 rounded-2xl">
          点击加 1
        </button>
        <button onClick={sss} className="w-20 h-7 bg-amber-300 rounded-2xl">
          点击请求
        </button>
        <p>当前 sum 的值为：{sum}</p>
        <p>当前 count 的值为：{count}</p>
        <ul>
          {list.map((user) => (
            <li key={user.id}>
              {user.name} - {user.age}
              <div>
                <button onClick={() => updateUserAge(user.id)}>+1</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={openModal}>打开弹窗</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="About 页面的弹窗">
        <p>这是在 About 页面中使用的弹窗。</p>
        <p>这是一个简单的 Modal 组件示例。</p>
      </Modal>
    </>
  );
};

export default About;
