import React from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/slices/uiSlice';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Trophy,
  HelpCircle,
  Sparkles,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../utils/helpers';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state) => state.ui);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Candidates', path: '/candidates' },
    { icon: Trophy, label: 'Results', path: '/results' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: HelpCircle, label: 'Questions', path: '/questions' },
    { icon: Sparkles, label: 'AI Prompts', path: '/prompts' },
    { icon: Briefcase, label: 'Roles', path: '/roles' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? '80px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OR</span>
            </div>
            <span className="font-semibold text-gray-900">OutRightRecruitment</span>
          </motion.div>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-blue-600')} />
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-200"
        >
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@assesshub.com</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
