/**
 * Forecast List Component
 * Displays a list/grid of forecast cards
 */

import React from 'react';
import { ForecastCard } from './ForecastCard';
import { cn } from '@/shared/utils/cn';
import type { DailyForecast, WeatherUnits } from '@/shared/types/weather.types';

interface ForecastListProps {
  forecasts: DailyForecast[];
  units?: WeatherUnits;
  className?: string;
}

/**
 * Forecast list component displaying multiple days
 */
export const ForecastList: React.FC<ForecastListProps> = ({
  forecasts,
  units = 'metric',
  className,
}) => {
  if (forecasts.length === 0) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        7-Day Forecast
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard
            key={forecast.date}
            forecast={forecast}
            units={units}
          />
        ))}
      </div>
    </div>
  );
};