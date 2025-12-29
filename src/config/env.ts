/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 * Validates and provides type-safe access to environment variables
 */

interface EnvConfig {
  weather: {
    apiKey: string;
    baseUrl: string;
    geoBaseUrl: string;
  };
  api: {
    timeout: number;
    defaultUnits: 'metric' | 'imperial' | 'standard';
    defaultLanguage: string;
  };
  cache: {
    staleTime: number;
    cacheTime: number;
  };
  rateLimit: {
    requestsPerMinute: number;
  };
}

/**
 * Validates that required environment variables are present
 */
const validateEnv = (): void => {
  const requiredVars = ['VITE_WEATHER_API_KEY'];

  const missing = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
    console.error('Please check your .env file and ensure all required variables are set.');
    
    // Only throw in development, warn in production
    if (import.meta.env.DEV) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}\n` +
          'Please check your .env file and ensure all required variables are set.'
      );
    }
  }
};

/**
 * Parses a string value to number, with fallback
 */
const parseNumber = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Get environment variable with type safety
 */
const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// Validate environment on module load
validateEnv();

/**
 * Exported environment configuration
 * All environment variables are accessed through this object
 */
export const env: EnvConfig = {
  weather: {
    apiKey: getEnvVar('VITE_WEATHER_API_KEY', ''),
    baseUrl: getEnvVar(
      'VITE_WEATHER_API_BASE_URL',
      'https://api.openweathermap.org/data/2.5'
    ),
    geoBaseUrl: getEnvVar(
      'VITE_WEATHER_GEO_API_BASE_URL',
      'https://api.openweathermap.org/geo/1.0'
    ),
  },
  api: {
    timeout: parseNumber(getEnvVar('VITE_API_TIMEOUT'), 10000),
    defaultUnits: (getEnvVar('VITE_DEFAULT_UNITS', 'metric') as EnvConfig['api']['defaultUnits']),
    defaultLanguage: getEnvVar('VITE_DEFAULT_LANGUAGE', 'en'),
  },
  cache: {
    staleTime: parseNumber(getEnvVar('VITE_CACHE_STALE_TIME'), 300000), // 5 minutes
    cacheTime: parseNumber(getEnvVar('VITE_CACHE_TIME'), 600000), // 10 minutes
  },
  rateLimit: {
    requestsPerMinute: parseNumber(
      getEnvVar('VITE_API_RATE_LIMIT_PER_MINUTE'),
      60
    ),
  },
};

/**
 * Check if we're in development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Check if we're in production mode
 */
export const isProduction = import.meta.env.PROD;
