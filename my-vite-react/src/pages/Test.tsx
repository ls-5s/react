import { test } from "../api/test";
import { useEffect, useState } from "react";
import { use } from "../store/test1";
import Modal from "../components/Modal"; // 导入 Modal 组件

// 定义数据类型
interface Item {
  id: number;
  name: string;
  value: number;
}

export default function Test() {
  const [res, setRes] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 添加弹窗状态

  const count = use((state) => state.count);
  const add = use((state) => state.add);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const responseData = await test();
      setRes(responseData.items);
      console.log("Fetched data:", responseData.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取数据失败");
      console.error("获取数据失败:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true); // 打开弹窗的函数
  const closeModal = () => setIsModalOpen(false); // 关闭弹窗的函数

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <>
      <div>
        {/* 核心修复：1. 外层加 {} 包裹JS表达式  2. 去掉变量的双大括号 */}
        {res.length > 0 ? (
          <ul>
            {res.map((ss) => (
              <li key={ss.id}>
                {ss.name}-{ss.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>暂无数据</p>
        )}
      </div>
      {count}
      <div onClick={add}>+1</div>
      <button onClick={openModal}>打开弹窗</button> {/* 打开弹窗的按钮 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="这是一个弹窗">
        <p>这是弹窗的内容。</p>
        <p>你可以在这里放置任何 React 元素。</p>
      </Modal>
    </>
  );
}
