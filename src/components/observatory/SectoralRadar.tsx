
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Filter, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface SectorData {
  name: string;
  investment: number;
  jobs: number;
  projects: number;
  sustainability: number;
  region: string;
}

interface SectoralRadarProps {
  region: string | null;
}

// Mock data for sectors
const sectoralData: SectorData[] = [
  {
    name: 'Bioenergy',
    investment: 450,
    jobs: 1200,
    projects: 25,
    sustainability: 75,
    region: 'Nacional'
  },
  {
    name: 'Forestry',
    investment: 380,
    jobs: 950,
    projects: 32,
    sustainability: 90,
    region: 'Norte'
  },
  {
    name: 'Biotech',
    investment: 520,
    jobs: 800,
    projects: 18,
    sustainability: 65,
    region: 'Sudeste'
  },
  {
    name: 'Agroindustry',
    investment: 620,
    jobs: 1500,
    projects: 40,
    sustainability: 70,
    region: 'Centro-Oeste'
  },
  {
    name: 'Phytotherapics',
    investment: 280,
    jobs: 650,
    projects: 15,
    sustainability: 85,
    region: 'Nordeste'
  },
  {
    name: 'Fisheries',
    investment: 180,
    jobs: 750,
    projects: 20,
    sustainability: 80,
    region: 'Sul'
  }
];

const SectoralRadar = ({ region }: SectoralRadarProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'investment' | 'jobs' | 'projects' | 'sustainability'>('investment');
  
  // Filter data by region
  const filteredData = region && region !== 'Nacional'
    ? sectoralData.filter(sector => sector.region === region || sector.region === 'Nacional')
    : sectoralData;
  
  // Format data for radar chart
  const radarData = filteredData.map(sector => ({
    subject: sector.name,
    [selectedMetric]: sector[selectedMetric],
    fullMark: selectedMetric === 'investment' ? 1000 : 
              selectedMetric === 'jobs' ? 2000 :
              selectedMetric === 'projects' ? 50 : 100
  }));
  
  // Calculate total metrics
  const totalInvestment = filteredData.reduce((sum, sector) => sum + sector.investment, 0);
  const totalJobs = filteredData.reduce((sum, sector) => sum + sector.jobs, 0);
  const totalProjects = filteredData.reduce((sum, sector) => sum + sector.projects, 0);
  const avgSustainability = Math.round(filteredData.reduce((sum, sector) => sum + sector.sustainability, 0) / filteredData.length);
  
  // Chart config
  const chartConfig = {
    investment: {
      label: "Investimento (milhões R$)",
      theme: {
        light: "#2E7D32", // bio-green
        dark: "#2E7D32"
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className={`p-4 rounded-lg border transition-colors cursor-pointer ${
            selectedMetric === 'investment' ? 'border-bio-green bg-bio-green/10' : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMetric('investment')}
        >
          <h3 className="font-medium">Investimento Total</h3>
          <p className="text-2xl font-semibold mt-2">R$ {totalInvestment} milhões</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg border transition-colors cursor-pointer ${
            selectedMetric === 'jobs' ? 'border-bio-green bg-bio-green/10' : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMetric('jobs')}
        >
          <h3 className="font-medium">Empregos Gerados</h3>
          <p className="text-2xl font-semibold mt-2">{totalJobs}</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg border transition-colors cursor-pointer ${
            selectedMetric === 'projects' ? 'border-bio-green bg-bio-green/10' : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMetric('projects')}
        >
          <h3 className="font-medium">Número de Projetos</h3>
          <p className="text-2xl font-semibold mt-2">{totalProjects}</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg border transition-colors cursor-pointer ${
            selectedMetric === 'sustainability' ? 'border-bio-green bg-bio-green/10' : 'border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMetric('sustainability')}
        >
          <h3 className="font-medium">Impacto Sustentável</h3>
          <p className="text-2xl font-semibold mt-2">{avgSustainability}%</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {selectedMetric === 'investment' && 'Investimento por Setor (milhões R$)'}
          {selectedMetric === 'jobs' && 'Empregos Gerados por Setor'}
          {selectedMetric === 'projects' && 'Projetos por Setor'}
          {selectedMetric === 'sustainability' && 'Índice de Sustentabilidade por Setor (%)'}
        </h3>
        
        <div className="flex space-x-3">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            <span>Filtrar</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow h-[400px]">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar
                name={
                  selectedMetric === 'investment' ? 'Investimento (milhões R$)' :
                  selectedMetric === 'jobs' ? 'Empregos Gerados' :
                  selectedMetric === 'projects' ? 'Número de Projetos' : 'Índice de Sustentabilidade (%)'
                }
                dataKey={selectedMetric}
                stroke="#2E7D32"
                fill="#2E7D32"
                fillOpacity={0.6}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-medium mb-3">Principais Setores da Bioeconomia</h3>
          <div className="space-y-3">
            {filteredData.sort((a, b) => b[selectedMetric] - a[selectedMetric]).slice(0, 3).map(sector => (
              <div key={sector.name} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{sector.name}</h4>
                  <p className="text-sm text-gray-600">Região principal: {sector.region}</p>
                </div>
                <div>
                  <span className="font-medium">
                    {selectedMetric === 'investment' && `R$ ${sector.investment}M`}
                    {selectedMetric === 'jobs' && `${sector.jobs} empregos`}
                    {selectedMetric === 'projects' && `${sector.projects} projetos`}
                    {selectedMetric === 'sustainability' && `${sector.sustainability}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-medium mb-3">Oportunidades de Desenvolvimento</h3>
          <div className="space-y-3">
            {filteredData.sort((a, b) => a[selectedMetric] - b[selectedMetric]).slice(0, 3).map(sector => (
              <div key={sector.name} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{sector.name}</h4>
                  <p className="text-sm text-gray-600">Potencial de crescimento alto</p>
                </div>
                <div>
                  <button className="text-bio-blue hover:text-bio-blue-dark transition-colors text-sm">
                    Ver análise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectoralRadar;
