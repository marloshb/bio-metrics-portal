
import React from 'react';
import { CircleOff, Recycle, CircleDollarSign, Droplets } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SectionTitle from '../ui/SectionTitle';
import StatCard from '../ui/StatCard';

const SustainabilityChart = () => {
  // Sample data for the sustainability metrics
  const resourceData = [
    { name: 'Renewable Resources', value: 65, color: '#2E7D32' },
    { name: 'Recycled Materials', value: 20, color: '#4FC3F7' },
    { name: 'Eco-certified', value: 10, color: '#FFB74D' },
    { name: 'Conventional', value: 5, color: '#E0E0E0' },
  ];
  
  return (
    <div className="bio-card p-6 h-full flex flex-col">
      <SectionTitle 
        title="Produção Sustentável" 
        subtitle="Utilização de Recursos e Métricas Sustentáveis"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard 
          title="Redução de Resíduos" 
          value="87%" 
          icon={CircleOff}
          trend={{ value: 12, positive: true }}
          iconColor="text-bio-green"
        />
        <StatCard 
          title="Índice de Reciclagem" 
          value="73%" 
          icon={Recycle}
          trend={{ value: 8, positive: true }}
          iconColor="text-bio-blue"
        />
      </div>
      
      <div className="flex-1 min-h-[250px]">
        <p className="text-sm font-medium text-center mb-2">Resource Usage Distribution</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resourceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              animationBegin={200}
            >
              {resourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Usage']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)'
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bio-card p-4 flex items-center">
          <CircleDollarSign className="w-8 h-8 text-bio-green mr-3" />
          <div>
            <p className="text-xs text-gray-500">Eco-Revenue</p>
            <p className="text-lg font-semibold">$12.8M</p>
          </div>
        </div>
        <div className="bio-card p-4 flex items-center">
          <Droplets className="w-8 h-8 text-bio-blue mr-3" />
          <div>
            <p className="text-xs text-gray-500">Water Saved</p>
            <p className="text-lg font-semibold">24.5M gal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityChart;
