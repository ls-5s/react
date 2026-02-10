import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { Loading, ErrorMessage, PostCard, Pagination, SearchBar, Button, EmptyState } from '../components';

const PAGE_SIZE = 10;

const Home = () => {
  const { postList, loading, error, fetchPostList, deletePost, page, total, page_size, clearError } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostList({ page: 1, page_size: PAGE_SIZE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (keyword: string) => {
    fetchPostList({ page: 1, page_size: PAGE_SIZE, keyword });
  };

  const handlePageChange = (newPage: number) => {
    fetchPostList({ page: newPage, page_size: PAGE_SIZE });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除这篇文章吗？')) return;
    await deletePost(id);
    fetchPostList({ page, page_size });
  };

  const totalPages = Math.ceil(total / page_size);
  const hasPosts = postList.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">博客文章</h1>
          <Button variant="primary" onClick={() => navigate('/create')}>
            写文章
          </Button>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && <ErrorMessage message={error} onClose={clearError} />}

        {loading && <Loading />}
        {!loading && !hasPosts && (
          <EmptyState
            icon="📝"
            title="暂无文章"
            action={
              <Button variant="primary" onClick={() => navigate('/create')}>
                创建第一篇文章
              </Button>
            }
          />
        )}
        {!loading && hasPosts && (
          <>
            <div className="space-y-4 mb-8">
              {postList.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

