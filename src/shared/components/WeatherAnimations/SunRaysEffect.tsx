/**
 * Sun Rays Effect Component
 * Animated sun rays for clear weather
 */

import React from 'react';

export const SunRaysEffect: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes sun-ray {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-sun-ray {
          animation: sun-ray 3s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-48 bg-gradient-to-b from-yellow-400/40 to-transparent dark:from-yellow-300/20 dark:to-transparent origin-top animate-sun-ray"
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};