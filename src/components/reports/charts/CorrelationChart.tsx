import React from 'react';

interface CorrelationChartProps {
  correlation: number; // Between -1 and 1
}

export const CorrelationChart: React.FC<CorrelationChartProps> = ({ correlation }) => {
  // Calculate visual representation based on correlation value
  const dotSize = 6;
  const points: {x: number, y: number}[] = [];
  
  // Generate points that visually represent the correlation
  for (let i = 0; i < 30; i++) {
    const x = i / 30;
    
    // Add some random noise to make it look more natural
    const noise = (Math.random() - 0.5) * (1 - Math.abs(correlation)) * 0.5;
    
    // Calculate y based on correlation
    let y;
    if (correlation >= 0) {
      y = x * correlation + noise;
    } else {
      y = (1 - x) * Math.abs(correlation) + noise;
    }
    
    // Keep y within 0-1 range
    y = Math.min(1, Math.max(0, y));
    
    points.push({ x, y });
  }
  
  // Get color based on correlation
  const getColor = (corr: number) => {
    if (corr > 0.7) return '#10B981'; // green
    if (corr > 0.4) return '#60A5FA'; // blue
    if (corr > 0) return '#FBBF24'; // amber
    if (corr > -0.4) return '#F87171'; // light red
    return '#EF4444'; // strong red
  };
  
  const chartWidth = 250;
  const chartHeight = 60;
  
  return (
    <div className="relative w-full h-[60px]">
      {/* Correlation line */}
      <div 
        className="absolute h-px w-full top-1/2 transform -translate-y-1/2"
        style={{
          backgroundColor: getColor(correlation),
          transform: `rotate(${correlation * 45}deg)`,
          transformOrigin: 'center'
        }}
      ></div>
      
      {/* Draw points */}
      {points.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: getColor(correlation),
            left: `${point.x * chartWidth}px`,
            top: `${(1 - point.y) * chartHeight}px`,
          }}
        ></div>
      ))}
    </div>
  );
};
