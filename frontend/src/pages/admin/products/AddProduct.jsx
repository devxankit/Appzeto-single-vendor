import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AddProduct = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="lg:hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add Product</h1>
        <p className="text-sm sm:text-base text-gray-600">Create a new product in your catalog</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Redirecting to product form...</p>
          <button
            onClick={() => navigate('/admin/products/new')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Go to Add Product Form
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProduct;

