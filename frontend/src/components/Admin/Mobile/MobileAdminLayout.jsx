import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileAdminHeader from "./MobileAdminHeader";
import MobileAdminNav from "./MobileAdminNav";
import MobileAdminSidebar from "./MobileAdminSidebar";

const MobileAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <MobileAdminHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <MobileAdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <MobileAdminNav />
    </div>
  );
};

export default MobileAdminLayout;
