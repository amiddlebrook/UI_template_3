import React, { useState } from 'react';
import { ArrowRight, Check, GitGraph, Play, RotateCcw } from 'lucide-react';

const STEPS = [
  { name: 'Nutrient input', category: '01 / Intake', description: 'Raw environmental signals enter the model.', label: 'Absorption' },
  { name: 'Reaction engine', category: '02 / Transform', description: 'Sample signals pass through a synthetic reaction stage.', label: 'Catalysis' },
  { name: 'Signal routing', category: '03 / Relay', description: 'Output is normalized and routed through a virtual network.', label: 'Transmission' },
  { name: 'Bloom output', category: '04 / Emit', description: 'The demonstration cycle completes with a new sample output.', label: 'Output' }
];

export const ProcessFlow: React.FC = () => {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const advance = () => {
    if (complete) { setStep(0); setComplete(false); }
    else if (step === STEPS.length - 1) setComplete(true);
    else setStep(current => current + 1);
  };

  return (
    <div className="p-2 sm:p-3">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-plasma"><GitGraph size={14} /> Reaction network / Simulated</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Mycelium Network</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-bio-subtle">Trace a simple four-stage reaction pipeline. The simulation runs entirely in your browser.</p>
        </div>
        <button type="button" onClick={advance} className="bio-button bio-button-primary flex items-center gap-2 text-sm">{complete ? <RotateCcw size={16} /> : <Play size={16} />}{complete ? 'Restart cycle' : 'Advance stage'}</button>
      </div>
      <section className="bio-panel overflow-hidden rounded-3xl p-5 sm:p-8">
        <div className="mb-7 flex flex-wrap justify-between gap-3 border-b border-bio-lipid/80 pb-5">
          <div><div className="text-xs font-bold uppercase tracking-widest text-bio-subtle">Current stage</div><div role="status" className="mt-1 text-xl font-bold">{complete ? 'Cycle complete' : STEPS[step].name}</div></div>
          <span className="h-fit rounded-full border border-bio-plasma/30 bg-bio-plasma/10 px-3 py-2 text-xs font-semibold text-bio-plasma">{complete ? '4 / 4 complete' : `${step + 1} / 4 processing`}</span>
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          {STEPS.map((item, index) => {
            const done = complete || index < step;
            const active = !complete && index === step;
            return (
              <div key={item.name} className="relative flex items-center gap-3 lg:block">
                <div className={`relative flex-1 rounded-2xl border p-5 transition-all duration-300 lg:min-h-[255px] ${active ? 'border-bio-plasma/60 bg-bio-plasma/[0.08] shadow-[0_0_35px_rgba(200,242,108,.07)]' : done ? 'border-bio-plasma/20 bg-[#121e17]' : 'border-bio-lipid bg-[#0d1512]'}`}>
                  <div className="mb-7 flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-bio-plasma' : 'text-bio-subtle'}`}>{item.category}</span>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${done ? 'bg-bio-plasma text-bio-void' : active ? 'border border-bio-plasma text-bio-plasma' : 'border border-bio-lipid text-bio-subtle'}`}>{done ? <Check size={16} /> : String(index + 1)}</span>
                  </div>
                  <div className="mb-1 text-base font-bold">{item.name}</div>
                  <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-bio-plasma">{item.label}</div>
                  <p className="text-xs leading-5 text-bio-subtle">{item.description}</p>
                </div>
                {index < STEPS.length - 1 && <ArrowRight aria-hidden size={17} className="hidden shrink-0 text-bio-plasma/50 lg:absolute lg:-right-[15px] lg:top-1/2 lg:z-10 lg:block" />}
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-bio-subtle"><span>Pipeline progress</span><span>{complete ? 100 : Math.round((step / STEPS.length) * 100)}%</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-bio-lipid"><div className="h-full rounded-full bg-bio-plasma transition-all duration-500" style={{ width: (complete ? 100 : step / STEPS.length * 100) + '%' }} /></div>
        </div>
      </section>
      <p className="mt-5 px-2 text-xs leading-5 text-bio-subtle">This is an interactive visualization of process states, not a real-time automation or live biological workflow.</p>
    </div>
  );
};
