import { useState, useEffect } from 'react';
import { FiSearch, FiAlertTriangle, FiEdit } from 'react-icons/fi';
import { products as initialProducts } from '../../../data/products';
import { formatCurrency } from '../../../utils/adminHelpers';
import toast from 'react-hot-toast';

const MobileAdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  useEffect(() => {
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = filteredProducts.filter(
    (p) => p.stockQuantity <= lowStockThreshold && p.stockQuantity > 0
  );
  const outOfStockProducts = filteredProducts.filter((p) => p.stockQuantity === 0);

  const handleStockUpdate = (productId, newQuantity) => {
    const updatedProducts = products.map((p) => {
      if (p.id === productId) {
        const newStockStatus =
          newQuantity === 0
            ? 'out_of_stock'
            : newQuantity <= lowStockThreshold
            ? 'low_stock'
            : 'in_stock';
        return {
          ...p,
          stockQuantity: parseInt(newQuantity),
          stock: newStockStatus,
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('admin-products', JSON.stringify(updatedProducts));
    toast.success('Stock updated');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiAlertTriangle className="text-orange-600" />
            <h3 className="font-bold text-orange-800">Low Stock Alert</h3>
          </div>
          <p className="text-sm text-orange-700">
            {lowStockProducts.length} product(s) running low
          </p>
        </div>
      )}

      {outOfStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiAlertTriangle className="text-red-600" />
            <h3 className="font-bold text-red-800">Out of Stock</h3>
          </div>
          <p className="text-sm text-red-700">
            {outOfStockProducts.length} product(s) out of stock
          </p>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const isLow = product.stockQuantity <= lowStockThreshold;
          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl p-4 shadow-sm border ${
                isLow ? 'border-orange-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64?text=Product';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        isLow ? 'text-orange-600' : 'text-gray-800'
                      }`}
                    >
                      Stock: {product.stockQuantity}
                    </span>
                    {isLow && <FiAlertTriangle className="text-orange-600" />}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newQuantity = prompt(
                      `Update stock for ${product.name}:`,
                      product.stockQuantity
                    );
                    if (newQuantity !== null && !isNaN(newQuantity)) {
                      handleStockUpdate(product.id, newQuantity);
                    }
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FiEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAdminInventory;

