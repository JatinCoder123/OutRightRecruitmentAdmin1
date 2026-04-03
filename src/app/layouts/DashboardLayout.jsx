import React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Toaster } from 'sonner';

const DashboardLayout = () => {
  const { sidebarCollapsed } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      
      <main
        className="pt-16 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '260px' }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default DashboardLayout;
