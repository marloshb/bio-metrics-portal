
import React, { useState } from 'react';
import { Search, Filter, MapPin, Download, BarChart2, Info, Layers } from 'lucide-react';
import { mockGeoMarketingData } from '@/data/valuechain';
import { GeoMarketingData } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from '@/lib/utils';

export const GeoMarketingMap = () => {
  const [productFilter, setProductFilter] = useState<string>('Todos');
  const [periodFilter, setPeriodFilter] = useState<string>('Atual');
  const [showSupply, setShowSupply] = useState<boolean>(true);
  const [showDemand, setShowDemand] = useState<boolean>(true);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [view, setView] = useState<'map' | 'data'>('map');
  const [selectedPoint, setSelectedPoint] = useState<GeoMarketingData | null>(null);
  
  const uniqueProducts = ['Todos', ...Array.from(
    new Set(mockGeoMarketingData.map(data => data.productCategory))
  ).sort()];
  
  const uniquePeriods = ['Atual', 'Último Trimestre', 'Último Semestre', 'Último Ano'];
  const uniqueRegions = Array.from(new Set(mockGeoMarketingData.map(data => data.region))).sort();
  
  const filteredData = mockGeoMarketingData.filter(data => {
    const matchesSearch = searchTerm ? 
      data.productCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.region.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
    if (productFilter !== 'Todos' && data.productCategory !== productFilter) {
      return false;
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center">
          <Tabs value={view} onValueChange={(v) => setView(v as 'map' | 'data')} className="w-auto">
            <TabsList>
              <TabsTrigger value="map" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Mapa</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center">
                <BarChart2 className="h-4 w-4 mr-2" />
                <span>Análise</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por produto ou região..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium mb-1 block">Categoria de Produto</label>
            <Select 
              value={productFilter}
              onValueChange={(value) => setProductFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {uniqueProducts.map(product => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium mb-1 block">Período</label>
            <Select 
              value={periodFilter}
              onValueChange={(value) => setPeriodFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                {uniquePeriods.map(period => (
                  <SelectItem key={period} value={period}>{period}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${showSupply ? 'bg-green-100 border-green-300' : ''}`}
                  onClick={() => setShowSupply(!showSupply)}
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Oferta
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mostrar/ocultar dados de oferta no mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`flex items-center gap-2 ${showDemand ? 'bg-blue-100 border-blue-300' : ''}`}
                  onClick={() => setShowDemand(!showDemand)}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Demanda
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mostrar/ocultar dados de demanda no mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Camadas
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configurar camadas do mapa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    alert('Relatório exportado com sucesso!');
                  }}
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exportar dados para CSV ou PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <TabsContent value="map" className="mt-0 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-1">
            <CardHeader className="py-4 px-5">
              <CardTitle className="text-lg text-[#005A9C] flex items-center gap-2">
                <Info className="h-5 w-5" />
                Estatísticas
              </CardTitle>
              {productFilter !== 'Todos' && (
                <CardDescription>
                  Dados para {productFilter}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-0 space-y-4">
              {productFilter !== 'Todos' ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Volume de Oferta</span>
                      <span className="text-sm text-gray-600">
                        {filteredData.reduce((sum, data) => sum + data.supplyVolume, 0).toLocaleString()} unidades
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Volume de Demanda</span>
                      <span className="text-sm text-gray-600">
                        {filteredData.reduce((sum, data) => sum + data.demandVolume, 0).toLocaleString()} unidades
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Preço Médio</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(filteredData.reduce((sum, data) => sum + data.averagePrice, 0) / filteredData.length)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Principais Regiões Produtoras</h4>
                    {Array.from(new Set(filteredData.map(data => data.region)))
                      .slice(0, 5)
                      .map((region, index) => (
                        <div key={index} className="flex justify-between items-center text-sm py-1">
                          <span>{region}</span>
                          <span className="text-gray-600">
                            {filteredData
                              .filter(data => data.region === region)
                              .reduce((sum, data) => sum + data.supplyVolume, 0)
                              .toLocaleString()} un.
                          </span>
                        </div>
                      ))
                    }
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Tendência de Mercado</h4>
                    <div className="flex items-center">
                      <BarChart2 className="h-5 w-5 text-[#0078D4] mr-2" />
                      <span className="text-sm">
                        {filteredData[0]?.trends.direction === 'up' ? 
                          `Em alta (${filteredData[0]?.trends.percentage}%)` : 
                          filteredData[0]?.trends.direction === 'down' ? 
                          `Em queda (${filteredData[0]?.trends.percentage}%)` : 
                          'Estável'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p>Selecione uma categoria de produto para ver estatísticas detalhadas</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-2 h-[500px] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="absolute inset-0 bg-[#F3F2F1]">
                <div className="relative h-full w-full">
                  <svg viewBox="0 0 800 800" className="h-full w-full p-4">
                    <path 
                      d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
                      fill="#ffffff" 
                      stroke="#cccccc" 
                      strokeWidth="2"
                    />
                    
                    {showSupply && filteredData.map((data, index) => (
                      <circle 
                        key={`supply-${index}`}
                        cx={data.coordinates.lng * 5 + 300} 
                        cy={data.coordinates.lat * 5 + 300}
                        r={Math.sqrt(data.supplyVolume) / 3 + 5}
                        fill="rgba(34, 197, 94, 0.4)"
                        stroke="#22c55e"
                        strokeWidth="1"
                        onClick={() => setSelectedPoint(data)}
                        className="cursor-pointer hover:stroke-[#005A9C] hover:stroke-[3]"
                      />
                    ))}
                    
                    {showDemand && filteredData.map((data, index) => (
                      <circle 
                        key={`demand-${index}`}
                        cx={data.coordinates.lng * 5 + 300} 
                        cy={data.coordinates.lat * 5 + 300}
                        r={Math.sqrt(data.demandVolume) / 3 + 5}
                        fill="rgba(59, 130, 246, 0.4)"
                        stroke="#3b82f6"
                        strokeWidth="1"
                        onClick={() => setSelectedPoint(data)}
                        className="cursor-pointer hover:stroke-[#005A9C] hover:stroke-[3]"
                      />
                    ))}
                  </svg>
                  
                  <div className="absolute top-2 right-2 bg-white rounded-md shadow p-2 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Oferta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Demanda</span>
                    </div>
                  </div>
                  
                  {!mapInitialized && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">Clique para inicializar o mapa</p>
                        <Button 
                          className="bg-[#0078D4] hover:bg-[#005A9C]"
                          onClick={() => setMapInitialized(true)}
                        >
                          Carregar Mapa
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {selectedPoint && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-80">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{selectedPoint.productCategory}</h3>
                        <Badge className="bg-blue-100 text-blue-800">
                          {selectedPoint.region}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Oferta:</span>
                          <span>{selectedPoint.supplyVolume.toLocaleString()} {selectedPoint.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Demanda:</span>
                          <span>{selectedPoint.demandVolume.toLocaleString()} {selectedPoint.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Preço médio:</span>
                          <span>{formatCurrency(selectedPoint.averagePrice)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Tendência:</span>
                          <span className="flex items-center">
                            {selectedPoint.trends.direction === 'up' ? (
                              <Badge className="bg-green-100 text-green-800">
                                Em alta +{selectedPoint.trends.percentage}%
                              </Badge>
                            ) : selectedPoint.trends.direction === 'down' ? (
                              <Badge className="bg-red-100 text-red-800">
                                Em queda -{selectedPoint.trends.percentage}%
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">
                                Estável
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button size="sm" variant="outline" onClick={() => setSelectedPoint(null)}>
                          Fechar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="data" className="mt-0 p-0">
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#005A9C]">Análise de Oferta e Demanda</CardTitle>
              <CardDescription>
                Comparativo detalhado por região e categoria de produto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Região</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Produto</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Oferta</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Demanda</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Diferença</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Preço Médio</th>
                      <th className="p-3 border-b text-sm font-medium text-gray-500">Tendência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="p-3 text-sm">{data.region}</td>
                        <td className="p-3 text-sm">{data.productCategory}</td>
                        <td className="p-3 text-sm">{data.supplyVolume.toLocaleString()} {data.unit}</td>
                        <td className="p-3 text-sm">{data.demandVolume.toLocaleString()} {data.unit}</td>
                        <td className="p-3 text-sm">
                          <span className={data.supplyVolume >= data.demandVolume ? "text-green-600" : "text-red-600"}>
                            {(data.supplyVolume - data.demandVolume).toLocaleString()} {data.unit}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{formatCurrency(data.averagePrice)}</td>
                        <td className="p-3 text-sm">
                          {data.trends.direction === 'up' ? (
                            <Badge className="bg-green-100 text-green-800">
                              Em alta +{data.trends.percentage}%
                            </Badge>
                          ) : data.trends.direction === 'down' ? (
                            <Badge className="bg-red-100 text-red-800">
                              Em queda -{data.trends.percentage}%
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              Estável
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};
