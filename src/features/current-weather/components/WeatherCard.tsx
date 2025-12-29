/**
 * Weather Card Component
 * Displays current weather information with animated weather effects
 */

import React, { useMemo } from 'react';
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  ThermometerSun,
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { WeatherAnimation } from '@/shared/components/WeatherAnimations';
import type { FormattedWeatherData, WeatherUnits } from '@/shared/types/weather.types';
import {
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  formatPressure,
  formatVisibility,
  formatTime,
  capitalizeWords,
  getWeatherIconUrl,
  getWindDirection,
} from '@/shared/utils/formatters';

interface WeatherCardProps {
  weather: FormattedWeatherData;
  units?: WeatherUnits;
  className?: string;
}

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

/**
 * Weather detail item component
 */
const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

/**
 * Weather card component displaying current weather with animations
 */
export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  units = 'metric',
  className,
}) => {
  // Memoize formatted values
  const formattedValues = useMemo(
    () => ({
      temp: formatTemperature(weather.current.temp, units),
      feelsLike: formatTemperature(weather.current.feelsLike, units),
      tempMin: formatTemperature(weather.current.tempMin, units),
      tempMax: formatTemperature(weather.current.tempMax, units),
      humidity: formatHumidity(weather.current.humidity),
      windSpeed: formatWindSpeed(weather.current.windSpeed, units),
      windDirection: getWindDirection(weather.current.windDirection),
      pressure: formatPressure(weather.current.pressure),
      visibility: formatVisibility(weather.current.visibility, units),
      sunrise: formatTime(weather.sun.sunrise, weather.timezone),
      sunset: formatTime(weather.sun.sunset, weather.timezone),
      condition: capitalizeWords(weather.condition.description),
    }),
    [weather, units]
  );

  const iconUrl = getWeatherIconUrl(weather.condition.icon, '4x');

  return (
    <div
      className={cn(
        'bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-card dark:shadow-card-dark p-6 animate-fade-in relative overflow-hidden backdrop-blur-sm',
        className
      )}
    >
      {/* Weather Animation Background */}
      <WeatherAnimation 
        weatherCode={weather.condition.id} 
        className="absolute inset-0 z-0"
      />
      
      {/* Content - relative z-10 to stay above animation */}
      <div className="relative z-10">
        {/* Location Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {weather.location.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {weather.location.country}
          </p>
        </div>

        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
              {formattedValues.temp}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
              {formattedValues.condition}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <ThermometerSun className="w-4 h-4" />
              <span>Feels like {formattedValues.feelsLike}</span>
            </div>
          </div>
          <div className="relative">
            <img
              src={iconUrl}
              alt={formattedValues.condition}
              className="w-32 h-32 drop-shadow-lg"
            />
          </div>
        </div>

        {/* Temperature Range */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex-1 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Min
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {formattedValues.tempMin}
            </p>
          </div>
          <div className="flex-1 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Max
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {formattedValues.tempMax}
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <WeatherDetail
            icon={<Droplets className="w-5 h-5 text-blue-500" />}
            label="Humidity"
            value={formattedValues.humidity}
          />
          <WeatherDetail
            icon={<Wind className="w-5 h-5 text-gray-500" />}
            label="Wind"
            value={`${formattedValues.windSpeed} ${formattedValues.windDirection}`}
          />
          <WeatherDetail
            icon={<Gauge className="w-5 h-5 text-purple-500" />}
            label="Pressure"
            value={formattedValues.pressure}
          />
          <WeatherDetail
            icon={<Eye className="w-5 h-5 text-green-500" />}
            label="Visibility"
            value={formattedValues.visibility}
          />
        </div>

        {/* Sun Times */}
        <div className="flex items-center justify-around pt-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-orange-50/50 to-yellow-50/50 dark:from-orange-900/20 dark:to-yellow-900/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100/80 dark:bg-orange-900/50 rounded-lg backdrop-blur-sm">
              <Sunrise className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sunrise
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formattedValues.sunrise}
              </p>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-300/50 dark:bg-gray-600/50" />
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100/80 dark:bg-orange-900/50 rounded-lg backdrop-blur-sm">
              <Sunset className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sunset
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formattedValues.sunset}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};