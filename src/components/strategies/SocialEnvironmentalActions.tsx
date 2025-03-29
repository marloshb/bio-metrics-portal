
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockSocialEnvironmentalActions } from '@/data/mockStrategiesData';
import { SocialEnvironmentalAction } from '@/types/strategiesTypes';
import { 
  Search, 
  MapPin, 
  Users, 
  TreePine,
  Calendar, 
  Building,
  Heart,
  Clock,
  TreeDeciduous
} from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const statusColors = {
  'Planejamento': 'bg-blue-100 text-blue-800',
  'Implementação': 'bg-amber-100 text-amber-800',
  'Concluída': 'bg-green-100 text-green-800'
};

const SocialEnvironmentalActions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<SocialEnvironmentalAction | null>(null);

  const filteredActions = mockSocialEnvironmentalActions.filter(action => {
    const matchesSearch = 
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion ? action.region === selectedRegion : true;
    const matchesStatus = selectedStatus ? action.status === selectedStatus : true;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const regions = Array.from(new Set(mockSocialEnvironmentalActions.map(a => a.region)));
  const statuses = Array.from(new Set(mockSocialEnvironmentalActions.map(a => a.status)));

  const handleActionClick = (action: SocialEnvironmentalAction) => {
    setSelectedAction(action);
  };

  const handleBackToList = () => {
    setSelectedAction(null);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-[#F3F2F1] border-b">
        <CardTitle className="text-[#005A9C] text-xl">Redução de Desigualdades e Recuperação de Vegetação Nativa</CardTitle>
        <CardDescription>
          Promova ações que integrem comunidades locais, gerem renda e restaurem ecossistemas.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!selectedAction ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por título, descrição ou estado..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por região" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as regiões</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActions.map(action => (
                <ActionCard 
                  key={action.id} 
                  action={action} 
                  onClick={() => handleActionClick(action)} 
                />
              ))}
              {filteredActions.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Nenhuma ação socioambiental encontrada com os filtros selecionados.
                </div>
              )}
            </div>
          </>
        ) : (
          <ActionDetail 
            action={selectedAction}
            onBack={handleBackToList} 
          />
        )}
      </CardContent>
      {!selectedAction && (
        <CardFooter className="bg-[#F3F2F1] border-t flex justify-between">
          <div className="text-sm text-gray-500">
            {filteredActions.length} ações encontradas
          </div>
          <Button>
            Nova Ação
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const ActionCard: React.FC<{ 
  action: SocialEnvironmentalAction; 
  onClick: () => void 
}> = ({ action, onClick }) => {
  // Calculate overall social progress
  const socialProgress = (action.socialImpact.currentFamiliesInvolved / action.socialImpact.familiesTarget) * 100;
  
  // Calculate overall environmental progress
  const environmentalProgress = (action.environmentalImpact.currentAreaRestored / action.environmentalImpact.areaTarget) * 100;
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            className={`${statusColors[action.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
          >
            {action.status}
          </Badge>
          <div className="text-sm font-medium">
            {action.state}, {action.region}
          </div>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-1">{action.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {action.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mt-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs flex items-center text-blue-700">
                  <Users className="h-3.5 w-3.5 mr-1" /> Social
                </span>
                <span className="text-xs">{Math.round(socialProgress)}%</span>
              </div>
              <Progress value={socialProgress} className="h-2 bg-blue-100" />
              <div className="text-xs mt-1">
                {action.socialImpact.currentFamiliesInvolved} de {action.socialImpact.familiesTarget} famílias
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs flex items-center text-green-700">
                  <TreePine className="h-3.5 w-3.5 mr-1" /> Ambiental
                </span>
                <span className="text-xs">{Math.round(environmentalProgress)}%</span>
              </div>
              <Progress value={environmentalProgress} className="h-2 bg-green-100" />
              <div className="text-xs mt-1">
                {action.environmentalImpact.currentAreaRestored} de {action.environmentalImpact.areaTarget} ha
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Início:
            </span>
            <span className="font-medium">{formatDate(action.startDate)}</span>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Parcerias:</div>
            <div className="flex flex-wrap gap-1">
              {action.partnerships.map((partnership, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {partnership.type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActionDetail: React.FC<{ 
  action: SocialEnvironmentalAction; 
  onBack: () => void;
}> = ({ action, onBack }) => {
  // Calculate overall social progress
  const socialProgress = (action.socialImpact.currentFamiliesInvolved / action.socialImpact.familiesTarget) * 100;
  
  // Calculate overall environmental progress
  const environmentalProgress = (action.environmentalImpact.currentAreaRestored / action.environmentalImpact.areaTarget) * 100;
  
  // Calculate overall progress (average of social and environmental)
  const overallProgress = (socialProgress + environmentalProgress) / 2;
  
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <Button variant="outline" size="sm" onClick={onBack} className="mb-2">
            Voltar para lista
          </Button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#005A9C]">{action.title}</h2>
            <Badge 
              className={`${statusColors[action.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
            >
              {action.status}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">{action.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Localização</span>
              <div className="font-medium">{action.state}{action.municipality ? `, ${action.municipality}` : ''}</div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Início</span>
              <div className="font-medium">{formatDate(action.startDate)}</div>
            </div>
            {action.endDate && (
              <div className="bg-gray-50 p-2 px-3 rounded-md">
                <span className="text-xs text-gray-500">Fim</span>
                <div className="font-medium">{formatDate(action.endDate)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-green-800 font-medium mb-2">Gadget: Árvore de Progresso</div>
            <div className="relative w-32 h-40">
              {/* Tree trunk */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-16 bg-amber-700 rounded"></div>
              
              {/* Tree leaves based on progress */}
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
                <div className={`w-24 h-24 ${overallProgress >= 25 ? 'bg-green-300' : 'bg-gray-200'} rounded-full`}></div>
                <div className={`absolute bottom-4 left-6 w-12 h-12 ${overallProgress >= 50 ? 'bg-green-400' : 'bg-gray-200'} rounded-full`}></div>
                <div className={`absolute top-0 left-6 w-12 h-12 ${overallProgress >= 75 ? 'bg-green-500' : 'bg-gray-200'} rounded-full`}></div>
                <div className={`absolute bottom-4 right-6 w-12 h-12 ${overallProgress >= 100 ? 'bg-green-600' : 'bg-gray-200'} rounded-full`}></div>
              </div>
            </div>
            <div className="mt-2 text-sm text-green-800">
              {Math.round(overallProgress)}% progresso
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Impacto Social
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Famílias envolvidas:</span>
                  <span className="text-sm">
                    {action.socialImpact.currentFamiliesInvolved} / {action.socialImpact.familiesTarget}
                  </span>
                </div>
                <Progress value={socialProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 p-2 rounded-md text-center">
                  <div className="text-2xl font-bold text-blue-700">{action.socialImpact.womenPercentage}%</div>
                  <div className="text-xs text-blue-600">Mulheres</div>
                </div>
                
                {action.socialImpact.youthPercentage && (
                  <div className="bg-blue-50 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-blue-700">{action.socialImpact.youthPercentage}%</div>
                    <div className="text-xs text-blue-600">Jovens</div>
                  </div>
                )}
                
                {action.socialImpact.indigenousPercentage && (
                  <div className="bg-blue-50 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-blue-700">{action.socialImpact.indigenousPercentage}%</div>
                    <div className="text-xs text-blue-600">Indígenas</div>
                  </div>
                )}
                
                {action.socialImpact.averageIncomeIncrease && (
                  <div className="bg-blue-50 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-blue-700">+{action.socialImpact.averageIncomeIncrease}%</div>
                    <div className="text-xs text-blue-600">Renda</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <TreeDeciduous className="h-5 w-5 mr-2 text-green-600" />
                Impacto Ambiental
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Área restaurada:</span>
                  <span className="text-sm">
                    {action.environmentalImpact.currentAreaRestored} / {action.environmentalImpact.areaTarget} ha
                  </span>
                </div>
                <Progress value={environmentalProgress} className="h-2" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Espécies nativas utilizadas:</h4>
                <div className="flex flex-wrap gap-1">
                  {action.environmentalImpact.nativeSpeciesUsed.map((species, i) => (
                    <Badge key={i} className="bg-green-100 text-green-800">
                      {species}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {action.environmentalImpact.biodiversityConservation && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-1">Conservação da biodiversidade:</h4>
                  <p className="text-sm text-green-700">{action.environmentalImpact.biodiversityConservation}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-purple-600" />
                Parcerias
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {action.partnerships.map((partnership, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{partnership.name}</h4>
                    <Badge>{partnership.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{partnership.contribution}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 border rounded-lg overflow-hidden">
        <div className="bg-[#F3F2F1] p-4 border-b">
          <h3 className="font-medium text-[#005A9C]">Mapa de Áreas Recuperadas</h3>
        </div>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="h-10 w-10 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Aqui será exibido um mapa com as áreas recuperadas e camadas do Living Atlas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialEnvironmentalActions;
