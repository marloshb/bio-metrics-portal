
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import BiodiversityMap from '@/components/dashboard/BiodiversityMap';
import SustainabilityChart from '@/components/dashboard/SustainabilityChart';
import CommunityTracker from '@/components/dashboard/CommunityTracker';
import InnovationHub from '@/components/dashboard/InnovationHub';
import { Bell, Search, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      
      <div className="flex-1 transition-all">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex justify-between items-center py-4 px-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Bioeconomy Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, explore today's metrics</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
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
              <p className="text-sm text-gray-500">Today's Date</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="flex space-x-3">
              <button className="bio-button flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                <span>Export Report</span>
              </button>
              <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bio-green/30 bg-white">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          
          {/* Dashboard grid */}
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-500",
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
            <div className="flex justify-center items-center h-[600px]">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-bio-gray rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-bio-green rounded-full animate-spin border-t-transparent"></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
