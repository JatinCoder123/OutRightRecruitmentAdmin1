import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarCollapsed: false,
  notifications: [
    { id: '1', type: 'info', message: 'New candidate registered', time: '2 min ago', read: false },
    { id: '2', type: 'success', message: 'Assessment completed by John Doe', time: '15 min ago', read: false },
    { id: '3', type: 'warning', message: 'Server maintenance scheduled', time: '1 hour ago', read: true },
  ],
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  toast: {
    show: false,
    type: 'info',
    message: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now().toString(),
        ...action.payload,
        read: false,
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        type: action.payload.type || 'info',
        message: action.payload.message,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  openModal,
  closeModal,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
