import { Outlet, NavLink } from 'react-router-dom';

function UserLayout() {
  return (
    <div>
      <h2>用户中心</h2>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <NavLink to="/user/profile">个人资料</NavLink>
        <NavLink to="/user/settings">设置</NavLink>
        <NavLink to="/user/posts">我的文章</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserLayout;

