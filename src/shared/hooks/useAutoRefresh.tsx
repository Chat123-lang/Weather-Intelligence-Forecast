/**
 * useAutoRefresh Hook
 * Custom hook for auto-refreshing data at intervals
 */

import { useEffect, useCallback, useState } from 'react';

interface UseAutoRefreshOptions {
  interval?: number; // in milliseconds
  enabled?: boolean;
  onRefresh: () => void;
}

interface UseAutoRefreshReturn {
  lastRefreshed: Date;
  timeUntilNextRefresh: number;
  manualRefresh: () => void;
}

/**
 * Custom hook for auto-refresh functionality
 */
export const useAutoRefresh = ({
  interval = 10 * 60 * 1000, // 10 minutes default
  enabled = true,
  onRefresh,
}: UseAutoRefreshOptions): UseAutoRefreshReturn => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [timeUntilNextRefresh, setTimeUntilNextRefresh] = useState(interval);

  // Manual refresh function
  const manualRefresh = useCallback(() => {
    onRefresh();
    setLastRefreshed(new Date());
    setTimeUntilNextRefresh(interval);
  }, [onRefresh, interval]);

  // Auto-refresh effect
  useEffect(() => {
    if (!enabled) return;

    const refreshInterval = setInterval(() => {
      onRefresh();
      setLastRefreshed(new Date());
      setTimeUntilNextRefresh(interval);
    }, interval);

    return () => clearInterval(refreshInterval);
  }, [enabled, interval, onRefresh]);

  // Countdown effect
  useEffect(() => {
    if (!enabled) return;

    const countdownInterval = setInterval(() => {
      setTimeUntilNextRefresh((prev) => {
        if (prev <= 1000) return interval;
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [enabled, interval]);

  return {
    lastRefreshed,
    timeUntilNextRefresh,
    manualRefresh,
  };
};