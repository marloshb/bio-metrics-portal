
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
          
          {/* Simplified map */}
          <div className="col-span-1 lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden h-[500px] relative">
            {/* Map placeholder */}
            <div className="absolute inset-0 bg-[#F3F2F1]">
              <svg viewBox="0 0 800 600" className="w-full h-full opacity-60">
                <path 
                  d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
                  fill="#e0e0e0" 
                  stroke="#cccccc" 
                  strokeWidth="2"
                />
              </svg>
              
              {/* Supply points */}
              {showSupply && filteredData.map((point, index) => (
                <div 
                  key={`supply-${index}`}
                  className="absolute w-4 h-4 rounded-full bg-green-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ 
                    left: `${point.coordinates.lng}%`, 
                    top: `${point.coordinates.lat}%`,
                    opacity: 0.8,
                  }}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg w-48 z-10 text-xs hidden group-hover:block">
                    <p className="font-medium">{point.productCategory}</p>
                    <p>Oferta: {point.supplyVolume.toLocaleString()} un.</p>
                    <p>Preço médio: {formatCurrency(point.averagePrice)}</p>
                  </div>
                </div>
              ))}
              
              {/* Demand points */}
              {showDemand && filteredData.map((point, index) => (
                <div 
                  key={`demand-${index}`}
                  className="absolute w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ 
                    left: `${point.coordinates.lng + 5}%`, 
                    top: `${point.coordinates.lat - 5}%`,
                    opacity: 0.8,
                  }}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg w-48 z-10 text-xs hidden group-hover:block">
                    <p className="font-medium">{point.productCategory}</p>
                    <p>Demanda: {point.demandVolume.toLocaleString()} un.</p>
                    <p>Preço médio: {formatCurrency(point.averagePrice)}</p>
                  </div>
                </div>
              ))}
              
              {/* Selected point info */}
              {selectedPoint && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-72 z-20">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{selectedPoint.productCategory}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto w-auto p-1"
                      onClick={() => setSelectedPoint(null)}
                    >
                      ×
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600">{selectedPoint.region}</p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-gray-500">Oferta</span>
                      <p className="font-medium">{selectedPoint.supplyVolume.toLocaleString()} un.</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Demanda</span>
                      <p className="font-medium">{selectedPoint.demandVolume.toLocaleString()} un.</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Preço médio</span>
                      <p className="font-medium">{formatCurrency(selectedPoint.averagePrice)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Tendência</span>
                      <p className={`font-medium ${selectedPoint.trends.direction === 'up' ? 'text-green-600' : selectedPoint.trends.direction === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                        {selectedPoint.trends.direction === 'up' ? '↑' : 
                         selectedPoint.trends.direction === 'down' ? '↓' : '→'} {selectedPoint.trends.percentage}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <Button size="sm" className="w-full bg-[#005A9C] hover:bg-[#004a80]">Ver análise completa</Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Map legend */}
            <div className="absolute left-4 bottom-4 bg-white p-3 rounded-lg shadow-md">
              <h4 className="text-sm font-medium mb-2">Legenda</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Pontos de Oferta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Pontos de Demanda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="data" className="mt-0 p-0">
        <Card>
          <CardHeader className="py-4 px-5">
            <CardTitle className="text-lg">Análise de Dados Geomarketing</CardTitle>
            <CardDescription>
              Dados detalhados para {productFilter !== 'Todos' ? productFilter : 'todas as categorias'}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-sm font-medium">Região</th>
                    <th className="text-left py-2 px-3 text-sm font-medium">Categoria</th>
                    <th className="text-right py-2 px-3 text-sm font-medium">Oferta</th>
                    <th className="text-right py-2 px-3 text-sm font-medium">Demanda</th>
                    <th className="text-right py-2 px-3 text-sm font-medium">Preço médio</th>
                    <th className="text-left py-2 px-3 text-sm font-medium">Tendência</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 text-sm">{item.region}</td>
                      <td className="py-2 px-3 text-sm">{item.productCategory}</td>
                      <td className="py-2 px-3 text-sm text-right">{item.supplyVolume.toLocaleString()}</td>
                      <td className="py-2 px-3 text-sm text-right">{item.demandVolume.toLocaleString()}</td>
                      <td className="py-2 px-3 text-sm text-right">{formatCurrency(item.averagePrice)}</td>
                      <td className="py-2 px-3 text-sm">
                        <span className={`inline-flex items-center ${
                          item.trends.direction === 'up' ? 'text-green-600' : 
                          item.trends.direction === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.trends.direction === 'up' ? '↑' : 
                           item.trends.direction === 'down' ? '↓' : '→'} {item.trends.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};
