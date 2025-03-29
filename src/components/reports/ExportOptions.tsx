import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileDown, File, FileSpreadsheet, FileText, Check, Mail, Link as LinkIcon } from 'lucide-react';

const ExportOptions = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeMaps, setIncludeMaps] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [exportStatus, setExportStatus] = useState('');
  const [shareOption, setShareOption] = useState('email');

  const handleExport = () => {
    setExportStatus('Exportando...');
    setTimeout(() => {
      setExportStatus('Exportação concluída!');
    }, 2000);
  };

  const handleGenerateLink = () => {
    setExportStatus('Gerando link...');
    setTimeout(() => {
      setExportStatus('Link gerado: example.com/report');
    }, 2000);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-bio-blue">
          <FileDown className="h-5 w-5" />
          Exportar e Compartilhar Relatórios
        </CardTitle>
        <CardDescription>
          Exporte seus relatórios em diferentes formatos ou compartilhe-os diretamente com stakeholders
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid grid-cols-2 mx-6">
          <TabsTrigger value="export">Exportar Relatório</TabsTrigger>
          <TabsTrigger value="history">Histórico de Exportações</TabsTrigger>
        </TabsList>

        <TabsContent value="export">
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="format">Formato de Exportação</Label>
              <Select onValueChange={setExportFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="powerpoint">PowerPoint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="includeCharts">Incluir Gráficos</Label>
              <Switch
                id="includeCharts"
                checked={includeCharts}
                onCheckedChange={setIncludeCharts}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="includeMaps">Incluir Mapas</Label>
              <Switch id="includeMaps" checked={includeMaps} onCheckedChange={setIncludeMaps} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="includeTables">Incluir Tabelas</Label>
              <Switch
                id="includeTables"
                checked={includeTables}
                onCheckedChange={setIncludeTables}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {exportFormat === 'pdf' && <File className="h-8 w-8 text-red-500" />}
              {exportFormat === 'excel' && <FileSpreadsheet className="h-8 w-8 text-green-600" />}
              {exportFormat === 'csv' && <FileText className="h-8 w-8 text-blue-500" />}
              {exportFormat === 'powerpoint' && <FileText className="h-8 w-8 text-orange-500" />}
              <span>Tamanho estimado: 2.4MB</span>
            </div>
            <Button className="w-full md:w-auto">Exportar Agora</Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="history">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <File className="h-6 w-6 text-red-500" />
                <div>
                  <p className="font-medium">Relatório_2023_Nacional.pdf</p>
                  <p className="text-xs text-gray-500">Exportado em 15/01/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <File className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium">Dados_Financeiros_2022.xlsx</p>
                  <p className="text-xs text-gray-500">Exportado em 10/01/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <File className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">Analise_de_Mercado_2023.csv</p>
                  <p className="text-xs text-gray-500">Exportado em 05/01/2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ExportOptions;
