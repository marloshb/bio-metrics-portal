
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import BiodiversityMap from '@/components/dashboard/BiodiversityMap';
import SustainabilityChart from '@/components/dashboard/SustainabilityChart';
import InnovationHub from '@/components/dashboard/InnovationHub';
import CommunityTracker from '@/components/dashboard/CommunityTracker';
import { Bell, Search, BarChart3, Info, Calendar, Leaf, Download, FileBarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading for a smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-4 px-4 md:px-6 gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">BioECO - Sistema Digital de Bioeconomia</h1>
              <p className="text-xs md:text-sm text-gray-500">
                Monitoramento e gestão da bioeconomia brasileira baseado no Decreto nº 12.044
              </p>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar projetos ou recursos..." 
                  className="w-full md:w-auto pl-10 pr-4 py-1.5 md:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all text-sm"
                />
              </div>
              
              <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-bio-green"></span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Hero Section - Decreto Information */}
        <div className="bg-gradient-to-r from-bio-green/20 to-bio-blue/20 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-white p-3 md:p-4 rounded-full">
                <img 
                  src="/lovable-uploads/e1f418e7-064f-4e6f-9a07-ddbc515ad576.png" 
                  alt="BioECO Logo" 
                  className="w-8 h-8 md:w-10 md:h-10" 
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-medium">BioEco</h2>
                <p className="text-sm md:text-base mt-1">Estratégia Nacional de Bioeconomia, promovendo um modelo de desenvolvimento baseado em sustentabilidade, biodiversidade, inclusão e inovação.</p>
              </div>
              <button className="bio-button-secondary flex items-center text-xs md:text-sm py-1.5 px-3 mt-2 md:mt-0">
                <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span>Saiba mais</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <ScrollArea className="flex-1">
          <main className="px-3 md:px-6 py-3 md:py-6">
            {/* Date and filters */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-4 md:mb-6 gap-3">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Data de hoje</p>
                <p className="text-sm md:text-base font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <div className="flex space-x-2 sm:space-x-3">
                <Link to="/reports" className="bio-button flex items-center text-xs md:text-sm py-1 px-3 md:px-4">
                  <FileBarChart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span>Ver Relatórios</span>
                </Link>
                <select className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 bg-white">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Último trimestre</option>
                  <option>Último ano</option>
                </select>
              </div>
            </div>
            
            {/* Dashboard cards - summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total de Projetos</h3>
                    <p className="text-2xl font-semibold mt-1">342</p>
                  </div>
                  <div className="bg-bio-green/10 p-2 rounded-md">
                    <BarChart3 className="h-6 w-6 text-bio-green" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+12%</span>
                  <span className="ml-1 text-gray-500">desde o mês passado</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Financiamentos Ativos</h3>
                    <p className="text-2xl font-semibold mt-1">R$ 1,2B</p>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-md">
                    <Leaf className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+8%</span>
                  <span className="ml-1 text-gray-500">desde o último trimestre</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Comunidades Envolvidas</h3>
                    <p className="text-2xl font-semibold mt-1">158</p>
                  </div>
                  <div className="bg-amber-500/10 p-2 rounded-md">
                    <Calendar className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+24</span>
                  <span className="ml-1 text-gray-500">novas comunidades</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Novas Políticas</h3>
                    <p className="text-2xl font-semibold mt-1">7</p>
                  </div>
                  <div className="bg-purple-500/10 p-2 rounded-md">
                    <Info className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-blue-600 flex items-center">
                  <span className="font-medium">Acompanhar</span>
                  <span className="ml-1 text-gray-500">atualizações recentes</span>
                </div>
              </div>
            </div>
            
            {/* Dashboard grid */}
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}>
              <div className="section-appear" style={{ "--appear-delay": 1 } as React.CSSProperties}>
                <BiodiversityMap />
              </div>
              <div className="section-appear" style={{ "--appear-delay": 2 } as React.CSSProperties}>
                <SustainabilityChart />
              </div>
              <div className="section-appear" style={{ "--appear-delay": 3 } as React.CSSProperties}>
                <CommunityTracker />
              </div>
              <div className="section-appear" style={{ "--appear-delay": 4 } as React.CSSProperties}>
                <InnovationHub />
              </div>
            </div>
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center h-[300px] md:h-[400px] lg:h-[600px]">
                <div className="relative w-12 h-12 md:w-16 md:h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-bio-gray rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-bio-green rounded-full animate-spin border-t-transparent"></div>
                </div>
              </div>
            )}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
