import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import { useBannerStore } from '../../../store/bannerStore';
import BannerForm from '../../../components/Admin/Banners/BannerForm';
import Badge from '../../../components/Badge';

const MobileAdminBanners = () => {
  const { banners, initialize, deleteBanner, toggleBannerStatus } = useBannerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const filteredBanners = banners
    .filter((banner) =>
      banner.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search banners..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        onClick={() => {
          setEditingBanner(null);
          setShowForm(true);
        }}
        className="w-full flex items-center justify-center gap-2 py-3 gradient-green text-white rounded-xl font-semibold shadow-lg"
      >
        <FiPlus />
        Add Banner
      </button>

      <div className="space-y-3">
        {filteredBanners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
          >
            <div className="relative h-32 bg-gray-100">
              {banner.image && (
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant={banner.isActive ? 'success' : 'error'}>
                  {banner.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant="info">
                  {banner.type === 'hero' ? 'Hero' : 'Promo'}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{banner.title || 'Untitled'}</h3>
              {banner.subtitle && (
                <p className="text-sm text-gray-600 mb-2">{banner.subtitle}</p>
              )}

              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => toggleBannerStatus(banner.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  {banner.isActive ? <FiEye /> : <FiEyeOff />}
                </button>
                <button
                  onClick={() => {
                    setEditingBanner(banner);
                    setShowForm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm"
                >
                  <FiEdit />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this banner?')) {
                      deleteBanner(banner.id);
                    }
                  }}
                  className="p-2 bg-red-600 text-white rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <BannerForm
          banner={editingBanner}
          onClose={() => {
            setShowForm(false);
            setEditingBanner(null);
          }}
          onSave={() => initialize()}
        />
      )}
    </div>
  );
};

export default MobileAdminBanners;

