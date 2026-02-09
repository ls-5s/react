import React from 'react';
import { Link } from 'react-router-dom';

const Users: React.FC = () => {
  const users = [
    { id: 1, name: '用户1' },
    { id: 2, name: '用户2' },
    { id: 3, name: '用户3' },
  ];

  return (
    <div>
      <h3>用户管理</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
