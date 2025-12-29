/**
 * Weather Service
 * API service for geocoding and weather data
 */

import { weatherApiClient, geoApiClient } from '@/shared/utils/httpClient';
import { env } from '@/config/env';
import type {
  GeoLocation,
  CurrentWeatherResponse,
  ForecastResponse,
  SearchSuggestion,
  WeatherUnits,
} from '@/shared/types/weather.types';
import { generateId } from '@/shared/utils/helpers';

/**
 * Search for cities by name (geocoding)
 */
export const searchCities = async (
  query: string,
  limit: number = 5,
  signal?: AbortSignal
): Promise<SearchSuggestion[]> => {
  if (!query.trim()) {
    return [];
  }

  const locations = await geoApiClient.get<GeoLocation[]>(
    '/direct',
    {
      params: {
        q: query,
        limit,
        appid: env.weather.apiKey,
      },
      signal,
    }
  );

  // Transform to search suggestions
  return locations.map((location) => ({
    id: generateId(),
    name: location.name,
    country: location.country,
    state: location.state,
    coordinates: {
      lat: location.lat,
      lon: location.lon,
    },
    displayName: location.state
      ? `${location.name}, ${location.state}, ${location.country}`
      : `${location.name}, ${location.country}`,
  }));
};

/**
 * Get current weather by coordinates
 */
export const getCurrentWeather = async (
  lat: number,
  lon: number,
  units: WeatherUnits = 'metric',
  signal?: AbortSignal
): Promise<CurrentWeatherResponse> => {
  return weatherApiClient.get<CurrentWeatherResponse>(
    '/weather',
    {
      params: {
        lat,
        lon,
        units,
        appid: env.weather.apiKey,
      },
      signal,
    }
  );
};

/**
 * Get current weather by city name
 */
export const getCurrentWeatherByCity = async (
  city: string,
  units: WeatherUnits = 'metric',
  signal?: AbortSignal
): Promise<CurrentWeatherResponse> => {
  return weatherApiClient.get<CurrentWeatherResponse>(
    '/weather',
    {
      params: {
        q: city,
        units,
        appid: env.weather.apiKey,
      },
      signal,
    }
  );
};

/**
 * Get weather forecast by coordinates
 */
export const getForecast = async (
  lat: number,
  lon: number,
  units: WeatherUnits = 'metric',
  signal?: AbortSignal
): Promise<ForecastResponse> => {
  return weatherApiClient.get<ForecastResponse>('/forecast', {
    params: {
      lat,
      lon,
      units,
      appid: env.weather.apiKey,
    },
    signal,
  });
};

/**
 * Get weather forecast by city name
 */
export const getForecastByCity = async (
  city: string,
  units: WeatherUnits = 'metric',
  signal?: AbortSignal
): Promise<ForecastResponse> => {
  return weatherApiClient.get<ForecastResponse>('/forecast', {
    params: {
      q: city,
      units,
      appid: env.weather.apiKey,
    },
    signal,
  });
};