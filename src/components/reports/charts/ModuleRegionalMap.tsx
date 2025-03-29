
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapData } from '@/types/reportTypes';

interface ModuleRegionalMapProps {
  mapData: MapData;
}

export const ModuleRegionalMap: React.FC<ModuleRegionalMapProps> = ({ mapData }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-center p-6">
          <p className="text-sm text-gray-500 mb-2">Visualização do mapa interativo</p>
          <h3 className="text-lg font-medium text-gray-800">{mapData.title}</h3>
          <p className="text-sm mt-2">{mapData.description}</p>
          
          <div className="mt-6 border rounded p-4 bg-white">
            <p className="font-medium mb-2 text-sm">Regiões destacadas:</p>
            <ul className="text-left text-sm">
              {mapData.regions.map((region, index) => (
                <li key={index} className="flex items-center justify-between py-1">
                  <span>{region.name}</span>
                  <span className="font-medium">{region.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      {mapData.legend && (
        <div className="mt-4 p-3 border rounded-md">
          <p className="text-xs font-medium mb-2">{mapData.legend.title}</p>
          <div className="flex justify-between">
            {mapData.legend.items.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs ml-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <p className="mt-3 text-xs text-gray-500">Nota: O mapa interativo requer integração com serviços de mapas (ESRI/ArcGIS).</p>
    </div>
  );
};
