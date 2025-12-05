import { useState, useEffect } from 'react';
import { FiBarChart2, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { getAnalyticsSummary, generateRevenueData } from '../../../data/adminMockData';
import MobileStatsCard from '../../../components/Admin/Mobile/MobileStatsCard';
import { formatCurrency } from '../../../utils/adminHelpers';
import ExportButton from '../../../components/Admin/ExportButton';

const MobileAdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    const summary = getAnalyticsSummary();
    setStats(summary);
  }, []);

  const revenueData = generateRevenueData(30);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Period Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['today', 'week', 'month', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
              period === p
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MobileStatsCard
          title="Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueChange}
          changeType="positive"
          icon={FiBarChart2}
          iconColor="green"
        />
        <MobileStatsCard
          title="Orders"
          value={stats.totalOrders}
          change={stats.ordersChange}
          changeType="positive"
          icon={FiBarChart2}
          iconColor="blue"
        />
        <MobileStatsCard
          title="Products"
          value={stats.totalProducts}
          change={stats.productsChange}
          changeType="positive"
          icon={FiBarChart2}
          iconColor="orange"
        />
        <MobileStatsCard
          title="Customers"
          value={stats.totalCustomers}
          change={stats.customersChange}
          changeType="positive"
          icon={FiBarChart2}
          iconColor="purple"
        />
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <ExportButton
          data={revenueData}
          headers={[
            { label: 'Date', accessor: (row) => row.date },
            { label: 'Revenue', accessor: (row) => formatCurrency(row.revenue) },
            { label: 'Orders', accessor: (row) => row.orders },
          ]}
          filename="analytics_report"
        />
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Revenue Trend</h3>
        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm">Chart visualization</p>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminAnalytics;

