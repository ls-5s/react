import { useState } from "react";

const TailwindDemo = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Tailwind CSS 学习 Demo</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            {isDark ? "🌞 浅色模式" : "🌙 深色模式"}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* 1. 布局系统 - Flexbox */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">1️⃣ 布局系统 - Flexbox</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] p-4 bg-blue-100 rounded-lg">flex-1</div>
            <div className="flex-1 min-w-[200px] p-4 bg-green-100 rounded-lg">flex-1</div>
            <div className="flex-1 min-w-[200px] p-4 bg-purple-100 rounded-lg">flex-1</div>
          </div>
          <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
            <span>justify-between</span>
            <span>items-center</span>
          </div>
        </section>

        {/* 2. 布局系统 - Grid */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">2️⃣ 布局系统 - Grid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="p-4 bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-lg text-center">
                Grid {item}
              </div>
            ))}
          </div>
        </section>

        {/* 3. 间距系统 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">3️⃣ 间距系统 - Margin & Padding</h2>
          <div className="space-y-4">
            <div className="p-2 bg-red-100">p-2 (padding: 0.5rem)</div>
            <div className="p-4 bg-orange-100">p-4 (padding: 1rem)</div>
            <div className="p-6 bg-yellow-100">p-6 (padding: 1.5rem)</div>
            <div className="m-4 p-4 bg-green-100 border-2 border-green-300">m-4 + p-4 (margin + padding)</div>
            <div className="px-8 py-4 bg-blue-100">px-8 py-4 (水平/垂直独立设置)</div>
          </div>
        </section>

        {/* 4. 尺寸控制 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">4️⃣ 尺寸控制 - Width & Height</h2>
          <div className="space-y-4">
            <div className="w-1/4 h-12 bg-pink-300 rounded">w-1/4 (25%)</div>
            <div className="w-1/2 h-12 bg-pink-400 rounded">w-1/2 (50%)</div>
            <div className="w-3/4 h-12 bg-pink-500 rounded">w-3/4 (75%)</div>
            <div className="w-full h-12 bg-pink-600 rounded">w-full (100%)</div>
            <div className="w-64 h-12 bg-purple-600 rounded">w-64 (固定像素)</div>
            <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              圆形
            </div>
          </div>
        </section>

        {/* 5. 颜色系统 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">5️⃣ 颜色系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-red-500 text-white rounded">bg-red-500</div>
            <div className="p-4 bg-orange-500 text-white rounded">bg-orange-500</div>
            <div className="p-4 bg-amber-500 text-white rounded">bg-amber-500</div>
            <div className="p-4 bg-yellow-500 text-white rounded">bg-yellow-500</div>
            <div className="p-4 bg-lime-500 text-white rounded">bg-lime-500</div>
            <div className="p-4 bg-green-500 text-white rounded">bg-green-500</div>
            <div className="p-4 bg-emerald-500 text-white rounded">bg-emerald-500</div>
            <div className="p-4 bg-teal-500 text-white rounded">bg-teal-500</div>
            <div className="p-4 bg-cyan-500 text-white rounded">bg-cyan-500</div>
            <div className="p-4 bg-sky-500 text-white rounded">bg-sky-500</div>
            <div className="p-4 bg-blue-500 text-white rounded">bg-blue-500</div>
            <div className="p-4 bg-indigo-500 text-white rounded">bg-indigo-500</div>
            <div className="p-4 bg-violet-500 text-white rounded">bg-violet-500</div>
            <div className="p-4 bg-purple-500 text-white rounded">bg-purple-500</div>
            <div className="p-4 bg-fuchsia-500 text-white rounded">bg-fuchsia-500</div>
            <div className="p-4 bg-pink-500 text-white rounded">bg-pink-500</div>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-gray-900">text-gray-900</p>
            <p className="text-gray-700">text-gray-700</p>
            <p className="text-gray-500">text-gray-500</p>
            <p className="text-gray-300">text-gray-300</p>
          </div>
        </section>

        {/* 6. 排版样式 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">6️⃣ 排版样式</h2>
          <div className="space-y-2">
            <p className="text-xs">text-xs (0.75rem)</p>
            <p className="text-sm">text-sm (0.875rem)</p>
            <p className="text-base">text-base (1rem)</p>
            <p className="text-lg">text-lg (1.125rem)</p>
            <p className="text-xl">text-xl (1.25rem)</p>
            <p className="text-2xl">text-2xl (1.5rem)</p>
            <p className="text-3xl">text-3xl (1.875rem)</p>
            <p className="text-4xl">text-4xl (2.25rem)</p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="font-light">font-light</p>
            <p className="font-normal">font-normal</p>
            <p className="font-medium">font-medium</p>
            <p className="font-semibold">font-semibold</p>
            <p className="font-bold">font-bold</p>
          </div>
        </section>

        {/* 7. 边框样式 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">7️⃣ 边框样式</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-300 rounded">border</div>
            <div className="p-4 border-2 border-blue-500 rounded">border-2</div>
            <div className="p-4 border-4 border-green-500 rounded">border-4</div>
            <div className="p-4 border border-dashed border-red-500 rounded">dashed</div>
            <div className="p-4 border border-dotted border-purple-500 rounded">dotted</div>
            <div className="p-4 border-t-4 border-blue-500">border-t-4</div>
            <div className="p-4 border-b-4 border-green-500">border-b-4</div>
            <div className="p-4 border-l-4 border-red-500">border-l-4</div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-none border border-gray-300">rounded-none</div>
            <div className="p-4 rounded-sm border border-gray-300">rounded-sm</div>
            <div className="p-4 rounded border border-gray-300">rounded</div>
            <div className="p-4 rounded-md border border-gray-300">rounded-md</div>
            <div className="p-4 rounded-lg border border-gray-300">rounded-lg</div>
            <div className="p-4 rounded-xl border border-gray-300">rounded-xl</div>
            <div className="p-4 rounded-2xl border border-gray-300">rounded-2xl</div>
            <div className="p-4 rounded-full border border-gray-300">rounded-full</div>
          </div>
        </section>

        {/* 8. 响应式设计 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">8️⃣ 响应式设计</h2>
          <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              调整浏览器窗口大小查看效果：<br/>
              <span className="block mt-2">默认 → sm → md → lg → xl</span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-cyan-100 rounded">默认：1 列</div>
            <div className="p-4 bg-cyan-200 rounded">sm: 2 列</div>
            <div className="p-4 bg-cyan-300 rounded lg:col-span-3">lg: 3 列</div>
          </div>
        </section>

        {/* 9. 交互状态 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">9️⃣ 交互状态 - Hover/Focus/Active</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              hover 效果
            </button>
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg transition-all">
              hover + active
            </button>
            <input
              type="text"
              placeholder="focus 效果"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-purple-500 hover:scale-105 active:scale-95 text-white rounded-lg transition-transform">
              缩放效果
            </button>
            <button className="px-6 py-3 bg-pink-500 hover:shadow-lg hover:shadow-pink-500/50 text-white rounded-lg transition-shadow">
              阴影效果
            </button>
          </div>
        </section>

        {/* 10. 阴影效果 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">🔟 阴影效果</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow-sm rounded-lg">shadow-sm</div>
            <div className="p-4 bg-white shadow rounded-lg">shadow</div>
            <div className="p-4 bg-white shadow-md rounded-lg">shadow-md</div>
            <div className="p-4 bg-white shadow-lg rounded-lg">shadow-lg</div>
            <div className="p-4 bg-white shadow-xl rounded-lg">shadow-xl</div>
            <div className="p-4 bg-white shadow-2xl rounded-lg">shadow-2xl</div>
          </div>
        </section>

        {/* 11. 定位系统 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">1️⃣1️⃣ 定位系统</h2>
          <div className="relative h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <div className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded text-xs">top-left</div>
            <div className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded text-xs">top-right</div>
            <div className="absolute bottom-2 left-2 p-2 bg-blue-500 text-white rounded text-xs">bottom-left</div>
            <div className="absolute bottom-2 right-2 p-2 bg-purple-500 text-white rounded text-xs">bottom-right</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-yellow-500 text-white rounded text-xs">
              center
            </div>
          </div>
        </section>

        {/* 12. 动画过渡 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">1️⃣2️⃣ 动画过渡</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-lg transition-all duration-300 hover:w-24 hover:rotate-12">
                transition
              </div>
              <div className="w-16 h-16 bg-green-500 rounded-lg animate-pulse">pulse</div>
              <div className="w-16 h-16 bg-red-500 rounded-lg animate-bounce">bounce</div>
              <div className="w-16 h-16 bg-purple-500 rounded-lg animate-spin">spin</div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg animate-gradient">
              <p className="animate-pulse">渐变背景 + 脉冲动画</p>
            </div>
          </div>
        </section>

        {/* 13. 卡片组件示例 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">📦 综合示例 - 卡片组件</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">卡片标题 {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">这是一个卡片组件的描述内容，展示 Tailwind CSS 的综合应用。</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">2024-01-01</span>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14. 表单组件示例 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">📝 表单组件示例</h2>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500" />
              <label className="text-sm">同意服务条款</label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              提交表单
            </button>
          </form>
        </section>

        {/* 15. 标签页组件 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">📑 标签页组件</h2>
          <div className="border-b border-gray-200">
            <nav className="flex gap-4">
              {["首页", "关于", "服务", "联系"].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === index
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p>当前激活标签：{["首页", "关于", "服务", "联系"][activeTab]}</p>
          </div>
        </section>

        {/* 16. 通知/警示组件 */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">🔔 通知/警示组件</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
              ✅ 成功：操作已完成
            </div>
            <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded">
              ℹ️ 信息：这是一条提示信息
            </div>
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
              ⚠️ 警告：请注意此事项
            </div>
            <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              ❌ 错误：操作失败，请重试
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="mt-12 py-6 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Tailwind CSS 学习 Demo - 覆盖 90% 常用开发场景</p>
          <p className="text-xs text-gray-400 mt-2">
            包含：布局、间距、尺寸、颜色、排版、边框、响应式、交互、阴影、定位、动画等
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TailwindDemo;