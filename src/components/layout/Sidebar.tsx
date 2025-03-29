
import React, { useState } from 'react';
import { Leaf, Settings, Handshake, Sparkles, ChevronLeft, ChevronRight, Home, Globe, TreeDeciduous, BoxSelect, Compass, LineChart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Globe, label: 'Painéis Setoriais', path: '/observatory' },
    { icon: BoxSelect, label: 'HUB Bioeconômico', path: '/hub' },
    { icon: TreeDeciduous, label: 'BioVocação', path: '/vocation' },
    { icon: Compass, label: 'Estratégias', path: '/strategies' },
    { icon: Share2, label: 'Cadeia de Valor', path: '/valuechain' },
    { icon: LineChart, label: 'Relatórios', path: '/reports' },
  ];

  return (
    <div className={cn(
      'flex flex-col h-screen bg-bio-green text-white transition-all duration-300 ease-in-out relative',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      <div className="flex items-center justify-between p-4 border-b border-bio-green-dark">
        <div className={cn('flex items-center overflow-hidden', collapsed ? 'justify-center w-full' : '')}>
          <Leaf className="w-8 h-8 text-white" />
          <span className={cn('ml-2 font-bold text-lg transition-opacity duration-300', 
            collapsed ? 'opacity-0 w-0' : 'opacity-100'
          )}>
            BioECO
          </span>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-bio-green-dark transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link 
                  to={item.path}
                  className={cn(
                    'flex items-center py-3 px-4 transition-all duration-200 hover:bg-bio-green-dark/50',
                    isActive ? 'bg-bio-green-dark' : 'bg-transparent'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className={cn('ml-4 transition-opacity duration-300', 
                    collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  )}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-bio-green-dark">
        <div className={cn('flex items-center', collapsed ? 'justify-center' : '')}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className={cn('ml-3 transition-opacity duration-300', collapsed ? 'opacity-0 w-0' : 'opacity-100')}>
            <p className="text-sm font-medium">Marlos</p>
            <p className="text-xs text-white/70">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
