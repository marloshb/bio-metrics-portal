
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionTitle from '@/components/ui/SectionTitle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ReportDashboard from '@/components/reports/ReportDashboard';
import ModuleReports from '@/components/reports/ModuleReports';
import DataVisualization from '@/components/reports/DataVisualization';
import ExportOptions from '@/components/reports/ExportOptions';
import TrendsAnalysis from '@/components/reports/TrendsAnalysis';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen w-full bg-[#F3F2F1]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10 px-6 py-4">
          <h1 className="text-2xl font-semibold text-[#005A9C]">Relatórios</h1>
          <p className="text-sm text-gray-500">
            Consolidação e análise de dados de todos os módulos do BioECO
          </p>
        </header>

        {/* Main content */}
        <ScrollArea className="flex-1">
          <main className="p-6">
            <SectionTitle 
              title="Sistema de Relatórios BioECO" 
              subtitle="Visualize, analise e exporte dados integrados da bioeconomia brasileira" 
              className="mb-6"
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
                <TabsTrigger value="dashboard">Painel Geral</TabsTrigger>
                <TabsTrigger value="modules">Relatórios por Módulo</TabsTrigger>
                <TabsTrigger value="visualization">Visualização</TabsTrigger>
                <TabsTrigger value="export">Exportação</TabsTrigger>
                <TabsTrigger value="trends">Tendências</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <ReportDashboard />
              </TabsContent>

              <TabsContent value="modules" className="space-y-6">
                <ModuleReports />
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <DataVisualization />
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <ExportOptions />
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <TrendsAnalysis />
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Reports;
