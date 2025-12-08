import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSettings, FiCreditCard, FiShoppingBag, FiPackage, FiFileText, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';
import GeneralSettings from './settings/GeneralSettings';
import PaymentShippingSettings from './settings/PaymentShippingSettings';
import OrdersCustomersSettings from './settings/OrdersCustomersSettings';
import ProductsInventorySettings from './settings/ProductsInventorySettings';
import ContentFeaturesSettings from './settings/ContentFeaturesSettings';
import NotificationsSEOSettings from './settings/NotificationsSEOSettings';

const Settings = () => {
  const { initialize } = useSettingsStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active tab from URL or default to 'general'
  const getActiveTabFromUrl = () => {
    const path = location.pathname;
    if (path.includes('/payment-shipping')) return 'payment-shipping';
    if (path.includes('/orders-customers')) return 'orders-customers';
    if (path.includes('/products-inventory')) return 'products-inventory';
    if (path.includes('/content-features')) return 'content-features';
    if (path.includes('/notifications-seo')) return 'notifications-seo';
    return 'general';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());

  useEffect(() => {
    initialize();
    setActiveTab(getActiveTabFromUrl());
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/admin/settings/${tabId}`);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings, component: GeneralSettings, route: '/admin/settings/general' },
    { id: 'payment-shipping', label: 'Payment & Shipping', icon: FiCreditCard, component: PaymentShippingSettings, route: '/admin/settings/payment-shipping' },
    { id: 'orders-customers', label: 'Orders & Customers', icon: FiShoppingBag, component: OrdersCustomersSettings, route: '/admin/settings/orders-customers' },
    { id: 'products-inventory', label: 'Products & Inventory', icon: FiPackage, component: ProductsInventorySettings, route: '/admin/settings/products-inventory' },
    { id: 'content-features', label: 'Content & Features', icon: FiFileText, component: ContentFeaturesSettings, route: '/admin/settings/content-features' },
    { id: 'notifications-seo', label: 'Notifications & SEO', icon: FiBell, component: NotificationsSEOSettings, route: '/admin/settings/notifications-seo' },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || GeneralSettings;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="lg:hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Configure your store settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          <ActiveComponent />
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;

