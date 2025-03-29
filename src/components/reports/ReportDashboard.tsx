
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, BarChart3, Download, FileText, Map } from 'lucide-react';
import { consolidatedReports } from '@/data/mockReportsData';
import { DashboardMetricsChart } from './charts/DashboardMetricsChart';
import { DashboardProjectsChart } from './charts/DashboardProjectsChart';

const ReportDashboard = () => {
  const [selectedReport, setSelectedReport] = useState(consolidatedReports[0].id);
  const [timePeriod, setTimePeriod] = useState('year');
  
  const report = consolidatedReports.find(r => r.id === selectedReport) || consolidatedReports[0];

  const getModuleMetric = (moduleName: string, index: number) => {
    const moduleData = report.modules.find(m => m.name === moduleName);
    return moduleData?.data[index] || { id: '', name: '', value: 0, trend: 0, unit: '' };
  };

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 1,
      notation: value >= 1000000 ? 'compact' : 'standard'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#005A9C]">Painel de Controle</h2>
          <p className="text-sm text-gray-500">Visão consolidada dos principais indicadores de bioeconomia</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar relatório" />
            </SelectTrigger>
            <SelectContent>
              {consolidatedReports.map(report => (
                <SelectItem key={report.id} value={report.id}>{report.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Projetos Ativos</CardDescription>
            <CardTitle className="text-2xl">
              {getModuleMetric('Painéis Setoriais', 0).value.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-1">projetos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{getModuleMetric('Painéis Setoriais', 0).trend}% desde o período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Recursos Mobilizados</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(getModuleMetric('HUB Bioeconômico', 1).value)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{getModuleMetric('HUB Bioeconômico', 1).trend}% desde o período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Área Restaurada</CardDescription>
            <CardTitle className="text-2xl">
              {getModuleMetric('Estratégias Bioeconômicas', 0).value.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 ml-1">hectares</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{getModuleMetric('Estratégias Bioeconômicas', 0).trend}% desde o período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Volume de Transações</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(getModuleMetric('Cadeia de Valor', 0).value)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>{getModuleMetric('Cadeia de Valor', 0).trend}% desde o período anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Distribuição de Projetos por Bioma</CardTitle>
                <CardDescription>Projetos ativos em cada bioma brasileiro</CardDescription>
              </div>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <DashboardProjectsChart />
          </CardContent>
          <CardFooter className="pt-0 text-xs text-gray-500">
            Fonte: BioECO + IBGE (2023)
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Métricas por Módulo</CardTitle>
                <CardDescription>Comparativo dos principais indicadores</CardDescription>
              </div>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <DashboardMetricsChart />
          </CardContent>
          <CardFooter className="pt-0 text-xs text-gray-500">
            Fonte: BioECO (consolidado de todos os módulos)
          </CardFooter>
        </Card>
      </div>

      {/* Public Sources and Documents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Fontes de Dados Públicas</CardTitle>
            <CardDescription>Bases de dados integradas neste relatório</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {report.publicSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>{source}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentos Recentes</CardTitle>
            <CardDescription>Relatórios e análises do período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Resumo Executivo 2023</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Exportado em 15/01/2024</p>
              </div>
              
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Mapa de Projetos (PDF)</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Exportado em 10/01/2024</p>
              </div>
              
              <div className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Análise Comparativa Regional</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Exportado em 05/01/2024</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver todos os documentos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ReportDashboard;
