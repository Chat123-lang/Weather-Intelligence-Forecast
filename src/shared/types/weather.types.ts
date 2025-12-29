/**
 * Weather Data Types
 * Type definitions for weather API responses and application data structures
 */

/**
 * Geographic coordinates
 */
export interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * Location information from geocoding API
 */
export interface GeoLocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

/**
 * Weather condition details
 */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/**
 * Main weather metrics
 */
export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

/**
 * Wind information
 */
export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

/**
 * Cloud information
 */
export interface Clouds {
  all: number;
}

/**
 * Rain information
 */
export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

/**
 * Snow information
 */
export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

/**
 * System information (internal parameters)
 */
export interface SystemInfo {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

/**
 * Current weather API response
 */
export interface CurrentWeatherResponse {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

/**
 * Forecast list item
 */
export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string; // Part of day (d/n)
  };
  dt_txt: string;
}

/**
 * City information in forecast response
 */
export interface ForecastCity {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

/**
 * Forecast API response
 */
export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: ForecastCity;
}

/**
 * Processed daily forecast data
 */
export interface DailyForecast {
  date: string;
  dateString: string;
  temp: {
    min: number;
    max: number;
    avg: number;
  };
  weather: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

/**
 * Formatted current weather data for UI
 */
export interface FormattedWeatherData {
  location: {
    name: string;
    country: string;
    coordinates: Coordinates;
  };
  current: {
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    cloudiness: number;
  };
  condition: WeatherCondition;
  sun: {
    sunrise: number;
    sunset: number;
  };
  timestamp: number;
  timezone: number;
}

/**
 * Weather units type
 */
export type WeatherUnits = 'metric' | 'imperial' | 'standard';

/**
 * Theme type
 */
export type Theme = 'light' | 'dark';

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  cod: string | number;
  message: string;
}

/**
 * Search suggestion item
 */
export interface SearchSuggestion {
  id: string;
  name: string;
  country: string;
  state?: string;
  coordinates: Coordinates;
  displayName: string;
}

