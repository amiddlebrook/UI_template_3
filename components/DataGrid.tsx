import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';

const DNA_DATA = Array.from({ length: 15 }).map((_, i) => ({
    id: `SEQ-${i.toString().padStart(3, '0')}`,
    value: Math.floor(Math.random() * 100),
    type: Math.random() > 0.5 ? 'HELIX' : 'STRAND',
    integrity: Math.floor(Math.random() * 30 + 70)
}));

export const DataGrid: React.FC = () => {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-6">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-display font-bold text-bio-nucleus">GENE SEQUENCER</h1>
                <p className="text-xs font-mono text-bio-subtle mt-1">DATA_STREAM // CHROMOSOMAL_VIEW</p>
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-bio-lipid border border-bio-subtle/20 text-xs text-bio-plasma hover:bg-bio-plasma hover:text-bio-void transition-colors">
                    RESEQUENCE
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
            <div className="h-full flex items-center gap-4 min-w-max px-4">
                {DNA_DATA.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-24 h-[80%] relative group"
                    >
                        {/* The "Gene" Container */}
                        <div className="absolute inset-0 bg-bio-membrane/80 border border-bio-lipid hover:border-bio-plasma/50 rounded-full flex flex-col items-center justify-between py-6 transition-all duration-300 group-hover:scale-105 group-hover:bg-bio-lipid">
                            
                            {/* Top Marker */}
                            <div className="w-2 h-2 rounded-full bg-bio-subtle group-hover:bg-bio-plasma"></div>
                            
                            {/* Vertical Data Vis */}
                            <div className="flex-1 w-full flex flex-col items-center justify-center gap-1 my-4">
                                {Array.from({ length: 8 }).map((_, j) => (
                                    <div 
                                        key={j} 
                                        className={`w-12 h-1 rounded-full transition-all duration-300 ${j < (item.value / 12) ? 'bg-bio-plasma' : 'bg-bio-lipid'}`}
                                        style={{ width: j % 2 === 0 ? '60%' : '40%' }}
                                    />
                                ))}
                            </div>

                            {/* Bottom Label */}
                            <div className="text-center">
                                <div className="text-[10px] font-mono text-bio-subtle">{item.id}</div>
                                <div className="text-xs font-bold text-bio-nucleus mt-1">{item.integrity}%</div>
                            </div>

                        </div>

                        {/* Connection Line */}
                        {index < DNA_DATA.length - 1 && (
                            <div className="absolute top-1/2 -right-6 w-8 h-0.5 bg-bio-lipid -z-10 group-hover:bg-bio-plasma/30 transition-colors"></div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
        
        {/* Footer Metrics */}
        <Card className="h-32">
            <div className="h-full flex items-center justify-around font-mono text-xs">
                 <div className="text-center">
                     <div className="text-bio-plasma text-xl font-display font-bold">14,203</div>
                     <div className="text-bio-subtle mt-1">BASE PAIRS</div>
                 </div>
                 <div className="w-px h-12 bg-bio-lipid"></div>
                 <div className="text-center">
                     <div className="text-bio-enzyme text-xl font-display font-bold">0.04%</div>
                     <div className="text-bio-subtle mt-1">MUTATION RATE</div>
                 </div>
            </div>
        </Card>
    </div>
  );
};