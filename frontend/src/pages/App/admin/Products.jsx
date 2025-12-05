import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products as initialProducts } from '../../../data/products';
import { useCategoryStore } from '../../../store/categoryStore';
import { useBrandStore } from '../../../store/brandStore';
import MobileActionSheet from '../../../components/Admin/Mobile/MobileActionSheet';
import { formatPrice } from '../../../utils/helpers';
import toast from 'react-hot-toast';

const MobileAdminProducts = () => {
  const navigate = useNavigate();
  const { categories, initialize: initCategories } = useCategoryStore();
  const { brands, initialize: initBrands } = useBrandStore();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    initCategories();
    initBrands();
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('admin-products', JSON.stringify(initialProducts));
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      const newProducts = products.filter((p) => p.id !== id);
      setProducts(newProducts);
      localStorage.setItem('admin-products', JSON.stringify(newProducts));
      toast.success('Product deleted');
      setShowActions(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2"
        >
          <FiFilter className="text-gray-400" />
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={() => navigate('/app/admin/products/new')}
        className="w-full flex items-center justify-center gap-2 py-3 gradient-green text-white rounded-xl font-semibold shadow-lg"
      >
        <FiPlus />
        Add New Product
      </button>

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Product';
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-lg font-bold text-primary-600 mb-2">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Stock: {product.stockQuantity}</span>
                  <span>•</span>
                  <span className={`${
                    product.stock === 'in_stock' ? 'text-green-600' :
                    product.stock === 'low_stock' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {product.stock.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowActions(true);
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <FiFilter className="text-xl" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Sheet */}
      <MobileActionSheet
        isOpen={showActions}
        onClose={() => {
          setShowActions(false);
          setSelectedProduct(null);
        }}
        title="Product Actions"
      >
        {selectedProduct && (
          <div className="space-y-2">
            <button
              onClick={() => {
                navigate(`/app/admin/products/${selectedProduct.id}`);
                setShowActions(false);
              }}
              className="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-semibold"
            >
              <FiEdit />
              Edit Product
            </button>
            <button
              onClick={() => handleDelete(selectedProduct.id)}
              className="w-full flex items-center gap-3 p-3 bg-red-50 text-red-600 rounded-lg font-semibold"
            >
              <FiTrash2 />
              Delete Product
            </button>
          </div>
        )}
      </MobileActionSheet>
    </div>
  );
};

export default MobileAdminProducts;

