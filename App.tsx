import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CircleHelp, Github, Leaf, ShieldCheck } from 'lucide-react';
import { SolarNavigation } from './components/SolarNavigation';
import { Dashboard } from './components/Dashboard';
import { DataGrid } from './components/DataGrid';
import { ProcessFlow } from './components/ProcessFlow';
import { ControlPanel } from './components/ControlPanel';
import { Homeostasis } from './components/Homeostasis';
import { ViewState } from './types';

export type Preferences = { motion: boolean; grid: boolean; compact: boolean };
export const DEFAULT_PREFERENCES: Preferences = { motion: true, grid: true, compact: false };
const STORE_KEY = 'morphogenetic-preferences-v1';
const TITLES: Record<ViewState, string> = {
  [ViewState.MORPHOLOGY]: 'System overview',
  [ViewState.SEQUENCER]: 'Sequence explorer',
  [ViewState.MYCELIUM]: 'Process network',
  [ViewState.SYNAPSES]: 'Signal analytics',
  [ViewState.HOMEOSTASIS]: 'Console settings'
};
const VALID_VIEWS = Object.values(ViewState);

function readView(): ViewState {
  const hash = window.location.hash.slice(1).toUpperCase();
  return VALID_VIEWS.includes(hash as ViewState) ? hash as ViewState : ViewState.MORPHOLOGY;
}

function readPreferences(): Preferences {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return {
      motion: typeof raw.motion === 'boolean' ? raw.motion : true,
      grid: typeof raw.grid === 'boolean' ? raw.grid : true,
      compact: typeof raw.compact === 'boolean' ? raw.compact : false
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(readView);
  const [preferences, setPreferences] = useState<Preferences>(readPreferences);

  useEffect(() => {
    const syncHash = () => setActiveView(readView());
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = preferences.motion ? 'on' : 'off';
    document.documentElement.dataset.density = preferences.compact ? 'compact' : 'comfortable';
    try { localStorage.setItem(STORE_KEY, JSON.stringify(preferences)); } catch { /* private mode */ }
  }, [preferences]);

  const changeView = (view: ViewState) => {
    setActiveView(view);
    window.location.hash = view.toLowerCase();
  };

  const content: Record<ViewState, React.ReactNode> = {
    [ViewState.MORPHOLOGY]: <Dashboard />,
    [ViewState.SEQUENCER]: <DataGrid />,
    [ViewState.MYCELIUM]: <ProcessFlow />,
    [ViewState.SYNAPSES]: <ControlPanel />,
    [ViewState.HOMEOSTASIS]: (
      <Homeostasis
        preferences={preferences}
        onChange={setPreferences}
        onReset={() => setPreferences(DEFAULT_PREFERENCES)}
      />
    )
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-bio-void text-bio-nucleus lg:flex-row">
      {preferences.grid && <div aria-hidden className="turing-pattern pointer-events-none absolute inset-0 z-0" />}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-60 h-[680px] w-[680px] rounded-full bg-bio-plasma/[0.055] blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-40 h-[650px] w-[650px] rounded-full bg-bio-enzyme/[0.035] blur-[120px]" />

      <aside className="relative z-20 w-full shrink-0 border-b border-bio-lipid/70 bg-[#0a100ef2] lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-[238px] lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 px-5 pb-3 pt-5 lg:pb-9 lg:pt-8">
          <div aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-bio-plasma/25 bg-bio-plasma/10 text-bio-plasma">
            <Leaf size={23} strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-bio-plasma">Bio System</p>
            <p className="truncate text-lg font-bold tracking-tight">Morphogenetic<span className="text-bio-plasma">.</span></p>
          </div>
        </div>
        <div className="hidden px-6 pb-4 text-[10px] font-bold uppercase tracking-[.18em] text-bio-subtle/60 lg:block">Workspace / 01</div>
        <SolarNavigation activeView={activeView} onViewChange={changeView} />
        <div className="mt-auto hidden border-t border-bio-lipid/60 p-5 lg:block">
          <div className="rounded-2xl border border-bio-plasma/15 bg-bio-plasma/[0.045] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-bio-plasma"><ShieldCheck size={15} /> Local demo mode</div>
            <p className="text-xs leading-5 text-bio-subtle">All readings are synthetic. No cloud data or paid APIs.</p>
          </div>
          <a className="mt-4 flex items-center justify-between px-1 text-xs text-bio-subtle transition hover:text-bio-plasma" href="https://github.com/amiddlebrook/UI_template_3" target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2"><Github size={15} /> View source</span><ArrowUpRight size={14} />
          </a>
        </div>
      </aside>

      <main className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[75px] flex-wrap items-center justify-between gap-3 border-b border-bio-lipid/65 px-5 py-4 sm:px-8 lg:px-10">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-bio-subtle/70">Bio System / {activeView.toLowerCase()}</div>
            <div className="mt-1 text-base font-bold text-bio-nucleus">{TITLES[activeView]}</div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-bio-plasma/20 bg-bio-plasma/[0.07] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-bio-plasma">
              <span className="h-1.5 w-1.5 rounded-full bg-bio-plasma" /> Sample data
            </span>
            <button type="button" onClick={() => changeView(ViewState.HOMEOSTASIS)} title="Console settings" aria-label="Console settings" className="flex h-9 w-9 items-center justify-center rounded-xl border border-bio-lipid bg-bio-membrane text-bio-subtle hover:border-bio-plasma/40 hover:text-bio-plasma"><CircleHelp size={17} /></button>
          </div>
        </header>

        <div className="bio-page min-w-0 flex-1 px-2 py-5 sm:px-5 lg:px-8 lg:py-7">
          <section key={activeView} aria-label={TITLES[activeView]} className="mx-auto w-full max-w-[1450px]">
            {content[activeView]}
          </section>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-bio-lipid/60 px-5 py-4 text-[10px] font-medium uppercase tracking-[.16em] text-bio-subtle/70 sm:px-8 lg:px-10">
          <span>Workspace / Morphogenetic v1.0</span><span>Cloudflare static assets · Free tier</span>
        </footer>
      </main>
    </div>
  );
};

export default App;
