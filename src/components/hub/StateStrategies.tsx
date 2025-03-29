
import React, { useState } from 'react';
import { Search, Filter, Calendar, FileText, Building, Target } from 'lucide-react';
import { mockStateStrategies } from '@/data/mockHubData';
import { StateStrategy } from '@/types/hubTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const StateStrategies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [focusAreaFilter, setFocusAreaFilter] = useState<string | null>(null);

  // Get all unique focus areas for filtering
  const allFocusAreas = mockStateStrategies.flatMap(strategy => 
    strategy.focusAreas.map(area => area.name)
  );
  const uniqueFocusAreas = Array.from(new Set(allFocusAreas)).sort();
  
  // Filter strategies based on search term and filters
  const filteredStrategies = mockStateStrategies.filter(strategy => {
    // Search term filter
    if (searchTerm && !strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !strategy.state.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Focus area filter
    if (focusAreaFilter && !strategy.focusAreas.some(area => area.name === focusAreaFilter)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Buscar estratégias estaduais..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative group">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filtros
            </Button>
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-3 z-10 hidden group-hover:block">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Área de Foco</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={focusAreaFilter || ''}
                    onChange={(e) => setFocusAreaFilter(e.target.value || null)}
                  >
                    <option value="">Todas</option>
                    {uniqueFocusAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs 
            value={viewType} 
            onValueChange={(value) => setViewType(value as 'list' | 'map')}
            className="w-auto"
          >
            <TabsList className="h-9">
              <TabsTrigger value="list" className="text-xs px-2">Lista</TabsTrigger>
              <TabsTrigger value="map" className="text-xs px-2">Mapa</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Tabs value={viewType} className="w-full">
          <TabsContent value="list" className="m-0">
            <div className="space-y-4">
              {filteredStrategies.length > 0 ? (
                filteredStrategies.map((strategy) => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nenhuma estratégia estadual encontrada com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="m-0">
            <div className="bg-gray-100 rounded-lg h-[500px] relative overflow-hidden">
              {/* Simplified map representation */}
              <div className="absolute inset-0 bg-[#F3F2F1]">
                <svg viewBox="0 0 800 600" className="w-full h-full opacity-60">
                  <path 
                    d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
                    fill="#e0e0e0" 
                    stroke="#cccccc" 
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Strategy pins on map - using a simple approximation of Brazilian states */}
                {filteredStrategies.map(strategy => {
                  // This is a simplified mapping - in a real app, you'd use proper coordinates
                  const stateCoordinates: Record<string, {x: number, y: number}> = {
                    "AC": { x: 15, y: 40 },
                    "AL": { x: 85, y: 40 },
                    "AM": { x: 25, y: 30 },
                    "AP": { x: 55, y: 15 },
                    "BA": { x: 75, y: 45 },
                    "CE": { x: 80, y: 30 },
                    "DF": { x: 60, y: 55 },
                    "ES": { x: 75, y: 60 },
                    "GO": { x: 55, y: 55 },
                    "MA": { x: 65, y: 30 },
                    "MT": { x: 45, y: 50 },
                    "MS": { x: 45, y: 65 },
                    "MG": { x: 65, y: 60 },
                    "PA": { x: 50, y: 25 },
                    "PB": { x: 85, y: 35 },
                    "PR": { x: 50, y: 75 },
                    "PE": { x: 85, y: 38 },
                    "PI": { x: 70, y: 35 },
                    "RJ": { x: 70, y: 70 },
                    "RN": { x: 85, y: 32 },
                    "RS": { x: 50, y: 85 },
                    "RO": { x: 35, y: 45 },
                    "RR": { x: 35, y: 15 },
                    "SC": { x: 55, y: 80 },
                    "SP": { x: 60, y: 70 },
                    "SE": { x: 85, y: 45 },
                    "TO": { x: 60, y: 45 }
                  };
                  
                  const coordinates = stateCoordinates[strategy.state] || { x: 50, y: 50 };
                  
                  return (
                    <div 
                      key={strategy.id}
                      className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ 
                        left: `${coordinates.x}%`, 
                        top: `${coordinates.y}%` 
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-[#005A9C] flex items-center justify-center text-white font-medium text-xs">
                        {strategy.state}
                      </div>
                      
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg w-56 z-10 invisible group-hover:visible">
                        <p className="font-medium text-sm">{strategy.title}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{strategy.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {strategy.focusAreas.map((area, index) => (
                            <span 
                              key={index} 
                              className="inline-block bg-[#0078D4]/10 text-[#0078D4] px-1.5 py-0.5 rounded text-xs font-medium"
                            >
                              {area.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Map Legend */}
              <div className="absolute right-4 bottom-4 bg-white p-3 rounded-lg shadow-md">
                <h4 className="text-sm font-medium mb-2">Informações</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#005A9C]"></span>
                    <span>Estado com estratégia definida</span>
                  </div>
                  <p className="text-gray-500 text-xs italic">Passe o mouse sobre um estado para ver detalhes</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Strategy Card Component
const StrategyCard = ({ strategy }: { strategy: StateStrategy }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 inline-block bg-gray-200 px-2 py-0.5 rounded text-sm">
                  {strategy.state}
                </span>
                <h3 className="font-medium text-lg text-gray-900">{strategy.title}</h3>
              </div>
              
              <div className="flex items-center gap-1.5 mt-1 text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-sm">
                  Período: {new Date(strategy.period.start).toLocaleDateString('pt-BR')} a {new Date(strategy.period.end).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">{strategy.description}</p>
          
          <div className="mt-4 space-y-3">
            {strategy.focusAreas.map((area, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-sm text-[#005A9C] flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  {area.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1 mb-2">{area.description}</p>
                
                {area.goals.length > 0 && (
                  <div className="space-y-2">
                    {area.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                        <div>
                          <p className="text-xs font-medium">{goal.description}</p>
                          <p className="text-xs text-gray-500">Métrica: {goal.metric}</p>
                        </div>
                        <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          Meta: {goal.target}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-600">
              Responsável: {strategy.contactInfo.department}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Atualizado em {new Date(strategy.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex items-center gap-2">
          {strategy.documentUrl && (
            <Button 
              variant="default" 
              size="sm"
              className="h-8 text-xs bg-[#005A9C] hover:bg-[#004a80] flex items-center gap-1"
              onClick={() => window.open(strategy.documentUrl, '_blank')}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver documento completo</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
