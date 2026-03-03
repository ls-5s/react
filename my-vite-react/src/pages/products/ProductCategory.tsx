import { useParams, Link } from 'react-router-dom';

const ProductCategory = () => {
  const { category } = useParams();

  const categoryInfo: Record<string, { title: string; description: string }> = {
    featured: {
      title: '精选产品',
      description: '为您精心挑选的热门产品',
    },
    electronics: {
      title: '电子产品',
      description: '最新最酷的电子设备',
    },
    clothing: {
      title: '服装',
      description: '时尚舒适的服装精品',
    },
    books: {
      title: '图书',
      description: '各类畅销书籍',
    },
  };

  const currentCategory = categoryInfo[category || ''] || {
    title: '产品列表',
    description: '全部产品展示',
  };

  const products = [
    { id: 1, name: '产品 A', price: 299, category: 'featured' },
    { id: 2, name: '产品 B', price: 599, category: 'featured' },
    { id: 3, name: '产品 C', price: 899, category: 'featured' },
  ];

  return (
    <div>
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{currentCategory.title}</h2>
        <p className="text-gray-600 mt-1">{currentCategory.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/detail/${product.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6"
          >
            <div className="h-40 md:h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl text-white">📦</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold">¥{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
