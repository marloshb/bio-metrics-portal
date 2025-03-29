import React, { useState } from 'react';
import { Search, Filter, MapPin, Building, Mail, Phone, Plus, Calendar, Award, Tag, Globe } from 'lucide-react';
import { mockActors } from '@/data/valuechain';
import { Actor } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export const ActorRegistry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [showAddActorDialog, setShowAddActorDialog] = useState(false);
  const { toast } = useToast();

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

  // Function to handle actor registration (would connect to backend in real implementation)
  const handleRegisterActor = (event: React.FormEvent) => {
    event.preventDefault();
    setShowAddActorDialog(false);
    toast({
      title: "Ator cadastrado com sucesso!",
      description: "O novo ator foi adicionado à cadeia de valor.",
    });
  };

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
          <div className="relative flex gap-2">
            <Select value={typeFilter || ''} onValueChange={(value) => setTypeFilter(value || null)}>
              <SelectTrigger className="w-[180px] flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={regionFilter || ''} onValueChange={(value) => setRegionFilter(value || null)}>
              <SelectTrigger className="w-[180px] flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <SelectValue placeholder="Filtrar por região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as regiões</SelectItem>
                {uniqueRegions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={showAddActorDialog} onOpenChange={setShowAddActorDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#0078D4] hover:bg-[#005A9C]">
                <Plus className="h-4 w-4 mr-2" /> Cadastrar Ator
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-[#005A9C]">Cadastrar Novo Ator</DialogTitle>
                <DialogDescription>
                  Preencha as informações abaixo para cadastrar um novo ator na cadeia de valor bioeconômica.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRegisterActor}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="name" className="text-sm font-medium block mb-1">Nome da organização</label>
                      <Input id="name" placeholder="Ex: Cooperativa Verde Amazônia" required />
                    </div>
                    <div>
                      <label htmlFor="type" className="text-sm font-medium block mb-1">Tipo de ator</label>
                      <Select defaultValue="Produtor">
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Produtor">Produtor</SelectItem>
                          <SelectItem value="Cooperativa">Cooperativa</SelectItem>
                          <SelectItem value="Indústria">Indústria</SelectItem>
                          <SelectItem value="Distribuidor">Distribuidor</SelectItem>
                          <SelectItem value="Comprador">Comprador</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="state" className="text-sm font-medium block mb-1">Estado</label>
                      <Select defaultValue="PA">
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Selecione um estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="city" className="text-sm font-medium block mb-1">Cidade</label>
                      <Input id="city" placeholder="Ex: Belém" required />
                    </div>
                    <div>
                      <label htmlFor="capacity" className="text-sm font-medium block mb-1">Capacidade de produção</label>
                      <Input id="capacity" placeholder="Ex: 2 toneladas/ano" />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="products" className="text-sm font-medium block mb-1">Produtos/Serviços principais</label>
                      <Input id="products" placeholder="Ex: Mel orgânico, Açaí, Castanha-do-brasil" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-1">E-mail</label>
                      <Input id="email" type="email" placeholder="Ex: contato@cooperativa.org" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium block mb-1">Telefone</label>
                      <Input id="phone" placeholder="Ex: (91) 98765-4321" />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="text-sm font-medium block mb-1">Descrição</label>
                      <textarea 
                        id="description" 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Descreva a organização, suas atividades principais e diferenciais..."
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="certifications" className="text-sm font-medium block mb-1">Certificações</label>
                      <Input id="certifications" placeholder="Ex: Orgânico, Comércio Justo, Certificação Florestal" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddActorDialog(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#0078D4] hover:bg-[#005A9C]">
                    Cadastrar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
      
      <div className="flex justify-center mt-6">
        <Button variant="outline" size="sm">
          Carregar mais
        </Button>
      </div>
    </div>
  );
};

// Actor Card Component
const ActorCard = ({ actor }: { actor: Actor }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">{actor.name}</CardTitle>
            
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
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{actor.description}</p>
        
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
            <Tag className="h-3.5 w-3.5" />
            Produtos/Serviços:
          </h4>
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
          
          {actor.productionCapacity && (
            <div className="flex items-center gap-1.5 col-span-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-600">Capacidade: {actor.productionCapacity}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
        <span className="text-xs text-gray-500 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-gray-400" />
          Atualizado em {new Date(actor.updatedAt).toLocaleDateString('pt-BR')}
        </span>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="link" 
              className="h-auto p-0 text-[#0078D4] flex items-center gap-1.5"
            >
              <span>Ver perfil completo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-[#005A9C]">{actor.name}</DialogTitle>
              <DialogDescription>
                {actor.type} • {actor.location.city}, {actor.location.state}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
                <TabsTrigger value="contact">Contato</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Descrição</h4>
                  <p className="text-sm text-gray-600">{actor.description}</p>
                </div>
                
                {actor.certifications && actor.certifications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Certificações</h4>
                    <div className="flex flex-wrap gap-2">
                      {actor.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {actor.productionCapacity && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Capacidade de produção</h4>
                    <p className="text-sm text-gray-600">{actor.productionCapacity}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="products" className="mt-4">
                <div className="space-y-4">
                  {actor.products.map((product, index) => (
                    <Card key={index}>
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="text-base">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-500">Categoria:</span> {product.category}
                          </div>
                          <div>
                            <span className="text-gray-500">Quantidade:</span> {product.quantity} {product.unit}
                          </div>
                          <div>
                            <span className="text-gray-500">Preço:</span> R$ {product.price.toFixed(2)}/{product.unit}
                          </div>
                          <div>
                            <span className="text-gray-500">Disponível:</span> {product.available ? 'Sim' : 'Não'}
                          </div>
                          {product.harvestDate && (
                            <div>
                              <span className="text-gray-500">Data de colheita:</span> {new Date(product.harvestDate).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                          {product.co2_avoided && (
                            <div>
                              <span className="text-gray-500">CO₂ evitado:</span> {product.co2_avoided} kg
                            </div>
                          )}
                        </div>
                        
                        {product.certifications && product.certifications.length > 0 && (
                          <div className="mt-3">
                            <span className="text-gray-500 text-sm">Certificações:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.certifications.map((cert, i) => (
                                <Badge key={i} variant="outline" className="bg-green-50 text-green-700 text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="py-2 px-4 border-t">
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Informações de contato</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{actor.contact.email}</span>
                      </div>
                      {actor.contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{actor.contact.phone}</span>
                        </div>
                      )}
                      {actor.contact.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <a href={actor.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {actor.contact.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Localização</h4>
                    <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400 mr-2" />
                      <span className="text-gray-500">
                        {actor.location.city}, {actor.location.state} <br/>
                        (Mapa interativo ESRI será exibido aqui)
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-[#0078D4] hover:bg-[#005A9C]">Entrar em contato</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
