import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid,
  FiTag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiImage,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
} from 'react-icons/fi';

const More = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/categories', label: 'Categories', icon: FiGrid, color: 'bg-blue-500' },
    { path: '/admin/brands', label: 'Brands', icon: FiTag, color: 'bg-purple-500' },
    { path: '/admin/customers', label: 'Customers', icon: FiUsers, color: 'bg-green-500' },
    { path: '/admin/inventory', label: 'Inventory', icon: FiPackage, color: 'bg-orange-500' },
    { path: '/admin/campaigns', label: 'Campaigns', icon: FiTrendingUp, color: 'bg-red-500' },
    { path: '/admin/banners', label: 'Banners', icon: FiImage, color: 'bg-pink-500' },
    { path: '/admin/reviews', label: 'Reviews', icon: FiMessageSquare, color: 'bg-yellow-500' },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2, color: 'bg-indigo-500' },
    { path: '/admin/content', label: 'Content', icon: FiFileText, color: 'bg-teal-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">More Options</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage additional admin features</p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200 group"
            >
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white text-2xl" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default More;

