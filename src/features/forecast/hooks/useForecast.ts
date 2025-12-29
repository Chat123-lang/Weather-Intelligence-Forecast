/**
 * useForecast Hook
 * Custom hook for fetching and managing 7-day weather forecast data
 */

import { useQuery } from '@tanstack/react-query';
import { getForecast } from '@/features/weather-search/services/weatherService';
import { QUERY_KEYS, DEFAULTS } from '@/config/constants';
import { env } from '@/config/env';
import type {
  ForecastResponse,
  DailyForecast,
  WeatherUnits,
  Coordinates,
} from '@/shared/types/weather.types';
import { useMemo } from 'react';
import { processDailyForecasts } from '@/shared/utils/helpers';

interface UseForecastOptions {
  coordinates?: Coordinates;
  units?: WeatherUnits;
  enabled?: boolean;
  days?: number;
}

interface UseForecastReturn {
  forecast: ForecastResponse | undefined;
  dailyForecasts: DailyForecast[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for weather forecast data
 */
export const useForecast = (
  options: UseForecastOptions = {}
): UseForecastReturn => {
  const {
    coordinates,
    units = env.api.defaultUnits as WeatherUnits,
    enabled = true,
    days = DEFAULTS.FORECAST_DAYS,
  } = options;

  // Fetch forecast data
  const {
    data: forecast,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.FORECAST, coordinates?.lat, coordinates?.lon, units],
    queryFn: async ({ signal }) => {
      if (!coordinates) {
        throw new Error('Coordinates are required');
      }
      return getForecast(coordinates.lat, coordinates.lon, units, signal);
    },
    enabled: enabled && !!coordinates,
    staleTime: env.cache.staleTime,
    gcTime: env.cache.cacheTime, // formerly cacheTime
    retry: 2,
    refetchOnWindowFocus: false,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  // Process and memoize daily forecasts
  const dailyForecasts = useMemo(() => {
    if (!forecast?.list) return [];

    // Process raw forecast data into daily summaries
    const processed = processDailyForecasts(forecast.list);

    // Limit to requested number of days
    return processed.slice(0, days);
  }, [forecast, days]);

  return {
    forecast,
    dailyForecasts,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};