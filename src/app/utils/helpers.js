// Utility helper functions

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    active: 'bg-green-100 text-green-700 border-green-200',
    passed: 'bg-green-100 text-green-700 border-green-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBgColor = (score) => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700 border-gray-200';
};

export const truncate = (str, length = 50) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const downloadCSV = (data, filename) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));
  return [headers.join(','), ...rows].join('\n');
};

export const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const filterBySearch = (items, searchTerm, fields) => {
  if (!searchTerm) return items;
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    fields.some(field => item[field]?.toString().toLowerCase().includes(term))
  );
};

export const sortData = (data, key, direction = 'asc') => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
