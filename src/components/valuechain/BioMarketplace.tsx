
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
  Clock
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

export const BioMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'date'>('date');
  const [activeTab, setActiveTab] = useState<'offerings' | 'transactions'>('offerings');
  const [selectedProduct, setSelectedProduct] = useState<ProductOffering | null>(null);

  // Get unique categories for filters
  const uniqueCategories = Array.from(
    new Set(mockProductOfferings.map(product => product.category))
  ).sort();

  // Filter offerings based on filters
  const filteredOfferings = mockProductOfferings.filter(product => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.sellerName.toLowerCase().includes(searchTerm.toLowerCase())) {
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
      return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
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

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOfferings.length > 0 ? (
            sortedOfferings.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
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
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
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
                      <span>Anunciado em {new Date(selectedProduct.listedDate).toLocaleDateString('pt-BR')}</span>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#005A9C]">Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Data</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Produto</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Vendedor</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Comprador</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Quantidade</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Valor Total</th>
                    <th className="p-3 border-b text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMarketplaceTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="p-3 text-sm">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                      <td className="p-3 text-sm font-medium">{transaction.productName}</td>
                      <td className="p-3 text-sm">{transaction.seller}</td>
                      <td className="p-3 text-sm">{transaction.buyer}</td>
                      <td className="p-3 text-sm">{transaction.quantity} {transaction.unit}</td>
                      <td className="p-3 text-sm font-medium">{formatCurrency(transaction.totalValue)}</td>
                      <td className="p-3 text-sm">
                        <Badge className={
                          transaction.status === 'Completa' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'Pendente' ? 'bg-amber-100 text-amber-800' :
                              transaction.status === 'Em Andamento' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                        }>
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ 
  product, 
  onSelect 
}: { 
  product: ProductOffering; 
  onSelect: (product: ProductOffering) => void;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-200">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
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

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

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
          <span>{new Date(product.listedDate).toLocaleDateString('pt-BR')}</span>
        </div>

        <Button size="sm" onClick={() => onSelect(product)} className="bg-[#0078D4] hover:bg-[#005A9C]">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};
