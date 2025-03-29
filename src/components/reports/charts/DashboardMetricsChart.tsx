
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { consolidatedReports } from '@/data/mockReportsData';

export const DashboardMetricsChart = () => {
  const report = consolidatedReports[0];
  
  // Transform the module data into a format suitable for the bar chart
  const chartData = report.modules.map(module => {
    const dataObj: any = { name: module.name.replace('Bioeconômicas', 'Biecon.').replace('Bioeconômico', 'Hub') };
    
    module.data.forEach(item => {
      // Use a standardized naming convention for metrics
      const metricName = item.name
        .replace('Projetos ativos', 'Projetos')
        .replace('Investimento total', 'Investimento')
        .replace('Iniciativas cadastradas', 'Iniciativas')
        .replace('Recursos disponíveis', 'Recursos')
        .replace('Área restaurada', 'Área')
        .replace('Emissões reduzidas', 'Emissões')
        .replace('Transações', 'Volume')
        .replace('Atores cadastrados', 'Atores')
        .replace('Regiões mapeadas', 'Regiões')
        .replace('Área com potencial', 'Potencial');
      
      // Normalize values for better visualization
      let value = item.value;
      if (item.unit === 'BRL' && value > 1000000) {
        value = value / 1000000; // Convert to millions
        dataObj[metricName] = value;
        dataObj[`${metricName}_unit`] = 'M BRL';
      } else if (item.unit === 'hectares' && value > 1000) {
        value = value / 1000; // Convert to thousands
        dataObj[metricName] = value;
        dataObj[`${metricName}_unit`] = 'mil ha';
      } else if (item.unit === 'tCO₂e' && value > 1000) {
        value = value / 1000; // Convert to thousands
        dataObj[metricName] = value;
        dataObj[`${metricName}_unit`] = 'mil tCO₂e';
      } else {
        dataObj[metricName] = value;
        dataObj[`${metricName}_unit`] = item.unit;
      }
      
      dataObj[`${metricName}_trend`] = item.trend;
    });
    
    return dataObj;
  });

  // Get all metric names for bars
  const metricNames = new Set<string>();
  chartData.forEach(data => {
    Object.keys(data).forEach(key => {
      if (!key.includes('_unit') && !key.includes('_trend') && key !== 'name') {
        metricNames.add(key);
      }
    });
  });
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string, props: any) => {
              const unitKey = `${name}_unit`;
              const unit = props.payload[unitKey] || '';
              return [`${value} ${unit}`, name];
            }}
          />
          <Legend />
          {Array.from(metricNames).map((metric, index) => (
            <Bar key={metric} dataKey={metric} fill={COLORS[index % COLORS.length]} name={metric} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
