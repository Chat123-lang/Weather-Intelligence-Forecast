/**
 * Vite Environment Type Definitions
 * TypeScript declarations for Vite environment variables
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_WEATHER_API_BASE_URL: string;
  readonly VITE_WEATHER_GEO_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_DEFAULT_UNITS: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_CACHE_STALE_TIME: string;
  readonly VITE_CACHE_TIME: string;
  readonly VITE_API_RATE_LIMIT_PER_MINUTE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
