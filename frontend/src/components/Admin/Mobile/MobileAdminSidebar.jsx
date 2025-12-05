import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiLayout,
  FiPackage,
  FiShoppingBag,
  FiGrid,
  FiTag,
  FiUsers,
  FiTrendingUp,
  FiImage,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiX,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuthStore } from '../../../store/adminAuthStore';

const MobileAdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { admin } = useAdminAuthStore();

  const menuItems = [
    { path: '/app/admin/dashboard', label: 'Dashboard', icon: FiLayout },
    { path: '/app/admin/products', label: 'Products', icon: FiPackage },
    { path: '/app/admin/orders', label: 'Orders', icon: FiShoppingBag },
    { path: '/app/admin/categories', label: 'Categories', icon: FiGrid },
    { path: '/app/admin/brands', label: 'Brands', icon: FiTag },
    { path: '/app/admin/customers', label: 'Customers', icon: FiUsers },
    { path: '/app/admin/inventory', label: 'Inventory', icon: FiPackage },
    { path: '/app/admin/campaigns', label: 'Campaigns', icon: FiTrendingUp },
    { path: '/app/admin/banners', label: 'Banners', icon: FiImage },
    { path: '/app/admin/reviews', label: 'Reviews', icon: FiMessageSquare },
    { path: '/app/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/app/admin/content', label: 'Content', icon: FiFileText },
    { path: '/app/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center">
                    <FiLayout className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">Admin Panel</h2>
                    <p className="text-xs text-gray-500">Mobile</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiX className="text-xl text-gray-600" />
                </button>
              </div>
              {admin && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Icon className="text-xl" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileAdminSidebar;

