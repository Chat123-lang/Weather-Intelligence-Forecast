/**
 * Formatting Utilities
 * Helper functions for formatting weather data, dates, and numbers
 */

import type { WeatherUnits } from '@/shared/types/weather.types';
import { TEMPERATURE_SYMBOLS, SPEED_UNITS } from '@/config/constants';

/**
 * Formats temperature with unit symbol
 */
export const formatTemperature = (
  temp: number,
  units: WeatherUnits = 'metric'
): string => {
  return `${Math.round(temp)}${TEMPERATURE_SYMBOLS[units]}`;
};

/**
 * Formats wind speed with unit
 */
export const formatWindSpeed = (
  speed: number,
  units: WeatherUnits = 'metric'
): string => {
  return `${speed.toFixed(1)} ${SPEED_UNITS[units]}`;
};

/**
 * Formats humidity percentage
 */
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

/**
 * Formats pressure in hPa
 */
export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};

/**
 * Formats visibility in kilometers or miles
 */
export const formatVisibility = (
  visibility: number,
  units: WeatherUnits = 'metric'
): string => {
  if (units === 'imperial') {
    const miles = (visibility / 1609.344).toFixed(1);
    return `${miles} mi`;
  }
  const km = (visibility / 1000).toFixed(1);
  return `${km} km`;
};

/**
 * Formats timestamp to time string (HH:MM)
 */
export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Formats timestamp to date string (e.g., "Monday, Jan 15")
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats timestamp to short date (e.g., "Mon, Jan 15")
 */
export const formatShortDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats timestamp to day name (e.g., "Monday")
 */
export const formatDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Formats timestamp to short day name (e.g., "Mon")
 */
export const formatShortDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Converts wind direction in degrees to cardinal direction
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Capitalizes first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Gets weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Formats location display name
 */
export const formatLocationName = (
  city: string,
  country: string,
  state?: string
): string => {
  if (state) {
    return `${city}, ${state}, ${country}`;
  }
  return `${city}, ${country}`;
};

/**
 * Gets time of day based on timestamp and sunrise/sunset
 */
export const getTimeOfDay = (
  currentTime: number,
  sunrise: number,
  sunset: number
): 'day' | 'night' => {
  return currentTime >= sunrise && currentTime < sunset ? 'day' : 'night';
};

/**
 * Formats probability of precipitation
 */
export const formatPrecipitationProbability = (pop: number): string => {
  return `${Math.round(pop * 100)}%`;
};

/**
 * Checks if timestamp is today
 */
export const isToday = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if timestamp is tomorrow
 */
export const isTomorrow = (timestamp: number): boolean => {
  const date = new Date(timestamp * 1000);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Gets relative day name (Today, Tomorrow, or day name)
 */
export const getRelativeDayName = (timestamp: number): string => {
  if (isToday(timestamp)) return 'Today';
  if (isTomorrow(timestamp)) return 'Tomorrow';
  return formatDayName(timestamp);
};
