
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockBiodiversityActivities } from '@/data/mockStrategiesData';
import { BiodiversityActivity } from '@/types/strategiesTypes';
import { 
  Search, 
  MapPin, 
  Filter, 
  Leaf, 
  Factory,
  Target, 
  TrendingUp,
  Users,
  Sprout
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

const sectorColors = {
  'Agricultura': 'bg-green-100 text-green-800',
  'Florestas': 'bg-emerald-100 text-emerald-800',
  'Pecuária': 'bg-amber-100 text-amber-800',
  'Pesca': 'bg-blue-100 text-blue-800',
  'Alimentos': 'bg-yellow-100 text-yellow-800',
  'Farmacêutico': 'bg-purple-100 text-purple-800',
  'Cosmético': 'bg-pink-100 text-pink-800',
  'Químico': 'bg-indigo-100 text-indigo-800',
  'Bioenergia': 'bg-orange-100 text-orange-800',
  'Outro': 'bg-gray-100 text-gray-800'
};

const sectorIcons = {
  'Agricultura': <Sprout className="h-5 w-5" />,
  'Florestas': <Leaf className="h-5 w-5" />,
  'Bioenergia': <Factory className="h-5 w-5" />
};

const BiodiversityActivities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<BiodiversityActivity | null>(null);

  const filteredActivities = mockBiodiversityActivities.filter(activity => {
    const matchesSearch = 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion ? activity.region === selectedRegion : true;
    const matchesSector = selectedSector ? activity.sector === selectedSector : true;
    
    return matchesSearch && matchesRegion && matchesSector;
  });

  const regions = Array.from(new Set(mockBiodiversityActivities.map(a => a.region)));
  const sectors = Array.from(new Set(mockBiodiversityActivities.map(a => a.sector)));

  const handleActivityClick = (activity: BiodiversityActivity) => {
    setSelectedActivity(activity);
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-[#F3F2F1] border-b">
        <CardTitle className="text-[#005A9C] text-xl">Atividades Econômicas Baseadas em Biodiversidade</CardTitle>
        <CardDescription>
          Incentive e monitore iniciativas que utilizem a biodiversidade de forma sustentável.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!selectedActivity ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nome, descrição ou estado..."
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
                    <SelectItem value="all">Todas as regiões</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por setor" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os setores</SelectItem>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredActivities.map(activity => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onClick={() => handleActivityClick(activity)} 
                />
              ))}
              {filteredActivities.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Nenhuma atividade encontrada com os filtros selecionados.
                </div>
              )}
            </div>
          </>
        ) : (
          <ActivityDetail 
            activity={selectedActivity}
            onBack={handleBackToList} 
          />
        )}
      </CardContent>
      {!selectedActivity && (
        <CardFooter className="bg-[#F3F2F1] border-t flex justify-between">
          <div className="text-sm text-gray-500">
            {filteredActivities.length} atividades encontradas
          </div>
          <Button>
            Nova Atividade
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const ActivityCard: React.FC<{ 
  activity: BiodiversityActivity; 
  onClick: () => void 
}> = ({ activity, onClick }) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            className={`${sectorColors[activity.sector as keyof typeof sectorColors] || 'bg-gray-100 text-gray-800'}`}
          >
            {activity.sector}
          </Badge>
          <div className="text-sm font-medium">
            {activity.state}, {activity.region}
          </div>
        </div>
        <CardTitle className="text-lg mt-2">{activity.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {activity.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mt-2 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Implementação:</span>
              <span className="text-sm">{activity.implementationProgress}%</span>
            </div>
            <Progress value={activity.implementationProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="border rounded p-2">
              <div className="text-xs text-gray-500">Vendas</div>
              <div className="font-medium mt-0.5">
                {formatCurrency(activity.economicImpact.currentSales)} 
                <span className="text-xs text-gray-500"> / {formatCurrency(activity.economicImpact.salesTarget)}</span>
              </div>
            </div>
            <div className="border rounded p-2">
              <div className="text-xs text-gray-500">Empregos</div>
              <div className="font-medium mt-0.5">
                {activity.economicImpact.currentJobs} 
                <span className="text-xs text-gray-500"> / {activity.economicImpact.jobsTarget}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Recursos locais:</div>
            <div className="flex flex-wrap gap-1">
              {activity.localResources.slice(0, 2).map((resource, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {resource}
                </Badge>
              ))}
              {activity.localResources.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{activity.localResources.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityDetail: React.FC<{ 
  activity: BiodiversityActivity; 
  onBack: () => void;
}> = ({ activity, onBack }) => {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <Button variant="outline" size="sm" onClick={onBack} className="mb-2">
            Voltar para lista
          </Button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#005A9C]">{activity.name}</h2>
            <Badge 
              className={`${sectorColors[activity.sector as keyof typeof sectorColors] || 'bg-gray-100 text-gray-800'}`}
            >
              {activity.sector}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">{activity.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Localização</span>
              <div className="font-medium">{activity.state}, {activity.municipality || activity.region}</div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Início</span>
              <div className="font-medium">{formatDate(activity.startDate)}</div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              <div className="font-medium">{activity.coordinates.lat.toFixed(4)}, {activity.coordinates.lng.toFixed(4)}</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="text-amber-800 font-medium mb-2">Gadget: Termômetro</div>
            <div className="flex items-center justify-center">
              <div className="relative w-8 h-32 bg-gradient-to-t from-red-100 via-yellow-100 to-green-100 rounded-full overflow-hidden border border-gray-300">
                <div 
                  className="absolute bottom-0 w-full bg-red-500"
                  style={{ height: `${activity.implementationProgress}%` }}
                ></div>
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between py-2">
                  <div className="w-full h-px bg-gray-300"></div>
                  <div className="w-full h-px bg-gray-300"></div>
                  <div className="w-full h-px bg-gray-300"></div>
                </div>
              </div>
              <div className="ml-2 flex flex-col justify-between h-32 text-xs">
                <div>100%</div>
                <div>50%</div>
                <div>0%</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-amber-800">
              {activity.implementationProgress}% da meta
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                Recursos Locais Utilizados
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activity.localResources.map((resource, i) => (
                <div key={i} className="flex items-center gap-2 p-2 border rounded-lg">
                  <Sprout className="h-4 w-4 text-green-500" />
                  <span>{resource}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Mercados-Alvo
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activity.targetMarkets.map((market, i) => (
                <div key={i} className="flex items-center gap-2 p-2 border rounded-lg">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>{market}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-amber-600" />
                Impacto Econômico
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vendas:</span>
                  <span className="text-sm">
                    {formatCurrency(activity.economicImpact.currentSales)} / {formatCurrency(activity.economicImpact.salesTarget)}
                  </span>
                </div>
                <Progress 
                  value={(activity.economicImpact.currentSales / activity.economicImpact.salesTarget) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Empregos gerados:</span>
                  <span className="text-sm">
                    {activity.economicImpact.currentJobs} / {activity.economicImpact.jobsTarget}
                  </span>
                </div>
                <Progress 
                  value={(activity.economicImpact.currentJobs / activity.economicImpact.jobsTarget) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="pt-2 border-t">
                <div className="text-center bg-amber-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-amber-700">
                    {Math.round((activity.economicImpact.currentSales / activity.economicImpact.salesTarget) * 100)}%
                  </div>
                  <div className="text-xs text-amber-600">da meta econômica atingida</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600" />
                Impacto Ambiental
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.environmentalImpact.co2ReductionTarget && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Redução de CO₂:</span>
                    <span className="text-sm">
                      {activity.environmentalImpact.currentCo2Reduction} / {activity.environmentalImpact.co2ReductionTarget} ton
                    </span>
                  </div>
                  <Progress 
                    value={(activity.environmentalImpact.currentCo2Reduction || 0) / activity.environmentalImpact.co2ReductionTarget * 100} 
                    className="h-2" 
                  />
                </div>
              )}
              
              {activity.environmentalImpact.areaRestoredTarget && activity.environmentalImpact.areaRestoredTarget > 0 && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Área restaurada:</span>
                    <span className="text-sm">
                      {activity.environmentalImpact.currentAreaRestored} / {activity.environmentalImpact.areaRestoredTarget} ha
                    </span>
                  </div>
                  <Progress 
                    value={(activity.environmentalImpact.currentAreaRestored || 0) / activity.environmentalImpact.areaRestoredTarget * 100} 
                    className="h-2" 
                  />
                </div>
              )}
              
              <div className="pt-2 border-t">
                <div className="text-center bg-green-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-green-700">
                    {activity.environmentalImpact.co2ReductionTarget 
                      ? Math.round((activity.environmentalImpact.currentCo2Reduction || 0) / activity.environmentalImpact.co2ReductionTarget * 100)
                      : Math.round((activity.environmentalImpact.currentAreaRestored || 0) / (activity.environmentalImpact.areaRestoredTarget || 1) * 100)
                    }%
                  </div>
                  <div className="text-xs text-green-600">da meta ambiental atingida</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 border rounded-lg overflow-hidden">
        <div className="bg-[#F3F2F1] p-4 border-b">
          <h3 className="font-medium text-[#005A9C]">Mapa de Implementação</h3>
        </div>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="h-10 w-10 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Aqui será exibido um mapa com a localização do projeto e camadas ESRI de biodiversidade.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiodiversityActivities;
