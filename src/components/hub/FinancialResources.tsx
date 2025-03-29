
import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, Globe, ExternalLink } from 'lucide-react';
import { mockFinancialResources } from '@/data/mockHubData';
import { FinancialResource } from '@/types/hubTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export const FinancialResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);
  const [minAmount, setMinAmount] = useState<string>('');

  // Get unique sources and sectors for filters
  const uniqueSources = Array.from(new Set(mockFinancialResources.map(resource => resource.source)));
  const uniqueSectors = Array.from(
    new Set(mockFinancialResources.flatMap(resource => resource.sectors))
  ).sort();
  
  // Filter resources based on search term and filters
  const filteredResources = mockFinancialResources.filter(resource => {
    // Search term filter
    if (searchTerm && !resource.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Source filter
    if (sourceFilter && resource.source !== sourceFilter) {
      return false;
    }
    
    // Sector filter
    if (sectorFilter && !resource.sectors.includes(sectorFilter)) {
      return false;
    }
    
    // Minimum amount filter
    if (minAmount && resource.availableAmount < parseInt(minAmount)) {
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
            placeholder="Buscar recursos financeiros..." 
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
                  <label className="text-sm font-medium mb-1 block">Fonte</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={sourceFilter || ''}
                    onChange={(e) => setSourceFilter(e.target.value || null)}
                  >
                    <option value="">Todas</option>
                    {uniqueSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
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
                <div>
                  <label className="text-sm font-medium mb-1 block">Valor Mínimo Disponível</label>
                  <Input 
                    type="number" 
                    placeholder="Ex: 10000000" 
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    Valor sem pontos ou vírgulas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Nenhum recurso financeiro encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ resource }: { resource: FinancialResource }) => {
  const availabilityPercentage = Math.round((resource.availableAmount / resource.totalAmount) * 100);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900">{resource.name}</h3>
              
              <div className="flex items-center gap-1.5 mt-1 text-gray-600">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-sm">Fonte: {resource.source}</span>
              </div>
            </div>
            
            <Badge className={`
              ${resource.source === 'Público' ? 'bg-blue-500' : 
                resource.source === 'Privado' ? 'bg-purple-500' : 
                resource.source === 'Internacional' ? 'bg-green-500' : 'bg-amber-500'}
            `}>
              {formatCurrency(resource.availableAmount)} disponíveis
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">{resource.description}</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Disponibilidade</span>
              <span>{availabilityPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  availabilityPercentage > 66 ? 'bg-green-500' : 
                  availabilityPercentage > 33 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${availabilityPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Elegibilidade:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                {resource.eligibilityCriteria.slice(0, 2).map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
                {resource.eligibilityCriteria.length > 2 && (
                  <li>+ {resource.eligibilityCriteria.length - 2} outros critérios</li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-1">Detalhes:</h4>
              <div className="space-y-0.5 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>Prazo: {new Date(resource.deadlineDate).toLocaleDateString('pt-BR')}</span>
                </div>
                {resource.minimumProjectValue && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" />
                    <span>Min: {formatCurrency(resource.minimumProjectValue)}</span>
                  </div>
                )}
                {resource.maximumProjectValue && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" />
                    <span>Max: {formatCurrency(resource.maximumProjectValue)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {resource.sectors.map((sector, index) => (
              <span 
                key={index} 
                className="inline-block bg-[#0078D4]/10 text-[#0078D4] px-2 py-0.5 rounded text-xs font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Atualizado em {new Date(resource.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 text-xs"
          >
            Como solicitar
          </Button>
          
          {resource.contactInfo.website && (
            <Button 
              variant="default" 
              size="sm"
              className="h-8 text-xs bg-[#005A9C] hover:bg-[#004a80] flex items-center gap-1"
              onClick={() => window.open(resource.contactInfo.website, '_blank')}
            >
              <span>Acessar</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
