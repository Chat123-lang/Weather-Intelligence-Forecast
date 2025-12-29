/**
 * Class Name Utilities
 * Helper for conditional class name composition
 */

import clsx, { ClassValue } from 'clsx';

/**
 * Combines class names conditionally
 * Wrapper around clsx for consistent usage
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}