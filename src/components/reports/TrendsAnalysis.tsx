
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { trendAnalysis } from '@/data/mockReportsData';
import { ArrowUpRight, ArrowDownRight, BarChart3, Compass, Lightbulb, TrendingUp } from 'lucide-react';
import { TrendsChart } from './charts/TrendsChart';
import { TrendsProjectionChart } from './charts/TrendsProjectionChart';
import { CorrelationChart } from './charts/CorrelationChart';

const TrendsAnalysis = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(trendAnalysis[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState('3years');
  
  const analysis = trendAnalysis.find(a => a.id === selectedAnalysis) || trendAnalysis[0];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#005A9C]">Análise Comparativa e Tendências</h2>
          <p className="text-sm text-gray-500">Compare dados entre períodos e identifique tendências</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar análise" />
            </SelectTrigger>
            <SelectContent>
              {trendAnalysis.map(analysis => (
                <SelectItem key={analysis.id} value={analysis.id}>{analysis.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1year">Último ano</SelectItem>
              <SelectItem value="3years">Últimos 3 anos</SelectItem>
              <SelectItem value="5years">Últimos 5 anos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Analysis Header Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{analysis.title}</CardTitle>
          <CardDescription className="mt-1">{analysis.description}</CardDescription>
          <div className="pt-3 flex items-center text-sm text-gray-500">
            <span>Período: {new Date(analysis.period.start).toLocaleDateString('pt-BR')} - {new Date(analysis.period.end).toLocaleDateString('pt-BR')}</span>
            {analysis.comparisonPeriod && (
              <>
                <span className="mx-2">•</span>
                <span>
                  Comparação com: {new Date(analysis.comparisonPeriod.start).toLocaleDateString('pt-BR')} - {new Date(analysis.comparisonPeriod.end).toLocaleDateString('pt-BR')}
                </span>
              </>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysis.metrics.slice(0, 6).map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{metric.name}</CardDescription>
              <CardTitle className="text-2xl">
                {metric.currentValue.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">{metric.unit}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className={`flex items-center text-xs ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-amber-600'}`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : metric.trend === 'down' ? (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingUp className="h-3 w-3 mr-1" />
                )}
                <span>{metric.change}% desde o período anterior</span>
              </div>
              {metric.projection && (
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <Compass className="h-3 w-3 mr-1" />
                  <span>Projeção para {metric.projectionYear}: {metric.projection.toLocaleString()}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different analysis views */}
      <Tabs defaultValue="evolution">
        <TabsList>
          <TabsTrigger value="evolution" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Evolução</span>
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-1">
            <Compass className="h-4 w-4" />
            <span>Comparação Regional</span>
          </TabsTrigger>
          <TabsTrigger value="correlations" className="flex items-center gap-1">
            <Lightbulb className="h-4 w-4" />
            <span>Correlações</span>
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Projeções</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="evolution" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evolução de Indicadores-Chave</CardTitle>
              <CardDescription>Crescimento percentual dos principais indicadores ({analysis.period.start.split('-')[0]}-{analysis.period.end.split('-')[0]})</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <TrendsChart chartData={analysis.charts[0]} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regional" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1 space-y-4">
              {analysis.regionalComparison?.map((region, index) => (
                <Card key={index}>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-base">{region.regionName}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <ul className="space-y-2 text-sm">
                      {region.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="flex justify-between">
                          <span className="text-gray-600">{metric.name}:</span>
                          <span className="font-medium">{metric.value.toLocaleString()} {metric.unit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle className="text-lg">Comparativo Regional</CardTitle>
                <CardDescription>Desempenho relativo de cada região em relação à média nacional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-md h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Visualização do gráfico regional</p>
                    <h3 className="text-lg font-medium text-gray-800">Comparativo de Regiões</h3>
                    <p className="text-sm mt-2">O gráfico mostra o desempenho relativo de cada região nas principais métricas.</p>
                    
                    <div className="mt-6 grid grid-cols-5 gap-2">
                      {analysis.regionalComparison?.map((region, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="h-20 w-8 bg-gray-200 rounded-t-md relative overflow-hidden">
                            <div 
                              className="absolute bottom-0 w-full bg-blue-500" 
                              style={{ 
                                height: `${(region.metrics[0].value / region.metrics[0].benchmark) * 100}%`,
                                maxHeight: '100%'
                              }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1">{region.regionName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="correlations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Correlações Significativas</CardTitle>
              <CardDescription>Relações identificadas entre diferentes métricas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysis.correlations?.map((correlation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full" 
                        style={{ 
                          backgroundColor: correlation.correlation > 0.7 ? '#10B981' : 
                                          correlation.correlation > 0.4 ? '#60A5FA' : 
                                          correlation.correlation > 0 ? '#FBBF24' : 
                                          correlation.correlation > -0.4 ? '#F87171' : '#EF4444' 
                        }}
                      ></div>
                      <h3 className="font-medium">{correlation.metric1} × {correlation.metric2}</h3>
                    </div>
                    <CorrelationChart correlation={correlation.correlation} />
                    <div className="mt-3">
                      <p className="text-sm">
                        <span className="font-medium">Correlação: </span>
                        <span className={
                          correlation.correlation > 0.7 ? 'text-green-600' : 
                          correlation.correlation > 0.4 ? 'text-blue-600' : 
                          correlation.correlation > 0 ? 'text-amber-600' : 
                          correlation.correlation > -0.4 ? 'text-red-500' : 'text-red-600'
                        }>
                          {correlation.correlation.toFixed(2)}
                        </span>
                        <span className="ml-2 text-gray-500">
                          ({
                            correlation.correlation > 0.7 ? 'Forte positiva' : 
                            correlation.correlation > 0.4 ? 'Moderada positiva' : 
                            correlation.correlation > 0 ? 'Fraca positiva' : 
                            correlation.correlation > -0.4 ? 'Fraca negativa' : 
                            correlation.correlation > -0.7 ? 'Moderada negativa' : 'Forte negativa'
                          })
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Significância: </span>
                        <span className={correlation.significance < 0.01 ? 'text-green-600' : correlation.significance < 0.05 ? 'text-blue-600' : 'text-amber-600'}>
                          p={correlation.significance.toFixed(3)}
                        </span>
                        <span className="ml-2 text-gray-500">
                          ({
                            correlation.significance < 0.01 ? 'Altamente significativo' : 
                            correlation.significance < 0.05 ? 'Significativo' : 
                            'Pouco significativo'
                          })
                        </span>
                      </p>
                      <p className="text-sm mt-2 italic text-gray-600">
                        {
                          correlation.correlation > 0.7 ? `Existe uma forte relação positiva entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.` :
                          correlation.correlation > 0.4 ? `Há uma relação moderada entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.` :
                          correlation.correlation > 0 ? `Existe uma fraca relação positiva entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.` :
                          correlation.correlation > -0.4 ? `Há uma fraca relação negativa entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.` :
                          correlation.correlation > -0.7 ? `Existe uma relação moderadamente negativa entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.` :
                          `Há uma forte relação negativa entre ${correlation.metric1.toLowerCase()} e ${correlation.metric2.toLowerCase()}.`
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projeções para {analysis.metrics[0].projectionYear}</CardTitle>
              <CardDescription>Valores atuais vs. projeções para principais métricas</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <TrendsProjectionChart chartData={analysis.charts[1]} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interpretação das Projeções</CardTitle>
              <CardDescription>Análise das tendências identificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded">
                  <h3 className="font-medium text-blue-800 mb-1">Crescimento Sustentado</h3>
                  <p className="text-sm text-blue-700">
                    Os indicadores mostram tendência consistente de crescimento, com destaque para o aumento de {analysis.metrics[4].change}% em emissões evitadas, 
                    indicando que as estratégias de sustentabilidade estão funcionando.
                  </p>
                </div>
                
                <div className="p-4 border-l-4 border-amber-600 bg-amber-50 rounded">
                  <h3 className="font-medium text-amber-800 mb-1">Atenção Necessária</h3>
                  <p className="text-sm text-amber-700">
                    O ritmo de crescimento dos recursos financeiros ({analysis.metrics[1].change}%) está abaixo da expansão dos projetos ({analysis.metrics[0].change}%), 
                    o que pode indicar necessidade de novas fontes de financiamento a médio prazo.
                  </p>
                </div>
                
                <div className="p-4 border-l-4 border-green-600 bg-green-50 rounded">
                  <h3 className="font-medium text-green-800 mb-1">Impacto Social</h3>
                  <p className="text-sm text-green-700">
                    O envolvimento de comunidades apresenta o maior crescimento ({analysis.metrics[3].change}%), demonstrando o fortalecimento do pilar social 
                    nas iniciativas de bioeconomia, com forte correlação ({analysis.correlations?.[3].correlation.toFixed(2)}) com indicadores de inclusão.
                  </p>
                </div>
                
                <div className="p-4 border-l-4 border-purple-600 bg-purple-50 rounded">
                  <h3 className="font-medium text-purple-800 mb-1">Projeção Regional</h3>
                  <p className="text-sm text-purple-700">
                    A região {analysis.regionalComparison?.[0].regionName} deve se manter como líder em projetos de bioeconomia, mas a região {analysis.regionalComparison?.[1].regionName} 
                    apresenta a maior taxa de crescimento, podendo aumentar sua participação relativa nos próximos anos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrendsAnalysis;
