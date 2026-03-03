const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">关于 My App</h1>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 space-y-4 md:space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">项目介绍</h2>
          <p className="text-gray-600 leading-relaxed">
            My App 是一个现代化的 Web 应用模板，使用了最新的前端技术栈构建。
            我们致力于提供最佳的开发和用户体验。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">技术栈</h2>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              React 19
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              TypeScript
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Vite
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Tailwind CSS v4
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              React Router v7
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">联系我们</h2>
          <p className="text-gray-600 leading-relaxed">
            如果您有任何问题或建议，请随时联系我们。
            我们期待您的反馈！
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
