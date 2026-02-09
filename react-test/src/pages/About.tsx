import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是关于页面</p>
      <Link to="/">返回首页</Link>
    </div>
  );
}

export default About;

