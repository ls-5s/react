import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <div>
      <h3>个人资料</h3>
      {id ? (
        <p>查看用户 ID: {id} 的资料</p>
      ) : (
        <p>这是当前登录用户的个人资料</p>
      )}
    </div>
  );
}

export default Profile;

