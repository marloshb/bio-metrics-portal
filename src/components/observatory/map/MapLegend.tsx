
import React from 'react';

interface MapLegendProps {
  showBioclimateLayer: boolean;
}

const MapLegend = ({ showBioclimateLayer }: MapLegendProps) => {
  return (
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
  );
};

export default MapLegend;
