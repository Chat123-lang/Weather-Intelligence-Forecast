/**
 * Location Button Component
 * Button to get current location using geolocation
 */

import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface LocationButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * Location button for geolocation
 */
export const LocationButton: React.FC<LocationButtonProps> = ({
  onClick,
  isLoading = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all',
        'bg-primary-600 hover:bg-primary-700 text-white',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'shadow-md hover:shadow-lg',
        className
      )}
      aria-label="Use current location"
      title="Use my current location"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <MapPin className="w-5 h-5" />
      )}
      <span>{isLoading ? 'Getting location...' : 'Use Current Location'}</span>
    </button>
  );
};