const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">👨‍💻</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">关于我</h1>
          <p className="text-gray-600">前端开发工程师 | React 爱好者</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">个人简介</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              我是一名前端开发工程师，专注于 React、TypeScript 和现代前端技术栈。
              热爱编程，喜欢探索新技术，享受将想法转化为代码的过程。
            </p>
            <p className="text-gray-700 leading-relaxed">
              这个博客是我学习和分享的平台，记录技术成长路上的点点滴滴。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">技术栈</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Zustand', 'Vite', 'Node.js', 'Express', 'Git'].map((skill) => (
                <div key={skill} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-center text-sm font-medium border border-gray-200">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">兴趣爱好</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">💻 前端开发与新技术探索</li>
              <li className="flex items-center gap-2">📚 阅读技术文档和书籍</li>
              <li className="flex items-center gap-2">🎨 UI/UX 设计</li>
              <li className="flex items-center gap-2">🏃 运动健身</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">联系方式</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">📧 Email: your.email@example.com</div>
              <div className="flex items-center gap-2">🐙 GitHub: github.com/yourusername</div>
              <div className="flex items-center gap-2">💼 LinkedIn: linkedin.com/in/yourprofile</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

