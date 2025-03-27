
import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { BiodiversityMapProps, MapPoint } from '@/types/mapTypes';
import { mockMapData, brazilRegions } from '@/data/mockMapData';
import MapPoint from './map/MapPoint';
import RegionSelector from './map/RegionSelector';
import LayerControls from './map/LayerControls';
import MapLegend from './map/MapLegend';
import MapKeyInput from './map/MapKeyInput';

const BiodiversityMap = ({ filter, selectedRegion, onRegionSelect }: BiodiversityMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { toast } = useToast();
  const [mapApiKey, setMapApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState(true);
  const [showBioclimateLayer, setShowBioclimateLayer] = useState(false);
  
  const filteredPoints = mockMapData.filter(point => {
    // Filter by type if not "all"
    if (filter !== 'all' && filter !== point.type) {
      return false;
    }
    
    // Filter by region if selected
    if (selectedRegion && selectedRegion !== 'Nacional' && point.region !== selectedRegion && point.region !== 'Nacional') {
      return false;
    }
    
    return true;
  });
  
  // Function to initialize map once API key is provided
  const initializeMap = () => {
    if (!mapContainer.current || !mapApiKey || mapInitialized) return;
    
    // Display a message about using mock map for now
    toast({
      title: "Mapa simulado ativado",
      description: "Por enquanto estamos utilizando dados simulados para demonstração.",
      duration: 5000,
    });
    
    setMapInitialized(true);
    setShowKeyInput(false);
  };
  
  // Toggle bioclimate layer
  const toggleBioclimateLayer = () => {
    setShowBioclimateLayer(!showBioclimateLayer);
    toast({
      title: showBioclimateLayer ? "Camada de bioclima desativada" : "Camada de bioclima ativada",
      description: showBioclimateLayer 
        ? "A camada de temperatura média anual foi desativada" 
        : "Mostrando projeções de temperatura média anual",
    });
  };
  
  // Handle map API key change
  const handleMapApiKeyChange = (key: string) => {
    setMapApiKey(key);
  };
  
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {showKeyInput ? (
        <MapKeyInput 
          mapApiKey={mapApiKey} 
          onMapApiKeyChange={handleMapApiKeyChange} 
          onInitializeMap={initializeMap} 
        />
      ) : null}
      
      <div ref={mapContainer} className="w-full h-full">
        {/* Mock map visualization for demonstration */}
        <div className="w-full h-full relative p-4 bg-bio-blue-light/20">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/b/bc/Brazil_Regions_Map.svg")' }}></div>
          
          {/* Bioclimate layer overlay */}
          {showBioclimateLayer && (
            <div className="absolute inset-0 bg-cover bg-center opacity-50 z-10" 
                style={{ 
                  backgroundImage: 'url("https://tiledimageservices.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Bioclimate_Projections__Annual_Mean_Temperature/ImageServer/tile/0/0/0")',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}>
            </div>
          )}
          
          <div className="relative z-20 h-full flex flex-col">
            <div className="flex-1 relative">
              {/* Map Regions */}
              <RegionSelector 
                regions={brazilRegions} 
                selectedRegion={selectedRegion} 
                onSelectRegion={onRegionSelect} 
              />
              
              {/* Layer controls */}
              <LayerControls 
                showBioclimateLayer={showBioclimateLayer} 
                onToggleBioclimateLayer={toggleBioclimateLayer} 
              />
              
              {/* Map Points */}
              {filteredPoints.map(point => (
                <MapPoint key={point.id} point={point} />
              ))}
            </div>
            
            {/* Map Legend */}
            <MapLegend showBioclimateLayer={showBioclimateLayer} />
            
            <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-lg shadow text-xs text-gray-600 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              <span>Mapa ilustrativo para demonstração</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityMap;
