/**
 * Thunderstorm Effect Component
 * Lightning flashes with rain
 */

import React, { useState, useEffect } from 'react';
import { RainEffect } from './RainEffect';

export const ThunderstormEffect: React.FC = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RainEffect />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
          flash ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
    </>
  );
};