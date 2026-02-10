import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { Loading } from '../components';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { currentPost, loading, error, fetchPostDetail } = usePostStore();

  useEffect(() => {
    if (id) fetchPostDetail(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">{error ? '⚠️' : '📄'}</div>
          <p className={`text-lg mb-4 ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || '文章不存在'}
          </p>
          <Link to="/blog" className="inline-block px-6 py-2 text-blue-500 hover:text-blue-600 font-medium">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link to="/blog" className="inline-flex items-center gap-1 mb-6 text-sm text-gray-600 hover:text-blue-600">
          ← 返回列表
        </Link>

        <article>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{currentPost.title}</h1>
          
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{currentPost.author_name || '未知作者'}</span>
              <span>•</span>
              <span>{new Date(currentPost.created_at).toLocaleString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            <Link
              to={`/post/${currentPost.id}/edit`}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              编辑
            </Link>
          </div>

          <div className="text-gray-700 whitespace-pre-wrap leading-7">{currentPost.content}</div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;

