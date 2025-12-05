import { useNavigate } from 'react-router-dom';
import {
  FiTag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiImage,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const MobileAdminMore = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiTag, label: 'Brands', path: '/app/admin/brands', color: 'blue' },
    { icon: FiUsers, label: 'Customers', path: '/app/admin/customers', color: 'purple' },
    { icon: FiPackage, label: 'Inventory', path: '/app/admin/inventory', color: 'orange' },
    { icon: FiTrendingUp, label: 'Campaigns', path: '/app/admin/campaigns', color: 'green' },
    { icon: FiImage, label: 'Banners', path: '/app/admin/banners', color: 'pink' },
    { icon: FiMessageSquare, label: 'Reviews', path: '/app/admin/reviews', color: 'yellow' },
    { icon: FiBarChart2, label: 'Analytics', path: '/app/admin/analytics', color: 'indigo' },
    { icon: FiFileText, label: 'Content', path: '/app/admin/content', color: 'teal' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    pink: 'bg-pink-50 text-pink-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">More Options</h1>
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(item.path)}
              className={`p-4 rounded-xl ${colorClasses[item.color]} shadow-sm hover:shadow-md transition-shadow`}
            >
              <Icon className="text-2xl mb-2" />
              <p className="text-sm font-semibold">{item.label}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAdminMore;

