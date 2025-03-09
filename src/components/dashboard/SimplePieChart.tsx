
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/types';

interface SimplePieChartProps {
  data: ChartData[];
  title: string;
  dataKey?: string;
}

const COLORS = ['#3391b1', '#00c49f', '#ffbb28', '#ff8042', '#9e88f2', '#ff6b6b'];

const SimplePieChart = ({ data, title, dataKey = 'value' }: SimplePieChartProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
      <h3 className="text-base font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimplePieChart;
