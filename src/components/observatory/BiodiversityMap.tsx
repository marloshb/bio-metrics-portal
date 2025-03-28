
import React, { useState, useEffect } from 'react';
import { mockMapData } from '@/data/mockMapData';
import { useToast } from "@/components/ui/use-toast";
import RegionSelector from './map/RegionSelector';
import MapPointComponent from './map/MapPoint';
import LayerControls from './map/LayerControls';
import MapLegend from './map/MapLegend';
import MapKeyInput from './map/MapKeyInput';
import { type MapPoint } from '@/types/mapTypes';
import { MAPBOX_TOKEN } from '@/constants/mapConfig';

const BiodiversityMap: React.FC = () => {
  const [mapPoints, setMapPoints] = useState<MapPoint[]>(mockMapData);
  const [filter, setFilter] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(MAPBOX_TOKEN);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBioclimateLayer, setShowBioclimateLayer] = useState<boolean>(false);
  const { toast } = useToast();

  const regions = Array.from(new Set(mockMapData.map(point => point.region))) as string[];

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(prevRegion => prevRegion === region ? null : region);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleInitializeMap = () => {
    setInitialized(true);
    toast({
      title: "Mapa Inicializado",
      description: "O mapa foi carregado com sucesso utilizando o token fornecido.",
    });
  };

  const filteredPoints = mapPoints.filter(point => {
    // Filter by type if not 'all'
    if (filter !== 'all' && point.type !== filter) {
      return false;
    }
    
    // Filter by region if a region is selected
    if (selectedRegion && point.region !== selectedRegion) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !point.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !point.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleToggleBioclimateLayer = () => {
    setShowBioclimateLayer(prev => !prev);
  };

  return (
    <div className="bio-card p-5 h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Mapa de Projetos e Políticas</h2>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="filter" className="block text-sm font-medium mb-1">Filtrar por Tipo</label>
          <select 
            id="filter"
            value={filter}
            onChange={e => handleFilterChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
          >
            <option value="all">Todos</option>
            <option value="project">Projetos</option>
            <option value="policy">Políticas</option>
            <option value="finance">Financiamento</option>
          </select>
        </div>
        
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar no mapa..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 text-sm pl-8"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative border rounded-lg bg-white h-[360px] overflow-hidden">
        {!initialized && (
          <MapKeyInput 
            mapApiKey={apiKey} 
            onMapApiKeyChange={setApiKey} 
            onInitializeMap={handleInitializeMap}
          />
        )}

        {/* Map Background */}
        <div className="absolute inset-0 bg-bio-blue-light/10">
          {/* Map of Brazil (simplified representation) */}
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-50">
            <path 
              d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
              fill="#e0e0e0" 
              stroke="#cccccc" 
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Bioclimate Layer Overlay */}
        {showBioclimateLayer && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-red-500/30 mix-blend-multiply">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 p-2 rounded-md text-sm">
                Camada de Temperatura Média Anual
              </div>
            </div>
          </div>
        )}
        
        {/* Map Points */}
        {filteredPoints.map(point => (
          <MapPointComponent key={point.id} point={point} />
        ))}
        
        {/* Region Selector */}
        <RegionSelector 
          regions={regions} 
          selectedRegion={selectedRegion} 
          onSelectRegion={handleRegionSelect} 
        />
        
        {/* Layer Controls */}
        <LayerControls 
          showBioclimateLayer={showBioclimateLayer}
          onToggleBioclimateLayer={handleToggleBioclimateLayer}
        />
        
        {/* Map Legend */}
        <MapLegend showBioclimateLayer={showBioclimateLayer} />
      </div>
    </div>
  );
};

export default BiodiversityMap;
