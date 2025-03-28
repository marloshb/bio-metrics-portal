
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import SectionTitle from '@/components/ui/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BiodiversityMap from '@/components/observatory/BiodiversityMap';
import ProjectsList from '@/components/observatory/ProjectsList';
import SectoralRadar from '@/components/observatory/SectoralRadar';
import EnvironmentalPolicies from '@/components/observatory/EnvironmentalPolicies';
import FinancialIncentives from '@/components/observatory/FinancialIncentives';
import { Globe, Search, Download, Filter, Map, ListTodo, PieChart, Leaf, Wallet } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuContent, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Observatory = () => {
  const [mapFilter, setMapFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string>('map');
  
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
          
          {/* Observatory Navigation Submenu */}
          <div className="px-6 pb-2">
            <NavigationMenu>
              <NavigationMenuList className="w-full border-b">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-bio-green",
                      activeSubmenu === 'map' ? "border-b-2 border-bio-green text-bio-green" : "text-gray-600"
                    )}
                    onClick={() => setActiveSubmenu('map')}
                  >
                    <Map className="mr-2 h-4 w-4" />
                    <span>Mapa Interativo</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-bio-green",
                      activeSubmenu === 'projects' ? "border-b-2 border-bio-green text-bio-green" : "text-gray-600"
                    )}
                    onClick={() => setActiveSubmenu('projects')}
                  >
                    <ListTodo className="mr-2 h-4 w-4" />
                    <span>Projetos</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-bio-green",
                      activeSubmenu === 'sectoral' ? "border-b-2 border-bio-green text-bio-green" : "text-gray-600"
                    )}
                    onClick={() => setActiveSubmenu('sectoral')}
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    <span>Radar Setorial</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-bio-green",
                      activeSubmenu === 'policies' ? "border-b-2 border-bio-green text-bio-green" : "text-gray-600"
                    )}
                    onClick={() => setActiveSubmenu('policies')}
                  >
                    <Leaf className="mr-2 h-4 w-4" />
                    <span>Políticas Ambientais</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-bio-green",
                      activeSubmenu === 'finance' ? "border-b-2 border-bio-green text-bio-green" : "text-gray-600"
                    )}
                    onClick={() => setActiveSubmenu('finance')}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Incentivos Financeiros</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        
        {/* Main content */}
        <main className="px-6 py-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Display different content based on active submenu */}
            {activeSubmenu === 'map' && (
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
                  <BiodiversityMap />
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
            )}
            
            {activeSubmenu === 'projects' && (
              <div className="bio-card p-6">
                <SectionTitle 
                  title="Projetos de Bioeconomia" 
                  subtitle="Explore projetos inovadores em diferentes regiões do Brasil"
                />
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="amazon">
                    <AccordionTrigger>Região Amazônica</AccordionTrigger>
                    <AccordionContent>
                      <ProjectsList region="Amazônia" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cerrado">
                    <AccordionTrigger>Cerrado</AccordionTrigger>
                    <AccordionContent>
                      <ProjectsList region="Cerrado" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="caatinga">
                    <AccordionTrigger>Caatinga</AccordionTrigger>
                    <AccordionContent>
                      <ProjectsList region="Caatinga" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="mata-atlantica">
                    <AccordionTrigger>Mata Atlântica</AccordionTrigger>
                    <AccordionContent>
                      <ProjectsList region="Mata Atlântica" />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            
            {activeSubmenu === 'sectoral' && (
              <div className="bio-card p-6">
                <SectionTitle 
                  title="Radar Setorial" 
                  subtitle="Análise comparativa dos setores da bioeconomia"
                />
                <SectoralRadar region={selectedRegion} />
              </div>
            )}
            
            {activeSubmenu === 'policies' && (
              <div className="bio-card p-6">
                <SectionTitle 
                  title="Políticas Ambientais" 
                  subtitle="Políticas e normativas que impulsionam a bioeconomia"
                />
                <EnvironmentalPolicies region={selectedRegion} />
              </div>
            )}
            
            {activeSubmenu === 'finance' && (
              <div className="bio-card p-6">
                <SectionTitle 
                  title="Incentivos Financeiros" 
                  subtitle="Oportunidades de financiamento para projetos da bioeconomia"
                />
                <FinancialIncentives region={selectedRegion} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Observatory;
