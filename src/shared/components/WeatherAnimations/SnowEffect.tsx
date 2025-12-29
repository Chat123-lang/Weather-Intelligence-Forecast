/**
 * Snow Effect Component
 * Animated snowflakes falling gently - Enhanced visibility for light mode
 */

import React from 'react';

export const SnowEffect: React.FC = () => {
  const snowflakes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 5}s`,
    size: `${6 + Math.random() * 6}px`,
  }));

  return (
    <>
      <style>{`
        @keyframes snow {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0.5;
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
        .snowflake-light {
          background: radial-gradient(circle, #ffffff 40%, #e0f2ff 60%, #bae6fd 100%);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.6), 0 0 4px rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .snowflake-dark {
          background: radial-gradient(circle, #ffffff 40%, #f0f9ff 100%);
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full animate-snow snowflake-light dark:snowflake-dark"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              animationDelay: flake.animationDelay,
              animationDuration: flake.animationDuration,
            }}
          />
        ))}
      </div>
    </>
  );
};