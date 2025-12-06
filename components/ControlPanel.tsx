import React from 'react';
import { Card } from './ui/Card';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const DATA = [
  { name: 'G1', val: 40 },
  { name: 'S', val: 70 },
  { name: 'G2', val: 50 },
  { name: 'M', val: 85 },
];

export const ControlPanel: React.FC = () => {
  return (
    <div className="h-full w-full p-4">
        <h1 className="text-3xl font-display font-bold text-bio-nucleus mb-6">SYNAPTIC ANALYTICS</h1>
        <div className="grid grid-cols-2 gap-6 h-[500px]">
            <Card title="Cell Cycle Phase" className="col-span-1">
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={DATA}>
                         <XAxis dataKey="name" stroke="#4B5563" tickLine={false} axisLine={false} />
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#16181A', border: '1px solid #2A2D33', borderRadius: '12px' }}
                            itemStyle={{ color: '#C4F042' }}
                            cursor={{ fill: '#2A2D33' }}
                         />
                         <Bar dataKey="val" fill="#C4F042" radius={[4, 4, 4, 4]} barSize={40} />
                     </BarChart>
                 </ResponsiveContainer>
            </Card>
            <Card title="Neural Density" className="col-span-1 relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-64 border border-bio-enzyme/30 rounded-full animate-pulse-fast flex items-center justify-center">
                         <div className="w-48 h-48 border border-bio-enzyme/60 rounded-full flex items-center justify-center">
                              <div className="w-32 h-32 bg-bio-enzyme/20 rounded-full blur-xl"></div>
                              <span className="absolute text-4xl font-bold font-display text-bio-enzyme">8.4Hz</span>
                         </div>
                     </div>
                 </div>
            </Card>
        </div>
    </div>
  );
};