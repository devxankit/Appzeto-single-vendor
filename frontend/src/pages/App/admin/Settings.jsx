import { useState, useEffect } from 'react';
import { FiSettings, FiCreditCard, FiTruck, FiMail, FiSearch, FiImage } from 'react-icons/fi';
import { useSettingsStore } from '../../../store/settingsStore';
import GeneralSettings from '../../../components/Admin/Settings/GeneralSettings';
import PaymentSettings from '../../../components/Admin/Settings/PaymentSettings';
import ShippingSettings from '../../../components/Admin/Settings/ShippingSettings';
import SEOSettings from '../../../components/Admin/Settings/SEOSettings';

const MobileAdminSettings = () => {
  const { initialize } = useSettingsStore();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    initialize();
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings, component: GeneralSettings },
    { id: 'payment', label: 'Payment', icon: FiCreditCard, component: PaymentSettings },
    { id: 'shipping', label: 'Shipping', icon: FiTruck, component: ShippingSettings },
    { id: 'seo', label: 'SEO', icon: FiSearch, component: SEOSettings },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || GeneralSettings;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default MobileAdminSettings;

