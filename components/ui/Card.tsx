import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  organic?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', organic = false }) => {
  return (
    <div className={`
      relative backdrop-blur-md bg-bio-membrane/60 border border-bio-lipid 
      overflow-hidden flex flex-col transition-all duration-700
      ${organic ? 'animate-morph hover:border-bio-plasma/30' : 'rounded-3xl hover:border-bio-enzyme/30'}
      ${className}
    `}>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {title && (
        <div className="px-6 py-4 border-b border-bio-lipid/50 flex justify-between items-center relative z-10">
          <h3 className="text-xs font-bold text-bio-plasma uppercase tracking-[0.2em] font-display">{title}</h3>
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-bio-lipid"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-bio-lipid"></div>
          </div>
        </div>
      )}
      <div className="p-6 flex-1 overflow-auto relative z-10">
        {children}
      </div>
    </div>
  );
};