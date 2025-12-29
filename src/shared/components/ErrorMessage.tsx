/**
 * Error Message Component
 * Reusable error message display with optional retry action
 */

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * Error message component with optional retry button
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Error',
  onRetry,
  className,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md',
          className
        )}
        role="alert"
      >
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <p className="text-sm text-red-800 dark:text-red-200 flex-1">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1 text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 transition-colors"
            aria-label="Retry"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-card dark:shadow-card-dark p-6',
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
