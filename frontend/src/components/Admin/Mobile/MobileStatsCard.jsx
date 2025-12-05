import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const MobileStatsCard = ({ title, value, change, changeType = 'positive', icon: Icon, iconColor = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClasses[iconColor]}`}>
            <Icon className="text-lg" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      {change !== undefined && (
        <div className="flex items-center gap-1">
          {changeType === 'positive' ? (
            <FiTrendingUp className="text-green-600 text-sm" />
          ) : (
            <FiTrendingDown className="text-red-600 text-sm" />
          )}
          <span className={`text-xs font-semibold ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}%
          </span>
        </div>
      )}
    </div>
  );
};

export default MobileStatsCard;

