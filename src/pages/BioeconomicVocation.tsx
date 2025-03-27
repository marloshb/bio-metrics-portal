
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import BioeconomicVocation from '@/components/vocation/BioeconomicVocation';
import { Bell, Search } from 'lucide-react';

const BioeconomicVocationPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 transition-all">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex justify-between items-center py-4 px-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Vocação Bioeconômica</h1>
              <p className="text-sm text-gray-500">Análise territorial de riscos, oportunidades e potenciais</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 transition-all"
                />
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-bio-green"></span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="px-6 py-6">
          {/* Date and filters */}
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Data Atual</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          
          {/* Main component */}
          <div className="section-appear" style={{ "--appear-delay": 1 } as React.CSSProperties}>
            <BioeconomicVocation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BioeconomicVocationPage;
