
import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MapPoint {
  id: string;
  type: 'project' | 'policy' | 'finance';
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  sector?: string;
  status?: string;
  amount?: string;
  region: string;
}

interface BiodiversityMapProps {
  filter: string;
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

// Mock data for map points
const mockMapData: MapPoint[] = [
  {
    id: 'p1',
    type: 'project',
    name: 'Projeto Açaí Sustentável',
    coordinates: { lat: -3.117, lng: -60.025 },
    description: 'Manejo sustentável de açaizais nativos na Amazônia',
    sector: 'Biodiversidade',
    status: 'Em andamento',
    region: 'Norte'
  },
  {
    id: 'p2',
    type: 'project',
    name: 'Biofábrica de Mudas Nativas',
    coordinates: { lat: -15.793, lng: -47.882 },
    description: 'Produção de mudas para restauração do Cerrado',
    sector: 'Produção Sustentável',
    status: 'Concluído',
    region: 'Centro-Oeste'
  },
  {
    id: 'p3',
    type: 'project',
    name: 'Biorefinaria de Cana-de-Açúcar',
    coordinates: { lat: -21.173, lng: -47.810 },
    description: 'Aproveitamento integral da biomassa para biocombustíveis e bioprodutos',
    sector: 'Bioenergia',
    status: 'Em andamento',
    region: 'Sudeste'
  },
  {
    id: 'pol1',
    type: 'policy',
    name: 'Decreto 12.044 - Estratégia Nacional de Bioeconomia',
    coordinates: { lat: -15.799, lng: -47.864 },
    description: 'Marco legal para o desenvolvimento da bioeconomia no Brasil',
    region: 'Nacional'
  },
  {
    id: 'pol2',
    type: 'policy',
    name: 'Política Estadual de Bioeconomia do Amazonas',
    coordinates: { lat: -3.120, lng: -60.021 },
    description: 'Estímulo à economia de base florestal e conhecimentos tradicionais',
    region: 'Norte'
  },
  {
    id: 'f1',
    type: 'finance',
    name: 'BNDES Fundo Clima',
    coordinates: { lat: -22.970, lng: -43.182 },
    description: 'Financiamentos para projetos de mitigação e adaptação às mudanças climáticas',
    amount: 'R$ 500 milhões',
    region: 'Nacional'
  },
  {
    id: 'f2',
    type: 'finance',
    name: 'Fundo Amazônia',
    coordinates: { lat: -1.455, lng: -48.503 },
    description: 'Recursos para projetos de prevenção e combate ao desmatamento na Amazônia',
    amount: 'R$ 3.4 bilhões',
    region: 'Norte'
  }
];

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
  
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapApiKey) {
      initializeMap();
    } else {
      toast({
        title: "Chave não fornecida",
        description: "Por favor, insira uma chave de API para o mapa.",
        variant: "destructive",
      });
    }
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
  
  // Select a region from the map
  const selectRegion = (region: string) => {
    onRegionSelect(region);
    toast({
      title: `Região ${region} selecionada`,
      description: `Mostrando dados para a região ${region}`,
    });
  };
  
  // Mock regions for demonstration
  const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul', 'Nacional'];
  
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {showKeyInput ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 p-6 z-10">
          <div className="max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Ativar Mapa Interativo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Para ativar o mapa interativo, é necessário fornecer uma chave de API do Mapbox.
            </p>
            <form onSubmit={handleKeySubmit} className="space-y-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                  Chave de API do Mapbox
                </label>
                <input
                  id="api-key"
                  type="text"
                  value={mapApiKey}
                  onChange={(e) => setMapApiKey(e.target.value)}
                  placeholder="Cole sua chave de API aqui"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bio-green focus:border-bio-green"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setMapApiKey("demo_key");
                    initializeMap();
                  }}
                  className="text-bio-blue hover:text-bio-blue-dark transition-colors text-sm"
                >
                  Usar dados de demonstração
                </button>
                <button
                  type="submit"
                  className="bio-button"
                >
                  Ativar Mapa
                </button>
              </div>
            </form>
          </div>
        </div>
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
              <div className="absolute left-4 top-4 z-20 bg-white rounded-lg shadow-md p-3">
                <h4 className="text-sm font-medium mb-2">Regiões do Brasil</h4>
                <div className="space-y-1">
                  {regions.map(region => (
                    <button 
                      key={region}
                      className={`block w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${selectedRegion === region ? 'bg-bio-green text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => selectRegion(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Layer controls */}
              <div className="absolute right-4 top-4 z-20 bg-white rounded-lg shadow-md p-3">
                <h4 className="text-sm font-medium mb-2">Camadas do Mapa</h4>
                <div className="space-y-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showBioclimateLayer} 
                      onChange={toggleBioclimateLayer}
                      className="rounded text-bio-green focus:ring-bio-green"
                    />
                    <span className="text-sm">Temperatura Média Anual</span>
                  </label>
                </div>
              </div>
              
              {/* Mock Map Points */}
              {filteredPoints.map(point => (
                <div 
                  key={point.id}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-all duration-200 ${
                    point.type === 'project' ? 'bg-bio-green' :
                    point.type === 'policy' ? 'bg-bio-blue' : 'bg-yellow-500'
                  }`}
                  style={{ 
                    left: `${(point.coordinates.lng + 75) / 150 * 100}%`, 
                    top: `${(point.coordinates.lat + 35) / 70 * 100}%`,
                  }}
                  title={point.name}
                  onClick={() => {
                    toast({
                      title: point.name,
                      description: point.description,
                    });
                  }}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg z-50 w-48">
                    <strong className="block text-sm">{point.name}</strong>
                    <span className="text-xs">{point.description}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-bio-green mr-2"></span>
                <span className="text-xs">Projetos</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-bio-blue mr-2"></span>
                <span className="text-xs">Políticas</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-xs">Recursos Financeiros</span>
              </div>
              {showBioclimateLayer && (
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-blue-500 to-red-500 mr-2"></span>
                  <span className="text-xs">Temperatura Média Anual</span>
                </div>
              )}
            </div>
            
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
