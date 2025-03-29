
import React, { useState } from 'react';
import { Search, Filter, FileText, Calendar, Building, MapPin } from 'lucide-react';
import { mockPolicies } from '@/data/mockHubData';
import { Policy } from '@/types/hubTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const IncentivePolicies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  // Get unique policy types and regions for filters
  const uniqueTypes = Array.from(new Set(mockPolicies.map(policy => policy.type)));
  const uniqueRegions = Array.from(
    new Set(mockPolicies.flatMap(policy => policy.applicableRegions))
  ).sort();
  
  // Filter policies based on search term and filters
  const filteredPolicies = mockPolicies.filter(policy => {
    // Search term filter
    if (searchTerm && !policy.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !policy.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !policy.responsibleAgency.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (typeFilter && policy.type !== typeFilter) {
      return false;
    }
    
    // Region filter
    if (regionFilter && !policy.applicableRegions.includes(regionFilter)) {
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
            placeholder="Buscar políticas de incentivo..." 
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
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-3 z-10 hidden group-hover:block">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tipo</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={typeFilter || ''}
                    onChange={(e) => setTypeFilter(e.target.value || null)}
                  >
                    <option value="">Todos</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Região</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={regionFilter || ''}
                    onChange={(e) => setRegionFilter(e.target.value || null)}
                  >
                    <option value="">Todos</option>
                    <option value="Nacional">Nacional</option>
                    {uniqueRegions.filter(region => region !== "Nacional").map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Nenhuma política de incentivo encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Policy Card Component
const PolicyCard = ({ policy }: { policy: Policy }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900">{policy.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Building className="w-3.5 h-3.5" />
                  <span className="text-sm">{policy.responsibleAgency}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-sm">
                    Válido até {new Date(policy.validUntil).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            
            <Badge className="bg-[#0078D4]">
              {policy.type}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{policy.description}</p>
          
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Critérios de Elegibilidade:</h4>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              {policy.eligibilityCriteria.slice(0, 2).map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
              {policy.eligibilityCriteria.length > 2 && (
                <li>+ {policy.eligibilityCriteria.length - 2} outros critérios</li>
              )}
            </ul>
          </div>
          
          <div className="flex items-center gap-1 mt-3">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-600">
              Aplicável em: {' '}
              {policy.applicableRegions.includes('Nacional') 
                ? 'Todo o Brasil' 
                : policy.applicableRegions.join(', ')}
            </span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {policy.benefits.map((benefit, index) => (
              <span 
                key={index} 
                className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Atualizado em {new Date(policy.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        {policy.documentUrl && (
          <Button 
            variant="link" 
            className="h-auto p-0 text-[#0078D4] flex items-center gap-1.5"
            onClick={() => window.open(policy.documentUrl, '_blank')}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver documento</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
