import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>返回</button>
      <h2>文章详情</h2>
      <p>文章 ID: {id}</p>
      <p>文章 Slug: {slug}</p>
      <p>这里是文章的详细内容...</p>
    </div>
  );
}

export default PostDetail;

