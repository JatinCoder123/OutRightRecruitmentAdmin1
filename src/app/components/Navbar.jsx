import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, markAllNotificationsAsRead } from '../redux/slices/uiSlice';
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme, notifications, sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6"
      style={{ left: sidebarCollapsed ? '80px' : '260px', transition: 'left 0.3s ease' }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search candidates, assessments, questions..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => dispatch(markAllNotificationsAsRead())}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full ${!notification.read ? 'bg-blue-600' : 'bg-gray-300'}`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600 hidden md:block" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    Preferences
                  </button>
                  <div className="border-t border-gray-200 my-2" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
