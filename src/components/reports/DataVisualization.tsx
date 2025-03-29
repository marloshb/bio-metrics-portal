
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { consolidatedReports, moduleReports } from '@/data/mockReportsData';
import { BarChart3, LineChart, PieChart, Map, FileText, Download, Plus } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { ModuleMetricsChart } from './charts/ModuleMetricsChart';
import { ModuleRegionalMap } from './charts/ModuleRegionalMap';

const DataVisualization = () => {
  const [selectedDataSource, setSelectedDataSource] = useState('consolidated');
  const [selectedChartType, setSelectedChartType] = useState<'all' | 'chart' | 'map' | 'table'>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  
  // Combine all charts from consolidated and module reports
  const allCharts = [
    ...consolidatedReports.flatMap(report => 
      report.charts.map(chart => ({
        ...chart,
        source: 'consolidated',
        reportName: report.title,
      }))
    ),
    ...moduleReports.flatMap(report => 
      report.charts.map(chart => ({
        ...chart,
        source: 'module',
        moduleName: report.moduleName,
        reportName: report.title,
      }))
    )
  ];

  // Combine all maps from consolidated and module reports
  const allMaps = [
    ...consolidatedReports.flatMap(report => 
      report.maps?.map(map => ({
        ...map,
        source: 'consolidated',
        reportName: report.title,
      })) || []
    ),
    ...moduleReports.flatMap(report => 
      report.maps?.map(map => ({
        ...map,
        source: 'module',
        moduleName: report.moduleName,
        reportName: report.title,
      })) || []
    )
  ];
  
  // Filter visualizations based on selected options
  const filteredVisualizations = () => {
    let charts = allCharts;
    let maps = allMaps;
    
    // Filter by data source
    if (selectedDataSource !== 'all') {
      charts = charts.filter(chart => chart.source === selectedDataSource);
      maps = maps.filter(map => map.source === selectedDataSource);
    }
    
    // Filter by module
    if (selectedModule !== 'all') {
      charts = charts.filter(chart => 
        (chart as any).moduleName === selectedModule || 
        (selectedModule === 'consolidated' && chart.source === 'consolidated')
      );
      maps = maps.filter(map => 
        (map as any).moduleName === selectedModule || 
        (selectedModule === 'consolidated' && map.source === 'consolidated')
      );
    }
    
    // Filter by chart type
    if (selectedChartType === 'chart') return { charts, maps: [] };
    if (selectedChartType === 'map') return { charts: [], maps };
    
    return { charts, maps };
  };
  
  const { charts, maps } = filteredVisualizations();

  // Get chart type icon
  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-4 w-4" />;
      case 'line':
        return <LineChart className="h-4 w-4" />;
      case 'pie':
        return <PieChart className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#005A9C]">Visualização de Dados</h2>
          <p className="text-sm text-gray-500">Explorando os dados em diferentes formatos visuais</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Fonte de dados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as fontes</SelectItem>
              <SelectItem value="consolidated">Relatório Consolidado</SelectItem>
              <SelectItem value="module">Relatórios por Módulo</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar módulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os módulos</SelectItem>
              <SelectItem value="consolidated">Consolidado</SelectItem>
              <SelectItem value="observatory">Painéis Setoriais</SelectItem>
              <SelectItem value="hub">HUB Bioeconômico</SelectItem>
              <SelectItem value="strategies">Estratégias Bioeconômicas</SelectItem>
              <SelectItem value="valuechain">Cadeia de Valor</SelectItem>
              <SelectItem value="vocation">BioVocação</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedChartType} onValueChange={(value: any) => setSelectedChartType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de visualização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="chart">Gráficos</SelectItem>
              <SelectItem value="map">Mapas</SelectItem>
              <SelectItem value="table">Tabelas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts Section */}
      {charts.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#005A9C]">Gráficos</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Exportar visualizações</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {getChartIcon(chart.type)}
                        <CardTitle className="text-lg">{chart.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-1">{chart.description}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ModuleMetricsChart chartData={chart} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Maps Section */}
      {maps.length > 0 && (
        <div className="space-y-4 mt-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#005A9C]">Mapas</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Exportar mapas</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {maps.map((map, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <CardTitle className="text-lg">{map.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-1">{map.description}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ModuleRegionalMap mapData={map} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {charts.length === 0 && maps.length === 0 && (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center">
            <BarChart3 className="h-16 w-16 text-gray-300 mb-6" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma visualização encontrada</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Não encontramos visualizações que correspondam aos filtros selecionados. Tente ajustar seus filtros ou criar uma nova visualização.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Criar nova visualização</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Visualization Help */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Dicas para Visualização</CardTitle>
          <CardDescription>Como aproveitar ao máximo os dados visuais</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Gráficos</h4>
            </div>
            <p className="text-sm text-gray-600">
              Utilize diferentes tipos de gráficos para visualizar tendências, comparações e distribuições. Gráficos de barras são ótimos para comparações, linhas para tendências temporais e pizza para proporções.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">Mapas</h4>
            </div>
            <p className="text-sm text-gray-600">
              Os mapas permitem visualizar dados georreferenciados, identificando padrões regionais e territórios prioritários. Use as legendas para interpretar corretamente as codificações de cores.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-600" />
              <h4 className="font-medium">Tabelas</h4>
            </div>
            <p className="text-sm text-gray-600">
              Tabelas são ideais para apresentar dados detalhados com precisão. Utilize a ordenação e filtragem para explorar conjuntos de dados complexos e identificar valores específicos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
