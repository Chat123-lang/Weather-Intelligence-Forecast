/**
 * useTheme Hook
 * Custom hook for managing theme (dark/light mode)
 */

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { getStorageItem, setStorageItem } from '@/shared/utils/storage';
import type { Theme } from '@/shared/types/weather.types';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

/**
 * Gets the system theme preference
 */
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * Gets the initial theme from storage or system preference
 */
const getInitialTheme = (): Theme => {
  const stored = getStorageItem<Theme | null>(STORAGE_KEYS.THEME, null);
  return stored || getSystemTheme();
};

/**
 * Custom hook for theme management
 */
export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = getStorageItem<Theme | null>(STORAGE_KEYS.THEME, null);
      // Only update if user hasn't set a preference
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setStorageItem(STORAGE_KEYS.THEME, newTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
};
