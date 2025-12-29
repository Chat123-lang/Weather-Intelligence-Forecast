/**
 * Weather Search Component
 * Main search component combining input, suggestions, and location button
 */

import React, { useState, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { SearchSuggestions } from './SearchSuggestions';
import { LocationButton } from './LocationButton';
import { useWeatherSearch } from '../hooks/useWeatherSearch';
import { useGeolocation } from '@/shared/hooks/useGeolocation';
import { EmptyState, ErrorMessage } from '@/shared/components';
import type { SearchSuggestion, Coordinates } from '@/shared/types/weather.types';
import { cn } from '@/shared/utils/cn';

interface WeatherSearchProps {
  onSelectCity: (suggestion: SearchSuggestion) => void;
  onSelectLocation?: (coordinates: Coordinates) => void;
  className?: string;
}

/**
 * Weather search component with autocomplete and geolocation
 */
export const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onSelectCity,
  onSelectLocation,
  className,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Search hook
  const {
    searchQuery,
    setSearchQuery,
    suggestions,
    isSearching,
    searchError,
    clearSearch,
    hasResults,
    isEmpty,
  } = useWeatherSearch();

  // Geolocation hook
  const {
    coordinates: geoCoordinates,
    isLoading: isGettingLocation,
    error: geoError,
    getCurrentLocation,
    clearError: clearGeoError,
  } = useGeolocation();

  // Handle input change
  const handleInputChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setShowSuggestions(true);
      clearGeoError();
    },
    [setSearchQuery, clearGeoError]
  );

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback(
    (suggestion: SearchSuggestion) => {
      onSelectCity(suggestion);
      clearSearch();
      setShowSuggestions(false);
    },
    [onSelectCity, clearSearch]
  );

  // Handle clear
  const handleClear = useCallback(() => {
    clearSearch();
    setShowSuggestions(false);
  }, [clearSearch]);

  // Handle current location
  const handleGetLocation = useCallback(() => {
    clearGeoError();
    getCurrentLocation();
  }, [getCurrentLocation, clearGeoError]);

  // Effect: When geolocation succeeds, notify parent
  React.useEffect(() => {
    if (geoCoordinates && onSelectLocation) {
      onSelectLocation(geoCoordinates);
    }
  }, [geoCoordinates, onSelectLocation]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Input and Location Button Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <SearchInput
            value={searchQuery}
            onChange={handleInputChange}
            onClear={handleClear}
            isLoading={isSearching}
            autoFocus
          />

          {/* Search Results */}
          {showSuggestions && searchQuery.length >= 2 && (
            <>
              {/* Suggestions Dropdown */}
              {hasResults && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSelect={handleSelectSuggestion}
                  isVisible={showSuggestions}
                />
              )}

              {/* Empty State */}
              {isEmpty && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 animate-slide-up">
                  <EmptyState
                    icon="search"
                    title="No cities found"
                    description="Try adjusting your search query"
                  />
                </div>
              )}

              {/* Search Error */}
              {searchError && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-slide-up">
                  <ErrorMessage
                    message={searchError.message}
                    title="Search Error"
                    variant="compact"
                  />
                </div>
              )}
            </>
          )}

          {/* Backdrop to close suggestions */}
          {showSuggestions && searchQuery.length >= 2 && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowSuggestions(false)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Location Button */}
        <LocationButton
          onClick={handleGetLocation}
          isLoading={isGettingLocation}
        />
      </div>

      {/* Geolocation Error */}
      {geoError && (
        <ErrorMessage
          message={geoError}
          title="Location Error"
          variant="compact"
          onRetry={handleGetLocation}
        />
      )}

      {/* Geolocation Success Message */}
      {geoCoordinates && !geoError && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-sm text-green-800 dark:text-green-200 animate-fade-in">
          <MapPin className="w-4 h-4" />
          <span>
            Location found: {geoCoordinates.lat.toFixed(4)}, {geoCoordinates.lon.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};