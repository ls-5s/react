import { test } from "../api/test";
import { useEffect, useState } from "react";

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
        {res.map((ss) => (
          <li key={ss.id}>
            {ss.name}-{ss.value}
          </li>
        ))}
      </div>
    </>
  );
}
