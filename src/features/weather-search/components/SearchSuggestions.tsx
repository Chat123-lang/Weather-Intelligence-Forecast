/**
 * Search Suggestions Component
 * Dropdown list of city search suggestions
 */

import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { SearchSuggestion } from '@/shared/types/weather.types';

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
  isVisible: boolean;
  className?: string;
}

/**
 * Search suggestions dropdown component
 */
export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelect,
  isVisible,
  className,
}) => {
  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      id="search-suggestions"
      className={cn(
        'absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg',
        'max-h-80 overflow-y-auto z-50 animate-slide-up',
        className
      )}
      role="listbox"
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 text-left',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'focus:bg-gray-50 dark:focus:bg-gray-700 focus:outline-none',
            'border-b border-gray-100 dark:border-gray-700 last:border-b-0',
            'transition-colors'
          )}
          role="option"
          aria-selected="false"
        >
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {suggestion.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {suggestion.state
                ? `${suggestion.state}, ${suggestion.country}`
                : suggestion.country}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
