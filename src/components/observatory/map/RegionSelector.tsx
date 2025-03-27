
import React from 'react';

interface RegionSelectorProps {
  regions: string[];
  selectedRegion: string | null;
  onSelectRegion: (region: string) => void;
}

const RegionSelector = ({ regions, selectedRegion, onSelectRegion }: RegionSelectorProps) => {
  return (
    <div className="absolute left-4 top-4 z-20 bg-white rounded-lg shadow-md p-3">
      <h4 className="text-sm font-medium mb-2">Regiões do Brasil</h4>
      <div className="space-y-1">
        {regions.map(region => (
          <button 
            key={region}
            className={`block w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${selectedRegion === region ? 'bg-bio-green text-white' : 'hover:bg-gray-100'}`}
            onClick={() => onSelectRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;
