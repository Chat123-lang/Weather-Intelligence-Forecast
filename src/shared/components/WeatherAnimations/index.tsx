/**
 * Weather Animations Index
 * Main component that selects the appropriate animation
 */

import React from 'react';
import { RainEffect } from './RainEffect';
import { SnowEffect } from './SnowEffect';
import { CloudsEffect } from './CloudsEffect';
import { SunRaysEffect } from './SunRaysEffect';
import { ThunderstormEffect } from './ThunderstormEffect';
import { FogEffect } from './FogEffect';

interface WeatherAnimationProps {
  weatherCode: number;
  className?: string;
}

/**
 * Returns the appropriate weather animation based on weather code
 */
export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  weatherCode,
  className = '',
}) => {
  const getAnimation = () => {
    // Thunderstorm (200-232)
    if (weatherCode >= 200 && weatherCode < 300) {
      return <ThunderstormEffect />;
    }
    
    // Drizzle (300-321)
    if (weatherCode >= 300 && weatherCode < 400) {
      return <RainEffect />;
    }
    
    // Rain (500-531)
    if (weatherCode >= 500 && weatherCode < 600) {
      return <RainEffect />;
    }
    
    // Snow (600-622)
    if (weatherCode >= 600 && weatherCode < 700) {
      return <SnowEffect />;
    }
    
    // Atmosphere (fog, mist, haze) (701-781)
    if (weatherCode >= 701 && weatherCode < 800) {
      return <FogEffect />;
    }
    
    // Clear (800)
    if (weatherCode === 800) {
      return <SunRaysEffect />;
    }
    
    // Clouds (801-804)
    if (weatherCode > 800 && weatherCode < 805) {
      return <CloudsEffect />;
    }
    
    return null;
  };

  return (
    <div className={className}>
      {getAnimation()}
    </div>
  );
};

// Export individual effects for direct use
export { RainEffect } from './RainEffect';
export { SnowEffect } from './SnowEffect';
export { CloudsEffect } from './CloudsEffect';
export { SunRaysEffect } from './SunRaysEffect';
export { ThunderstormEffect } from './ThunderstormEffect';
export { FogEffect } from './FogEffect';