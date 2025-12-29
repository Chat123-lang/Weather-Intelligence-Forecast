/**
 * Fog Effect Component
 * Misty fog layers
 */

import React from 'react';

export const FogEffect: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes fog {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fog {
          animation: fog linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-fog opacity-50"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(180, 180, 180, 0.4) 25%, 
                rgba(160, 160, 160, 0.6) 50%, 
                rgba(180, 180, 180, 0.4) 75%, 
                transparent 100%)`,
              animationDelay: `${i * 2}s`,
              animationDuration: '15s',
            }}
          />
        ))}
      </div>
    </>
  );
};