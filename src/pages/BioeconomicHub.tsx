
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import SectionTitle from '@/components/ui/SectionTitle';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ProjectsRegistry } from '@/components/hub/ProjectsRegistry';
import { IncentivePolicies } from '@/components/hub/IncentivePolicies';
import { FinancialResources } from '@/components/hub/FinancialResources';
import { StateStrategies } from '@/components/hub/StateStrategies';

const BioeconomicHubPage = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <SectionTitle 
          title="HUB Bioeconômico" 
          subtitle="Plataforma centralizada para projetos, políticas, recursos e estratégias em bioeconomia" 
          className="mb-8"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="projects">Recepção de Projetos</TabsTrigger>
            <TabsTrigger value="policies">Políticas de Incentivo</TabsTrigger>
            <TabsTrigger value="resources">Recursos Financeiros</TabsTrigger>
            <TabsTrigger value="strategies">Estratégias Estaduais</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsRegistry />
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <IncentivePolicies />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <FinancialResources />
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <StateStrategies />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioeconomicHubPage;
