
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  name: string;
  coordinates: [number, number];
  type: string;
  description: string;
  status: string;
}

interface InteractiveMapProps {
  locations: Record<string, Location>;
  activeLocation?: string;
  onLocationClick?: (locationId: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  activeLocation,
  onLocationClick
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Syria-Jordan border region bounds
  const mapBounds = {
    minLat: 32.0,
    maxLat: 34.0,
    minLng: 35.5,
    maxLng: 37.5
  };

  const getLocationPosition = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'government_facility': return 'text-blue-400';
      case 'production_facility': return 'text-red-400';
      case 'smuggling_point': return 'text-yellow-400';
      case 'tactical_position': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="relative w-full h-96 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      {/* Map background with grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      {/* Border line indicator */}
      <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute left-1/4 top-1/2 text-red-400 text-xs font-mono transform -translate-y-4">
        SYRIA-JORDAN BORDER
      </div>

      {/* Location markers */}
      {Object.entries(locations).map(([id, location]) => {
        const position = getLocationPosition(location.coordinates);
        const isActive = activeLocation === id;
        const isHovered = hoveredLocation === id;

        return (
          <div
            key={id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onMouseEnter={() => setHoveredLocation(id)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() => onLocationClick?.(id)}
          >
            <div className={cn(
              'relative transition-all duration-300',
              isActive && 'scale-125',
              isHovered && 'scale-110'
            )}>
              <MapPin 
                className={cn(
                  'w-6 h-6 transition-all duration-300',
                  getLocationColor(location.type),
                  isActive && 'drop-shadow-lg',
                  isHovered && 'drop-shadow-md'
                )}
              />
              
              {/* Pulse animation for active locations */}
              {isActive && (
                <div className="absolute inset-0 rounded-full border-2 border-current animate-ping opacity-75" />
              )}
            </div>

            {/* Location tooltip */}
            {(isHovered || isActive) && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 min-w-48 shadow-xl">
                  <h4 className="text-white font-semibold text-sm">{location.name}</h4>
                  <p className="text-gray-300 text-xs mt-1">{location.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{location.type.replace('_', ' ')}</span>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded',
                      location.status === 'operational' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    )}>
                      {location.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Coordinates overlay */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
        {mapBounds.minLat}°N - {mapBounds.maxLat}°N, {mapBounds.minLng}°E - {mapBounds.maxLng}°E
      </div>
    </div>
  );
};

export default InteractiveMap;
