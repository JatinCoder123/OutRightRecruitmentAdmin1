import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from './ui/button';

const EmptyState = ({ 
  icon: Icon = FileQuestion, 
  title = 'No data found', 
  description = 'Get started by creating a new item',
  action,
  actionLabel 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center mb-6 max-w-md">{description}</p>
      {action && actionLabel && (
        <Button onClick={action}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
