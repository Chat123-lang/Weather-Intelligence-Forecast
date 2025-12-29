/**
 * HTTP Client Utility
 * Centralized HTTP client with error handling, timeout, and cancellation support
 */

import { env } from '@/config/env';
import { HTTP_STATUS } from '@/config/constants';
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
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  let fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;

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
  let errorMessage = 'Failed to fetch weather data. Please try again.';
  let apiError: ApiErrorResponse | null = null;

  try {
    apiError = await response.json();
    if (apiError?.message) {
      errorMessage = apiError.message;
    }
  } catch {
    // If parsing fails, use default error message
  }

  switch (response.status) {
    case HTTP_STATUS.UNAUTHORIZED:
      errorMessage = 'Invalid API key. Please check your configuration.';
      break;
    case HTTP_STATUS.NOT_FOUND:
      errorMessage = 'City not found. Please check the spelling and try again.';
      break;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      errorMessage = 'Too many requests. Please wait a moment and try again.';
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

  async get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { timeout = env.api.timeout, params, signal, ...fetchOptions } = options;

    const timeoutController = createAbortController(timeout);
    const finalSignal = signal || timeoutController.signal;

    const url = buildUrl(this.baseUrl, endpoint, params);
    
    console.log('🌐 Fetching URL:', url);

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
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timed out. Please try again.');
      }

      if (error instanceof TypeError) {
        throw new ApiError('Network error. Please check your internet connection.');
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError('An unexpected error occurred. Please try again.', undefined, error);
    }
  }
}

export const weatherApiClient = new HttpClient(env.weather.baseUrl);
export const geoApiClient = new HttpClient(env.weather.geoBaseUrl);