/**
 * App Component
 * Main application component with state management, feature composition, and auto-refresh
 */

import React, { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '@/shared/components/Layout';
import { ErrorBoundary, LastUpdated, LiveIndicator } from '@/shared/components';
import { WeatherSearch } from '@/features/weather-search/components';
import { CurrentWeather } from '@/features/current-weather/components';
import { Forecast } from '@/features/forecast/components';
import { WeatherMap } from '@/features/weather-map/components';
import { useAutoRefresh } from '@/shared/hooks';
import type { SearchSuggestion, Coordinates } from '@/shared/types/weather.types';
import { env } from '@/config/env';

/**
 * Create React Query client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: env.cache.staleTime,
      gcTime: env.cache.cacheTime,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Main App Component
 */
const App: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | undefined>(
    undefined
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle city selection from search
  const handleCitySelect = useCallback((suggestion: SearchSuggestion) => {
    setSelectedCoordinates(suggestion.coordinates);
  }, []);

  // Handle current location selection
  const handleLocationSelect = useCallback((coordinates: Coordinates) => {
    setSelectedCoordinates(coordinates);
  }, []);

  // Refresh function
  const handleRefresh = useCallback(() => {
    // Invalidate all queries to force refetch
    queryClient.invalidateQueries();
    // Trigger re-render
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Auto-refresh hook
  const { lastRefreshed, timeUntilNextRefresh, manualRefresh } = useAutoRefresh({
    interval: 10 * 60 * 1000, // 10 minutes
    enabled: !!selectedCoordinates, // Only refresh when location is selected
    onRefresh: handleRefresh,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Layout>
          <div className="space-y-8">
            {/* Search Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Search Location
                </h2>
                {selectedCoordinates && <LiveIndicator />}
              </div>
              <WeatherSearch 
                onSelectCity={handleCitySelect}
                onSelectLocation={handleLocationSelect}
              />
            </section>

            {/* Auto-Refresh Status */}
            {selectedCoordinates && (
              <section>
                <LastUpdated
                  lastRefreshed={lastRefreshed}
                  timeUntilNextRefresh={timeUntilNextRefresh}
                  onRefresh={manualRefresh}
                  isRefreshing={false}
                />
              </section>
            )}

            {/* Current Weather Section */}
            <section key={`weather-${refreshTrigger}`}>
              <CurrentWeather
                coordinates={selectedCoordinates}
                units="metric"
              />
            </section>

            {/* Forecast Section */}
            <section key={`forecast-${refreshTrigger}`}>
              <Forecast
                coordinates={selectedCoordinates}
                units="metric"
              />
            </section>

            {/* Weather Map Section */}
            <section>
              <WeatherMap
                center={selectedCoordinates}
                zoom={selectedCoordinates ? 10 : 5}
              />
            </section>
          </div>
        </Layout>
      </ErrorBoundary>

      {/* React Query DevTools (only in development) */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;