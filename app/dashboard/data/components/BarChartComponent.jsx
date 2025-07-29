// components/charts/BarChartComponent.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BarChartComponent({ data, xAxisDataKey, barDataKey, title, description, fill = "#8884d8" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis domain={[0, 10]} /> {/* Assuming grades are 0-10 */}
            <Tooltip />
            <Bar dataKey={barDataKey} fill={fill} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}