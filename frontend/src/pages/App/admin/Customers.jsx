import { useState, useEffect } from 'react';
import { FiSearch, FiMail, FiPhone, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { useCustomerStore } from '../../../store/customerStore';
import CustomerDetail from '../../../components/Admin/Customers/CustomerDetail';
import Badge from '../../../components/Badge';
import { formatCurrency } from '../../../utils/adminHelpers';

const MobileAdminCustomers = () => {
  const { customers, initialize } = useCustomerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      !searchQuery ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="space-y-3">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => {
              setSelectedCustomer(customer);
              setShowDetail(true);
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 active:bg-gray-50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{customer.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <FiMail className="text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiPhone className="text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                )}
              </div>
              <Badge variant={customer.status === 'active' ? 'success' : 'error'}>
                {customer.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="font-semibold text-gray-800">{customer.orders || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Spent</p>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(customer.totalSpent || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetail && selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => {
            setShowDetail(false);
            setSelectedCustomer(null);
          }}
          onUpdate={() => initialize()}
        />
      )}
    </div>
  );
};

export default MobileAdminCustomers;

