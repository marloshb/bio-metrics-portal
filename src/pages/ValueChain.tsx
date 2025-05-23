
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import SectionTitle from '@/components/ui/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ActorRegistry } from '@/components/valuechain/ActorRegistry';
import { GeoMarketingMap } from '@/components/valuechain/GeoMarketingMap';
import { BioMarketplace } from '@/components/valuechain/BioMarketplace';
import { useToast } from '@/components/ui/use-toast';

const ValueChainPage = () => {
  const [activeTab, setActiveTab] = useState("marketplace"); // Alterando para iniciar no marketplace
  const { toast } = useToast();

  // Mostrar toast de boas-vindas quando carrega a página
  React.useEffect(() => {
    toast({
      title: "Cadeia de Valor",
      description: "Plataforma integrada para conexão de atores e comercialização de produtos da bioeconomia"
    });
  }, [toast]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <SectionTitle 
          title="Cadeia de Valor" 
          subtitle="Plataforma integrada para conexão de atores, geomarketing e comercialização de produtos da bioeconomia" 
          className="mb-8"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="actors">Cadastro de Atores</TabsTrigger>
            <TabsTrigger value="geomarketing">Geomarketing Inteligente</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace Bioeconômico</TabsTrigger>
          </TabsList>

          <TabsContent value="actors" className="space-y-6">
            <ActorRegistry />
          </TabsContent>

          <TabsContent value="geomarketing" className="space-y-6">
            <GeoMarketingMap />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <BioMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ValueChainPage;
