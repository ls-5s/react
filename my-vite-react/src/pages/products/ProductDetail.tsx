import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  const products: Record<number, { name: string; price: number; description: string; specs: string[] }> = {
    1: {
      name: '产品 A',
      price: 299,
      description: '这是一款高品质的产品，具有出色的性能和精美的外观。',
      specs: ['材质: 优质材料', '尺寸: 10x10x5cm', '重量: 200g', '颜色: 多种可选'],
    },
    2: {
      name: '产品 B',
      price: 599,
      description: '升级版产品，功能更强大，体验更出色。',
      specs: ['材质: 高级材质', '尺寸: 15x15x8cm', '重量: 350g', '颜色: 黑色/白色'],
    },
    3: {
      name: '产品 C',
      price: 899,
      description: '旗舰产品，极致品质，值得拥有。',
      specs: ['材质: 顶级材质', '尺寸: 20x20x10cm', '重量: 500g', '颜色: 全色系'],
    },
  };

  const product = products[Number(id)];

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">产品未找到</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          返回产品列表
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/products" className="inline-flex items-center text-blue-600 hover:underline mb-4 md:mb-6">
        ← 返回产品列表
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full h-48 md:h-auto md:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center min-h-[200px]">
            <span className="text-6xl md:text-8xl text-white">📦</span>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{product.name}</h1>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 md:mb-6">¥{product.price}</p>
            <p className="text-gray-600 mb-4 md:mb-6">{product.description}</p>

            <div className="border-t pt-4 md:pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">产品规格</h3>
              <ul className="space-y-2">
                {product.specs.map((spec, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-4 md:mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
