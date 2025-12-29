/**
 * Forecast Card Component
 * Displays a single day's forecast with animated weather effects
 */

import React, { useMemo } from 'react';
import { Droplets, Wind } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { WeatherAnimation } from '@/shared/components/WeatherAnimations';
import type { DailyForecast, WeatherUnits } from '@/shared/types/weather.types';
import {
  formatTemperature,
  formatWindSpeed,
  formatPrecipitationProbability,
  getRelativeDayName,
  getWeatherIconUrl,
  capitalizeWords,
} from '@/shared/utils/formatters';

interface ForecastCardProps {
  forecast: DailyForecast;
  units?: WeatherUnits;
  className?: string;
}

/**
 * Forecast card component for a single day with animations
 */
export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  units = 'metric',
  className,
}) => {
  const timestamp = new Date(forecast.date).getTime() / 1000;

  // Memoize formatted values
  const formattedValues = useMemo(
    () => ({
      day: getRelativeDayName(timestamp),
      tempMin: formatTemperature(forecast.temp.min, units),
      tempMax: formatTemperature(forecast.temp.max, units),
      windSpeed: formatWindSpeed(forecast.windSpeed, units),
      pop: formatPrecipitationProbability(forecast.pop),
      condition: capitalizeWords(forecast.weather.description),
    }),
    [forecast, units, timestamp]
  );

  const iconUrl = getWeatherIconUrl(forecast.weather.icon, '2x');

  // Debug log
  console.log('🌤️ Forecast Weather Code:', forecast.weather.id, 'Condition:', forecast.weather.description);

  return (
    <div
      className={cn(
        'bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-card dark:shadow-card-dark p-4',
        'hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200',
        'animate-fade-in relative overflow-hidden backdrop-blur-sm',
        className
      )}
    >
      {/* Weather Animation Background */}
      <div className="absolute inset-0 z-0">
        <WeatherAnimation 
          weatherCode={forecast.weather.id} 
          className="absolute inset-0"
        />
      </div>

      {/* Content - relative z-10 to stay above animation */}
      <div className="relative z-10">
        {/* Day Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {formattedValues.day}
        </h3>

        {/* Weather Icon and Temperature */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <img
              src={iconUrl}
              alt={formattedValues.condition}
              className="w-16 h-16 drop-shadow-lg"
            />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formattedValues.tempMax}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                {formattedValues.tempMin}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {formattedValues.condition}
            </p>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          {/* Precipitation Probability */}
          <div className="flex items-center justify-between text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Precipitation</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {formattedValues.pop}
            </span>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center justify-between text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>Wind</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {formattedValues.windSpeed}
            </span>
          </div>

          {/* Humidity */}
          <div className="flex items-center justify-between text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-2">
            <span className="text-gray-600 dark:text-gray-400">Humidity</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {forecast.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
