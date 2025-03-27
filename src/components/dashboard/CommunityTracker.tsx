
import React from 'react';
import { Users, TrendingUp, Medal, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SectionTitle from '../ui/SectionTitle';
import StatCard from '../ui/StatCard';

const CommunityTracker = () => {
  // Sample data for community impact metrics
  const communityData = [
    { name: 'Jan', income: 35000, jobs: 85 },
    { name: 'Feb', income: 42000, jobs: 97 },
    { name: 'Mar', income: 38000, jobs: 90 },
    { name: 'Apr', income: 45000, jobs: 105 },
    { name: 'May', income: 48000, jobs: 120 },
    { name: 'Jun', income: 52000, jobs: 132 },
  ];
  
  return (
    <div className="bio-card p-6 h-full flex flex-col">
      <SectionTitle 
        title="Community Impact" 
        subtitle="Income generation and local development metrics"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StatCard 
          title="Communities Engaged" 
          value="27" 
          icon={Users}
          trend={{ value: 3, positive: true }}
          iconColor="text-bio-blue"
        />
        <StatCard 
          title="Avg. Income Growth" 
          value="32%" 
          icon={TrendingUp}
          trend={{ value: 5, positive: true }}
          iconColor="text-bio-green"
        />
      </div>
      
      <div className="flex-1 min-h-[220px] mt-2">
        <p className="text-sm font-medium mb-2">Community Income (Last 6 Months)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={communityData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `$${value/1000}k`} 
              width={50}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'income' ? `$${value.toLocaleString()}` : value,
                name === 'income' ? 'Income' : 'Jobs Created'
              ]}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)'
              }}
            />
            <Bar dataKey="income" fill="#2E7D32" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bio-card p-4 flex items-center">
          <Medal className="w-8 h-8 text-bio-green mr-3" />
          <div>
            <p className="text-xs text-gray-500">Top Community</p>
            <p className="text-sm font-semibold">Rio Verde Coop</p>
          </div>
        </div>
        <div className="bio-card p-4 flex items-center">
          <Calendar className="w-8 h-8 text-bio-blue mr-3" />
          <div>
            <p className="text-xs text-gray-500">Next Training</p>
            <p className="text-sm font-semibold">July 15, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTracker;
