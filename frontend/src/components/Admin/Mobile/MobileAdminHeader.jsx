import { FiMenu, FiBell, FiLogOut } from 'react-icons/fi';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MobileAdminHeader = ({ onMenuClick }) => {
  const { logout, admin } = useAdminAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/app/admin/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiMenu className="text-xl text-gray-700" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-800">Admin</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <FiBell className="text-xl text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiLogOut className="text-xl text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileAdminHeader;

