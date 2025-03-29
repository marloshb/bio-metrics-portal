
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell } from 'recharts';
import { ChartData } from '@/types/reportTypes';

interface ModuleMetricsChartProps {
  chartData: ChartData;
}

export const ModuleMetricsChart: React.FC<ModuleMetricsChartProps> = ({ chartData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Group data by category if needed
  const organizeData = () => {
    if (chartData.type === 'bar' || chartData.type === 'line') {
      // Check if we need to group by category
      const hasCategories = chartData.data.some(d => d.category);
      
      if (hasCategories) {
        // Get unique labels and categories
        const labels = Array.from(new Set(chartData.data.map(d => d.label)));
        const categories = Array.from(new Set(chartData.data.map(d => d.category).filter(Boolean)));
        
        // Create organized data with one entry per label, containing all categories
        return labels.map(label => {
          const entry: any = { name: label };
          categories.forEach(category => {
            const matchingData = chartData.data.find(d => d.label === label && d.category === category);
            if (matchingData) {
              entry[category as string] = matchingData.value;
              if (matchingData.unit) entry[`${category}_unit`] = matchingData.unit;
            }
          });
          return entry;
        });
      }
    }
    
    // Default: just map the data for simple charts
    return chartData.data.map(d => ({
      name: d.label,
      value: d.value,
      unit: d.unit,
      category: d.category,
      region: d.region
    }));
  };

  const organizedData = organizeData();
  
  // Get categories if needed for rendering multiple series
  const getCategories = () => {
    if (chartData.type === 'bar' || chartData.type === 'line') {
      return Array.from(new Set(chartData.data.map(d => d.category).filter(Boolean))) as string[];
    }
    return [];
  };
  
  const categories = getCategories();

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (chartData.type) {
      case 'bar':
        return (
          <BarChart data={organizedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number, name: string, props: any) => {
              const unitKey = `${name}_unit`;
              const unit = props.payload[unitKey] || chartData.data[0]?.unit || '';
              return [`${value.toLocaleString()} ${unit}`, name];
            }} />
            <Legend />
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Bar key={category} dataKey={category} fill={COLORS[index % COLORS.length]} name={category} />
              ))
            ) : (
              <Bar dataKey="value" fill="#0088FE" name={chartData.data[0]?.category || 'Valor'} />
            )}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={organizedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number, name: string, props: any) => {
              const unitKey = `${name}_unit`;
              const unit = props.payload[unitKey] || chartData.data[0]?.unit || '';
              return [`${value.toLocaleString()} ${unit}`, name];
            }} />
            <Legend />
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Line key={category} type="monotone" dataKey={category} stroke={COLORS[index % COLORS.length]} name={category} />
              ))
            ) : (
              <Line type="monotone" dataKey="value" stroke="#0088FE" name={chartData.data[0]?.category || 'Valor'} />
            )}
          </LineChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={organizedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {organizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [value.toLocaleString() + (chartData.data[0]?.unit ? ` ${chartData.data[0].unit}` : ''), 'Valor']} />
            <Legend />
          </PieChart>
        );
        
      case 'radar':
        // Radar charts work differently - need to restructure for categories vs regions
        const radarData = organizedData;
        return (
          <RadarChart outerRadius={90} cx="50%" cy="50%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Radar key={category} name={category} dataKey={category} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} fillOpacity={0.3} />
              ))
            ) : (
              <Radar name={chartData.data[0]?.category || 'Valor'} dataKey="value" stroke="#0088FE" fill="#0088FE" fillOpacity={0.3} />
            )}
            <Legend />
            <Tooltip formatter={(value: number) => [value.toLocaleString() + (chartData.data[0]?.unit ? ` ${chartData.data[0].unit}` : ''), 'Valor']} />
          </RadarChart>
        );
        
      case 'scatter':
        // For scatter charts, we need x and y coordinates
        // Assuming value is y and category value is x
        return (
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="category" name="categoria" unit="" />
            <YAxis type="number" dataKey="value" name="valor" unit={chartData.data[0]?.unit || ''} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number) => value.toLocaleString()} />
            <Legend />
            <Scatter name="Dados" data={organizedData} fill="#0088FE" />
          </ScatterChart>
        );

      default:
        return <div className="flex items-center justify-center h-full">Tipo de gráfico não suportado</div>;
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  );
};
