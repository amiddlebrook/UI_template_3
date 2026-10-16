import React, { useState } from 'react';
import { Check, Download, HardDrive, RotateCcw, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { Preferences } from '../App';

interface Props {
  preferences: Preferences;
  onChange: (next: Preferences) => void;
  onReset: () => void;
}
const Switch: React.FC<{ label: string; description: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, description, checked, onChange }) => (
  <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-bio-lipid/70 py-5 last:border-b-0">
    <span>
      <span className="block text-sm font-semibold text-bio-nucleus">{label}</span>
      <span className="mt-1 block text-xs leading-5 text-bio-subtle">{description}</span>
    </span>
    <span className="relative shrink-0">
      <input className="peer sr-only" type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="block h-7 w-12 rounded-full border border-bio-lipid bg-[#24332d] transition peer-checked:border-bio-plasma peer-checked:bg-bio-plasma peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bio-plasma" />
      <span className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-bio-subtle transition-transform peer-checked:translate-x-5 peer-checked:bg-bio-void" />
    </span>
  </label>
);

export const Homeostasis: React.FC<Props> = ({ preferences, onChange, onReset }) => {
  const [exported, setExported] = useState(false);
  const update = (key: keyof Preferences, value: boolean) => { onChange({ ...preferences, [key]: value }); setExported(false); };
  const exportConfig = () => {
    const json = JSON.stringify({ version: 1, preferences, type: 'morphogenetic-local-demo' }, null, 2);
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'morphogenetic-preferences.json'; a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  return (
    <div className="p-2 sm:p-3">
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-plasma"><SlidersHorizontal size={14} /> Configuration / Local</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Homeostasis</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-bio-subtle">Tune your console experience. All changes apply immediately and stay on this device.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <section className="bio-panel rounded-3xl p-6 sm:p-8 xl:col-span-3">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-bio-plasma/10 p-3 text-bio-plasma"><Sparkles size={21} /></div>
            <div><h2 className="text-lg font-bold">Display preferences</h2><p className="text-xs text-bio-subtle">User interface settings</p></div>
          </div>
          <Switch label="Ambient motion" description="Turn background and component animations on or off." checked={preferences.motion} onChange={v => update('motion', v)} />
          <Switch label="Background pattern" description="Display the subtle biomorphic dot grid behind the interface." checked={preferences.grid} onChange={v => update('grid', v)} />
          <Switch label="Compact layout" description="Reduce page and card spacing for dense laptop screens." checked={preferences.compact} onChange={v => update('compact', v)} />
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bio-button bio-button-primary flex items-center gap-2" type="button" onClick={exportConfig}><Download size={16} /> Export preferences</button>
            <button className="bio-button flex items-center gap-2" type="button" onClick={() => { onReset(); setExported(false); }}><RotateCcw size={16} /> Restore defaults</button>
          </div>
          {exported && <p role="status" className="mt-4 flex items-center gap-2 text-xs text-bio-plasma"><Check size={15} /> Configuration exported as JSON.</p>}
        </section>
        <div className="space-y-5 xl:col-span-2">
          <section className="bio-panel rounded-3xl p-6">
            <div className="mb-3 flex items-center gap-2 text-bio-plasma"><ShieldCheck size={19} /><h2 className="text-base font-bold text-bio-nucleus">Privacy by design</h2></div>
            <p className="text-sm leading-6 text-bio-subtle">This is a standalone static application. It never sends dashboard values, settings, or user interactions to a backend.</p>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-bio-plasma/20 bg-bio-plasma/[0.07] px-3 py-3 text-xs font-semibold text-bio-plasma"><Check size={15} /> No account or API key required</div>
          </section>
          <section className="bio-panel rounded-3xl p-6">
            <div className="mb-3 flex items-center gap-2 text-bio-plasma"><HardDrive size={19} /><h2 className="text-base font-bold text-bio-nucleus">Browser storage</h2></div>
            <p className="text-sm leading-6 text-bio-subtle">Preferences use localStorage on this device. Clearing site data restores the defaults.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-bio-plasma">Active mode · Demo / Offline-capable after loading</p>
          </section>
        </div>
      </div>
    </div>
  );
};
