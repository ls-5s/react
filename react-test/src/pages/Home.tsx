import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>首页</h1>
      <p>欢迎来到首页</p>
      <Link to="/about">前往关于页面</Link>
    </div>
  );
}

export default Home;

