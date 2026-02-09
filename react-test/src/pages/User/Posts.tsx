import { Link } from 'react-router-dom';

function Posts() {
  const posts = [
    { id: 1, title: '文章1', slug: 'post-1' },
    { id: 2, title: '文章2', slug: 'post-2' },
    { id: 3, title: '文章3', slug: 'post-3' },
  ];

  return (
    <div>
      <h3>我的文章</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;

