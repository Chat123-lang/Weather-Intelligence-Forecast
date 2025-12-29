/**
 * useWeatherSearch Hook
 * Custom hook for city search with autocomplete, debouncing, and race condition handling
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../services/weatherService';
import { QUERY_KEYS, DEBOUNCE_DELAYS, DEFAULTS } from '@/config/constants';
import { debounce } from '@/shared/utils/helpers';
import type { SearchSuggestion } from '@/shared/types/weather.types';

interface UseWeatherSearchOptions {
  minSearchLength?: number;
  debounceDelay?: number;
  limit?: number;
}

interface UseWeatherSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: SearchSuggestion[];
  isSearching: boolean;
  searchError: Error | null;
  clearSearch: () => void;
  hasResults: boolean;
  isEmpty: boolean;
}

/**
 * Custom hook for weather city search
 */
export const useWeatherSearch = (
  options: UseWeatherSearchOptions = {}
): UseWeatherSearchReturn => {
  const {
    minSearchLength = 2,
    debounceDelay = DEBOUNCE_DELAYS.SEARCH,
    limit = DEFAULTS.SEARCH_LIMIT,
  } = options;

  // Local state for immediate UI updates
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Debounced query for API calls
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  // Abort controller for cancelling requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounced function to update the query used for API calls
  const debouncedSetQuery = useRef(
    debounce((query: string) => {
      setDebouncedQuery(query);
    }, debounceDelay)
  ).current;

  // Update debounced query when search query changes
  useEffect(() => {
    if (searchQuery.length >= minSearchLength) {
      debouncedSetQuery(searchQuery);
    } else {
      setDebouncedQuery('');
    }
  }, [searchQuery, minSearchLength, debouncedSetQuery]);

  // Determine if we should fetch
  const shouldFetch = debouncedQuery.length >= minSearchLength;

  // React Query for fetching search results
  const {
    data: suggestions = [],
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GEO_SEARCH, debouncedQuery, limit],
    queryFn: async ({ signal }) => {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Merge signals - use either React Query's signal or our abort controller
      const combinedSignal = signal || abortControllerRef.current.signal;

      return searchCities(debouncedQuery, limit, combinedSignal);
    },
    enabled: shouldFetch,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Computed values
  const hasResults = suggestions.length > 0;
  const isEmpty = !isSearching && !hasResults && debouncedQuery.length >= minSearchLength;

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    isSearching,
    searchError: searchError as Error | null,
    clearSearch,
    hasResults,
    isEmpty,
  };
};
