
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Plus, Users } from 'lucide-react';
import { mockProjects } from '@/data/mockHubData';
import { Project } from '@/types/hubTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectForm } from './ProjectForm';
import { formatCurrency } from '@/lib/utils';

export const ProjectsRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);

  // Get unique sectors for filter
  const uniqueSectors = Array.from(new Set(mockProjects.map(project => project.sector)));
  
  // Filter projects based on search term and filters
  const filteredProjects = mockProjects.filter(project => {
    // Search term filter
    if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.location.state.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.location.city.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter && project.status !== statusFilter) {
      return false;
    }
    
    // Sector filter
    if (sectorFilter && project.sector !== sectorFilter) {
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
            placeholder="Buscar projetos..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative group">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filtros
            </Button>
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-3 z-10 hidden group-hover:block">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={statusFilter || ''}
                    onChange={(e) => setStatusFilter(e.target.value || null)}
                  >
                    <option value="">Todos</option>
                    <option value="Em análise">Em análise</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Setor</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={sectorFilter || ''}
                    onChange={(e) => setSectorFilter(e.target.value || null)}
                  >
                    <option value="">Todos</option>
                    {uniqueSectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
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
          
          <Button 
            onClick={() => setShowProjectForm(true)}
            className="flex items-center gap-2 bg-[#005A9C] hover:bg-[#004a80]"
          >
            <Plus className="h-4 w-4" /> Novo Projeto
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Tabs value={viewType} className="w-full">
          <TabsContent value="list" className="m-0">
            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nenhum projeto encontrado com os filtros selecionados.</p>
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
                
                {/* Project pins on map */}
                {filteredProjects.map(project => (
                  <div 
                    key={project.id}
                    className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ 
                      left: `${(project.location.coordinates.lng + 75) / 150 * 100}%`, 
                      top: `${(project.location.coordinates.lat + 35) / 70 * 100}%` 
                    }}
                  >
                    <div className={`
                      w-full h-full rounded-full flex items-center justify-center
                      ${project.status === 'Em análise' ? 'bg-amber-500' : 
                        project.status === 'Aprovado' ? 'bg-blue-500' : 
                        project.status === 'Em andamento' ? 'bg-[#005A9C]' :
                        project.status === 'Concluído' ? 'bg-green-500' : 'bg-red-500'}
                    `}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg w-48 z-10 invisible group-hover:visible">
                      <p className="font-medium text-sm">{project.name}</p>
                      <p className="text-xs text-gray-600">{project.location.city}, {project.location.state}</p>
                      <p className="text-xs font-medium mt-1">
                        <span className={`
                          inline-block px-1.5 py-0.5 rounded-full text-white text-xs
                          ${project.status === 'Em análise' ? 'bg-amber-500' : 
                            project.status === 'Aprovado' ? 'bg-blue-500' : 
                            project.status === 'Em andamento' ? 'bg-[#005A9C]' :
                            project.status === 'Concluído' ? 'bg-green-500' : 'bg-red-500'}
                        `}>
                          {project.status}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Map Legend */}
              <div className="absolute right-4 bottom-4 bg-white p-3 rounded-lg shadow-md">
                <h4 className="text-sm font-medium mb-2">Legenda</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-xs">Em análise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-xs">Aprovado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#005A9C]"></span>
                    <span className="text-xs">Em andamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs">Concluído</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="text-xs">Cancelado</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Project Registration Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cadastrar Novo Projeto</h3>
              <ProjectForm onClose={() => setShowProjectForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900">{project.name}</h3>
              
              <div className="flex items-center gap-1 mt-1 text-gray-600">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm">{project.location.city}, {project.location.state}</span>
              </div>
            </div>
            
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${project.status === 'Em análise' ? 'bg-amber-100 text-amber-800' : 
                project.status === 'Aprovado' ? 'bg-blue-100 text-blue-800' : 
                project.status === 'Em andamento' ? 'bg-indigo-100 text-indigo-800' :
                project.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            `}>
              {project.status}
            </span>
          </div>
          
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="text-gray-400 w-4 h-4" />
                <span className="text-xs text-gray-600">
                  Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <DollarSign className="text-gray-400 w-4 h-4" />
                <span className="text-xs text-gray-600">
                  {formatCurrency(project.estimatedValue)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-2">
              <Users className="text-gray-400 w-4 h-4" />
              <span className="text-xs text-gray-600">
                {project.contact.name} - {project.contact.email}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <span className="inline-block bg-[#005A9C]/10 text-[#005A9C] px-2 py-0.5 rounded text-xs font-medium">
              {project.sector}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Atualizado em {new Date(project.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        <Button variant="link" className="h-auto p-0 text-[#0078D4]">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};
