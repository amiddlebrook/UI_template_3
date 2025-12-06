import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';
import { Activity, Zap, Droplet, Wind } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-4">
       <div className="mb-8">
           <h1 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-nucleus to-bio-subtle">
               MORPHOLOGY
           </h1>
           <p className="font-mono text-bio-plasma text-xs mt-2 tracking-widest">SYSTEM_STATE: EVOLVING</p>
       </div>

       {/* Organic Grid Layout */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Primary Organelle - Large morphing shape */}
           <div className="col-span-1 md:col-span-2 h-96 relative">
               <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-bio-plasma/10 to-bio-enzyme/10 animate-morph blur-xl"
               />
               <Card organic className="h-full relative z-10 border-bio-plasma/20">
                   <div className="h-full flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                           <div>
                               <h2 className="text-3xl font-display font-bold text-bio-plasma">Metabolism</h2>
                               <span className="text-xs text-bio-subtle font-mono">ENERGY PRODUCTION CYCLE</span>
                           </div>
                           <Activity className="text-bio-plasma" size={32} />
                       </div>
                       
                       <div className="flex-1 flex items-center justify-center">
                            {/* Abstract Visualization */}
                            <div className="relative w-full h-32 flex items-center gap-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-bio-plasma rounded-full"
                                        initial={{ height: 10, opacity: 0.2 }}
                                        animate={{ 
                                            height: [10, 40 + Math.random() * 60, 10],
                                            opacity: [0.2, 0.8, 0.2]
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>
                       </div>

                       <div className="grid grid-cols-3 gap-4 border-t border-bio-lipid/50 pt-4">
                           <div>
                               <div className="text-2xl font-bold font-display">98%</div>
                               <div className="text-[10px] text-bio-subtle uppercase">Efficiency</div>
                           </div>
                           <div>
                               <div className="text-2xl font-bold font-display">42°C</div>
                               <div className="text-[10px] text-bio-subtle uppercase">Core Temp</div>
                           </div>
                           <div>
                               <div className="text-2xl font-bold font-display">1.2k</div>
                               <div className="text-[10px] text-bio-subtle uppercase">ATP Output</div>
                           </div>
                       </div>
                   </div>
               </Card>
           </div>

           {/* Secondary Organelles - Stacked */}
           <div className="col-span-1 flex flex-col gap-6">
               <Card className="flex-1 min-h-[180px]">
                   <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-xl bg-bio-enzyme/10 text-bio-enzyme">
                           <Zap size={20} />
                       </div>
                       <div>
                           <div className="font-bold text-bio-nucleus">Neural Load</div>
                           <div className="text-xs text-bio-subtle">CORTEX ACTIVITY</div>
                       </div>
                   </div>
                   <div className="w-full bg-bio-lipid rounded-full h-2 mb-2 overflow-hidden">
                       <motion.div 
                            className="h-full bg-bio-enzyme"
                            initial={{ width: '0%' }}
                            animate={{ width: '64%' }}
                            transition={{ duration: 1 }}
                       />
                   </div>
                   <div className="text-right text-xs text-bio-enzyme font-mono">64% CAPACITY</div>
               </Card>

               <Card className="flex-1 min-h-[180px]">
                   <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
                           <Droplet size={20} />
                       </div>
                       <div>
                           <div className="font-bold text-bio-nucleus">Hydration</div>
                           <div className="text-xs text-bio-subtle">FLUID DYNAMICS</div>
                       </div>
                   </div>
                    {/* Liquid animation */}
                   <div className="relative h-16 w-full overflow-hidden rounded-lg bg-bio-lipid/50">
                       <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-cyan-500/50"
                            animate={{ height: ['40%', '45%', '35%', '40%'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                       />
                       <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-cyan-500/30"
                            animate={{ height: ['42%', '38%', '46%', '42%'] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                       />
                   </div>
               </Card>
           </div>

           {/* Tertiary Strip */}
           <div className="col-span-1 md:col-span-3 h-48">
               <Card title="Environmental Stasis" className="h-full">
                   <div className="flex h-full items-center justify-around">
                        {[1,2,3,4,5].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <motion.div 
                                    className="w-16 h-16 rounded-full border border-bio-lipid flex items-center justify-center group-hover:border-bio-plasma transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                >
                                    <Wind size={20} className="text-bio-subtle group-hover:text-bio-plasma" />
                                </motion.div>
                                <span className="text-xs font-mono text-bio-subtle group-hover:text-bio-nucleus">Zone 0{i}</span>
                            </div>
                        ))}
                   </div>
               </Card>
           </div>

       </div>
    </div>
  );
};