const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">欢迎来到 My App</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          这是一个基于 React + Vite + Tailwind CSS 构建的现代 Web 应用
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">快速开发</h3>
          <p className="text-gray-600">基于 Vite 的极速开发体验</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">💎</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">现代技术</h3>
          <p className="text-gray-600">React 19 + TypeScript</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">精美UI</h3>
          <p className="text-gray-600">Tailwind CSS 样式</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
