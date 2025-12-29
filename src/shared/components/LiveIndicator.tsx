/**
 * Live Indicator Component
 * Shows a pulsing live indicator
 */

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface LiveIndicatorProps {
  className?: string;
  label?: string;
}

/**
 * Live indicator with pulsing animation
 */
export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  className,
  label = 'Live',
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
      </div>
      <span className="text-xs font-medium text-green-600 dark:text-green-400">
        {label}
      </span>
    </div>
  );
};