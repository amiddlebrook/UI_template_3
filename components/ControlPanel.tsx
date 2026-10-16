import React from 'react';
import { Activity, BarChart3, Radio, Waves } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DATA = [
  { name: 'G1', val: 40 },
  { name: 'S', val: 70 },
  { name: 'G2', val: 50 },
  { name: 'M', val: 85 }
];

export const ControlPanel: React.FC = () => (
  <div className="p-2 sm:p-3">
    <div className="mb-7">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-plasma"><BarChart3 size={14} /> Analytics / Sample data</div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Synaptic Analytics</h1>
      <p className="mt-2 text-sm text-bio-subtle">Signal distributions and synthetic network activity across model phases.</p>
    </div>
    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {[
        { label: 'Peak phase', value: 'M', icon: Activity },
        { label: 'Neural frequency', value: '8.4 Hz', icon: Radio },
        { label: 'Phase coverage', value: '04 / 04', icon: Waves }
      ].map(({ label, value, icon: Icon }) => <div key={label} className="bio-panel rounded-2xl p-5"><div className="flex items-center justify-between text-xs uppercase tracking-widest text-bio-subtle">{label}<Icon size={17} className="text-bio-plasma" /></div><div className="mt-3 text-3xl font-bold">{value}</div><p className="mt-2 text-xs text-bio-subtle">Illustrative measurement</p></div>)}
    </div>
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <section className="bio-panel min-w-0 rounded-3xl p-6 sm:p-8">
        <div className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma">Signal distribution / 01</div>
        <h2 className="text-xl font-bold">Cell-cycle profile</h2><p className="mt-1 text-sm text-bio-subtle">Relative activity, synthetic units</p>
        <div className="mt-6 h-[290px] w-full" role="img" aria-label="Bar chart with phase G1 40, S 70, G2 50 and M 85">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ left: -20, right: 8, top: 10, bottom: 0 }}>
              <CartesianGrid stroke="#263531" vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="name" tick={{ fill: '#94a69b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94a69b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#121a19', border: '1px solid #263531', borderRadius: '12px', color: '#edf3ec' }} cursor={{ fill: '#263531' }} />
              <Bar dataKey="val" name="Relative signal" fill="#c8f26c" radius={[6, 6, 0, 0]} maxBarSize={68} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="bio-panel relative min-h-[415px] overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="relative z-10 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma">Resonance / 02</div>
        <h2 className="relative z-10 mt-5 text-xl font-bold">Neural density</h2><p className="relative z-10 mt-1 text-sm text-bio-subtle">Illustrative resonance frequency</p>
        <div className="relative flex h-[285px] items-center justify-center">
          <div aria-hidden className="absolute h-64 w-64 animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-bio-enzyme/30" />
          <div aria-hidden className="absolute h-52 w-52 rounded-full border border-bio-enzyme/25" />
          <div aria-hidden className="absolute h-36 w-36 rounded-full border border-bio-enzyme/40 bg-bio-enzyme/[0.07] shadow-[0_0_85px_rgba(255,120,151,.09)]" />
          <div className="relative z-10 text-center"><div className="text-4xl font-bold tracking-tight text-bio-enzyme">8.4<span className="ml-1 text-xl">Hz</span></div><div className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-subtle">Sample signal</div></div>
        </div>
      </section>
    </div>
  </div>
);
