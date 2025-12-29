/**
 * Weather Map Component
 * Interactive map with weather layers
 */

import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Cloud, Droplets, Wind, Thermometer, Layers } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { env } from '@/config/env';
import type { Coordinates } from '@/shared/types/weather.types';
import './leafletConfig';

interface WeatherMapProps {
  center?: Coordinates;
  zoom?: number;
  className?: string;
}

type WeatherLayer = 'temp' | 'precipitation' | 'clouds' | 'wind' | 'none';

interface LayerOption {
  id: WeatherLayer;
  label: string;
  icon: React.ReactNode;
  layerName: string;
  color: string;
}

/**
 * Component to update map center when coordinates change
 */
const MapUpdater: React.FC<{ center: Coordinates; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lon], zoom);
  }, [center.lat, center.lon, zoom, map]);

  return null;
};

/**
 * Weather Map Component
 */
export const WeatherMap: React.FC<WeatherMapProps> = ({
  center = { lat: 51.505, lon: -0.09 },
  zoom = 10,
  className,
}) => {
  const [activeLayer, setActiveLayer] = useState<WeatherLayer>('temp');

  const layerOptions: LayerOption[] = useMemo(
    () => [
      {
        id: 'temp',
        label: 'Temperature',
        icon: <Thermometer className="w-4 h-4" />,
        layerName: 'temp_new',
        color: 'bg-orange-500',
      },
      {
        id: 'precipitation',
        label: 'Precipitation',
        icon: <Droplets className="w-4 h-4" />,
        layerName: 'precipitation_new',
        color: 'bg-blue-500',
      },
      {
        id: 'clouds',
        label: 'Clouds',
        icon: <Cloud className="w-4 h-4" />,
        layerName: 'clouds_new',
        color: 'bg-gray-500',
      },
      {
        id: 'wind',
        label: 'Wind',
        icon: <Wind className="w-4 h-4" />,
        layerName: 'wind_new',
        color: 'bg-green-500',
      },
      {
        id: 'none',
        label: 'None',
        icon: <Layers className="w-4 h-4" />,
        layerName: '',
        color: 'bg-gray-600',
      },
    ],
    []
  );

  const getWeatherLayerUrl = (layerName: string) => {
    if (!layerName) return null;
    return `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${env.weather.apiKey}`;
  };

  const activeLayerUrl = useMemo(() => {
    const layer = layerOptions.find((l) => l.id === activeLayer);
    return layer ? getWeatherLayerUrl(layer.layerName) : null;
  }, [activeLayer, layerOptions]);

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-card dark:shadow-card-dark overflow-hidden animate-fade-in',
        className
      )}
    >
      {/* Map Controls Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Weather Map
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Interactive weather visualization
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {layerOptions.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
                activeLayer === layer.id
                  ? `${layer.color} text-white shadow-md scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
              aria-label={`Show ${layer.label} layer`}
            >
              {layer.icon}
              <span>{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[500px] relative bg-gray-100 dark:bg-gray-900">
        <MapContainer
          center={[center.lat, center.lon]}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
          className="z-0"
          attributionControl={false}
        >
          <TileLayer
            attribution=""
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activeLayerUrl && (
            <TileLayer
              url={activeLayerUrl}
              opacity={0.6}
              attribution=""
            />
          )}

          <MapUpdater center={center} zoom={zoom} />
        </MapContainer>
      </div>

      {/* Map Info Footer */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Layers className="w-4 h-4" />
          <span>Active Layer:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {layerOptions.find((l) => l.id === activeLayer)?.label || 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};