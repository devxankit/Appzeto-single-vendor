import { useState, useEffect } from 'react';
import { FiPlus, FiPackage, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileStatsCard from '../../../components/Admin/Mobile/MobileStatsCard';
import { getAnalyticsSummary } from '../../../data/adminMockData';
import { formatCurrency } from '../../../utils/adminHelpers';

const MobileAdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const summary = getAnalyticsSummary();
    setStats(summary);
  }, []);

  const quickActions = [
    { icon: FiPlus, label: 'Add Product', path: '/app/admin/products/new', color: 'green' },
    { icon: FiShoppingBag, label: 'View Orders', path: '/app/admin/orders', color: 'blue' },
    { icon: FiPackage, label: 'Inventory', path: '/app/admin/inventory', color: 'orange' },
    { icon: FiUsers, label: 'Customers', path: '/app/admin/customers', color: 'purple' },
  ];

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MobileStatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          changeType="positive"
          icon={FiTrendingUp}
          iconColor="green"
        />
        <MobileStatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.ordersChange}
          changeType="positive"
          icon={FiShoppingBag}
          iconColor="blue"
        />
        <MobileStatsCard
          title="Products"
          value={stats.totalProducts}
          change={stats.productsChange}
          changeType="positive"
          icon={FiPackage}
          iconColor="orange"
        />
        <MobileStatsCard
          title="Customers"
          value={stats.totalCustomers}
          change={stats.customersChange}
          changeType="positive"
          icon={FiUsers}
          iconColor="purple"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              green: 'bg-green-50 text-green-600',
              blue: 'bg-blue-50 text-blue-600',
              orange: 'bg-orange-50 text-orange-600',
              purple: 'bg-purple-50 text-purple-600',
            };

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(action.path)}
                className={`p-4 rounded-xl ${colorClasses[action.color]} shadow-sm hover:shadow-md transition-shadow`}
              >
                <Icon className="text-2xl mb-2" />
                <p className="text-sm font-semibold">{action.label}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Activity</h2>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">New order received</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Low stock alert</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Product updated</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminDashboard;

