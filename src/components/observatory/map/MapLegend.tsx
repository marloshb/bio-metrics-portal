
import React from 'react';

interface MapLegendProps {
  showBioclimateLayer?: boolean;
}

const MapLegend = ({ showBioclimateLayer = false }: MapLegendProps) => {
  return (
    <div className="absolute left-4 bottom-4 bg-white rounded-lg shadow-md p-3 z-20 text-xs">
      <h4 className="font-medium mb-2">Legenda</h4>
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-bio-green mr-2"></span>
          <span>Projetos</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-bio-blue mr-2"></span>
          <span>Políticas</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
          <span>Financiamento</span>
        </div>
        {showBioclimateLayer && (
          <div className="flex items-center">
            <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mr-2"></span>
            <span>Temperatura Média</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
