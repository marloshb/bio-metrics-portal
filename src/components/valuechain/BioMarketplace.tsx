
import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  MapPin,
  DollarSign,
  Calendar,
  ChevronDown,
  Leaf,
  Award,
  MessageCircle,
  Star,
  Check,
  ExternalLink,
  Clock,
  Play,
  PlayCircle
} from 'lucide-react';
import { mockProductOfferings, mockMarketplaceTransactions } from '@/data/valuechain';
import { ProductOffering } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const BioMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'date'>('date');
  const [activeTab, setActiveTab] = useState<'offerings' | 'transactions'>('offerings');
  const [selectedProduct, setSelectedProduct] = useState<ProductOffering | null>(null);
  const isMobile = useIsMobile();

  // Get unique categories for filters
  const uniqueCategories = Array.from(
    new Set(mockProductOfferings.map(product => product.category))
  ).sort();

  // Filter offerings based on filters
  const filteredOfferings = mockProductOfferings.filter(product => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.sellerName?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    // Price filters
    if (minPrice && product.price < minPrice) {
      return false;
    }

    if (maxPrice && product.price > maxPrice) {
      return false;
    }

    // Certification filter
    if (showCertifiedOnly && (!product.certifications || product.certifications.length === 0)) {
      return false;
    }

    return true;
  });

  // Sort offerings based on sort by
  const sortedOfferings = [...filteredOfferings].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else { // date
      return new Date(b.listedDate || '').getTime() - new Date(a.listedDate || '').getTime();
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'offerings' | 'transactions')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="offerings" className="flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span>Produtos Disponíveis</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center justify-center">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>Transações Recentes</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="offerings" className="space-y-6 mt-0">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Search bar */}
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produtos por nome, descrição ou vendedor..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-start">
            <div>
              <Select
                value={categoryFilter || "all"}
                onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas categorias</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as 'price' | 'rating' | 'date')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Menor preço</SelectItem>
                  <SelectItem value="rating">Melhor avaliação</SelectItem>
                  <SelectItem value="date">Mais recentes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className={`flex items-center ${showCertifiedOnly ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
              onClick={() => setShowCertifiedOnly(!showCertifiedOnly)}
            >
              {showCertifiedOnly ? <Check className="h-4 w-4 mr-2" /> : null}
              Certificados
            </Button>
          </div>
        </div>

        {/* Product VideoCard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOfferings.length > 0 ? (
            sortedOfferings.map((product) => (
              <ProductVideoCard key={product.id} product={product} onSelect={setSelectedProduct} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-gray-50 rounded-lg">
              <ShoppingBag className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>

        {/* Product details dialog */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  Detalhes do produto e informações para compra
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group">
                    <ShoppingBag className="h-16 w-16 text-gray-400 group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {selectedProduct.rating && (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < selectedProduct.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm ml-1">({selectedProduct.totalRatings})</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(selectedProduct.price)} <span className="text-sm font-normal">/ {selectedProduct.unit}</span>
                  </h3>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedProduct.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Anunciado em {new Date(selectedProduct.listedDate || '').toLocaleDateString('pt-BR')}</span>
                    </div>

                    {selectedProduct.availableQuantity && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Quantidade disponível: {selectedProduct.availableQuantity} {selectedProduct.unit}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Descrição</h4>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                  {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Certificações</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.certifications.map((cert, i) => (
                          <Badge key={i} className="bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.environmentalImpact && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Impacto Ambiental</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedProduct.environmentalImpact).map(([key, value]) => (
                          <div key={key} className="bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-2 py-1 flex items-center gap-1 text-xs">
                            <Leaf className="h-3 w-3" />
                            <span>{key}: {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Vendedor</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{selectedProduct.sellerName}</div>
                        {selectedProduct.sellerRating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{selectedProduct.sellerRating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 mb-2">{selectedProduct.sellerDescription}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#0078D4] hover:bg-[#005A9C] flex-1">Comprar</Button>
                        <Button size="sm" variant="outline" className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" /> Contatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="flex justify-between items-center w-full text-xs text-gray-500">
                  <div>ID: {selectedProduct.id}</div>
                  <div className="flex items-center">
                    <Button variant="link" className="h-auto p-0 text-[#0078D4] text-xs flex items-center gap-1">
                      Ver rastreabilidade <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </TabsContent>

      <TabsContent value="transactions" className="space-y-6 mt-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar transações..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMarketplaceTransactions.map((transaction, index) => (
            <TransactionVideoCard key={index} transaction={transaction} />
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

// Product VideoCard Component
const ProductVideoCard = ({ 
  product, 
  onSelect 
}: { 
  product: ProductOffering; 
  onSelect: (product: ProductOffering) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-200 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className={`h-12 w-12 text-gray-400 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{product.description}</p>
        </div>
        
        <Badge className="absolute top-2 right-2 bg-[#0078D4] hover:bg-[#0078D4]">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <Badge className={`${product.category === 'Orgânico' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 mt-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{product.location}</span>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">{formatCurrency(product.price)}</div>
            <div className="text-xs text-gray-500">/ {product.unit}</div>
          </div>
        </div>

        {product.certifications && product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.certifications.map((cert, index) => (
              <div key={index} className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-sm flex items-center">
                <Award className="w-3 h-3 mr-1" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between border-t">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{new Date(product.listedDate || '').toLocaleDateString('pt-BR')}</span>
        </div>

        <Button size="sm" className="bg-[#0078D4] hover:bg-[#005A9C]">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

// Transaction VideoCard Component
const TransactionVideoCard = ({ transaction }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Vendido':
        return 'bg-green-100 text-green-800';
      case 'Disponível':
        return 'bg-amber-100 text-amber-800';
      case 'Em negociação':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-200 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <DollarSign className={`h-12 w-12 text-gray-400 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <h3 className="font-medium text-lg truncate">{transaction.productName}</h3>
          <p className="text-sm text-gray-200">
            {transaction.seller} → {transaction.buyer || 'Aguardando comprador'}
          </p>
        </div>
        
        <Badge className={`absolute top-2 right-2 ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{transaction.productName}</h3>
          <Badge className={getStatusColor(transaction.status)}>
            {transaction.status}
          </Badge>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vendedor:</span>
            <span className="font-medium">{transaction.seller}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Comprador:</span>
            <span className="font-medium">{transaction.buyer || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Quantidade:</span>
            <span>{transaction.quantity} {transaction.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valor Total:</span>
            <span className="font-medium">{formatCurrency(transaction.totalValue || transaction.initialPrice * transaction.quantity)}</span>
          </div>
        </div>

        {transaction.traceabilityCode && (
          <div className="mt-3 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center justify-between">
            <span>Código de Rastreabilidade:</span>
            <span className="font-mono">{transaction.traceabilityCode}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between border-t">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{new Date(transaction.date || transaction.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className="text-[#0078D4] border-[#0078D4] hover:bg-[#0078D4] hover:text-white"
        >
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};
