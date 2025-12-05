import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/adminAuthStore';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to admin login page with return URL
    // Check if it's a mobile route
    const isMobileRoute = location.pathname.startsWith('/app/admin');
    const loginPath = isMobileRoute ? '/app/admin/login' : '/admin/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;

