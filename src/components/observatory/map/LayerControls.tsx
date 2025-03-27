
import React from 'react';

interface LayerControlsProps {
  showBioclimateLayer: boolean;
  onToggleBioclimateLayer: () => void;
}

const LayerControls = ({ showBioclimateLayer, onToggleBioclimateLayer }: LayerControlsProps) => {
  return (
    <div className="absolute right-4 top-4 z-20 bg-white rounded-lg shadow-md p-3">
      <h4 className="text-sm font-medium mb-2">Camadas do Mapa</h4>
      <div className="space-y-1">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showBioclimateLayer} 
            onChange={onToggleBioclimateLayer}
            className="rounded text-bio-green focus:ring-bio-green"
          />
          <span className="text-sm">Temperatura Média Anual</span>
        </label>
      </div>
    </div>
  );
};

export default LayerControls;
