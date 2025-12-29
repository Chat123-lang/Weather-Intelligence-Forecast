/**
 * Helper Utilities
 * General-purpose helper functions
 */

import type { ForecastItem, DailyForecast } from '@/shared/types/weather.types';

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Creates a delay promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Safely parses JSON with fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Groups forecast items by date
 */
export const groupForecastByDate = (
  forecasts: ForecastItem[]
): Record<string, ForecastItem[]> => {
  return forecasts.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {} as Record<string, ForecastItem[]>);
};

/**
 * Processes forecast data into daily summaries
 */
export const processDailyForecasts = (
  forecasts: ForecastItem[]
): DailyForecast[] => {
  const grouped = groupForecastByDate(forecasts);

  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((item) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

    // Get the most common weather condition for the day
    const weatherCounts = items.reduce((acc, item) => {
      const weatherId = item.weather[0].id;
      acc[weatherId] = (acc[weatherId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const mostCommonWeatherId = parseInt(
      Object.entries(weatherCounts).sort((a, b) => b[1] - a[1])[0][0]
    );

    const representativeWeather =
      items.find((item) => item.weather[0].id === mostCommonWeatherId)
        ?.weather[0] || items[0].weather[0];

    // Calculate average humidity and wind speed
    const avgHumidity =
      items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length;
    const avgWindSpeed =
      items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length;

    // Get max probability of precipitation
    const maxPop = Math.max(...items.map((item) => item.pop));

    return {
      date: new Date(date).toISOString(),
      dateString: date,
      temp: {
        min: minTemp,
        max: maxTemp,
        avg: avgTemp,
      },
      weather: representativeWeather,
      humidity: Math.round(avgHumidity),
      windSpeed: avgWindSpeed,
      pop: maxPop,
    };
  });
};

/**
 * Clamps a number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Checks if value is empty (null, undefined, empty string, empty array)
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Retries a promise-based function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delayTime = initialDelay * Math.pow(2, i);
        await delay(delayTime);
      }
    }
  }

  throw lastError!;
};

/**
 * Gets current timestamp in seconds
 */
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};

/**
 * Checks if a timestamp is expired based on TTL
 */
export const isExpired = (timestamp: number, ttlSeconds: number): boolean => {
  const currentTime = getCurrentTimestamp();
  return currentTime - timestamp > ttlSeconds;
};

/**
 * Sorts array by property
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Removes duplicates from array based on key
 */
export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};
