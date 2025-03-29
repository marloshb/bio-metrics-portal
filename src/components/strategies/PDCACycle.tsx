
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockBioeconomicActions } from '@/data/mockStrategiesData';
import { BioeconomicAction, PDCAStage } from '@/types/strategiesTypes';
import { 
  Search, 
  ClipboardCheck, 
  MapPin, 
  Calendar, 
  PenLine, 
  Play, 
  CheckCircle2, 
  RotateCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LineChart
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
  'Não iniciada': 'bg-gray-100 text-gray-800',
  'Em andamento': 'bg-blue-100 text-blue-800',
  'Concluída': 'bg-green-100 text-green-800',
  'Atrasada': 'bg-red-100 text-red-800',
  'Requer ajustes': 'bg-yellow-100 text-yellow-800'
};

const stageIcons = {
  'Planejar': <PenLine className="h-5 w-5" />,
  'Fazer': <Play className="h-5 w-5" />,
  'Checar': <CheckCircle2 className="h-5 w-5" />,
  'Agir': <RotateCw className="h-5 w-5" />
};

const PDCACycle: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<BioeconomicAction | null>(null);
  const [activeTab, setActiveTab] = useState<PDCAStage>('Planejar');

  const filteredActions = mockBioeconomicActions.filter(action => {
    const matchesSearch = 
      action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion ? action.region === selectedRegion : true;
    const matchesStage = selectedStage ? action.currentStage === selectedStage : true;
    
    return matchesSearch && matchesRegion && matchesStage;
  });

  const regions = Array.from(new Set(mockBioeconomicActions.map(a => a.region)));
  const stages: PDCAStage[] = ['Planejar', 'Fazer', 'Checar', 'Agir'];

  const handleActionClick = (action: BioeconomicAction) => {
    setSelectedAction(action);
    setActiveTab(action.currentStage);
  };

  const handleBackToList = () => {
    setSelectedAction(null);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-[#F3F2F1] border-b">
        <CardTitle className="text-[#005A9C] text-xl">Ciclo PDCA para Ações Sustentáveis</CardTitle>
        <CardDescription>
          Planeje, execute, monitore e ajuste ações bioeconômicas com base no ciclo PDCA.
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
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por etapa" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as etapas</SelectItem>
                    {stages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
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
                  Nenhuma ação encontrada com os filtros selecionados.
                </div>
              )}
            </div>
          </>
        ) : (
          <ActionDetail 
            action={selectedAction} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
  action: BioeconomicAction; 
  onClick: () => void 
}> = ({ action, onClick }) => {
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
          <div className="flex items-center text-sm font-medium">
            {stageIcons[action.currentStage]}
            <span className="ml-1">{action.currentStage}</span>
          </div>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-1">{action.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {action.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mt-2 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" /> Localização:
            </span>
            <span className="font-medium">{action.state}{action.municipality ? `, ${action.municipality}` : ''}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Período:
            </span>
            <span className="font-medium">{formatDate(action.startDate)} - {formatDate(action.endDate)}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium">Progresso geral:</span>
            <span className="text-sm font-medium">{action.progress}%</span>
          </div>
          <Progress value={action.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

const ActionDetail: React.FC<{ 
  action: BioeconomicAction; 
  activeTab: PDCAStage;
  setActiveTab: (tab: PDCAStage) => void;
  onBack: () => void;
}> = ({ action, activeTab, setActiveTab, onBack }) => {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <Button variant="outline" size="sm" onClick={onBack} className="mb-2">
            Voltar para lista
          </Button>
          <h2 className="text-2xl font-bold text-[#005A9C]">{action.title}</h2>
          <p className="text-gray-500 mt-1">{action.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Status</span>
              <div className="font-medium">
                <Badge 
                  className={`${statusColors[action.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'} mt-1`}
                >
                  {action.status}
                </Badge>
              </div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Localização</span>
              <div className="font-medium">{action.state}{action.municipality ? `, ${action.municipality}` : ''}</div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Período</span>
              <div className="font-medium">{formatDate(action.startDate)} - {formatDate(action.endDate)}</div>
            </div>
            <div className="bg-gray-50 p-2 px-3 rounded-md">
              <span className="text-xs text-gray-500">Orçamento</span>
              <div className="font-medium">{formatCurrency(action.budget)}</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Progress value={action.progress} className="h-full w-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{action.progress}%</span>
            </div>
          </div>
          <div className="mt-2 text-sm font-medium text-gray-700">Progresso geral</div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PDCAStage)} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="Planejar" className="flex items-center data-[state=active]:bg-blue-50">
            <PenLine className="h-4 w-4 mr-2" />
            <span>Planejar</span>
          </TabsTrigger>
          <TabsTrigger value="Fazer" className="flex items-center data-[state=active]:bg-green-50">
            <Play className="h-4 w-4 mr-2" />
            <span>Fazer</span>
          </TabsTrigger>
          <TabsTrigger value="Checar" className="flex items-center data-[state=active]:bg-amber-50">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            <span>Checar</span>
          </TabsTrigger>
          <TabsTrigger value="Agir" className="flex items-center data-[state=active]:bg-purple-50">
            <RotateCw className="h-4 w-4 mr-2" />
            <span>Agir</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Planejar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metas</CardTitle>
              <CardDescription>Defina as metas específicas para esta ação</CardDescription>
            </CardHeader>
            <CardContent>
              {action.targets.map(target => (
                <div key={target.id} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{target.description}</h4>
                      <p className="text-sm text-gray-500">
                        Meta: {target.value} {target.unit} até {formatDate(target.deadline)}
                      </p>
                    </div>
                    <Badge variant="outline">{target.progress}% concluído</Badge>
                  </div>
                  <Progress value={target.progress} className="h-2 mb-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Adicionar meta
              </Button>
            </CardContent>
          </Card>

          <div className="relative border rounded-lg p-6 bg-blue-50">
            <div className="mb-4 flex items-center">
              <div className="bg-blue-100 text-blue-700 rounded-full p-2 mr-3">
                <PenLine className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-blue-700">Gadget: Barra de Progresso</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Definição de metas</span>
                <span className="text-sm text-gray-500">{action.targets.length} metas definidas</span>
              </div>
              <Progress value={100} className="h-4 bg-blue-100" />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>0%</span>
                <span>Meta definida</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Fazer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividades</CardTitle>
              <CardDescription>Cronograma e registro de atividades realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              {action.activities.map(activity => (
                <div key={activity.id} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{activity.description}</h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                      </p>
                    </div>
                    <Badge 
                      className={
                        activity.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                        activity.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'Atrasada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <Progress value={activity.progress} className="h-2 mb-2" />
                  
                  {activity.evidences && activity.evidences.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">Evidências:</h5>
                      <div className="flex flex-wrap gap-2">
                        {activity.evidences.map(evidence => (
                          <Badge key={evidence.id} variant="outline" className="flex items-center gap-1">
                            {evidence.type === 'Foto' && <span>📷</span>}
                            {evidence.type === 'Documento' && <span>📄</span>}
                            {evidence.type === 'Vídeo' && <span>🎬</span>}
                            {evidence.type === 'Relatório' && <span>📊</span>}
                            {evidence.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {activity.notes && (
                    <p className="text-sm mt-2 text-gray-600">
                      <span className="font-medium">Notas:</span> {activity.notes}
                    </p>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Adicionar atividade
              </Button>
            </CardContent>
          </Card>

          <div className="relative border rounded-lg p-6 bg-green-50">
            <div className="mb-4 flex items-center">
              <div className="bg-green-100 text-green-700 rounded-full p-2 mr-3">
                <LineChart className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-green-700">Gadget: Gráfico de Linha</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Progresso de atividades</span>
                <span className="text-sm text-gray-500">{action.progress}% concluído</span>
              </div>
              
              <div className="h-36 w-full">
                {/* Simplified chart visualization */}
                <div className="w-full h-full bg-white border rounded relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="h-[40%] w-[20%] bg-green-100 border-t border-green-300"></div>
                    <div className="h-[60%] w-[20%] bg-green-200 border-t border-green-300"></div>
                    <div className="h-[60%] w-[20%] bg-green-200 border-t border-green-300"></div>
                    <div className="h-[40%] w-[20%] bg-green-100 border-t border-green-300"></div>
                    <div className="h-[0%] w-[20%] bg-gray-100 border-t border-gray-300"></div>
                  </div>
                  <div className="absolute top-1/4 w-full border-t border-dashed border-gray-300"></div>
                  <div className="absolute top-2/4 w-full border-t border-dashed border-gray-300"></div>
                  <div className="absolute top-3/4 w-full border-t border-dashed border-gray-300"></div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Checar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Indicadores</CardTitle>
              <CardDescription>Monitore o progresso dos indicadores-chave</CardDescription>
            </CardHeader>
            <CardContent>
              {action.indicators.map(indicator => (
                <div key={indicator.id} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{indicator.name}</h4>
                      <p className="text-sm text-gray-500">
                        Meta: {indicator.target} {indicator.unit} | 
                        Atual: {indicator.current} {indicator.unit}
                      </p>
                    </div>
                    <Badge 
                      className={
                        indicator.category === 'Ambiental' ? 'bg-green-100 text-green-800' :
                        indicator.category === 'Social' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }
                    >
                      {indicator.category}
                    </Badge>
                  </div>
                  <Progress value={indicator.progress} className="h-2 mb-1" />
                  <div className="text-xs text-right text-gray-500">
                    Atualizado em {formatDate(indicator.lastUpdated)}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Adicionar indicador
              </Button>
            </CardContent>
          </Card>

          <div className="relative border rounded-lg p-6 bg-amber-50">
            <div className="mb-4 flex items-center">
              <div className="bg-amber-100 text-amber-700 rounded-full p-2 mr-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-amber-700">Gadget: Indicador Circular</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Progresso do planejado</span>
                <span className="text-sm text-gray-500">50% alcançado</span>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-amber-400"
                    style={{ 
                      clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)', 
                      transform: 'rotate(45deg)' 
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600">50%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4 text-sm text-gray-600">
                Metade das metas alcançadas
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="Agir" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sugestões de Ajustes</CardTitle>
              <CardDescription>Recomendações para melhorar a implementação</CardDescription>
            </CardHeader>
            <CardContent>
              {action.suggestions.length > 0 ? (
                <div className="space-y-4">
                  {action.suggestions.map(suggestion => (
                    <div key={suggestion.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${
                          suggestion.category === 'Ajuste' ? 'text-yellow-500' :
                          suggestion.category === 'Melhoria' ? 'text-blue-500' :
                          'text-red-500'
                        }`}>
                          {suggestion.category === 'Ajuste' ? <AlertTriangle className="h-5 w-5" /> :
                           suggestion.category === 'Melhoria' ? <CheckCircle className="h-5 w-5" /> :
                           <XCircle className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Badge variant="outline">{suggestion.category}</Badge>
                            <span className="text-xs text-gray-500">
                              {formatDate(suggestion.createdAt)}
                            </span>
                          </div>
                          <p className="mt-2">{suggestion.content}</p>
                          <div className="mt-3 flex justify-end gap-2">
                            {suggestion.applied ? (
                              <Badge className="bg-green-100 text-green-800">
                                Aplicado em {suggestion.appliedAt ? formatDate(suggestion.appliedAt) : ''}
                              </Badge>
                            ) : (
                              <Button size="sm">Aplicar sugestão</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Não há sugestões de ajustes para esta ação no momento.
                </div>
              )}
              <Button variant="outline" className="w-full mt-4">
                Adicionar sugestão
              </Button>
            </CardContent>
          </Card>

          <div className="relative border rounded-lg p-6 bg-purple-50">
            <div className="mb-4 flex items-center">
              <div className="bg-purple-100 text-purple-700 rounded-full p-2 mr-3">
                <RotateCw className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-purple-700">Gadget: Semáforo</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Status da implementação</span>
                <span className="text-sm text-gray-500">Requer ajustes</span>
              </div>
              
              <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 border-4 border-white shadow-md"></div>
                  <span className="mt-2 text-sm text-gray-600">Atraso</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-white shadow-md"></div>
                  <span className="mt-2 text-sm font-medium">Ajustes</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 border-4 border-white shadow-md"></div>
                  <span className="mt-2 text-sm text-gray-600">Concluído</span>
                </div>
              </div>
              
              <div className="text-center mt-4 text-sm text-gray-600">
                A ação necessita de ajustes para atingir as metas planejadas
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PDCACycle;
