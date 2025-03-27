
import React, { useState } from 'react';
import { Search, ArrowUpDown, Filter } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

interface Project {
  id: string;
  name: string;
  location: string;
  sector: string;
  status: string;
  startDate: string;
  budget: string;
  progress: number;
  description: string;
  region: string;
}

interface ProjectsListProps {
  region: string | null;
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Projeto Açaí Sustentável',
    location: 'Manaus, AM',
    sector: 'Biodiversidade',
    status: 'Em andamento',
    startDate: '2022-05-10',
    budget: 'R$ 1.2 milhões',
    progress: 65,
    description: 'Manejo sustentável de açaizais nativos na Amazônia com envolvimento de comunidades ribeirinhas.',
    region: 'Norte'
  },
  {
    id: 'p2',
    name: 'Biofábrica de Mudas Nativas',
    location: 'Brasília, DF',
    sector: 'Produção Sustentável',
    status: 'Concluído',
    startDate: '2021-03-15',
    budget: 'R$ 850 mil',
    progress: 100,
    description: 'Produção de mudas para restauração do Cerrado e recuperação de áreas degradadas.',
    region: 'Centro-Oeste'
  },
  {
    id: 'p3',
    name: 'Biorefinaria de Cana-de-Açúcar',
    location: 'Ribeirão Preto, SP',
    sector: 'Bioenergia',
    status: 'Em andamento',
    startDate: '2023-01-20',
    budget: 'R$ 15 milhões',
    progress: 40,
    description: 'Aproveitamento integral da biomassa para biocombustíveis e bioprodutos de alto valor agregado.',
    region: 'Sudeste'
  },
  {
    id: 'p4',
    name: 'Rede de Biomonitores Marinhos',
    location: 'Salvador, BA',
    sector: 'Pesquisa e Monitoramento',
    status: 'Em andamento',
    startDate: '2022-11-05',
    budget: 'R$ 2.3 milhões',
    progress: 35,
    description: 'Monitoramento da qualidade ambiental de ecossistemas costeiros com uso de bioindicadores.',
    region: 'Nordeste'
  },
  {
    id: 'p5',
    name: 'Fitoterápicos da Mata Atlântica',
    location: 'Florianópolis, SC',
    sector: 'Biotecnologia',
    status: 'Em planejamento',
    startDate: '2023-07-01',
    budget: 'R$ 3.8 milhões',
    progress: 15,
    description: 'Desenvolvimento de medicamentos a partir da biodiversidade da Mata Atlântica.',
    region: 'Sul'
  },
  {
    id: 'p6',
    name: 'Corredores Ecológicos do Pantanal',
    location: 'Cuiabá, MT',
    sector: 'Conservação',
    status: 'Em andamento',
    startDate: '2022-09-18',
    budget: 'R$ 4.5 milhões',
    progress: 55,
    description: 'Restauração e conexão de habitats para conservação da biodiversidade no Pantanal.',
    region: 'Centro-Oeste'
  },
];

const ProjectsList = ({ region }: ProjectsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'progress'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter projects by region and search term
  const filteredProjects = mockProjects.filter(project => {
    // Filter by region if selected
    if (region && region !== 'Nacional' && project.region !== region) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.sector.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'progress') {
      return sortDirection === 'asc' 
        ? a.progress - b.progress 
        : b.progress - a.progress;
    }
    return 0;
  });
  
  // Stats calculation
  const totalProjects = filteredProjects.length;
  const completedProjects = filteredProjects.filter(p => p.status === 'Concluído').length;
  const inProgressProjects = filteredProjects.filter(p => p.status === 'Em andamento').length;
  
  // Handle sort toggle
  const toggleSort = (field: 'name' | 'date' | 'progress') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Projetos"
          value={totalProjects}
          iconColor="text-bio-green"
        />
        <StatCard
          title="Projetos Concluídos"
          value={completedProjects}
          iconColor="text-blue-500"
          trend={{
            value: Math.round((completedProjects / totalProjects) * 100),
            positive: true
          }}
        />
        <StatCard
          title="Projetos em Andamento"
          value={inProgressProjects}
          iconColor="text-amber-500"
          trend={{
            value: Math.round((inProgressProjects / totalProjects) * 100),
            positive: true
          }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar projetos..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">Ordenar por:</span>
          <button 
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => toggleSort('name')}
          >
            <span className="text-sm">Nome</span>
            {sortBy === 'name' && (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </button>
          <button 
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => toggleSort('date')}
          >
            <span className="text-sm">Data</span>
            {sortBy === 'date' && (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </button>
          <button 
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => toggleSort('progress')}
          >
            <span className="text-sm">Progresso</span>
            {sortBy === 'progress' && (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
      
      {sortedProjects.length > 0 ? (
        <div className="space-y-4">
          {sortedProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{project.name}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-sm text-gray-600">{project.location}</span>
                    <span className="text-sm bg-bio-green/10 text-bio-green px-2 py-0.5 rounded-full">{project.sector}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      project.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      project.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>{project.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Orçamento: {project.budget}</span>
                  <div className="mt-1">
                    <div className="h-2 w-36 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-bio-green rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-0.5 inline-block">{project.progress}% completo</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{project.description}</p>
              <div className="mt-3 text-right">
                <button className="text-bio-blue hover:text-bio-blue-dark transition-colors text-sm">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">Nenhum projeto encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
