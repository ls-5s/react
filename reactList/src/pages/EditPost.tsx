import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { Loading } from '../components';
import PostForm from '../components/PostForm';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { currentPost, loading, error, fetchPostDetail, updatePost } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchPostDetail(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading && !currentPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error && !currentPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg mb-4 text-red-500">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    await updatePost(Number(id), data);
    navigate(`/post/${id}`);
  };

  return (
    <PostForm
      post={currentPost}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      submitText="保存修改"
      loadingText="保存中..."
      title="编辑文章"
      backPath={`/post/${id}`}
    />
  );
};

export default EditPost;

