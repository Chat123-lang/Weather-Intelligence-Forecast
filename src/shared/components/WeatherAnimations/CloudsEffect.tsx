/**
 * Clouds Effect Component
 * Animated clouds drifting across
 */

import React from 'react';

export const CloudsEffect: React.FC = () => {
  const clouds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 60}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${20 + Math.random() * 20}s`,
    size: 80 + Math.random() * 100,
  }));

  return (
    <>
      <style>{`
        @keyframes cloud {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 150px));
          }
        }
        .animate-cloud {
          animation: cloud linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute animate-cloud opacity-40"
            style={{
              top: cloud.top,
              left: '-150px',
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              animationDelay: cloud.animationDelay,
              animationDuration: cloud.animationDuration,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-500/60 to-gray-600/60 dark:from-gray-400/50 dark:to-gray-500/50 rounded-full blur-sm" />
          </div>
        ))}
      </div>
    </>
  );
};