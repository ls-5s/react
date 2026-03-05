import { useNavigate, NavLink } from "react-router-dom";
const Home = () => {
  const id = 1;
  const navigate = useNavigate();
  const urls = () => {
    navigate(`/demo/${id}`, { state: { name: "张三", age: 18 } });
  };
  return (
    <>
      <NavLink to={`/demo/${id}`}>Demo</NavLink>
      <NavLink to="/tailwind">css</NavLink>
      <button onClick={urls}>跳转</button>
      <div className="relative w-100 h-100 m-auto bg-amber-300">
        <div className="absolute top-4 left-4 w-100 h-100 bg-blue-300 z-50"></div>
      </div>
    </>
  );
};

export default Home;
