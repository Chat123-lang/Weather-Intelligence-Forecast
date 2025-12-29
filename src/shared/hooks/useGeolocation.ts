/**
 * useGeolocation Hook
 * Custom hook for getting user's current location
 */

import { useState, useCallback } from 'react';
import type { Coordinates } from '@/shared/types/weather.types';

interface GeolocationState {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
}

interface UseGeolocationReturn extends GeolocationState {
  getCurrentLocation: () => void;
  clearError: () => void;
}

/**
 * Custom hook for geolocation
 */
export const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
  });

  const getCurrentLocation = useCallback(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        isLoading: false,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = 'Failed to get your location';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setState({
          coordinates: null,
          isLoading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    getCurrentLocation,
    clearError,
  };
};