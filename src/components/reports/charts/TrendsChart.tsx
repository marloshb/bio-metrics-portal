
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/reportTypes';

interface TrendsChartProps {
  chartData: ChartData;
}

export const TrendsChart: React.FC<TrendsChartProps> = ({ chartData }) => {
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
        <Tooltip formatter={(value: number) => [`${value}%`, 'Crescimento']} />
        <Legend />
        <Bar dataKey="value" name="Crescimento (%)" fill="#0088FE" />
      </BarChart>
    </ResponsiveContainer>
  );
};
