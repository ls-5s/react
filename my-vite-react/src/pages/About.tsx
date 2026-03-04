import { useState } from "react";
import { produce } from "immer";
import { usea } from "../store/test";
import Modal from "../components/Modal"; // 导入 Modal 组件

interface Op {
  op: {
    li: number;
    sum: number;
  };
}

const Child1 = ({ op }: Op) => {
  const { li, sum } = op;
  return (
    <div>
      我是child组件
      <p>接收到的 li 值: {li}</p>
      <p>接收到的 sum 值: {sum}</p>
    </div>
  );
};

const About = () => {
  const { count, increment, reset } = usea();

  const [sum, setsum] = useState(0);
  const [list, setlist] = useState([
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 22 },
    { id: 3, name: "王五", age: 25 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 添加弹窗状态

  const add = () => {
    setsum((sum) => sum + 1);
  };

  const li = () => {
    setlist(
      produce((daf) => {
        const s = daf.find((u) => u.id === 1);
        if (s) {
          s.age = s.age + 1;
        }
      }),
    );
  };

  const openModal = () => setIsModalOpen(true); // 打开弹窗的函数
  const closeModal = () => setIsModalOpen(false); // 关闭弹窗的函数

  return (
    <>
      <div>
        <button onClick={add} className="w-20 h-7 bg-amber-300 rounded-2xl">
          点击加1
        </button>
        <p>当前sum的值为：{sum}</p>
        {count}-11111111111 {/* 现在应该能正常显示了 */}
        <ul>
          {list.map((ss) => (
            <li key={ss.id}>
              {ss.name}-{ss.age}
              <div>
                <button onClick={li}>+1</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={openModal}>打开弹窗</button> {/* 添加打开弹窗的按钮 */}
      </div>
      {/* 其他组件 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="About页面的弹窗">
        <p>这是在 About 页面中使用的弹窗。</p>
        <p>这是一个简单的 Modal 组件示例。</p>
      </Modal>
    </>
  );
};

export default About;
