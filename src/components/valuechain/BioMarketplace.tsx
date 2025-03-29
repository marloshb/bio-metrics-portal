
import React, { useState } from 'react';
import { mockProductOfferings, mockMarketplaceTransactions, mockActors } from '@/data/mockValueChainData';
import { ProductOffering, MarketplaceTransaction } from '@/types/valueChainTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, Filter, Tag, MapPin, ShoppingCart, MessageCircle, 
  Leaf, Award, Calendar, Info, BarChart2, QrCode, Send, ArrowRight,
  Truck, CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

export const BioMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [certificationFilter, setCertificationFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [activeTab, setActiveTab] = useState<'products' | 'transactions'>('products');
  const [selectedProduct, setSelectedProduct] = useState<ProductOffering | null>(null);
  const [showNegotiationDialog, setShowNegotiationDialog] = useState(false);
  const { toast } = useToast();

  const categories = Array.from(new Set(mockProductOfferings.map(p => p.category)));
  const certifications = Array.from(
    new Set(mockProductOfferings.flatMap(p => p.certifications || []))
  );

  // Filter products based on search and filters
  const filteredProducts = mockProductOfferings.filter(product => {
    const matchesSearch = searchTerm ? 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    
    const matchesCertification = certificationFilter ? 
      product.certifications?.includes(certificationFilter) : true;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesCertification && matchesPrice;
  });
  
  // Get transactions with product and actor details
  const transactionsWithDetails = mockMarketplaceTransactions.map(transaction => {
    const product = mockProductOfferings.find(p => p.id === transaction.productOffering);
    const seller = mockActors.find(a => a.id === transaction.seller);
    const buyer = transaction.buyer ? mockActors.find(a => a.id === transaction.buyer) : null;
    
    return {
      ...transaction,
      product,
      seller,
      buyer
    };
  });

  const handleBuy = (product: ProductOffering) => {
    setSelectedProduct(product);
    setShowNegotiationDialog(true);
  };

  const submitNegotiation = () => {
    setShowNegotiationDialog(false);
    toast({
      title: "Oferta enviada com sucesso!",
      description: "O vendedor foi notificado e entrará em contato em breve.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'products' | 'transactions')} className="w-auto">
          <TabsList>
            <TabsTrigger value="products" className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <span>Catálogo de Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Transações</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Buscar produtos ou transações..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <TabsContent value="products" className="m-0 p-0">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="w-full md:w-64 shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#005A9C]">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Categoria</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Certificação</label>
                <Select value={certificationFilter} onValueChange={setCertificationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as certificações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as certificações</SelectItem>
                    {certifications.map(cert => (
                      <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">Faixa de preço</label>
                  <span className="text-sm text-gray-500">
                    {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 2000]}
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="my-4"
                />
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full" onClick={() => {
                  setCategoryFilter('');
                  setCertificationFilter('');
                  setPriceRange([0, 2000]);
                  setSearchTerm('');
                }}>
                  Limpar filtros
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0 flex-col items-start">
              <div className="text-sm text-gray-500 mb-2">
                {filteredProducts.length} produtos encontrados
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md w-full">
                <h3 className="text-sm font-medium text-blue-800 flex items-center gap-1.5 mb-1">
                  <Info className="h-4 w-4" />
                  Marketplace Sustentável
                </h3>
                <p className="text-xs text-blue-600">
                  Todos os produtos disponíveis seguem critérios de rastreabilidade e sustentabilidade.
                </p>
              </div>
            </CardFooter>
          </Card>
          
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onBuy={handleBuy}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="transactions" className="m-0 p-0">
        <div className="grid grid-cols-1 gap-4">
          {transactionsWithDetails.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </TabsContent>
      
      <Dialog open={showNegotiationDialog} onOpenChange={setShowNegotiationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#005A9C]">Iniciar Negociação</DialogTitle>
            <DialogDescription>
              Envie uma oferta para o vendedor deste produto.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-start gap-4 mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  <Tag className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{selectedProduct.category}</p>
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 mr-2">
                      {formatCurrency(selectedProduct.price)}/{selectedProduct.unit}
                    </Badge>
                    <span className="text-sm">
                      {selectedProduct.quantity} {selectedProduct.unit} disponíveis
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="quantity" className="text-sm font-medium block mb-1">
                    Quantidade desejada ({selectedProduct.unit})
                  </label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder={`Máximo: ${selectedProduct.quantity}`}
                    max={selectedProduct.quantity}
                    min={1}
                    defaultValue={Math.min(10, selectedProduct.quantity)}
                  />
                </div>
                
                <div>
                  <label htmlFor="offer" className="text-sm font-medium block mb-1">
                    Valor oferecido por {selectedProduct.unit}
                  </label>
                  <Input 
                    id="offer" 
                    type="number" 
                    placeholder={`Sugerido: ${selectedProduct.price.toFixed(2)}`}
                    defaultValue={selectedProduct.price}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1">
                    Mensagem ao vendedor
                  </label>
                  <textarea 
                    id="message" 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Detalhes adicionais sobre sua oferta..."
                    defaultValue={`Olá, tenho interesse em adquirir o produto ${selectedProduct.name}. Podemos negociar?`}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNegotiationDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#0078D4] hover:bg-[#005A9C]" onClick={submitNegotiation}>
              <Send className="h-4 w-4 mr-2" />
              Enviar oferta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ProductCard = ({ 
  product, 
  onBuy 
}: { 
  product: ProductOffering; 
  onBuy: (product: ProductOffering) => void;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300">
      <div className="h-40 bg-gray-100 relative overflow-hidden flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <Tag className="h-12 w-12 text-gray-300" />
        )}
        {product.certifications && product.certifications.length > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-600 text-white">
              <Leaf className="h-3 w-3 mr-1" />
              {product.certifications[0]}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-gray-700">
            {product.category}
          </Badge>
          <span className="text-lg font-semibold text-[#0078D4]">
            {formatCurrency(product.price)}/{product.unit}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{product.harvestDate ? new Date(product.harvestDate).toLocaleDateString('pt-BR') : "N/A"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>Disponível</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <BarChart2 className="h-4 w-4 text-gray-400" />
            <span>{product.quantity} {product.unit} disponíveis</span>
          </div>
        </div>
        
        {product.sustainable_practices && product.sustainable_practices.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
              <Leaf className="h-3.5 w-3.5 text-green-600" />
              Práticas sustentáveis:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.sustainable_practices.slice(0, 2).map((practice, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {practice}
                </Badge>
              ))}
              {product.sustainable_practices.length > 2 && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  +{product.sustainable_practices.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 text-sm" 
          onClick={() => {}}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Detalhes
        </Button>
        <Button 
          className="flex-1 text-sm bg-[#0078D4] hover:bg-[#005A9C]" 
          onClick={() => onBuy(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

const TransactionCard = ({ 
  transaction 
}: { 
  transaction: MarketplaceTransaction & { 
    product?: ProductOffering; 
    seller?: any; 
    buyer?: any;
  }
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const statusColors = {
    'Disponível': 'bg-blue-100 text-blue-800',
    'Em negociação': 'bg-amber-100 text-amber-800',
    'Vendido': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800'
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {transaction.product?.name || "Produto"}
            </CardTitle>
            <CardDescription>
              ID da transação: {transaction.id}
            </CardDescription>
          </div>
          <Badge className={statusColors[transaction.status]}>
            {transaction.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-gray-400" />
              Detalhes do produto
            </h4>
            <div className="text-sm">
              <div><span className="text-gray-500">Categoria:</span> {transaction.product?.category}</div>
              <div><span className="text-gray-500">Quantidade:</span> {transaction.quantity} {transaction.product?.unit}</div>
              <div><span className="text-gray-500">Valor inicial:</span> {formatCurrency(transaction.initialPrice)}/{transaction.product?.unit}</div>
              {transaction.finalPrice && (
                <div><span className="text-gray-500">Valor final:</span> {formatCurrency(transaction.finalPrice)}/{transaction.product?.unit}</div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-400" />
              Vendedor
            </h4>
            <div className="text-sm">
              <div>{transaction.seller?.name || "Vendedor"}</div>
              <div className="text-gray-500">{transaction.seller?.type}</div>
              <div className="text-gray-500">{transaction.seller?.location.city}, {transaction.seller?.location.state}</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              Datas
            </h4>
            <div className="text-sm">
              <div><span className="text-gray-500">Criado:</span> {new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</div>
              <div><span className="text-gray-500">Atualizado:</span> {new Date(transaction.updatedAt).toLocaleDateString('pt-BR')}</div>
              {transaction.completedAt && (
                <div><span className="text-gray-500">Concluído:</span> {new Date(transaction.completedAt).toLocaleDateString('pt-BR')}</div>
              )}
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transaction.buyer && (
                <div className="space-y-1">
                  <h4 className="text-sm font-medium flex items-center gap-1.5">
                    <ShoppingCart className="h-4 w-4 text-gray-400" />
                    Comprador
                  </h4>
                  <div className="text-sm">
                    <div>{transaction.buyer?.name}</div>
                    <div className="text-gray-500">{transaction.buyer?.type}</div>
                    <div className="text-gray-500">{transaction.buyer?.location.city}, {transaction.buyer?.location.state}</div>
                  </div>
                </div>
              )}
              
              {transaction.traceabilityCode && (
                <div className="space-y-1">
                  <h4 className="text-sm font-medium flex items-center gap-1.5">
                    <QrCode className="h-4 w-4 text-gray-400" />
                    Rastreabilidade
                  </h4>
                  <div className="text-sm">
                    <div><span className="text-gray-500">Código:</span> {transaction.traceabilityCode}</div>
                    <Button variant="outline" size="sm" className="mt-1">
                      Ver QR Code
                    </Button>
                  </div>
                </div>
              )}
              
              {transaction.status === 'Vendido' && (
                <div className="md:col-span-2 p-3 bg-green-50 rounded-md">
                  <h4 className="text-sm font-medium text-green-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Transação concluída com sucesso
                  </h4>
                  <div className="flex items-center gap-4 text-green-700 text-sm mt-2">
                    <div className="flex items-center gap-1.5">
                      <Truck className="h-4 w-4" />
                      <span>Envio confirmado</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      <span>Produto certificado</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-gray-50 flex justify-between">
        <Button 
          variant="link" 
          className="p-0 h-auto text-gray-500"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
        </Button>
        
        <div className="flex gap-2">
          {transaction.status === 'Disponível' && (
            <Button size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Fazer oferta
            </Button>
          )}
          
          {transaction.status === 'Em negociação' && (
            <Button size="sm" className="bg-[#0078D4] hover:bg-[#005A9C]">
              <MessageCircle className="h-4 w-4 mr-2" />
              Continuar negociação
            </Button>
          )}
          
          {transaction.product && (
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
