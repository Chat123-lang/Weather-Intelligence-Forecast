/**
 * Forecast Container Component
 * Container for forecast with loading and error states
 */

import React from 'react';
import { ForecastList } from './ForecastList';
import { useForecast } from '../hooks/useForecast';
import {
  ForecastCardSkeleton,
  ErrorMessage,
  EmptyState,
} from '@/shared/components';
import type { WeatherUnits, Coordinates } from '@/shared/types/weather.types';
import { cn } from '@/shared/utils/cn';
import { DEFAULTS } from '@/config/constants';

interface ForecastProps {
  coordinates?: Coordinates;
  units?: WeatherUnits;
  days?: number;
  className?: string;
}

/**
 * Forecast container with data fetching
 */
export const Forecast: React.FC<ForecastProps> = ({
  coordinates,
  units = 'metric',
  days = DEFAULTS.FORECAST_DAYS,
  className,
}) => {
  const {
    dailyForecasts,
    isLoading,
    isError,
    error,
    refetch,
  } = useForecast({
    coordinates,
    units,
    enabled: !!coordinates,
    days,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className={cn(className)}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          7-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <ForecastCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError && error) {
    return (
      <div className={cn(className)}>
        <ErrorMessage
          message={error.message}
          title="Failed to load forecast"
          onRetry={refetch}
        />
      </div>
    );
  }

  // Empty state (no coordinates)
  if (!coordinates) {
    return (
      <div className={cn(className)}>
        <EmptyState
          icon="location"
          title="No location selected"
          description="Search for a city to view the forecast"
        />
      </div>
    );
  }

  // No data state
  if (!dailyForecasts || dailyForecasts.length === 0) {
    return (
      <div className={cn(className)}>
        <EmptyState
          icon="cloud"
          title="No forecast data"
          description="Unable to retrieve forecast information"
          action={{
            label: 'Try Again',
            onClick: refetch,
          }}
        />
      </div>
    );
  }

  // Success state
  return (
    <div className={cn(className)}>
      <ForecastList forecasts={dailyForecasts} units={units} />
    </div>
  );
};
