import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Toaster } from 'sonner';
import { getRoles } from '../redux/slices/roleSlice';
import { fetchCandidates } from '../redux/slices/candidateSlice';

const DashboardLayout = () => {
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRoles());
    dispatch(fetchCandidates())
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />

      <main
        className="pt-16 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '90px' : '260px' }}
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
