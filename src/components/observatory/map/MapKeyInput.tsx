
import React from 'react';
import { useToast } from "@/components/ui/use-toast";

interface MapKeyInputProps {
  mapApiKey: string;
  onMapApiKeyChange: (key: string) => void;
  onInitializeMap: () => void;
}

const MapKeyInput = ({ mapApiKey, onMapApiKeyChange, onInitializeMap }: MapKeyInputProps) => {
  const { toast } = useToast();

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapApiKey) {
      onInitializeMap();
    } else {
      toast({
        title: "Chave não fornecida",
        description: "Por favor, insira uma chave de API para o mapa.",
        variant: "destructive",
      });
    }
  };

  return (
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
              onChange={(e) => onMapApiKeyChange(e.target.value)}
              placeholder="Cole sua chave de API aqui"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bio-green focus:border-bio-green"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                onMapApiKeyChange("demo_key");
                onInitializeMap();
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
  );
};

export default MapKeyInput;
