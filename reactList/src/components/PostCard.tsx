import { Link } from 'react-router-dom';
import type { Post } from '../types/api';

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(post.id);
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md">
      <Link to={`/post/${post.id}`} className="block mb-3">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">{post.title}</h2>
      </Link>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content.substring(0, 150)}...</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{post.author_name || '未知作者'}</span>
          <span>{new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/post/${post.id}/edit`}
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
          >
            编辑
          </Link>
          {onDelete && (
            <button onClick={handleDeleteClick} className="px-3 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
              删除
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostCard;

