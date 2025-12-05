import { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockOrders } from '../../../data/adminMockData';
import Badge from '../../../components/Badge';
import { formatCurrency, formatDateTime } from '../../../utils/adminHelpers';
import toast from 'react-hot-toast';

const MobileAdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const savedOrders = localStorage.getItem('admin-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(mockOrders);
      localStorage.setItem('admin-orders', JSON.stringify(mockOrders));
    }
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !searchQuery ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('admin-orders', JSON.stringify(updatedOrders));
    toast.success('Order status updated');
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
          placeholder="Search orders..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
              selectedStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{order.id}</h3>
                <p className="text-sm text-gray-500">{formatDateTime(order.date)}</p>
              </div>
              <Badge variant={order.status}>{order.status}</Badge>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-semibold text-gray-800">{order.customer.name}</p>
              <p className="text-xs text-gray-500">{order.customer.email}</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Items</p>
                <p className="font-semibold text-gray-800">{order.items} items</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => navigate(`/app/admin/orders/${order.id}`)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-600 text-white rounded-lg font-semibold"
              >
                <FiEye />
                View Details
              </button>
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'processing')}
                    className="p-2 bg-green-600 text-white rounded-lg"
                    title="Approve"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                    className="p-2 bg-red-600 text-white rounded-lg"
                    title="Cancel"
                  >
                    <FiX />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileAdminOrders;

