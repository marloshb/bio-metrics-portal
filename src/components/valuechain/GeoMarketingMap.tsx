
import React, { useState } from 'react';
import { Filter, BarChart2, Download, Layers } from 'lucide-react';
import { mockGeoMarketingData } from '@/data/mockValueChainData';
import { GeoMarketingData } from '@/types/valueChainTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/utils';
import { MAPBOX_TOKEN } from '@/constants/mapConfig';

export const GeoMarketingMap = () => {
  const [productFilter, setProductFilter] = useState<string>('Todos');
  const [periodFilter, setPeriodFilter] = useState<string>('Atual');
  const [showSupply, setShowSupply] = useState<boolean>(true);
  const [showDemand, setShowDemand] = useState<boolean>(true);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);
  
  // Get unique product categories and periods for filters
  const uniqueProducts = ['Todos', ...Array.from(
    new Set(mockGeoMarketingData.map(data => data.productCategory))
  ).sort()];
  
  const uniquePeriods = ['Atual', 'Último Trimestre', 'Último Semestre', 'Último Ano'];
  
  // Filter geomarketing data based on filters
  const filteredData = mockGeoMarketingData.filter(data => {
    if (productFilter !== 'Todos' && data.productCategory !== productFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium mb-1 block">Categoria de Produto</label>
            <select 
              className="w-full sm:w-48 rounded-md border border-gray-200 text-sm p-2"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              {uniqueProducts.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="text-sm font-medium mb-1 block">Período</label>
            <select 
              className="w-full sm:w-48 rounded-md border border-gray-200 text-sm p-2"
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
            >
              {uniquePeriods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className={`flex items-center gap-2 ${showSupply ? 'bg-green-100 border-green-300' : ''}`}
            onClick={() => setShowSupply(!showSupply)}
          >
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            Oferta
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex items-center gap-2 ${showDemand ? 'bg-blue-100 border-blue-300' : ''}`}
            onClick={() => setShowDemand(!showDemand)}
          >
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            Demanda
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Camadas
          </Button>
          
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium text-lg text-[#005A9C]">Estatísticas</h3>
            
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
              {/* Map placeholder - in real implementation this would be an actual ESRI map */}
              <div className="relative h-full w-full">
                {/* Brazil map outline (simplified SVG) */}
                <svg viewBox="0 0 800 800" className="h-full w-full p-4">
                  <path 
                    d="M200,100 C300,50 400,50 500,100 C600,150 700,250 650,350 C600,450 500,500 400,550 C300,600 200,550 150,450 C100,350 100,150 200,100 Z" 
                    fill="#ffffff" 
                    stroke="#cccccc" 
                    strokeWidth="2"
                  />
                  
                  {/* Heat map visualization */}
                  {showSupply && filteredData.map((data, index) => (
                    <circle 
                      key={`supply-${index}`}
                      cx={data.coordinates.lng * 5 + 300} 
                      cy={data.coordinates.lat * 5 + 300}
                      r={Math.sqrt(data.supplyVolume) / 3 + 5}
                      fill="rgba(34, 197, 94, 0.4)"
                      stroke="#22c55e"
                      strokeWidth="1"
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
                    />
                  ))}
                </svg>
                
                {/* Map overlay with instructions or popups */}
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
