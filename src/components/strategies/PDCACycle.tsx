
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronRightIcon, ClipboardEdit, FilePlus, Filter, Search } from "lucide-react";
import { mockBioeconomicActions } from '@/data/mockStrategiesData';
import { BioeconomicAction } from '@/types/strategiesTypes';
import { ScrollArea } from "@/components/ui/scroll-area";

const PDCAStages = ["Planejar", "Fazer", "Checar", "Agir"] as const;

const PDCACycle = () => {
  const [actions, setActions] = useState<BioeconomicAction[]>(mockBioeconomicActions);
  const [filterStage, setFilterStage] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActions = actions.filter(action => {
    const matchesStage = filterStage === "all" || action.currentStage === filterStage;
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          action.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ações..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filtrar</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Etapas</SelectItem>
              {PDCAStages.map((stage) => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="flex items-center gap-1">
          <FilePlus className="h-4 w-4 mr-1" />
          Nova Ação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActions.length > 0 ? (
          filteredActions.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))
        ) : (
          <div className="col-span-full flex justify-center p-8">
            <p className="text-muted-foreground">Nenhuma ação encontrada com os filtros atuais.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionCard = ({ action }: { action: BioeconomicAction }) => {
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Não iniciada": return "bg-gray-200 text-gray-800";
      case "Em andamento": return "bg-blue-100 text-blue-800";
      case "Concluída": return "bg-green-100 text-green-800";
      case "Atrasada": return "bg-red-100 text-red-800";
      case "Requer ajustes": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-gray-50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {action.title}
          </CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(action.status)}`}>
            {action.status}
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {action.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso:</span>
              <span className="font-medium">{action.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(action.progress)}`} 
                style={{ width: `${action.progress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Etapa atual:</p>
              <p className="text-sm font-medium">{action.currentStage}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Região:</p>
              <p className="text-sm font-medium">{action.region}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Início:</p>
              <p className="text-sm font-medium">{new Date(action.startDate).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Término:</p>
              <p className="text-sm font-medium">{new Date(action.endDate).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Responsável:</p>
            <p className="text-sm">{action.responsibleEntity}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t bg-gray-50 flex justify-between">
        <p className="text-xs text-muted-foreground">
          <CalendarIcon className="inline h-3 w-3 mr-1" />
          Atualizado em {new Date(action.updatedAt).toLocaleDateString('pt-BR')}
        </p>
        <Button variant="ghost" size="sm" className="text-xs gap-1">
          Detalhes <ChevronRightIcon className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PDCACycle;
