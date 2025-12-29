/**
 * Last Updated Component
 * Shows when data was last refreshed with auto-refresh countdown
 */

import React, { useMemo } from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface LastUpdatedProps {
  lastRefreshed: Date;
  timeUntilNextRefresh: number;
  onRefresh: () => void;
  isRefreshing?: boolean;
  className?: string;
}

/**
 * Formats time difference in human-readable format
 */
const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 120) return '1 minute ago';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 7200) return '1 hour ago';
  return `${Math.floor(seconds / 3600)} hours ago`;
};

/**
 * Formats countdown time
 */
const formatCountdown = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

/**
 * Last Updated component
 */
export const LastUpdated: React.FC<LastUpdatedProps> = ({
  lastRefreshed,
  timeUntilNextRefresh,
  onRefresh,
  isRefreshing = false,
  className,
}) => {
  const timeAgo = useMemo(() => formatTimeAgo(lastRefreshed), [lastRefreshed]);
  const countdown = useMemo(() => formatCountdown(timeUntilNextRefresh), [timeUntilNextRefresh]);

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {/* Last Updated Info */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {timeAgo}
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
          <span className="text-xs">Next update in:</span>
          <span className="text-xs font-mono font-semibold text-primary-600 dark:text-primary-400">
            {countdown}
          </span>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all',
          'bg-primary-600 hover:bg-primary-700 text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'shadow-sm hover:shadow-md'
        )}
        aria-label="Refresh weather data"
      >
        <RefreshCw
          className={cn('w-4 h-4', isRefreshing && 'animate-spin')}
        />
        <span>{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
      </button>
    </div>
  );
};