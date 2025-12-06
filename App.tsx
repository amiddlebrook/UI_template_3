import React, { useState } from 'react';
import { SolarNavigation } from './components/SolarNavigation';
import { Dashboard } from './components/Dashboard';
import { DataGrid } from './components/DataGrid';
import { ProcessFlow } from './components/ProcessFlow';
import { ControlPanel } from './components/ControlPanel'; // Repurposed as Analytics
import { ViewState } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.MORPHOLOGY);

  const renderContent = () => {
    switch (activeView) {
      case ViewState.MORPHOLOGY: return <Dashboard />;
      case ViewState.SEQUENCER: return <DataGrid />;
      case ViewState.MYCELIUM: return <ProcessFlow />;
      case ViewState.SYNAPSES: return <ControlPanel />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-full text-bio-subtle">
                <div className="text-4xl mb-4 opacity-20 font-display">STASIS</div>
            </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-bio-void overflow-hidden text-bio-nucleus relative">
      {/* Background Layer: Turing Pattern */}
      <div className="absolute inset-0 turing-pattern pointer-events-none z-0"></div>
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-bio-plasma/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-bio-enzyme/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 z-0 pointer-events-none"></div>

      {/* Layout Grid */}
      <div className="relative z-10 flex w-full h-full">
          
          {/* Navigation Column (The Spine) */}
          <div className="w-32 h-full border-r border-bio-lipid/30 backdrop-blur-sm flex flex-col items-center z-20 bg-bio-void/50">
              <div className="mt-8 mb-4">
                  <div className="w-8 h-8 rounded bg-bio-plasma rotate-45"></div>
              </div>
              <SolarNavigation activeView={activeView} onViewChange={setActiveView} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 h-full relative overflow-hidden flex flex-col">
              {/* Top Bar / HUD */}
              <div className="h-20 px-8 flex items-center justify-between border-b border-bio-lipid/30">
                   <div className="text-xs font-mono text-bio-subtle">
                       MORPHOGENETIC_ENGINE <span className="text-bio-plasma">v4.2</span>
                   </div>
                   <div className="flex gap-4">
                       <div className="px-3 py-1 rounded-full border border-bio-lipid text-[10px] text-bio-subtle font-mono uppercase">
                           pH 7.4
                       </div>
                       <div className="px-3 py-1 rounded-full border border-bio-lipid text-[10px] text-bio-subtle font-mono uppercase">
                           O2 98%
                       </div>
                   </div>
              </div>

              {/* Viewport */}
              <div className="flex-1 relative overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="h-full w-full"
                    >
                        {renderContent()}
                    </motion.div>
                 </AnimatePresence>
              </div>
          </div>
      </div>

    </div>
  );
};

export default App;