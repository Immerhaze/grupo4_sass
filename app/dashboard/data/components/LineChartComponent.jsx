// components/charts/LineChartComponent.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_SUBJECTS } from '@/lib/DummyPerformanceOverallData'; // <--- ADD THIS IMPORT

export function LineChartComponent({ data, xAxisDataKey, lineDataKey, title, description, stroke = "#8884d8" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis domain={[0, 10]} />
              <Tooltip 
                         formatter={(value, name) => {
                          if (name === lineDataKey) {
                           return [value, 'Nota Promedio']; // Custom label on hover
                             }
                             return [value, name];
                             }}
                            />
            <Line type="monotone" dataKey={lineDataKey} stroke={stroke} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}





// Define some default colors for multiple lines
const DEFAULT_STROKES = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a5aaad", "#d0ed57",
    "#f45b5b", "#9f738e", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"
];

export function MultiLineChartComponent({ data, xAxisDataKey, lineDataKeys, title, description, strokes = DEFAULT_STROKES }) {
    // If lineDataKeys is a single string, convert it to an array for consistency
    const keysArray = Array.isArray(lineDataKeys) ? lineDataKeys : [lineDataKeys];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisDataKey} />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        {keysArray.map((key, index) => (
                            <Line
                                key={key} // Unique key for each line
                                type="monotone"
                                dataKey={key} // Each subject's data key
                                stroke={strokes[index % strokes.length]} // Cycle through defined strokes
                                activeDot={{ r: 8 }}
                                name={ALL_SUBJECTS.find(s => s.id === key)?.name || key} // Display subject name in legend/tooltip
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}