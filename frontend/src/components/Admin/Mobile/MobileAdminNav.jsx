import { NavLink } from 'react-router-dom';
import {
  FiLayout,
  FiPackage,
  FiShoppingBag,
  FiGrid,
  FiSettings,
} from 'react-icons/fi';

const MobileAdminNav = () => {
  const navItems = [
    { path: '/app/admin/dashboard', label: 'Home', icon: FiLayout },
    { path: '/app/admin/products', label: 'Products', icon: FiPackage },
    { path: '/app/admin/orders', label: 'Orders', icon: FiShoppingBag },
    { path: '/app/admin/more', label: 'More', icon: FiGrid },
    { path: '/app/admin/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`
              }
            >
              <Icon className="text-xl" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileAdminNav;

