import React from 'react';
import { cn } from '@/shared/utils/cn';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
        'mt-auto',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Weather Intelligence Dashboard. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Powered by</span>
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              OpenWeatherMap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
