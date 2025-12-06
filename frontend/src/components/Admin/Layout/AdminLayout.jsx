import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminBottomNav from './AdminBottomNav';
import useAdminHeaderHeight from '../../../hooks/useAdminHeaderHeight';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerHeight = useAdminHeaderHeight();
  
  // Bottom nav height is 64px (h-16)
  const bottomNavHeight = 64;
  
  // Add small buffer to prevent content overlap (8px)
  const topPadding = headerHeight + 8;
  const bottomPadding = bottomNavHeight + 8;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content - with dynamic padding to account for fixed header and bottom nav */}
        <main 
          className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto lg:pb-6 lg:pt-24 scrollbar-admin"
          style={{
            // Mobile: Use calculated heights with safe area support
            // Desktop: Tailwind classes override these (lg:pt-24, lg:pb-6)
            paddingTop: `${Math.max(topPadding, 80)}px`, // Use calculated height or 80px (pt-20), whichever is larger
            paddingBottom: `calc(${Math.max(bottomPadding, 80)}px + env(safe-area-inset-bottom, 0px))`, // Use calculated height + safe area or 80px + safe area, whichever is larger
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <AdminBottomNav />
    </div>
  );
};

export default AdminLayout;

