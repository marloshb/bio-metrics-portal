
import React, { useState } from 'react';
import { Search, Filter, Tag, MessageCircle, ShoppingCart, CheckCircle2, Clock, ChevronDown, AlertCircle } from 'lucide-react';
import { mockProductOfferings } from '@/data/mockValueChainData';
import { ProductOffering } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export const BioMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'date-desc'>('date-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { toast } = useToast();

  // Get unique categories for filters
  const uniqueCategories = Array.from(
    new Set(mockProductOfferings.map(product => product.category))
  ).sort();
  
  // Filter and sort products
  const filteredProducts = mockProductOfferings.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Only show available products
    return product.available;
  }).sort((a, b) => {
    // Sort by selected option
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else {
      // date-desc is default
      return new Date(b.harvestDate || '').getTime() - new Date(a.harvestDate || '').getTime();
    }
  });

  const handleContact = (productId: string) => {
    toast({
      title: "Mensagem enviada",
      description: "Seu interesse foi registrado e o vendedor será notificado.",
    });
  };

  const handlePurchase = (productId: string) => {
    toast({
      title: "Adicionado ao carrinho",
      description: "Produto adicionado ao carrinho com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative group">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filtros
            </Button>
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-3 z-10 hidden group-hover:block">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Categoria</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={categoryFilter || ''}
                    onChange={(e) => setCategoryFilter(e.target.value || null)}
                  >
                    <option value="">Todas</option>
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Ordenar por</label>
                  <select 
                    className="w-full rounded border border-gray-200 text-sm p-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="date-desc">Mais recentes</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <Button className="bg-[#0078D4] hover:bg-[#005A9C]">
            Vender Produto
          </Button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onContact={handleContact} onPurchase={handlePurchase} />
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg col-span-full">
              <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductListItem key={product.id} product={product} onContact={handleContact} onPurchase={handlePurchase} />
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Product Card Component (Grid View)
const ProductCard = ({ 
  product, 
  onContact, 
  onPurchase 
}: { 
  product: ProductOffering; 
  onContact: (id: string) => void;
  onPurchase: (id: string) => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="h-40 bg-gray-100 relative">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
          
          <Badge className="absolute top-2 right-2 bg-blue-500">
            {product.category}
          </Badge>
          
          {product.certifications && product.certifications.length > 0 && (
            <Badge className="absolute top-2 left-2 bg-green-600">
              {product.certifications[0]}
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-[#0078D4]">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              {product.quantity} {product.unit}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          
          {product.sustainable_practices && product.sustainable_practices.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {product.sustainable_practices.slice(0, 2).map((practice, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs"
                >
                  {practice}
                </span>
              ))}
              {product.sustainable_practices.length > 2 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs cursor-help">
                        +{product.sustainable_practices.length - 2}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        {product.sustainable_practices.slice(2).map((practice, i) => (
                          <div key={i} className="py-0.5">{practice}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
          
          {product.co2_avoided && (
            <div className="flex items-center gap-1 text-green-700 text-xs mb-3">
              <CheckCircle2 className="h-3 w-3" />
              <span>{product.co2_avoided}kg CO₂ evitado</span>
            </div>
          )}
          
          {product.harvestDate && (
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="h-3 w-3" />
              <span>Colheita: {new Date(product.harvestDate).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 text-xs"
          onClick={() => onContact(product.id)}
        >
          <MessageCircle className="h-3 w-3 mr-1" /> Contatar
        </Button>
        <Button 
          className="flex-1 bg-[#0078D4] hover:bg-[#005A9C] text-xs"
          onClick={() => onPurchase(product.id)}
        >
          <ShoppingCart className="h-3 w-3 mr-1" /> Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

// Product List Item Component (List View)
const ProductListItem = ({ 
  product, 
  onContact, 
  onPurchase 
}: { 
  product: ProductOffering; 
  onContact: (id: string) => void;
  onPurchase: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-32 h-24 bg-gray-100 rounded flex-shrink-0">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                <span className="text-gray-400 text-xs">Sem imagem</span>
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-blue-500 text-xs">
                    {product.category}
                  </Badge>
                  
                  {product.certifications && product.certifications.length > 0 && (
                    <Badge className="bg-green-600 text-xs">
                      {product.certifications[0]}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="mt-2 md:mt-0 flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#0078D4]">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-sm text-gray-500">
                  / {product.unit}
                </span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <p className={`text-sm text-gray-600 ${expanded ? '' : 'line-clamp-1'}`}>
                  {product.description}
                </p>
                <button 
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setExpanded(!expanded)}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {expanded && (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {product.sustainable_practices?.map((practice, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span>Quantidade: {product.quantity} {product.unit}</span>
                    </div>
                    
                    {product.harvestDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Colheita: {new Date(product.harvestDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                    
                    {product.co2_avoided && (
                      <div className="flex items-center gap-1 text-green-700">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{product.co2_avoided}kg CO₂ evitado</span>
                      </div>
                    )}
                    
                    {product.expirationDate && (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Validade: {new Date(product.expirationDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => onContact(product.id)}
              >
                <MessageCircle className="h-3 w-3 mr-1" /> Contatar
              </Button>
              <Button 
                size="sm"
                className="bg-[#0078D4] hover:bg-[#005A9C] text-xs"
                onClick={() => onPurchase(product.id)}
              >
                <ShoppingCart className="h-3 w-3 mr-1" /> Comprar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
