import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ViewState, NavNode } from '../types';
import { Fingerprint, Dna, Activity, GitGraph, Radio } from 'lucide-react';

interface SolarNavigationProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const NODES: NavNode[] = [
  { id: ViewState.MORPHOLOGY, label: 'Morphology', icon: Fingerprint, description: 'System Overview' },
  { id: ViewState.SEQUENCER, label: 'Sequencer', icon: Dna, description: 'Data Arrays' },
  { id: ViewState.MYCELIUM, label: 'Mycelium', icon: GitGraph, description: 'Workflows' },
  { id: ViewState.SYNAPSES, label: 'Synapses', icon: Activity, description: 'Analytics' },
  { id: ViewState.HOMEOSTASIS, label: 'Homeostasis', icon: Radio, description: 'Controls' },
];

export const SolarNavigation: React.FC<SolarNavigationProps> = ({ activeView, onViewChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col items-center justify-center py-10 relative">
      {/* The Spinal Cord Line */}
      <div className="absolute left-1/2 top-10 bottom-10 w-px bg-bio-lipid -translate-x-1/2" />

      <div className="flex flex-col gap-8 relative z-10">
        {NODES.map((node, index) => {
          const isActive = node.id === activeView;
          
          // Calculate displacement based on hover to simulate connected vertebrae
          // If hovering index 2, index 1 and 3 move slightly towards it
          let xOffset = 0;
          let scale = 1;
          
          if (hoveredIndex !== null) {
              const distance = Math.abs(hoveredIndex - index);
              if (distance === 0) {
                  xOffset = 20;
                  scale = 1.2;
              } else if (distance === 1) {
                  xOffset = 10;
                  scale = 1.1;
              } else if (distance === 2) {
                  xOffset = 5;
                  scale = 1.05;
              }
          }

          const Icon = node.icon;

          return (
            <motion.button
              key={node.id}
              onClick={() => onViewChange(node.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-center"
              animate={{ 
                  x: isActive ? 20 : xOffset,
                  scale: isActive ? 1.2 : scale
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               {/* Vertebrae Shape */}
               <div className={`
                  w-14 h-14 rounded-2xl rotate-45 flex items-center justify-center
                  transition-all duration-300 relative overflow-hidden
                  ${isActive 
                    ? 'bg-bio-plasma text-bio-void shadow-[0_0_30px_rgba(196,240,66,0.3)]' 
                    : 'bg-bio-membrane border border-bio-lipid text-bio-subtle hover:border-bio-plasma/50 hover:text-bio-nucleus'}
               `}>
                   {/* Inner Organic Detail */}
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                   
                   <Icon size={24} className="-rotate-45" />
               </div>

               {/* Label (Only visible on hover or active) */}
               <div className={`
                    absolute left-20 whitespace-nowrap pointer-events-none transition-all duration-300
                    ${isActive || hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
               `}>
                   <div className="text-lg font-display font-bold text-bio-nucleus">{node.label}</div>
                   <div className="text-[10px] font-mono text-bio-plasma uppercase tracking-widest">{node.description}</div>
               </div>

               {/* Connection to spine */}
               <div className={`
                    absolute right-full top-1/2 h-0.5 bg-bio-lipid transition-all duration-300
                    ${isActive ? 'w-10 bg-bio-plasma' : 'w-6 group-hover:bg-bio-subtle'}
               `} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};