import { useRef, useEffect } from "react";

function InputFocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  // 组件挂载时自动聚焦
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // 初始时拿默认值
      console.log("初始值：", inputRef.current.value); // 输出：初始值：默认值
    }
  }, []);

  // 点击按钮获取当前输入框的实时值
  const getInputValue = () => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value;
      alert("当前输入框的值：" + currentValue);
      console.log("当前值：", currentValue);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        defaultValue="默认值"
        style={{ padding: "8px" }}
      />
      <button
        onClick={getInputValue}
        style={{ marginLeft: "10px", padding: "8px 16px" }}
      >
        获取输入框的值
      </button>
    </div>
  );
}

export default InputFocusDemo;
