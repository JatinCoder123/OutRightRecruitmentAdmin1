import React from 'react';
import { cn } from '../../utils/helpers';

const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-700 border-blue-200',
    secondary: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
