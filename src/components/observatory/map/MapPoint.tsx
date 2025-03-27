
import React from 'react';
import { MapPoint } from '@/types/mapTypes';
import { useToast } from "@/components/ui/use-toast";

interface MapPointProps {
  point: MapPoint;
}

const MapPoint = ({ point }: MapPointProps) => {
  const { toast } = useToast();

  return (
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
  );
};

export default MapPoint;
