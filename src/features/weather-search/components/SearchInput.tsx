/**
 * Search Input Component
 * Autocomplete search input with suggestions dropdown
 */

import React, { useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Search input component with loading and clear functionality
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  isLoading = false,
  placeholder = 'Search for a city...',
  className,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={cn('relative', className)}>
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-10 py-3 rounded-lg',
          'bg-white dark:bg-gray-800',
          'border border-gray-300 dark:border-gray-600',
          'text-gray-900 dark:text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200'
        )}
        aria-label="Search for a city"
        aria-autocomplete="list"
        aria-controls="search-suggestions"
      />

      {/* Loading or Clear Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
        ) : value ? (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Clear search"
            type="button"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
