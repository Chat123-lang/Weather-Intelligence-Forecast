/**
 * Rain Effect Component
 * Animated raindrops falling from top
 */

import React from 'react';

export const RainEffect: React.FC = () => {
  const raindrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${0.5 + Math.random() * 0.5}s`,
  }));

  return (
    <>
      <style>{`
        @keyframes rain {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 h-12 bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-400/80 dark:to-blue-600/40 animate-rain"
            style={{
              left: drop.left,
              animationDelay: drop.animationDelay,
              animationDuration: drop.animationDuration,
            }}
          />
        ))}
      </div>
    </>
  );
};