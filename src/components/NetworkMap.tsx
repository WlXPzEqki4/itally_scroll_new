
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';

interface MapLocation {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  coordinateString: string;
  type: 'production_facility' | 'headquarters' | 'innovation_site' | 'active_headquarters' | 'storage_facility';
  activeInSections: string[];
  details: {
    owner?: string;
    supervisor?: string;
    capabilities?: string[];
    security?: string;
    equipment?: string[];
    cover?: string;
    protection?: string;
    method?: string;
    range?: string;
    operators?: string[];
    residents?: string;
    status?: string;
    established?: string;
  };
}

const mapLocations: Record<string, MapLocation> = {
  ghasm_farm: {
    name: "Ghasm Village Farm",
    coordinates: [36.38786, 32.50053],
    coordinateString: "32°30'01.9\"N, 36°23'16.3\"E",
    type: "production_facility",
    activeInSections: ["foundation", "investment", "current"],
    details: {
      owner: "Rafi Al-Ruwais",
      capabilities: ["pill production", "storage"],
      established: "2022-03"
    }
  },
  damascus_factory: {
    name: "Damascus Manufacturing Facility",
    coordinates: [36.25150, 33.41928],
    coordinateString: "33°25'09.4\"N, 36°15'05.4\"E",
    type: "production_facility",
    activeInSections: ["foundation"],
    details: {
      supervisor: "Bassem Arsan",
      capabilities: ["raw material processing", "pill manufacturing"]
    }
  },
  maaraba_fortress: {
    name: "Maaraba Fortified Farm",
    coordinates: [36.39069, 32.50119],
    coordinateString: "32°30'04.3\"N, 36°23'18.5\"E",
    type: "headquarters",
    activeInSections: ["fortress", "scaling", "current"],
    details: {
      security: "6-person armed detail, 4 rotating shifts",
      equipment: ["12.7mm machine guns", "armored GMC vehicles", "surveillance cameras"],
      status: "Joint Hezbollah-Al Ruwais base"
    }
  },
  lajat_school: {
    name: "Lajat School Facility",
    coordinates: [36.30631, 32.95758],
    coordinateString: "32°57'27.3\"N, 36°18'22.7\"E",
    type: "storage_facility",
    activeInSections: ["scaling"],
    details: {
      cover: "Elementary school building",
      protection: "Air Force Intelligence",
      supervisor: "Hassan Roydan"
    }
  },
  mortar_launch_site: {
    name: "Mortar Launch Position",
    coordinates: [36.36144, 32.41122],
    coordinateString: "32°24'40.4\"N, 36°21'41.2\"E",
    type: "innovation_site",
    activeInSections: ["innovation", "current"],
    details: {
      method: "82mm mortar drug delivery",
      range: "3km to Jordan",
      operators: ["Ahmed Al-Ruwais", "Muhammad Al-Ruwais"]
    }
  },
  current_hq_farm: {
    name: "Current Operations HQ",
    coordinates: [36.40769, 32.52489],
    coordinateString: "32°31'29.6\"N, 36°24'27.7\"E",
    type: "active_headquarters",
    activeInSections: ["current", "summary"],
    details: {
      residents: "15+ individuals",
      protection: "Osama Al-Dayat (8th Brigade)",
      status: "Active operations center"
    }
  }
};

interface NetworkMapProps {
  activeSection: string;
  onLocationSelect?: (location: MapLocation) => void;
}

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamNkZW50b24yMDUxIiwiYSI6ImNtMzVkZXJudTA5ejkya3B5NDU4Z2MyeHQifQ.aUk4eH5k3JC45Foxcbe2qQ';

const NetworkMap: React.FC<NetworkMapProps> = ({ activeSection, onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});

  useEffect(() => {
    switch(activeSection) {
      case 'foundation':
        setActiveLocations(['damascus_factory', 'ghasm_farm']);
        break;
      case 'fortress':
        setActiveLocations(['maaraba_fortress']);
        break;
      case 'scaling':
        setActiveLocations(['ghasm_farm', 'maaraba_fortress', 'lajat_school']);
        break;
      case 'innovation':
        setActiveLocations(['mortar_launch_site']);
        break;
      case 'current':
      case 'summary':
        setActiveLocations(['current_hq_farm']);
        break;
      default:
        setActiveLocations(Object.keys(mapLocations));
    }
  }, [activeSection]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [36.3, 32.5],
      zoom: 8
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for active locations
    Object.entries(mapLocations).forEach(([key, location]) => {
      const isActive = activeLocations.includes(key);
      const isVisible = activeLocations.length === 0 || isActive;
      
      if (!isVisible) return;

      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = `cursor-pointer transition-all duration-300 ${isActive ? 'scale-125' : 'scale-100 opacity-60'}`;
      markerEl.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="text-2xl bg-white rounded-full p-2 shadow-lg border-2 ${isActive ? 'border-white' : 'border-gray-300'} ${getMarkerColor(location.type)}">
            ${getMarkerIcon(location.type)}
          </div>
          ${isActive ? `<div class="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap">${location.name}</div>` : ''}
        </div>
      `;

      // Create and add marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .addTo(map.current!);

      // Add click handler
      markerEl.addEventListener('click', () => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
        console.log('Selected location:', location);
      });

      markersRef.current[key] = marker;
    });

    // Fit map to show active locations
    if (activeLocations.length > 0) {
      const activeCoordinates = activeLocations.map(key => mapLocations[key].coordinates);
      if (activeCoordinates.length === 1) {
        map.current.flyTo({
          center: activeCoordinates[0],
          zoom: 12
        });
      } else {
        const bounds = new mapboxgl.LngLatBounds();
        activeCoordinates.forEach(coord => bounds.extend(coord));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    }
  }, [activeLocations, onLocationSelect]);

  const getMarkerIcon = (type: string) => {
    switch(type) {
      case 'production_facility': return '🏭';
      case 'headquarters': return '🏰';
      case 'innovation_site': return '🎯';
      case 'active_headquarters': return '⚡';
      case 'storage_facility': return '📦';
      default: return '📍';
    }
  };

  const getMarkerColor = (type: string) => {
    switch(type) {
      case 'production_facility': return 'text-red-500';
      case 'headquarters': return 'text-teal-500';
      case 'innovation_site': return 'text-blue-500';
      case 'active_headquarters': return 'text-yellow-500';
      case 'storage_facility': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white border border-gray-300 rounded-lg p-4 max-w-md shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-xs font-mono text-gray-600 mb-3">
            {selectedLocation.coordinateString}
          </p>
          
          <div className="space-y-2 text-sm">
            {selectedLocation.details.owner && (
              <div><strong>Owner:</strong> {selectedLocation.details.owner}</div>
            )}
            {selectedLocation.details.supervisor && (
              <div><strong>Supervisor:</strong> {selectedLocation.details.supervisor}</div>
            )}
            {selectedLocation.details.capabilities && (
              <div>
                <strong>Capabilities:</strong>
                <ul className="list-disc list-inside ml-2">
                  {selectedLocation.details.capabilities.map((cap, idx) => (
                    <li key={idx}>{cap}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedLocation.details.security && (
              <div><strong>Security:</strong> {selectedLocation.details.security}</div>
            )}
            {selectedLocation.details.status && (
              <div><strong>Status:</strong> {selectedLocation.details.status}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkMap;
