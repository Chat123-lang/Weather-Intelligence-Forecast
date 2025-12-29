/**
 * Loading Spinner Component
 * Reusable loading spinner with customizable size
 */

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

/**
 * Loading spinner component with optional label
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label,
}) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-2', className)}
      role="status"
      aria-live="polite"
      aria-label={label || 'Loading'}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-gray-300 border-t-primary-600 dark:border-gray-600 dark:border-t-primary-400',
          sizeClasses[size]
        )}
      />
      {label && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </span>
      )}
      <span className="sr-only">{label || 'Loading'}</span>
    </div>
  );
};
