
import React, { useEffect, useRef } from 'react';
import { TreeDeciduous, TreePalm, Bird, Fish, MapPin } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const BiodiversityMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Initialize the biodiversity points to show on the map
  const biodiversityPoints = [
    { id: 1, type: 'flora', lat: 20, lng: 50, icon: TreeDeciduous, label: 'Amazon Forest', count: 1243 },
    { id: 2, type: 'flora', lat: 50, lng: 25, icon: TreePalm, label: 'Atlantic Forest', count: 856 },
    { id: 3, type: 'fauna', lat: 30, lng: 70, icon: Bird, label: 'Bird Sanctuary', count: 567 },
    { id: 4, type: 'fauna', lat: 70, lng: 40, icon: Fish, label: 'Marine Reserve', count: 421 },
  ];

  useEffect(() => {
    // In a real application, this would initialize a map library like Leaflet or Google Maps
    const animateMap = () => {
      if (!mapRef.current) return;
      
      // Animate the points to simulate a live map
      const points = mapRef.current.querySelectorAll('.biodiversity-point');
      points.forEach((point, index) => {
        setTimeout(() => {
          point.classList.add('animate-fade-in');
        }, index * 150);
      });
    };
    
    animateMap();
    
    // Simulate data updates
    const interval = setInterval(() => {
      if (!mapRef.current) return;
      
      const randomIndex = Math.floor(Math.random() * biodiversityPoints.length);
      const point = mapRef.current.querySelector(`[data-point-id="${randomIndex + 1}"]`);
      
      if (point) {
        point.classList.add('animate-pulse');
        setTimeout(() => {
          point.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bio-card p-6 h-full">
      <SectionTitle 
        title="Biodiversity Monitoring" 
        subtitle="Real-time monitoring of biodiversity hotspots"
      />
      
      <div className="flex mt-4 mb-6 space-x-4">
        <button className="bio-button-secondary text-xs py-1">All Regions</button>
        <button className="text-xs py-1 px-4 bg-bio-gray rounded-lg transition-all hover:bg-bio-gray-dark">Flora</button>
        <button className="text-xs py-1 px-4 bg-bio-gray rounded-lg transition-all hover:bg-bio-gray-dark">Fauna</button>
      </div>
      
      <div 
        ref={mapRef} 
        className="relative h-[300px] bg-bio-blue-light/20 rounded-lg overflow-hidden border border-bio-blue/30"
      >
        {/* Simulated Map Background - would be a real map in production */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNSAzLjIgMS4zLjkuOS0uNi0xLjEuNi0uMmwxOCAxOGMxLjcgMS44IDEuNyA0LjYgMCA2LjNsLTEyIDEyYy0xLjcgMS43LTQuNiAxLjctNi4zIDBsLTE4LTE4Yy0uOC0uOS0xLjMtMi0xLjMtMy4yVjEyYzAtMi4yIDEuOC00IDQtNGgyMnoiIHN0cm9rZT0iIzRGQzNGNyIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIuMiIvPjxjaXJjbGUgZmlsbD0iIzRGQzNGNyIgb3BhY2l0eT0iLjIiIGN4PSIxMiIgY3k9IjM2IiByPSIxMiIvPjxjaXJjbGUgZmlsbD0iIzJFN0QzMiIgb3BhY2l0eT0iLjIiIGN4PSI0OCIgY3k9IjEyIiByPSIxMiIvPjwvZz48L3N2Zz4=')] opacity-15"></div>
        
        {/* Map Points */}
        {biodiversityPoints.map((point) => {
          const PointIcon = point.icon;
          return (
            <div 
              key={point.id}
              data-point-id={point.id}
              className="biodiversity-point absolute opacity-0 transition-all duration-300"
              style={{ 
                top: `${point.lat}%`, 
                left: `${point.lng}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <div className="relative group">
                <div className={`p-2 rounded-full ${point.type === 'flora' ? 'bg-bio-green' : 'bg-bio-blue'} shadow-lg hover-lift`}>
                  <PointIcon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white rounded-lg p-2 shadow-lg text-center text-xs">
                    <p className="font-medium text-gray-800">{point.label}</p>
                    <p className="text-bio-green font-bold">{point.count} species</p>
                  </div>
                </div>
                <div className={`absolute w-10 h-10 rounded-full ${point.type === 'flora' ? 'bg-bio-green' : 'bg-bio-blue'} animate-ping opacity-20`}></div>
              </div>
            </div>
          );
        })}
        
        <div className="absolute bottom-4 right-4">
          <div className="bg-white rounded-lg shadow-md p-2 text-xs">
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-bio-green rounded-full mr-2"></div>
              <span>Flora (2,099 species)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-bio-blue rounded-full mr-2"></div>
              <span>Fauna (988 species)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityMap;
