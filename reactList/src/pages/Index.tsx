import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            个人博客
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            记录学习、分享思考、探索技术
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" onClick={() => navigate('/blog')}>
              浏览博客
            </Button>
            <Button variant="secondary" onClick={() => navigate('/about')}>
              关于我
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">技术分享</h3>
            <p className="text-sm text-gray-600">
              分享前端开发、React、TypeScript 等技术的学习心得和实践经验
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">思考记录</h3>
            <p className="text-sm text-gray-600">
              记录日常思考、问题解决过程和编程感悟
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">项目实践</h3>
            <p className="text-sm text-gray-600">
              展示个人项目和实践案例，分享开发经验
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">最新文章</h2>
          <Link to="/blog" className="block p-4 bg-white rounded-md border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600">
              查看所有文章 →
            </h3>
            <p className="text-sm text-gray-600">
              探索更多精彩内容，了解技术前沿和开发实践
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

