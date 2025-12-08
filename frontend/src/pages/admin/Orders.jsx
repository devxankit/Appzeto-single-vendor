import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DataTable from '../../components/Admin/DataTable';
import ExportButton from '../../components/Admin/ExportButton';
import Badge from '../../components/Badge';
import AnimatedSelect from '../../components/Admin/AnimatedSelect';
import { formatCurrency, formatDateTime } from '../../utils/adminHelpers';
import { mockOrders } from '../../data/adminMockData';
import Button from '../../components/Admin/Button';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Load orders from localStorage or use mock data
  useEffect(() => {
    const savedOrders = localStorage.getItem('admin-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(mockOrders);
      localStorage.setItem('admin-orders', JSON.stringify(mockOrders));
    }
  }, []);

  // Save orders to localStorage
  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('admin-orders', JSON.stringify(newOrders));
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter((order) => new Date(order.date) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter((order) => new Date(order.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter((order) => new Date(order.date) >= filterDate);
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [orders, searchQuery, selectedStatus, dateFilter]);

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (value) => (
        <div>
          <p className="font-medium text-gray-800">{value.name}</p>
          <p className="text-xs text-gray-500">{value.email}</p>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => formatDateTime(value),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (value) => (
        <span className="font-bold text-gray-800">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      sortable: true,
      render: (value) => {
        const count = Array.isArray(value) ? value.length : (typeof value === 'number' ? value : 0);
        return <span>{count} items</span>;
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => <Badge variant={value}>{value}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <Button
          onClick={() => navigate(`/admin/orders/${row.id}`)}
          variant="iconBlue"
          icon={FiEye}
        />
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="lg:hidden">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Orders</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full sm:min-w-[200px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>

          {/* Status Filter */}
          <AnimatedSelect
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'pending', label: 'Pending' },
              { value: 'processing', label: 'Processing' },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            className="w-full sm:w-auto min-w-[140px]"
          />

          {/* Date Filter */}
          <AnimatedSelect
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'Last 7 Days' },
              { value: 'month', label: 'Last 30 Days' },
            ]}
            className="w-full sm:w-auto min-w-[140px]"
          />

        {/* Export Button */}
          <div className="w-full sm:w-auto">
            <ExportButton
              data={filteredOrders}
              headers={[
                { label: 'Order ID', accessor: (row) => row.id },
                { label: 'Customer', accessor: (row) => row.customer.name },
                { label: 'Email', accessor: (row) => row.customer.email },
                { label: 'Date', accessor: (row) => formatDateTime(row.date) },
                { label: 'Total', accessor: (row) => formatCurrency(row.total) },
                { label: 'Items', accessor: (row) => row.items },
                { label: 'Status', accessor: (row) => row.status },
              ]}
              filename="orders"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        onRowClick={(row) => navigate(`/admin/orders/${row.id}`)}
      />
    </motion.div>
  );
};

export default Orders;

