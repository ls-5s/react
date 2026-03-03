import { Outlet, NavLink } from 'react-router-dom';

const Products = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">产品中心</h1>
      
      {/* 二级路由导航 */}
      <div className="bg-white rounded-lg shadow-md mb-4 md:mb-6 overflow-x-auto">
        <div className="flex border-b min-w-max">
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              `px-4 md:px-6 py-3 font-medium text-sm transition-colors ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            产品列表
          </NavLink>
          <NavLink
            to="/products/featured"
            className={({ isActive }) =>
              `px-4 md:px-6 py-3 font-medium text-sm transition-colors ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            精选产品
          </NavLink>
        </div>
      </div>

      {/* 二级路由出口 */}
      <Outlet />
    </div>
  );
};

export default Products;
