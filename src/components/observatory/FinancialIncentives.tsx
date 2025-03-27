
import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, BarChart } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

interface FinancialResource {
  id: string;
  name: string;
  type: string;
  amount: string;
  amountNumber: number;
  provider: string;
  deadline: string;
  eligibility: string[];
  description: string;
  applicationLink: string;
  region: string;
}

interface FinancialIncentivesProps {
  region: string | null;
}

// Mock data for financial resources
const mockResources: FinancialResource[] = [
  {
    id: 'f1',
    name: 'BNDES Fundo Clima',
    type: 'Financiamento',
    amount: 'R$ 500 milhões',
    amountNumber: 500,
    provider: 'BNDES',
    deadline: '2023-12-31',
    eligibility: ['Empresas de médio e grande porte', 'Instituições públicas', 'Consórcios'],
    description: 'Financiamentos para projetos de mitigação e adaptação às mudanças climáticas, incluindo energias renováveis, mobilidade urbana sustentável e manejo florestal.',
    applicationLink: 'https://www.bndes.gov.br/fundoclima',
    region: 'Nacional'
  },
  {
    id: 'f2',
    name: 'Fundo Amazônia',
    type: 'Doação',
    amount: 'R$ 3.4 bilhões',
    amountNumber: 3400,
    provider: 'BNDES',
    deadline: 'Contínuo',
    eligibility: ['ONGs', 'Instituições públicas', 'Empresas públicas', 'Governos estaduais e municipais'],
    description: 'Recursos para projetos de prevenção e combate ao desmatamento e promoção da conservação e do uso sustentável da Amazônia Legal.',
    applicationLink: 'https://www.fundoamazonia.gov.br',
    region: 'Norte'
  },
  {
    id: 'f3',
    name: 'FINEP Bioeconomia',
    type: 'Financiamento e Subvenção',
    amount: 'R$ 300 milhões',
    amountNumber: 300,
    provider: 'FINEP',
    deadline: '2023-10-15',
    eligibility: ['Startups', 'Empresas de base tecnológica', 'ICTs'],
    description: 'Linha de financiamento e subvenção econômica para projetos de inovação em bioeconomia, biotecnologia e aproveitamento sustentável da biodiversidade.',
    applicationLink: 'https://www.finep.gov.br/bioeconomia',
    region: 'Nacional'
  },
  {
    id: 'f4',
    name: 'Fundo Vale Floresta',
    type: 'Investimento',
    amount: 'R$ 250 milhões',
    amountNumber: 250,
    provider: 'Vale',
    deadline: '2023-11-30',
    eligibility: ['Startups', 'Cooperativas', 'Empresas sociais'],
    description: 'Fundo de investimento para negócios de impacto que contribuam para a conservação e restauração de florestas nativas e uso sustentável da biodiversidade.',
    applicationLink: 'https://www.vale.com/fundofloresta',
    region: 'Norte'
  },
  {
    id: 'f5',
    name: 'PRONAF Bioeconomia',
    type: 'Crédito Rural',
    amount: 'R$ 450 milhões',
    amountNumber: 450,
    provider: 'Banco do Brasil',
    deadline: '2024-06-30',
    eligibility: ['Agricultores familiares', 'Cooperativas rurais'],
    description: 'Linha de crédito rural para financiamento de sistemas produtivos sustentáveis, agroecologia, energia renovável e aproveitamento de biomassa.',
    applicationLink: 'https://www.bb.com.br/pronafbio',
    region: 'Nacional'
  },
  {
    id: 'f6',
    name: 'FUNCBIO - Fundo de Biotecnologia',
    type: 'Subvenção',
    amount: 'R$ 120 milhões',
    amountNumber: 120,
    provider: 'FAPESP',
    deadline: '2023-09-20',
    eligibility: ['Pesquisadores', 'Universidades', 'Empresas em parceria com ICTs'],
    description: 'Recursos para projetos de pesquisa e desenvolvimento em biotecnologia com foco em fármacos, bioinsumos e biocombustíveis.',
    applicationLink: 'https://www.fapesp.br/funcbio',
    region: 'Sudeste'
  }
];

const FinancialIncentives = ({ region }: FinancialIncentivesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  // Filter resources by region, search term and type
  const filteredResources = mockResources.filter(resource => {
    // Filter by region if selected
    if (region && region !== 'Nacional' && resource.region !== region && resource.region !== 'Nacional') {
      return false;
    }
    
    // Filter by type if selected
    if (typeFilter && !resource.type.includes(typeFilter)) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && 
        !resource.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !resource.provider.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !resource.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Calculate total available resources
  const totalAmount = filteredResources.reduce((sum, resource) => sum + resource.amountNumber, 0);
  
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === 'Contínuo') return 'Contínuo';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Get unique resource types
  const resourceTypes = Array.from(new Set(mockResources.map(resource => resource.type)));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Recursos Disponíveis"
          value={`R$ ${totalAmount} milhões`}
          icon={DollarSign}
          iconColor="text-bio-green"
        />
        <StatCard
          title="Tipos de Recursos"
          value={resourceTypes.length}
          icon={BarChart}
          iconColor="text-bio-blue"
        />
        <StatCard
          title="Próximo Encerramento"
          value={
            filteredResources
              .filter(r => r.deadline !== 'Contínuo')
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]?.deadline
              ? formatDate(filteredResources
                  .filter(r => r.deadline !== 'Contínuo')
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0].deadline)
              : 'N/A'
          }
          icon={Calendar}
          iconColor="text-amber-500"
        />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar recursos financeiros..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === null ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setTypeFilter(null)}
          >
            Todos
          </button>
          {resourceTypes.map(type => (
            <button 
              key={type}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === type ? 'bg-bio-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {filteredResources.length > 0 ? (
        <div className="space-y-5">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
              <div className="md:flex md:justify-between md:items-start">
                <div className="mb-4 md:mb-0 md:flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-medium text-lg text-gray-900">{resource.name}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{resource.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Provedor:</span>
                      <p className="font-medium">{resource.provider}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Prazo:</span>
                      <p className="font-medium">{formatDate(resource.deadline)}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-500">Elegibilidade:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resource.eligibility.map((item, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:ml-6 md:w-48 bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Valor disponível</p>
                  <p className="text-xl font-semibold text-bio-green">{resource.amount}</p>
                  <a 
                    href={resource.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bio-button-secondary w-full block text-sm"
                  >
                    Aplicar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">Nenhum recurso financeiro encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default FinancialIncentives;
