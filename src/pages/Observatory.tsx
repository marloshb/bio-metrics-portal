
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import SectionTitle from '@/components/ui/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BiodiversityMap from '@/components/observatory/BiodiversityMap';
import ProjectsList from '@/components/observatory/ProjectsList';
import SectoralRadar from '@/components/observatory/SectoralRadar';
import EnvironmentalPolicies from '@/components/observatory/EnvironmentalPolicies';
import FinancialIncentives from '@/components/observatory/FinancialIncentives';
import { Globe, Search, Download, Filter } from 'lucide-react';

const Observatory = () => {
  const [mapFilter, setMapFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 transition-all">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex justify-between items-center py-4 px-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Observatório e Paineis Setoriais</h1>
              <p className="text-sm text-gray-500">Monitoramento georreferenciado de iniciativas da bioeconomia</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar projeto, política ou região..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all w-80"
                />
              </div>
              
              <button className="bio-button-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                <span>Exportar Dados</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="px-6 py-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bio-card p-6">
              <SectionTitle 
                title="Mapa Interativo da Bioeconomia" 
                subtitle="Visualize projetos, políticas e recursos financeiros em todo o Brasil"
              />
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mapFilter === 'all' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setMapFilter('all')}
                  >
                    Todos
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mapFilter === 'projects' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setMapFilter('projects')}
                  >
                    Projetos
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mapFilter === 'policies' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setMapFilter('policies')}
                  >
                    Políticas
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mapFilter === 'finance' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setMapFilter('finance')}
                  >
                    Recursos
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtros Avançados</span>
                </button>
              </div>
              
              <div className="h-[500px] mb-4 rounded-lg overflow-hidden">
                <BiodiversityMap 
                  filter={mapFilter} 
                  selectedRegion={selectedRegion}
                  onRegionSelect={setSelectedRegion}
                />
              </div>
              
              {selectedRegion && (
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Região selecionada:</span> {selectedRegion}
                    <button 
                      className="ml-3 text-bio-blue hover:text-bio-blue-dark transition-colors text-xs"
                      onClick={() => setSelectedRegion(null)}
                    >
                      Limpar seleção
                    </button>
                  </p>
                </div>
              )}
            </div>
            
            {/* Tabs for different sections */}
            <div className="bio-card p-6">
              <Tabs defaultValue="projects">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="projects">Projetos</TabsTrigger>
                  <TabsTrigger value="sectoral">Radar Setorial</TabsTrigger>
                  <TabsTrigger value="policies">Políticas Ambientais</TabsTrigger>
                  <TabsTrigger value="finance">Incentivos Financeiros</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="space-y-4">
                  <ProjectsList region={selectedRegion} />
                </TabsContent>
                
                <TabsContent value="sectoral" className="space-y-4">
                  <SectoralRadar region={selectedRegion} />
                </TabsContent>
                
                <TabsContent value="policies" className="space-y-4">
                  <EnvironmentalPolicies region={selectedRegion} />
                </TabsContent>
                
                <TabsContent value="finance" className="space-y-4">
                  <FinancialIncentives region={selectedRegion} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Observatory;
