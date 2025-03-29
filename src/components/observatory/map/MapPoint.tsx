
import React, { useState } from 'react';
import { type MapPoint } from '@/types/mapTypes';
import { useToast } from "@/components/ui/use-toast";
import { Info, Map, FileText, ChevronRight } from 'lucide-react';

interface MapPointProps {
  point: MapPoint;
}

const MapPointComponent = ({ point }: MapPointProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  // Get point type color and icon
  const getPointTypeStyle = (type: string) => {
    switch(type) {
      case 'project':
        return {
          bgColor: 'bg-bio-green',
          hoverColor: 'group-hover:bg-bio-green/80',
          icon: <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  <Map className="w-2 h-2" />
                </div>
        };
      case 'policy':
        return {
          bgColor: 'bg-bio-blue',
          hoverColor: 'group-hover:bg-bio-blue/80',
          icon: <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  <FileText className="w-2 h-2" />
                </div>
        };
      case 'finance':
        return {
          bgColor: 'bg-yellow-500',
          hoverColor: 'group-hover:bg-yellow-500/80',
          icon: null
        };
      case 'bioindustry':
        return {
          bgColor: 'bg-purple-500',
          hoverColor: 'group-hover:bg-purple-500/80',
          icon: null
        };
      case 'agriculture':
        return {
          bgColor: 'bg-emerald-500',
          hoverColor: 'group-hover:bg-emerald-500/80',
          icon: null
        };
      case 'forestry':
        return {
          bgColor: 'bg-teal-700',
          hoverColor: 'group-hover:bg-teal-700/80',
          icon: null
        };
      case 'decarbonization':
        return {
          bgColor: 'bg-cyan-500',
          hoverColor: 'group-hover:bg-cyan-500/80',
          icon: null
        };
      case 'inclusion':
        return {
          bgColor: 'bg-pink-500',
          hoverColor: 'group-hover:bg-pink-500/80',
          icon: null
        };
      case 'agroforestry':
        return {
          bgColor: 'bg-lime-500',
          hoverColor: 'group-hover:bg-lime-500/80',
          icon: null
        };
      default:
        return {
          bgColor: 'bg-gray-500',
          hoverColor: 'group-hover:bg-gray-500/80',
          icon: null
        };
    }
  };

  const { bgColor, hoverColor, icon } = getPointTypeStyle(point.type);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        key={point.id}
        className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${bgColor} ${isHovered ? 'scale-150 z-50' : ''}`}
        style={{ 
          left: `${(point.coordinates.lng + 75) / 150 * 100}%`, 
          top: `${(point.coordinates.lat + 35) / 70 * 100}%`,
        }}
        title={point.name}
        onClick={() => {
          toast({
            title: point.name,
            description: (
              <div className="space-y-2">
                <p>{point.description}</p>
                {point.status && (
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Status:</span> {point.status}
                  </div>
                )}
                {point.amount && (
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Valor:</span> {point.amount}
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-1">Região:</span> {point.region}
                </div>
                <button className="flex items-center text-blue-600 text-sm mt-1 hover:underline">
                  Ver detalhes <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            ),
          });
        }}
      >
        {icon}

        {/* Ripple animation on hover */}
        <span className={`absolute top-0 left-0 right-0 bottom-0 rounded-full ${bgColor} opacity-30 scale-0 group-hover:scale-[2.5] group-hover:opacity-0 transition-all duration-1000`}></span>
      </div>

      {isHovered && (
        <div className="fixed z-50 bg-white p-2 rounded-lg shadow-lg max-w-[200px] pointer-events-none transform translate-x-4 translate-y-1">
          <div className="font-medium text-sm">{point.name}</div>
          <div className="text-xs mt-1 text-gray-600 line-clamp-2">{point.description}</div>
          <div className={`mt-1 text-xs inline-flex items-center px-1.5 py-0.5 rounded-full 
            ${point.type === 'project' ? 'bg-green-100 text-green-800' : 
              point.type === 'policy' ? 'bg-blue-100 text-blue-800' :
              point.type === 'finance' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'}`}>
            <Info className="w-2 h-2 mr-1" />
            {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPointComponent;
