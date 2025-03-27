
import React, { useState } from 'react';
import { Search, ExternalLink, FileText, Calendar } from 'lucide-react';

interface Policy {
  id: string;
  name: string;
  type: string;
  scope: string;
  date: string;
  description: string;
  link: string;
  region: string;
}

interface EnvironmentalPoliciesProps {
  region: string | null;
}

// Mock data for policies
const mockPolicies: Policy[] = [
  {
    id: 'pol1',
    name: 'Decreto 12.044 - Estratégia Nacional de Bioeconomia',
    type: 'Decreto Federal',
    scope: 'Nacional',
    date: '2023-05-16',
    description: 'Estabelece a Estratégia Nacional de Bioeconomia, com objetivo de promover o desenvolvimento sustentável por meio da produção, distribuição e consumo de bens e serviços derivados de recursos biológicos.',
    link: 'https://www.gov.br/bioeconomia',
    region: 'Nacional'
  },
  {
    id: 'pol2',
    name: 'Política Estadual de Bioeconomia do Amazonas',
    type: 'Lei Estadual',
    scope: 'Estadual',
    date: '2021-10-30',
    description: 'Institui a Política Estadual de Bioeconomia do Amazonas, visando promover o desenvolvimento econômico sustentável com base na biodiversidade amazônica e nos conhecimentos tradicionais associados.',
    link: 'https://www.amazonas.gov.br/bioeconomia',
    region: 'Norte'
  },
  {
    id: 'pol3',
    name: 'Programa Biomas - Conservação e Uso Sustentável',
    type: 'Política Pública',
    scope: 'Nacional',
    date: '2020-03-22',
    description: 'Programa voltado à pesquisa e desenvolvimento de práticas e sistemas de produção sustentáveis em áreas de transição entre os biomas brasileiros.',
    link: 'https://www.embrapa.br/biomas',
    region: 'Nacional'
  },
  {
    id: 'pol4',
    name: 'Plano Nacional de Promoção das Cadeias de Produtos da Sociobiodiversidade',
    type: 'Plano Nacional',
    scope: 'Nacional',
    date: '2019-11-05',
    description: 'Estabelece diretrizes para o fortalecimento das cadeias produtivas e o acesso aos mercados para produtos da sociobiodiversidade brasileira.',
    link: 'https://www.gov.br/mma/sociobiodiversidade',
    region: 'Nacional'
  },
  {
    id: 'pol5',
    name: 'Política de Incentivo à Pesquisa em Biotecnologia',
    type: 'Decreto Estadual',
    scope: 'Estadual',
    date: '2022-02-18',
    description: 'Estabelece incentivos fiscais e financeiros para empresas que investem em pesquisa e desenvolvimento na área de biotecnologia no estado de São Paulo.',
    link: 'https://www.saopaulo.sp.gov.br/biotecnologia',
    region: 'Sudeste'
  },
  {
    id: 'pol6',
    name: 'Programa Cerrado Sustentável',
    type: 'Programa Regional',
    scope: 'Regional',
    date: '2021-07-10',
    description: 'Programa focado no uso sustentável dos recursos naturais do Cerrado, com incentivo ao extrativismo sustentável e valorização de produtos da sociobiodiversidade.',
    link: 'https://www.cerradosustentavel.gov.br',
    region: 'Centro-Oeste'
  }
];

const EnvironmentalPolicies = ({ region }: EnvironmentalPoliciesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'federal' | 'state' | 'municipal'>('all');
  
  // Filter policies by region, search term and tab
  const filteredPolicies = mockPolicies.filter(policy => {
    // Filter by region if selected
    if (region && region !== 'Nacional' && policy.region !== region && policy.region !== 'Nacional') {
      return false;
    }
    
    // Filter by tab
    if (selectedTab === 'federal' && !policy.type.includes('Federal')) return false;
    if (selectedTab === 'state' && !policy.type.includes('Estadual')) return false;
    if (selectedTab === 'municipal' && !policy.type.includes('Municipal')) return false;
    
    // Filter by search term
    if (searchTerm && 
        !policy.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !policy.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar políticas..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedTab === 'all' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedTab('all')}
          >
            Todas
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedTab === 'federal' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedTab('federal')}
          >
            Federais
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedTab === 'state' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedTab('state')}
          >
            Estaduais
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${selectedTab === 'municipal' ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setSelectedTab('municipal')}
          >
            Municipais
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Política em Destaque</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-4 lg:mb-0 lg:mr-8 lg:flex-1">
              <h4 className="text-lg font-medium text-gray-900">Decreto 12.044 - Estratégia Nacional de Bioeconomia</h4>
              <div className="flex items-center mt-1 text-sm text-gray-600 space-x-4">
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Decreto Federal
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  16/05/2023
                </span>
              </div>
              <p className="mt-3 text-gray-700">
                Estabelece a Estratégia Nacional de Bioeconomia, com objetivo de promover o desenvolvimento sustentável por meio da produção, distribuição e consumo de bens e serviços derivados de recursos biológicos. A estratégia visa integrar ações em pesquisa, inovação, desenvolvimento produtivo e uso sustentável da biodiversidade brasileira.
              </p>
              <div className="mt-3">
                <a 
                  href="https://www.gov.br/bioeconomia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-bio-blue hover:text-bio-blue-dark transition-colors"
                >
                  <span>Acessar documento completo</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/3 bg-bio-green/5 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Principais Impactos</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bio-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span>Financiamento de R$ 500 milhões para pesquisa e inovação</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bio-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span>Criação de novos marcos regulatórios para produtos biológicos</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bio-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span>Articulação de 120+ instituições de pesquisa e empresas</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-bio-green flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</span>
                  <span>Incentivos para startups e PMEs na área de bioeconomia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">Todas as Políticas ({filteredPolicies.length})</h3>
        
        {filteredPolicies.length > 0 ? (
          <div className="space-y-4">
            {filteredPolicies.map(policy => (
              <div key={policy.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg text-gray-900">{policy.name}</h4>
                    <div className="flex flex-wrap items-center mt-1 space-x-4">
                      <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{policy.type}</span>
                      <span className="text-sm text-gray-600">Escopo: {policy.scope}</span>
                      <span className="text-sm text-gray-600">Data: {formatDate(policy.date)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">{policy.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Região: {policy.region}</span>
                  <a 
                    href={policy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-bio-blue hover:text-bio-blue-dark transition-colors text-sm"
                  >
                    <span>Acessar documento</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">Nenhuma política encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalPolicies;
