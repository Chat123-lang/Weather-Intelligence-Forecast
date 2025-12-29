/**
 * Empty State Component
 * Reusable empty state display with icon and message
 */

import React from 'react';
import { Search, Cloud, MapPin } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface EmptyStateProps {
  icon?: 'search' | 'cloud' | 'location';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons = {
  search: Search,
  cloud: Cloud,
  location: MapPin,
};

/**
 * Empty state component for displaying when no data is available
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search',
  title,
  description,
  action,
  className,
}) => {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
