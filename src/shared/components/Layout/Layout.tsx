/**
 * Layout Component
 * Main application layout wrapper
 */

import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/shared/utils/cn';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Main layout component with header and footer
 */
export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className={cn('flex-1', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};