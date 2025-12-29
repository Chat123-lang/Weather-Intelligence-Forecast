/**
 * Application Constants
 * Centralized constants for API endpoints, query keys, and other static values
 */

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  GEO_DIRECT: '/direct',
  GEO_REVERSE: '/reverse',
} as const;

/**
 * React Query Keys
 * Used for caching and invalidation
 */
export const QUERY_KEYS = {
  WEATHER_SEARCH: 'weather-search',
  CURRENT_WEATHER: 'current-weather',
  FORECAST: 'forecast',
  GEO_SEARCH: 'geo-search',
} as const;

/**
 * Weather Units
 */
export const WEATHER_UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
  STANDARD: 'standard',
} as const;

/**
 * Temperature symbols by unit
 */
export const TEMPERATURE_SYMBOLS = {
  metric: '°C',
  imperial: '°F',
  standard: 'K',
} as const;

/**
 * Speed units by measurement system
 */
export const SPEED_UNITS = {
  metric: 'm/s',
  imperial: 'mph',
  standard: 'm/s',
} as const;

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 500,
  RESIZE: 200,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  THEME: 'weather-dashboard-theme',
  RECENT_SEARCHES: 'weather-dashboard-recent-searches',
  PREFERRED_UNITS: 'weather-dashboard-units',
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  CITY: 'London',
  FORECAST_DAYS: 7,
  SEARCH_LIMIT: 5,
  MAX_RECENT_SEARCHES: 5,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  API_ERROR: 'Failed to fetch weather data. Please try again.',
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  INVALID_CITY: 'City not found. Please check the spelling and try again.',
  PERMISSION_DENIED: 'Location permission denied.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

/**
 * Weather condition codes mapping
 * OpenWeatherMap condition codes to readable descriptions
 */
export const WEATHER_CONDITIONS = {
  THUNDERSTORM: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  DRIZZLE: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  RAIN: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  SNOW: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  ATMOSPHERE: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  CLEAR: [800],
  CLOUDS: [801, 802, 803, 804],
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Breakpoints for responsive design (in pixels)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
