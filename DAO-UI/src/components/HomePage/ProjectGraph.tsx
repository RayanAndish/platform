// src/components/HomePage/ProjectGraph.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProjectGraphProps {
  data: { projectName: string; fundedAmount: number }[];
}

const ProjectGraph: React.FC<ProjectGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="projectName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="fundedAmount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectGraph;