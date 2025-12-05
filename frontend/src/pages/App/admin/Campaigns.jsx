import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiCalendar, FiEye, FiEyeOff } from 'react-icons/fi';
import { useCampaignStore } from '../../../store/campaignStore';
import CampaignForm from '../../../components/Admin/Campaigns/CampaignForm';
import Badge from '../../../components/Badge';
import { formatDateTime } from '../../../utils/adminHelpers';
import toast from 'react-hot-toast';

const MobileAdminCampaigns = () => {
  const { campaigns, initialize, deleteCampaign, toggleCampaignStatus } = useCampaignStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCampaignStatus = (campaign) => {
    const now = new Date();
    if (!campaign.isActive) return 'inactive';
    if (new Date(campaign.startDate) > now) return 'upcoming';
    if (new Date(campaign.endDate) < now) return 'ended';
    return 'active';
  };

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        onClick={() => {
          setEditingCampaign(null);
          setShowForm(true);
        }}
        className="w-full flex items-center justify-center gap-2 py-3 gradient-green text-white rounded-xl font-semibold shadow-lg"
      >
        <FiPlus />
        Create Campaign
      </button>

      <div className="space-y-3">
        {filteredCampaigns.map((campaign) => {
          const status = getCampaignStatus(campaign);
          return (
            <div
              key={campaign.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{campaign.name}</h3>
                  <Badge
                    variant={
                      status === 'active'
                        ? 'success'
                        : status === 'upcoming'
                        ? 'warning'
                        : 'error'
                    }
                  >
                    {status}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleCampaignStatus(campaign.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  {campaign.isActive ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">
                    {campaign.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-primary-600">
                    {campaign.discountValue}
                    {campaign.discountType === 'percentage' ? '%' : ' $'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiCalendar />
                  <span>{formatDateTime(campaign.startDate)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingCampaign(campaign);
                    setShowForm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm"
                >
                  <FiEdit />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this campaign?')) {
                      deleteCampaign(campaign.id);
                    }
                  }}
                  className="p-2 bg-red-600 text-white rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <CampaignForm
          campaign={editingCampaign}
          onClose={() => {
            setShowForm(false);
            setEditingCampaign(null);
          }}
          onSave={() => initialize()}
        />
      )}
    </div>
  );
};

export default MobileAdminCampaigns;

