/**
 * Current Weather Container Component
 * Container for current weather with loading and error states
 */

import React from 'react';
import { WeatherCard } from './WeatherCard';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import {
  WeatherCardSkeleton,
  ErrorMessage,
  EmptyState,
} from '@/shared/components';
import type { WeatherUnits, Coordinates } from '@/shared/types/weather.types';
import { cn } from '@/shared/utils/cn';

interface CurrentWeatherProps {
  coordinates?: Coordinates;
  units?: WeatherUnits;
  className?: string;
}

/**
 * Current weather container with data fetching
 */
export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  coordinates,
  units = 'metric',
  className,
}) => {
  const {
    formattedWeather,
    isLoading,
    isError,
    error,
    refetch,
  } = useCurrentWeather({
    coordinates,
    units,
    enabled: !!coordinates,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className={cn(className)}>
        <WeatherCardSkeleton />
      </div>
    );
  }

  // Error state
  if (isError && error) {
    return (
      <div className={cn(className)}>
        <ErrorMessage
          message={error.message}
          title="Failed to load weather"
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
          description="Search for a city to view current weather"
        />
      </div>
    );
  }

  // No data state
  if (!formattedWeather) {
    return (
      <div className={cn(className)}>
        <EmptyState
          icon="cloud"
          title="No weather data"
          description="Unable to retrieve weather information"
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
      <WeatherCard weather={formattedWeather} units={units} />
    </div>
  );
};
 