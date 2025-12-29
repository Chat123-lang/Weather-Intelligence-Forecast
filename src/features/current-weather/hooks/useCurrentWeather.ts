/**
 * useCurrentWeather Hook
 * Custom hook for fetching and managing current weather data
 */

import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/features/weather-search/services/weatherService';
import { QUERY_KEYS } from '@/config/constants';
import { env } from '@/config/env';
import type {
  CurrentWeatherResponse,
  FormattedWeatherData,
  WeatherUnits,
  Coordinates,
} from '@/shared/types/weather.types';
import { useMemo } from 'react';

interface UseCurrentWeatherOptions {
  coordinates?: Coordinates;
  units?: WeatherUnits;
  enabled?: boolean;
}

interface UseCurrentWeatherReturn {
  weather: CurrentWeatherResponse | undefined;
  formattedWeather: FormattedWeatherData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Formats raw weather data for UI consumption
 */
const formatWeatherData = (
  data: CurrentWeatherResponse
): FormattedWeatherData => {
  return {
    location: {
      name: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
    },
    current: {
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility,
      cloudiness: data.clouds.all,
    },
    condition: data.weather[0],
    sun: {
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    },
    timestamp: data.dt,
    timezone: data.timezone,
  };
};

/**
 * Custom hook for current weather data
 */
export const useCurrentWeather = (
  options: UseCurrentWeatherOptions = {}
): UseCurrentWeatherReturn => {
  const {
    coordinates,
    units = env.api.defaultUnits as WeatherUnits,
    enabled = true,
  } = options;

  // Fetch current weather data
  const {
    data: weather,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.CURRENT_WEATHER,
      coordinates?.lat,
      coordinates?.lon,
      units,
    ],
    queryFn: async ({ signal }) => {
      if (!coordinates) {
        throw new Error('Coordinates are required');
      }
      return getCurrentWeather(
        coordinates.lat,
        coordinates.lon,
        units,
        signal
      );
    },
    enabled: enabled && !!coordinates,
    staleTime: env.cache.staleTime,
    gcTime: env.cache.cacheTime, // formerly cacheTime
    retry: 2,
    refetchOnWindowFocus: false,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });

  // Memoize formatted weather data
  const formattedWeather = useMemo(() => {
    if (!weather) return undefined;
    return formatWeatherData(weather);
  }, [weather]);

  return {
    weather,
    formattedWeather,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};
