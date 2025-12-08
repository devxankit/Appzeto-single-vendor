import { useState, useEffect } from 'react';
import { FiSave, FiSettings, FiImage, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../../store/settingsStore';
import AnimatedSelect from '../../../components/Admin/AnimatedSelect';
import toast from 'react-hot-toast';

const GeneralSettings = () => {
  const { settings, updateSettings, initialize } = useSettingsStore();
  const [formData, setFormData] = useState({});
  const [activeSection, setActiveSection] = useState('identity');

  useEffect(() => {
    initialize();
    if (settings && settings.general) {
      setFormData({
        ...settings.general,
        ...settings.theme,
      });
    }
  }, []);

  useEffect(() => {
    if (settings && settings.general) {
      setFormData({
        ...settings.general,
        ...settings.theme,
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { primaryColor, secondaryColor, accentColor, fontFamily, socialMedia, storeDescription, ...generalData } = formData;
    
    updateSettings('general', {
      ...generalData,
      socialMedia: socialMedia || {},
      storeDescription: storeDescription || '',
    });
    
    updateSettings('theme', {
      primaryColor: primaryColor || '#10B981',
      secondaryColor: secondaryColor || '#3B82F6',
      accentColor: accentColor || '#FFE11B',
      fontFamily: fontFamily || 'Inter',
    });
    
    toast.success('Settings saved successfully');
  };

  const sections = [
    { id: 'identity', label: 'Store Identity', icon: FiSettings },
    { id: 'contact', label: 'Contact Info', icon: FiGlobe },
    { id: 'theme', label: 'Theme & Colors', icon: FiImage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="lg:hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">General Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Configure store identity, contact info, and theme</p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-primary-600 text-primary-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {/* Store Identity Section */}
          {activeSection === 'identity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Store Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Store Logo URL
                  </label>
                  <input
                    type="text"
                    name="storeLogo"
                    value={formData.storeLogo || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    name="favicon"
                    value={formData.favicon || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Store Description
                  </label>
                  <textarea
                    name="storeDescription"
                    value={formData.storeDescription || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief description of your store"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Section */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    name="businessHours"
                    value={formData.businessHours || ''}
                    onChange={handleChange}
                    placeholder="Mon-Fri 9AM-6PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Timezone
                  </label>
                  <AnimatedSelect
                    name="timezone"
                    value={formData.timezone || 'UTC'}
                    onChange={handleChange}
                    options={[
                      { value: 'UTC', label: 'UTC' },
                      { value: 'America/New_York', label: 'Eastern Time' },
                      { value: 'America/Chicago', label: 'Central Time' },
                      { value: 'America/Denver', label: 'Mountain Time' },
                      { value: 'America/Los_Angeles', label: 'Pacific Time' },
                      { value: 'Asia/Kolkata', label: 'IST (India)' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency
                  </label>
                  <AnimatedSelect
                    name="currency"
                    value={formData.currency || 'INR'}
                    onChange={handleChange}
                    options={[
                      { value: 'INR', label: 'INR (₹)' },
                      { value: 'USD', label: 'USD ($)' },
                      { value: 'EUR', label: 'EUR (€)' },
                      { value: 'GBP', label: 'GBP (£)' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <AnimatedSelect
                    name="language"
                    value={formData.language || 'en'}
                    onChange={handleChange}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                    ]}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia?.facebook || ''}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia?.instagram || ''}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      placeholder="https://instagram.com/yourpage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia?.twitter || ''}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      placeholder="https://twitter.com/yourpage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia?.linkedin || ''}
                      onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/yourpage"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theme & Colors Section */}
          {activeSection === 'theme' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor || '#10B981'}
                      onChange={handleChange}
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={formData.primaryColor || '#10B981'}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="secondaryColor"
                      value={formData.secondaryColor || '#3B82F6'}
                      onChange={handleChange}
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="secondaryColor"
                      value={formData.secondaryColor || '#3B82F6'}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor || '#FFE11B'}
                      onChange={handleChange}
                      className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      name="accentColor"
                      value={formData.accentColor || '#FFE11B'}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Font Family
                  </label>
                  <AnimatedSelect
                    name="fontFamily"
                    value={formData.fontFamily || 'Inter'}
                    onChange={handleChange}
                    options={[
                      { value: 'Inter', label: 'Inter' },
                      { value: 'Roboto', label: 'Roboto' },
                      { value: 'Open Sans', label: 'Open Sans' },
                      { value: 'Poppins', label: 'Poppins' },
                      { value: 'Lato', label: 'Lato' },
                    ]}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Color Preview:</p>
                <div className="flex gap-2">
                  <div
                    className="w-20 h-20 rounded-lg"
                    style={{ backgroundColor: formData.primaryColor || '#10B981' }}
                  />
                  <div
                    className="w-20 h-20 rounded-lg"
                    style={{ backgroundColor: formData.secondaryColor || '#3B82F6' }}
                  />
                  <div
                    className="w-20 h-20 rounded-lg"
                    style={{ backgroundColor: formData.accentColor || '#FFE11B' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 gradient-green text-white rounded-lg hover:shadow-glow-green transition-all font-semibold"
            >
              <FiSave />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default GeneralSettings;

