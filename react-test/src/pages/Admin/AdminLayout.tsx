import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div>
      <h2>管理后台</h2>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <NavLink to="/admin/dashboard">仪表盘</NavLink>
        <NavLink to="/admin/users">用户管理</NavLink>
        <NavLink to="/admin/posts">文章管理</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
