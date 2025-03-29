
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/reportTypes';

interface TrendsProjectionChartProps {
  chartData: ChartData;
}

export const TrendsProjectionChart: React.FC<TrendsProjectionChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Valor Atual" fill="#0088FE" />
        <Bar dataKey={data => data.category === 'projeção' ? data.value : 0} name="Projeção" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
};
