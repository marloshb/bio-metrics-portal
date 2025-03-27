
import React from 'react';
import { Lightbulb, Zap, Flame, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const InnovationHub = () => {
  // Sample data for innovation projects
  const projects = [
    {
      id: 1,
      title: 'Biodegradable Packaging',
      category: 'R&D',
      progress: 75,
      status: 'active',
      icon: Lightbulb,
    },
    {
      id: 2,
      title: 'Biorefinery Pilot',
      category: 'Infrastructure',
      progress: 45,
      status: 'active',
      icon: Zap,
    },
    {
      id: 3,
      title: 'Indigenous Knowledge Database',
      category: 'Digital',
      progress: 90,
      status: 'active',
      icon: Flame,
    },
    {
      id: 4,
      title: 'Sustainable Harvest Techniques',
      category: 'Education',
      progress: 60,
      status: 'active',
      icon: Lightbulb,
    },
  ];
  
  return (
    <div className="bio-card p-6 h-full flex flex-col">
      <SectionTitle 
        title="Innovation Hub" 
        subtitle="Ongoing projects and innovation initiatives"
      />
      
      <div className="flex space-x-4 mb-6 mt-1 overflow-x-auto pb-2">
        <button className="bio-button text-xs whitespace-nowrap">All Projects</button>
        <button className="text-xs py-2 px-4 bg-bio-gray rounded-lg transition-all hover:bg-bio-gray-dark whitespace-nowrap">R&D</button>
        <button className="text-xs py-2 px-4 bg-bio-gray rounded-lg transition-all hover:bg-bio-gray-dark whitespace-nowrap">Infrastructure</button>
        <button className="text-xs py-2 px-4 bg-bio-gray rounded-lg transition-all hover:bg-bio-gray-dark whitespace-nowrap">Digital</button>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto">
        {projects.map((project) => {
          const ProjectIcon = project.icon;
          return (
            <div 
              key={project.id}
              className="bio-card p-4 hover:bg-white transition-all duration-300 hover:border-bio-blue/30 cursor-pointer flex items-center"
            >
              <div className={`p-2 rounded-full ${project.category === 'R&D' ? 'bg-bio-green/10 text-bio-green' : project.category === 'Digital' ? 'bg-bio-blue/10 text-bio-blue' : 'bg-orange-100 text-orange-500'} mr-4`}>
                <ProjectIcon className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium">{project.title}</h3>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-gray-500">{project.category}</span>
                  <div className="mx-2 w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 rounded-full h-1.5 flex-1 max-w-[100px]">
                    <div 
                      className="h-1.5 rounded-full bg-bio-green"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-1 text-gray-600">{project.progress}%</span>
                </div>
              </div>
              
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="bio-button-secondary w-full flex items-center justify-center">
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InnovationHub;
