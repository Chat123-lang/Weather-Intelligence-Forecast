/**
 * HTTP Client Utility
 * Centralized HTTP client with error handling, timeout, and cancellation support
 */

import { env } from '@/config/env';
import { ERROR_MESSAGES, HTTP_STATUS } from '@/config/constants';
import type { ApiErrorResponse } from '@/shared/types/weather.types';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * HTTP Client configuration options
 */
interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

/**
 * Builds URL with query parameters
 */
const buildUrl = (
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string => {
  // Clean up baseUrl and endpoint
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Combine base URL and endpoint
  let fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;

  // Add query parameters
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    if (queryString) {
      fullUrl = `${fullUrl}?${queryString}`;
    }
  }

  return fullUrl;
};

/**
 * Handles API error responses
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = ERROR_MESSAGES.API_ERROR;
  let apiError: ApiErrorResponse | null = null;

  // Try to parse error response
  try {
    apiError = await response.json();
    if (apiError?.message) {
      errorMessage = apiError.message;
    }
  } catch {
    // If parsing fails, use default error message
  }

  // Handle specific status codes
  switch (response.status) {
    case HTTP_STATUS.UNAUTHORIZED:
      errorMessage = 'Invalid API key. Please check your configuration.';
      break;
    case HTTP_STATUS.NOT_FOUND:
      errorMessage = ERROR_MESSAGES.INVALID_CITY;
      break;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      errorMessage = ERROR_MESSAGES.RATE_LIMIT;
      break;
    case HTTP_STATUS.SERVER_ERROR:
      errorMessage = 'Server error. Please try again later.';
      break;
  }

  throw new ApiError(errorMessage, response.status, apiError);
};

/**
 * Creates an abort controller with timeout
 */
const createAbortController = (timeout: number): AbortController => {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, timeout);

  return controller;
};

/**
 * HTTP Client class
 */
class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Makes a GET request
   */
  async get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = env.api.timeout, params, signal, ...fetchOptions } = options;

    // Create abort controller for timeout
    const timeoutController = createAbortController(timeout);

    // Use provided signal or timeout signal
    const finalSignal = signal || timeoutController.signal;

    const url = buildUrl(this.baseUrl, endpoint, params);
    
    console.log('🌐 Fetching URL:', url); // Debug log

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: finalSignal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      // Handle abort/timeout errors
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(ERROR_MESSAGES.TIMEOUT);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR);
      }

      // Re-throw API errors
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle unknown errors
      throw new ApiError(ERROR_MESSAGES.UNKNOWN, undefined, error);
    }
  }
}

/**
 * Weather API HTTP client instance
 */
export const weatherApiClient = new HttpClient(env.weather.baseUrl);

/**
 * Geocoding API HTTP client instance
 */
export const geoApiClient = new HttpClient(env.weather.geoBaseUrl);