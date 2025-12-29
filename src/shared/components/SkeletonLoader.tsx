/**
 * Skeleton Loader Component
 * Reusable skeleton loader for loading states
 */

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  lines?: number;
}

/**
 * Skeleton loader component for content placeholders
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}) => {
  const baseClasses = 'animate-skeleton bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  // For multiple text lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(baseClasses, variantClasses.text)}
            style={{
              width: index === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width: width || (variant === 'circular' ? height : undefined),
        height: height,
      }}
    />
  );
};

/**
 * Weather Card Skeleton
 */
export const WeatherCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card dark:shadow-card-dark p-6 animate-fade-in">
      <div className="space-y-4">
        {/* Location */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" width="60%" height="24px" />
          <SkeletonLoader variant="text" width="40%" height="16px" />
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-between">
          <SkeletonLoader variant="text" width="120px" height="64px" />
          <SkeletonLoader variant="circular" width="64px" height="64px" />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <SkeletonLoader variant="text" width="80%" height="14px" />
              <SkeletonLoader variant="text" width="60%" height="20px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Forecast Card Skeleton
 */
export const ForecastCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card dark:shadow-card-dark p-4 animate-fade-in">
      <div className="space-y-3">
        <SkeletonLoader variant="text" width="50%" height="16px" />
        <div className="flex items-center justify-between">
          <SkeletonLoader variant="circular" width="48px" height="48px" />
          <div className="space-y-1">
            <SkeletonLoader variant="text" width="80px" height="20px" />
            <SkeletonLoader variant="text" width="60px" height="16px" />
          </div>
        </div>
      </div>
    </div>
  );
};
