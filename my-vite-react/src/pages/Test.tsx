const TailwindDemo = () => {
  return (
    <>
      <div className="w-300 h-screen bg-amber-100 flex flex-row">
        <div className="flex-1 bg-amber-600">
          <ul className="w-full h-full flex flex-col gap-11 justify-center items-center">
            <li className="text-white font-bold border-2  border-amber-50 w-20 text-center h-100 leading-100">
              替换为{" "}
            </li>
            <li>替换为 </li>
            <li>替换为 </li>
            <li>替换为 </li>
          </ul>
        </div>
        <div className="flex-3 bg-amber-950"> 2</div>
      </div>
    </>
  );
};
export default TailwindDemo;
