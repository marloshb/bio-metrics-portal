
import React, { useState } from 'react';
import { Search, Filter, MapPin, Building, Mail, Phone } from 'lucide-react';
import { mockActors } from '@/data/mockValueChainData';
import { Actor } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const ActorRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  // Get unique actor types and regions for filters
  const uniqueTypes = Array.from(new Set(mockActors.map(actor => actor.type)));
  const uniqueRegions = Array.from(
    new Set(mockActors.map(actor => actor.location.state))
  ).sort();
  
  // Filter actors based on search term and filters
  const filteredActors = mockActors.filter(actor => {
    // Search term filter
    if (searchTerm && !actor.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !actor.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !actor.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Type filter
    if (typeFilter && actor.type !== typeFilter) {
      return false;
    }
    
    // Region filter
    if (regionFilter && actor.location.state !== regionFilter) {
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
            placeholder="Buscar atores da cadeia de valor..." 
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
                  <label className="text-sm font-medium mb-1 block">Estado</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={regionFilter || ''}
                    onChange={(e) => setRegionFilter(e.target.value || null)}
                  >
                    <option value="">Todos</option>
                    {uniqueRegions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="bg-[#0078D4] hover:bg-[#005A9C]">
            Cadastrar Ator
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActors.length > 0 ? (
          filteredActors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg col-span-3">
            <p className="text-gray-500">Nenhum ator encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Actor Card Component
const ActorCard = ({ actor }: { actor: Actor }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900">{actor.name}</h3>
              
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Building className="w-3.5 h-3.5" />
                  <span className="text-sm">{actor.type}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">
                    {actor.location.city}, {actor.location.state}
                  </span>
                </div>
              </div>
            </div>
            
            {actor.certifications && actor.certifications.length > 0 && (
              <Badge className="bg-green-600">
                {actor.certifications[0]}
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{actor.description}</p>
          
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Produtos/Serviços:</h4>
            <div className="flex flex-wrap gap-1.5">
              {actor.products.slice(0, 3).map((product, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                >
                  {product.name}
                </span>
              ))}
              {actor.products.length > 3 && (
                <span className="inline-block text-gray-500 text-xs">
                  +{actor.products.length - 3} mais
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-600 truncate">{actor.contact.email}</span>
            </div>
            
            {actor.contact.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-600">{actor.contact.phone}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Atualizado em {new Date(actor.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        <Button 
          variant="link" 
          className="h-auto p-0 text-[#0078D4] flex items-center gap-1.5"
        >
          <span>Ver perfil completo</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
