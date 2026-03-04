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
      <button onClick={urls}>跳转</button>
    </>
  );
};

export default Home;
