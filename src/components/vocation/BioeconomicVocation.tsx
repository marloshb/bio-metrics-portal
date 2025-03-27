
import React, { useState } from 'react';
import { BioeconomicVocationMapProps } from '@/types/mapTypes';
import { Leaf, Droplets, Building, Users, Filter } from 'lucide-react';

const BioeconomicVocation: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<'social' | 'environmental' | 'economic' | 'all'>('all');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  const themes = [
    { id: 'bioindustry', name: 'Bioindustrialização', icon: Building },
    { id: 'agriculture', name: 'Agricultura Regenerativa', icon: Droplets },
    { id: 'forestry', name: 'Manejo Florestal Sustentável', icon: Leaf },
    { id: 'decarbonization', name: 'Descarbonização', icon: Leaf },
    { id: 'inclusion', name: 'Inclusão Social', icon: Users },
    { id: 'agroforestry', name: 'Sistemas Agroflorestais', icon: Leaf },
  ];

  return (
    <div className="bio-card p-5 h-full">
      <h2 className="text-xl font-semibold mb-4">Vocação Bioeconômica</h2>
      
      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="component" className="block text-sm font-medium mb-1">Componente</label>
          <select 
            id="component"
            value={selectedComponent}
            onChange={e => setSelectedComponent(e.target.value as any)}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
          >
            <option value="all">Todos os Componentes</option>
            <option value="social">Social</option>
            <option value="environmental">Ambiental</option>
            <option value="economic">Econômico</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="theme" className="block text-sm font-medium mb-1">Tema</label>
          <select 
            id="theme"
            value={selectedTheme || ''}
            onChange={e => setSelectedTheme(e.target.value || null)}
            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
          >
            <option value="">Todos os Temas</option>
            {themes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-bio-green flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Componente Social
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Comunidades locais</span>
              <span className="font-medium">245</span>
            </li>
            <li className="flex justify-between">
              <span>Participação de mulheres</span>
              <span className="font-medium">38%</span>
            </li>
            <li className="flex justify-between">
              <span>Jovens empregados</span>
              <span className="font-medium">1.245</span>
            </li>
            <li className="flex justify-between">
              <span>Comunidades indígenas</span>
              <span className="font-medium">17</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-bio-green flex items-center">
            <Leaf className="mr-2 h-5 w-5" />
            Componente Ambiental
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Áreas protegidas</span>
              <span className="font-medium">120 ha</span>
            </li>
            <li className="flex justify-between">
              <span>Corredores ecológicos</span>
              <span className="font-medium">45 km</span>
            </li>
            <li className="flex justify-between">
              <span>Zonas de restauração</span>
              <span className="font-medium">78 ha</span>
            </li>
            <li className="flex justify-between">
              <span>APPs preservadas</span>
              <span className="font-medium">92%</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-bio-green flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Componente Econômico
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Infraestrutura logística</span>
              <span className="font-medium">28 unidades</span>
            </li>
            <li className="flex justify-between">
              <span>Potencial de investimento</span>
              <span className="font-medium">R$ 125M</span>
            </li>
            <li className="flex justify-between">
              <span>Demanda de mercado</span>
              <span className="font-medium">Alta</span>
            </li>
            <li className="flex justify-between">
              <span>Instalações industriais</span>
              <span className="font-medium">12</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="relative border rounded-lg bg-white h-[400px] overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 bg-bio-blue-light/10">
          {/* Map of Brazil (simplified representation) */}
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-50">
            <path 
              d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
              fill="#e0e0e0" 
              stroke="#cccccc" 
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Legend */}
        <div className="absolute right-4 bottom-4 z-20 bg-white rounded-lg shadow-md p-3">
          <h4 className="text-sm font-medium mb-2">Legenda</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
              <span>Riscos</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              <span>Oportunidades</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Potenciais</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
              <span>Fragilidades</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span>Impactos</span>
            </div>
          </div>
        </div>
        
        {/* Sample Map Points (for illustration) */}
        <div className="absolute w-4 h-4 rounded-full bg-green-500 cursor-pointer" style={{ left: '30%', top: '40%' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-red-500 cursor-pointer" style={{ left: '70%', top: '30%' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-blue-500 cursor-pointer" style={{ left: '50%', top: '60%' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-yellow-500 cursor-pointer" style={{ left: '40%', top: '20%' }}></div>
        <div className="absolute w-4 h-4 rounded-full bg-purple-500 cursor-pointer" style={{ left: '60%', top: '50%' }}></div>
        
        {/* Filters */}
        <div className="absolute left-4 top-4 z-20 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center mb-2">
            <Filter className="h-4 w-4 mr-1" />
            <h4 className="text-sm font-medium">Filtros</h4>
          </div>
          
          {selectedComponent === 'social' || selectedComponent === 'all' ? (
            <div className="mb-2">
              <p className="text-xs font-medium text-bio-green">Social</p>
              <div className="space-y-1 mt-1">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Comunidades
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Mulheres
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Jovens
                </label>
              </div>
            </div>
          ) : null}
          
          {selectedComponent === 'environmental' || selectedComponent === 'all' ? (
            <div className="mb-2">
              <p className="text-xs font-medium text-bio-green">Ambiental</p>
              <div className="space-y-1 mt-1">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Áreas protegidas
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Corredores
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  APPs
                </label>
              </div>
            </div>
          ) : null}
          
          {selectedComponent === 'economic' || selectedComponent === 'all' ? (
            <div>
              <p className="text-xs font-medium text-bio-green">Econômico</p>
              <div className="space-y-1 mt-1">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Infraestrutura
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Mercado
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="rounded text-bio-green mr-1" />
                  Investimentos
                </label>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button className="bio-button flex items-center">
          <span>Exportar Relatório</span>
        </button>
      </div>
    </div>
  );
};

export default BioeconomicVocation;
