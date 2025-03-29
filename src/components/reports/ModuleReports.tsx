
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { moduleReports } from '@/data/mockReportsData';
import { ArrowUpRight, Download, FileText, Map, BarChart3, Filter } from 'lucide-react';
import { ModuleMetricsChart } from './charts/ModuleMetricsChart';
import { ModuleRegionalMap } from './charts/ModuleRegionalMap';

const ModuleReports = () => {
  const [selectedModule, setSelectedModule] = useState<'observatory' | 'hub' | 'strategies' | 'valuechain' | 'vocation'>('observatory');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('year');
  
  // Get the current report based on selected module
  const currentReport = moduleReports.find(report => report.moduleName === selectedModule);
  
  // Module display names
  const moduleNames = {
    observatory: 'Painéis Setoriais',
    hub: 'HUB Bioeconômico',
    strategies: 'Estratégias Bioeconômicas',
    valuechain: 'Cadeia de Valor',
    vocation: 'BioVocação'
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#005A9C]">Relatórios por Módulo</h2>
          <p className="text-sm text-gray-500">Relatórios específicos para cada módulo do BioECO</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedModule} onValueChange={(value: any) => setSelectedModule(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar módulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="observatory">Painéis Setoriais</SelectItem>
              <SelectItem value="hub">HUB Bioeconômico</SelectItem>
              <SelectItem value="strategies">Estratégias Bioeconômicas</SelectItem>
              <SelectItem value="valuechain">Cadeia de Valor</SelectItem>
              <SelectItem value="vocation">BioVocação</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Regiões</SelectItem>
              <SelectItem value="norte">Norte</SelectItem>
              <SelectItem value="nordeste">Nordeste</SelectItem>
              <SelectItem value="centro-oeste">Centro-Oeste</SelectItem>
              <SelectItem value="sudeste">Sudeste</SelectItem>
              <SelectItem value="sul">Sul</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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

      {currentReport && (
        <div className="space-y-6">
          {/* Report Header Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{currentReport.title}</CardTitle>
                  <CardDescription className="mt-1">{currentReport.description}</CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {moduleNames[selectedModule]}
                </div>
              </div>
              <div className="pt-3 flex items-center text-sm text-gray-500">
                <span>Período: {new Date(currentReport.period.start).toLocaleDateString('pt-BR')} - {new Date(currentReport.period.end).toLocaleDateString('pt-BR')}</span>
                <span className="mx-2">•</span>
                <span>Criado em: {new Date(currentReport.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </CardHeader>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentReport.keyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{metric.name}</CardDescription>
                  <CardTitle className="text-2xl">
                    {metric.value.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>{metric.trend}% desde o período anterior</span>
                  </div>
                  {metric.interpretation && (
                    <p className="text-xs text-gray-500 mt-1">{metric.interpretation}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts & Maps */}
          <Tabs defaultValue="charts">
            <TabsList>
              <TabsTrigger value="charts" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Gráficos</span>
              </TabsTrigger>
              <TabsTrigger value="maps" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span>Mapas</span>
              </TabsTrigger>
              <TabsTrigger value="tables" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Tabelas</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Insights</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts" className="mt-4 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentReport.charts.map((chart, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{chart.title}</CardTitle>
                          <CardDescription>{chart.description}</CardDescription>
                        </div>
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ModuleMetricsChart chartData={chart} />
                    </CardContent>
                    {chart.source && (
                      <div className="px-6 pb-4 text-xs text-gray-500">
                        Fonte: {chart.source}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="maps" className="mt-4 space-y-6">
              {currentReport.maps ? (
                <div className="grid grid-cols-1 gap-6">
                  {currentReport.maps.map((map, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{map.title}</CardTitle>
                        <CardDescription>{map.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[400px]">
                        <ModuleRegionalMap mapData={map} />
                      </CardContent>
                      {map.source && (
                        <div className="px-6 pb-4 text-xs text-gray-500">
                          Fonte: {map.source}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Map className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">Nenhum mapa disponível para este módulo</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="tables" className="mt-4 space-y-6">
              {currentReport.tables ? (
                <div className="grid grid-cols-1 gap-6">
                  {currentReport.tables.map((table, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{table.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr>
                                {table.headers.map((header, idx) => (
                                  <th key={idx} className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rowIdx) => (
                                <tr key={rowIdx} className="border-t">
                                  {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className="py-2 px-4 text-sm">
                                      {typeof cell === 'number' 
                                        ? cell.toLocaleString('pt-BR') 
                                        : cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <FileText className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500">Nenhuma tabela disponível para este módulo</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="insights" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Principais Insights</CardTitle>
                  <CardDescription>Análises e conclusões baseadas nos dados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {currentReport.insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                          <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
                        </div>
                        <p>{insight}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fontes de Dados Públicas</CardTitle>
                  <CardDescription>Bases de dados integradas neste relatório</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {currentReport.publicSources.map((source, index) => (
                      <li key={index}>
                        <div className="flex items-center mb-1">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="font-medium">{source.name}</span>
                        </div>
                        <div className="ml-6">
                          <span className="text-sm text-gray-500">Dados utilizados: </span>
                          <span className="text-sm">{source.dataPoints.join(', ')}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ModuleReports;
