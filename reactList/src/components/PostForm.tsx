import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Post } from '../types/api';

interface PostFormProps {
  post?: Post | null;
  loading: boolean;
  error: string | null;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  submitText: string;
  loadingText: string;
  title: string;
  backPath: string;
}

const PostForm = ({ post, loading, error, onSubmit, submitText, loadingText, title, backPath }: PostFormProps) => {
  const navigate = useNavigate();
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTitleValue(post.title);
      setContentValue(post.content);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = titleValue.trim();
    const trimmedContent = contentValue.trim();
    if (!trimmedTitle || !trimmedContent) {
      alert('标题和内容不能为空');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ title: trimmedTitle, content: trimmedContent });
    } catch {
      // 错误已在 store 中处理
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          <button onClick={() => navigate(backPath)} className="text-sm text-gray-600 hover:text-gray-900">
            ← 返回
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">文章标题</label>
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="输入文章标题"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">文章内容</label>
            <textarea
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              placeholder="输入文章内容"
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-relaxed"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? loadingText : submitText}
            </button>
            <button
              type="button"
              onClick={() => navigate(backPath)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

