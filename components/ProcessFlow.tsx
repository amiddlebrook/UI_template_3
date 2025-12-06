import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';

export const ProcessFlow: React.FC = () => {
  return (
    <div className="h-full w-full p-4 relative overflow-hidden">
        {/* Background Root System */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <path d="M100,300 Q400,100 800,300 T1200,300" fill="none" stroke="#C4F042" strokeWidth="2" />
            <path d="M100,300 Q400,500 800,300" fill="none" stroke="#FF3366" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="100" cy="300" r="4" fill="#E1E1E6" />
            <circle cx="800" cy="300" r="4" fill="#E1E1E6" />
        </svg>

        <div className="grid grid-cols-3 gap-8 h-full relative z-10">
            
            {/* Input Node */}
            <div className="col-span-1 flex items-center justify-center">
                <Card organic className="w-64 h-64 flex flex-col items-center justify-center text-center border-bio-plasma">
                     <div className="w-20 h-20 rounded-full bg-bio-plasma/20 flex items-center justify-center mb-4 animate-pulse-fast">
                         <div className="w-10 h-10 rounded-full bg-bio-plasma"></div>
                     </div>
                     <h3 className="text-xl font-display font-bold text-bio-nucleus">Nutrient Input</h3>
                     <p className="text-xs text-bio-subtle mt-2">ABSORPTION PHASE</p>
                </Card>
            </div>

            {/* Processing Nodes (Floating) */}
            <div className="col-span-1 flex flex-col justify-around py-20">
                 {[1, 2].map((i) => (
                     <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05, x: 10 }}
                        className="bg-bio-membrane border border-bio-lipid p-6 rounded-[2rem] flex items-center gap-4 shadow-xl"
                     >
                         <div className="h-12 w-1 rounded-full bg-bio-enzyme"></div>
                         <div>
                             <div className="text-sm font-bold text-bio-nucleus">Enzymatic Reaction {i}</div>
                             <div className="text-[10px] font-mono text-bio-enzyme">CATALYZING...</div>
                         </div>
                     </motion.div>
                 ))}
            </div>

            {/* Output Node */}
            <div className="col-span-1 flex items-center justify-center">
                 <div className="relative">
                     {/* Spores Visualization */}
                     {Array.from({ length: 12 }).map((_, i) => (
                         <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-bio-nucleus"
                            animate={{
                                x: Math.cos(i * 30 * (Math.PI/180)) * 100,
                                y: Math.sin(i * 30 * (Math.PI/180)) * 100,
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                         />
                     ))}
                     
                     <Card className="w-48 h-48 rounded-full flex items-center justify-center border-bio-nucleus/50">
                         <div className="text-center">
                             <div className="text-3xl font-display font-bold text-white">Bloom</div>
                             <div className="text-xs text-bio-subtle mt-1">OUTPUT READY</div>
                         </div>
                     </Card>
                 </div>
            </div>

        </div>
    </div>
  );
};