
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import SectionTitle from '@/components/ui/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PDCACycle from '@/components/strategies/PDCACycle';
import BiodiversityActivities from '@/components/strategies/BiodiversityActivities';
import SocialEnvironmentalActions from '@/components/strategies/SocialEnvironmentalActions';
import { ClipboardCheck, Leaf, Users } from 'lucide-react';

const BioeconomicStrategiesPage = () => {
  const [activeTab, setActiveTab] = useState("pdca");

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <SectionTitle 
          title="Estratégias Bioeconômicas" 
          subtitle="Planeje, execute e monitore ações sustentáveis que promovam o uso da biodiversidade, a redução de desigualdades e a regeneração ambiental" 
          className="mb-8"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="pdca" className="flex items-center">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              <span>Ciclo PDCA para Ações Sustentáveis</span>
            </TabsTrigger>
            <TabsTrigger value="biodiversity" className="flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              <span>Atividades Baseadas em Biodiversidade</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Inclusão e Recuperação</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdca" className="space-y-6">
            <PDCACycle />
          </TabsContent>

          <TabsContent value="biodiversity" className="space-y-6">
            <BiodiversityActivities />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <SocialEnvironmentalActions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioeconomicStrategiesPage;
