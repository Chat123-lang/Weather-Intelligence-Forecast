/**
 * Local Storage Utilities
 * Type-safe wrapper for localStorage operations
 */

import { safeJsonParse } from './helpers';

/**
 * Gets an item from localStorage
 */
export const getStorageItem = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return safeJsonParse<T>(item, fallback);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return fallback;
  }
};

/**
 * Sets an item in localStorage
 */
export const setStorageItem = <T>(key: string, value: T): boolean => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Removes an item from localStorage
 */
export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clears all items from localStorage
 */
export const clearStorage = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Checks if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets all keys from localStorage
 */
export const getAllStorageKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Gets storage size in bytes (approximate)
 */
export const getStorageSize = (): number => {
  try {
    let size = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};