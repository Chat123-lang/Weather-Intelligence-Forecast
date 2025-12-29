/**
 * Header Component
 * Application header with theme toggle
 */

import React from 'react';
import { Cloud } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { cn } from '@/shared/utils/cn';

interface HeaderProps {
  className?: string;
}

/**
 * Header component with branding and theme toggle
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
        'sticky top-0 z-40',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Weather Intelligence
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Real-time weather data & forecasts
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
