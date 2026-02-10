import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  const { createPost, loading, error } = usePostStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string; content: string }) => {
    await createPost(data);
    navigate('/blog');
  };

  return (
    <PostForm
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      submitText="发布文章"
      loadingText="发布中..."
      title="写文章"
      backPath="/blog"
    />
  );
};

export default CreatePost;

