import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileDown, File, FileSpreadsheet, FileText, Check, Mail, Link as LinkIcon } from 'lucide-react';

const ExportOptions = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [fileName, setFileName] = useState('Relatorio_BioECO');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [includeContent, setIncludeContent] = useState({
    charts: true,
    maps: true,
    tables: true,
    rawData: false,
    publicSources: true,
    insights: true
  });
  const [exportProgress, setExportProgress] = useState<number | null>(null);

  // Mock function to handle export
  const handleExport = () => {
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev !== null) {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setExportProgress(null), 1500);
            return 100;
          }
          return prev + 10;
        }
        return prev;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#005A9C]">Exportação e Compartilhamento</h2>
        <p className="text-sm text-gray-500">Gere relatórios em diferentes formatos e compartilhe com stakeholders</p>
      </div>

      <Tabs defaultValue="export">
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="export" className="flex items-center gap-1">
            <FileDown className="h-4 w-4" />
            <span>Exportar</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Modelos</span>
          </TabsTrigger>
          <TabsTrigger value="share" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Compartilhar</span>
          </TabsTrigger>
        </TabsList>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configurações de Exportação</CardTitle>
              <CardDescription>Escolha o formato e conteúdo para seu relatório</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="export-format">Formato do Arquivo</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger id="export-format">
                        <SelectValue placeholder="Selecione um formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF - Documento para Visualização</SelectItem>
                        <SelectItem value="excel">Excel - Planilha Editável</SelectItem>
                        <SelectItem value="csv">CSV - Dados Brutos</SelectItem>
                        <SelectItem value="powerpoint">PowerPoint - Apresentação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="file-name">Nome do Arquivo</Label>
                    <Input 
                      id="file-name" 
                      value={fileName} 
                      onChange={(e) => setFileName(e.target.value)} 
                      placeholder="Nome para o arquivo exportado" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template">Modelo de Relatório</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Selecione um modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Padrão - Layout Completo</SelectItem>
                        <SelectItem value="executive">Resumo Executivo</SelectItem>
                        <SelectItem value="presentation">Apresentação</SelectItem>
                        <SelectItem value="minimal">Minimalista - Apenas Dados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Incluir no Relatório</Label>
                  <div className="space-y-3 border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="charts" 
                        checked={includeContent.charts} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, charts: checked as boolean})} 
                      />
                      <label 
                        htmlFor="charts" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Gráficos e Visualizações
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="maps" 
                        checked={includeContent.maps} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, maps: checked as boolean})} 
                      />
                      <label 
                        htmlFor="maps" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Mapas Georreferenciados
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="tables" 
                        checked={includeContent.tables} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, tables: checked as boolean})} 
                      />
                      <label 
                        htmlFor="tables" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tabelas de Dados
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rawData" 
                        checked={includeContent.rawData} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, rawData: checked as boolean})} 
                      />
                      <label 
                        htmlFor="rawData" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Dados Brutos (anexo)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="publicSources" 
                        checked={includeContent.publicSources} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, publicSources: checked as boolean})} 
                      />
                      <label 
                        htmlFor="publicSources" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fontes Públicas Utilizadas
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="insights" 
                        checked={includeContent.insights} 
                        onCheckedChange={(checked) => setIncludeContent({...includeContent, insights: checked as boolean})} 
                      />
                      <label 
                        htmlFor="insights" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Insights e Recomendações
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {exportProgress !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Exportando...</span>
                    <span>{exportProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#005A9C] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    ></div>
                  </div>
                  {exportProgress === 100 && (
                    <div className="flex items-center text-green-600 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      <span>Exportação concluída!</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {exportFormat === 'pdf' && <File className="h-8 w-8 text-red-500" />}
                {exportFormat === 'excel' && <FileSpreadsheet className="h-8 w-8 text-green-600" />}
                {exportFormat === 'csv' && <FileText className="h-8 w-8 text-blue-500" />}
                {exportFormat === 'powerpoint' && <FileText className="h-8 w-8 text-orange-500" />}
                <span>{fileName}.{exportFormat}</span>
              </div>
              <Button onClick={handleExport} disabled={exportProgress !== null} className="w-full md:w-auto">
                <FileDown className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exportações Recentes</CardTitle>
              <CardDescription>Histórico de relatórios exportados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <File className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Relatório_2023_Nacional.pdf</p>
                    <p className="text-xs text-gray-500">Exportado em 15/01/2024</p>
                  </div>
                </div>
                <FileDown className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium">Dados_Projetos_2023.xlsx</p>
                    <p className="text-xs text-gray-500">Exportado em 10/01/2024</p>
                  </div>
                </div>
                <FileDown className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <File className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Resumo_Executivo_Q4.pdf</p>
                    <p className="text-xs text-gray-500">Exportado em 02/01/2024</p>
                  </div>
                </div>
                <FileDown className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={selectedTemplate === 'standard' ? 'border-2 border-[#005A9C]' : ''}>
              <CardHeader>
                <CardTitle className="text-lg">Padrão</CardTitle>
                <CardDescription>Layout completo do relatório</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <div className="w-full h-32 bg-gray-100 rounded-md flex flex-col">
                  <div className="h-8 bg-gray-200 rounded-t-md w-full"></div>
                  <div className="flex-1 p-2 flex">
                    <div className="w-1/2 bg-gray-200 mr-1 rounded-sm"></div>
                    <div className="w-1/2 bg-gray-200 ml-1 rounded-sm"></div>
                  </div>
                  <div className="h-16 p-2">
                    <div className="h-full bg-gray-200 rounded-sm"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Relatório detalhado com todos os elementos</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedTemplate === 'standard' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedTemplate('standard')}
                >
                  {selectedTemplate === 'standard' ? 'Selecionado' : 'Selecionar'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={selectedTemplate === 'executive' ? 'border-2 border-[#005A9C]' : ''}>
              <CardHeader>
                <CardTitle className="text-lg">Resumo Executivo</CardTitle>
                <CardDescription>Versão resumida e direta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <div className="w-full h-32 bg-gray-100 rounded-md flex flex-col">
                  <div className="h-12 bg-gray-200 rounded-t-md w-full"></div>
                  <div className="flex-1 p-2">
                    <div className="h-8 bg-gray-200 mb-2 rounded-sm"></div>
                    <div className="h-8 bg-gray-200 rounded-sm"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Foco nos insights e indicadores-chave</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedTemplate === 'executive' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedTemplate('executive')}
                >
                  {selectedTemplate === 'executive' ? 'Selecionado' : 'Selecionar'}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={selectedTemplate === 'presentation' ? 'border-2 border-[#005A9C]' : ''}>
              <CardHeader>
                <CardTitle className="text-lg">Apresentação</CardTitle>
                <CardDescription>Formato para slides</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <div className="w-full h-32 bg-gray-100 rounded-md flex flex-col">
                  <div className="h-6 bg-gray-200 rounded-t-md w-full"></div>
                  <div className="flex-1 p-2 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-b-md w-full"></div>
                </div>
                <p className="text-xs text-gray-500">Otimizado para apresentações</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={selectedTemplate === 'presentation' ? 'default' : 'outline'} 
                  className="w-full"
                  onClick={() => setSelectedTemplate('presentation')}
                >
                  {selectedTemplate === 'presentation' ? 'Selecionado' : 'Selecionar'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personalize seu Template</CardTitle>
              <CardDescription>Configure opções avançadas de layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="header-logo">Logo no Cabeçalho</Label>
                  <Select defaultValue="bioeco">
                    <SelectTrigger id="header-logo">
                      <SelectValue placeholder="Selecione uma logo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bioeco">BioECO (padrão)</SelectItem>
                      <SelectItem value="ministry">Ministério do Meio Ambiente</SelectItem>
                      <SelectItem value="none">Sem logo</SelectItem>
                      <SelectItem value="custom">Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="color-scheme">Esquema de Cores</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="color-scheme">
                      <SelectValue placeholder="Selecione um esquema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão (Verde e Azul)</SelectItem>
                      <SelectItem value="official">Oficial Gov.br</SelectItem>
                      <SelectItem value="accessible">Alta acessibilidade</SelectItem>
                      <SelectItem value="print">Otimizado para impressão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="page-size">Tamanho da Página</Label>
                  <Select defaultValue="a4">
                    <SelectTrigger id="page-size">
                      <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4 (padrão)</SelectItem>
                      <SelectItem value="letter">Carta (letter)</SelectItem>
                      <SelectItem value="a3">A3</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="add-footer" />
                <label 
                  htmlFor="add-footer" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Adicionar rodapé com informações da fonte e data
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="add-page-numbers" defaultChecked />
                <label 
                  htmlFor="add-page-numbers" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Incluir numeração de páginas
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="add-toc" defaultChecked />
                <label 
                  htmlFor="add-toc" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Incluir índice automático
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Salvar como Novo Modelo</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Share Tab */}
        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compartilhamento</CardTitle>
              <CardDescription>Envie o relatório para stakeholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emails">E-mails dos Destinatários</Label>
                <div className="flex gap-2">
                  <Input 
                    id="emails" 
                    placeholder="exemplo@email.com, outro@email.com" 
                    className="flex-1"
                  />
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Link Compartilhável</Label>
                <div className="flex gap-2">
                  <Input 
                    value="https://bioeco.gov.br/relatorios/shared/D8f3J9kL" 
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">O link expira em 30 dias. Qualquer pessoa com o link pode visualizar o relatório.</p>
              </div>
              
              <div>
                <Label className="mb-2 block">Permissões</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-view" checked />
                    <label 
                      htmlFor="perm-view" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Visualizar
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-download" defaultChecked />
                    <label 
                      htmlFor="perm-download" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Baixar
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-comment" />
                    <label 
                      htmlFor="perm-comment" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Comentar
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="perm-edit" />
                    <label 
                      htmlFor="perm-edit" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Editar
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Mensagem Personalizada</Label>
                <textarea 
                  id="message" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" 
                  placeholder="Digite uma mensagem para os destinatários"
                ></textarea>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agendamento de Relatórios</CardTitle>
              <CardDescription>Configure o envio automático de relatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="schedule-enabled" />
                  <label 
                    htmlFor="schedule-enabled" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Habilitar envio programado de relatórios
                  </label>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="frequency">Frequência</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="biweekly">Quinzenal</SelectItem>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="report-type">Tipo de Relatório</Label>
                    <Select defaultValue="full">
                      <SelectTrigger id="report-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Relatório Completo</SelectItem>
                        <SelectItem value="summary">Resumo</SelectItem>
                        <SelectItem value="data-only">Apenas Dados</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="recipients">Destinatários</Label>
                  <Input 
                    id="recipients" 
                    placeholder="grupo@email.com, diretoria@email.com" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Separe múltiplos e-mails com vírgulas</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Configurar Agendamento
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportOptions;
