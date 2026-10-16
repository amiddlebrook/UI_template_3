import React, { useState } from 'react';
import { Activity, ArrowUpRight, Check, Droplets, Radio, RefreshCw, Waves, Zap } from 'lucide-react';

const BASE_BARS = [35, 48, 42, 66, 54, 71, 62, 81, 68, 87, 76, 91, 83, 98, 72, 88, 76, 69, 81, 65, 75, 58, 68, 48];
const ZONES = [
  { name: 'Canopy', number: '01', metric: '72%', description: 'Simulated respiration' },
  { name: 'Root', number: '02', metric: '86%', description: 'Simulated uptake' },
  { name: 'Membrane', number: '03', metric: '64%', description: 'Simulated permeability' },
  { name: 'Cortex', number: '04', metric: '91%', description: 'Simulated neural activity' }
];

export const Dashboard: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const [zone, setZone] = useState(0);
  const efficiency = 93 + (cycle % 5);
  return (
    <div className="p-2 sm:p-3">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-plasma"><span className="h-1.5 w-1.5 rounded-full bg-bio-plasma" /> Overview / Interactive demo</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">System Morphology</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-bio-subtle">A living interface for complex systems. Explore the structure, flows, and signals of a simulated organism.</p>
        </div>
        <button type="button" className="bio-button flex items-center gap-2 text-sm" onClick={() => setCycle(n => n + 1)}><RefreshCw size={16} /> Advance sample cycle</button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Efficiency', value: efficiency + '%', detail: 'Synthetic metabolic model', icon: Zap, color: 'text-bio-plasma' },
          { label: 'Neural load', value: (64 + cycle % 11) + '%', detail: 'Synthetic signal capacity', icon: Activity, color: 'text-bio-enzyme' },
          { label: 'Fluid balance', value: (84 + cycle % 8) + '%', detail: 'Synthetic equilibrium', icon: Droplets, color: 'text-cyan-300' }
        ].map(item => (
          <div className="bio-panel rounded-2xl p-5" key={item.label}>
            <div className="flex items-center justify-between text-xs text-bio-subtle"><span className="font-semibold uppercase tracking-[.12em]">{item.label}</span><item.icon size={18} className={item.color} /></div>
            <div className="mt-3 text-4xl font-bold tracking-tight">{item.value}</div>
            <p className="mt-2 text-xs text-bio-subtle/85">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <section className="bio-panel min-h-[365px] overflow-hidden rounded-3xl p-6 sm:p-8 xl:col-span-3">
          <div className="mb-7 flex items-start justify-between">
            <div><div className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma">01 / Metabolic output</div><h2 className="text-2xl font-bold tracking-tight">Energy signature</h2><p className="mt-1 text-sm text-bio-subtle">Relative activity over a sample cycle</p></div>
            <span className="rounded-lg border border-bio-plasma/20 bg-bio-plasma/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-bio-plasma">Cycle {String(cycle + 1).padStart(2, '0')}</span>
          </div>
          <div role="img" aria-label="Illustrative chart of fluctuating sample energy activity" className="flex h-44 items-end gap-[5px] rounded-xl border-b border-bio-lipid/80 pb-0.5 sm:gap-2">
            {BASE_BARS.map((bar, i) => {
              const height = Math.min(100, Math.max(14, bar + Math.sin(cycle + i * .7) * 12));
              return <div key={i} className="group relative flex h-full flex-1 items-end"><div className="w-full rounded-t-sm bg-gradient-to-t from-bio-plasma/25 to-bio-plasma transition-all duration-500 group-hover:from-bio-enzyme/60 group-hover:to-bio-enzyme" style={{ height: height + '%' }} /></div>;
            })}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-bio-subtle"><span>Start / 00</span><span>Energy distribution · Arbitrary units</span><span>End / 24</span></div>
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-bio-lipid/80 pt-6 sm:grid-cols-3">
            <div><div className="text-xl font-bold">1.2k</div><div className="text-xs text-bio-subtle">Sample output</div></div>
            <div><div className="text-xl font-bold">4.2 s</div><div className="text-xs text-bio-subtle">Synthetic interval</div></div>
            <div className="col-span-2 sm:col-span-1"><div className="flex items-center gap-1 text-xl font-bold text-bio-plasma"><Check size={18} /> Normal</div><div className="text-xs text-bio-subtle">Demo model state</div></div>
          </div>
        </section>

        <section className="bio-panel relative flex min-h-[365px] flex-col overflow-hidden rounded-3xl p-6 sm:p-8 xl:col-span-2">
          <div className="relative z-10"><div className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma">02 / Organism topology</div><h2 className="text-2xl font-bold tracking-tight">Living nucleus</h2><p className="mt-1 text-sm text-bio-subtle">Procedural spatial illustration</p></div>
          <div className="relative flex flex-1 items-center justify-center py-8" role="img" aria-label="Animated concentric biological energy rings">
            <div aria-hidden className="absolute h-56 w-56 rounded-full border border-bio-plasma/10 sm:h-64 sm:w-64" />
            <div aria-hidden className="absolute h-44 w-44 animate-[spin_40s_linear_infinite] rounded-[42%] border border-dashed border-bio-plasma/40 sm:h-52 sm:w-52" />
            <div aria-hidden className="absolute h-36 w-36 animate-morph rounded-[40%] border border-bio-plasma/35 bg-bio-plasma/[0.07] shadow-[0_0_75px_rgba(200,242,108,.12)] sm:h-40 sm:w-40" />
            <div aria-hidden className="absolute h-20 w-20 rounded-full bg-bio-plasma/20 blur-xl" />
            <div className="relative z-10 text-center"><div className="text-3xl font-bold text-bio-plasma">Ø</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-bio-subtle">Nucleus</div></div>
          </div>
          <div className="relative z-10 flex items-center justify-between border-t border-bio-lipid/80 pt-5 text-xs"><span className="flex items-center gap-2 text-bio-subtle"><Radio size={14} className="text-bio-plasma" /> Topology simulation</span><span className="font-semibold text-bio-plasma">Stable</span></div>
        </section>
      </div>

      <section className="bio-panel mt-5 rounded-3xl p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2"><div><div className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma">03 / Environments</div><h2 className="text-xl font-bold">Explore system zones</h2></div><span className="text-xs text-bio-subtle">Select a zone below</span></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {ZONES.map((item, i) => (
            <button type="button" key={item.number} onClick={() => setZone(i)} aria-pressed={zone === i} className={`rounded-2xl border p-4 text-left transition sm:p-5 ${zone === i ? 'border-bio-plasma/40 bg-bio-plasma/10' : 'border-bio-lipid/80 bg-[#0c1512] hover:border-bio-plasma/30'}`}>
              <div className="flex items-center justify-between text-[10px] text-bio-subtle"><span>ZONE / {item.number}</span><ArrowUpRight size={15} /></div>
              <Waves size={22} className={`my-6 ${zone === i ? 'text-bio-plasma' : 'text-bio-subtle'}`} />
              <div className="text-sm font-bold">{item.name}</div><div className="mt-1 text-xs text-bio-subtle">{item.description}</div>
              <div className="mt-4 text-2xl font-bold text-bio-plasma">{item.metric}</div>
            </button>
          ))}
        </div>
        <p role="status" className="mt-5 text-xs text-bio-subtle">Selected environment: <strong className="text-bio-nucleus">{ZONES[zone].name}</strong>. Readings are generated for this interactive template, not measured.</p>
      </section>
    </div>
  );
};
