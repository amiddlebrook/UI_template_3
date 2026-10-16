import React from 'react';
import { Activity, Dna, Fingerprint, GitGraph, SlidersHorizontal } from 'lucide-react';
import { ViewState } from '../types';

interface Props {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}
const NODES = [
  { id: ViewState.MORPHOLOGY, label: 'Morphology', description: 'System overview', icon: Fingerprint },
  { id: ViewState.SEQUENCER, label: 'Sequencer', description: 'Data explorer', icon: Dna },
  { id: ViewState.MYCELIUM, label: 'Mycelium', description: 'Process network', icon: GitGraph },
  { id: ViewState.SYNAPSES, label: 'Synapses', description: 'Analytics', icon: Activity },
  { id: ViewState.HOMEOSTASIS, label: 'Homeostasis', description: 'Preferences', icon: SlidersHorizontal }
] as const;

export const SolarNavigation: React.FC<Props> = ({ activeView, onViewChange }) => (
  <nav aria-label="Primary navigation" className="min-w-0 overflow-x-auto px-3 pb-3 lg:flex-1 lg:overflow-visible lg:px-3 lg:pb-0">
    <div className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col lg:gap-1.5">
      {NODES.map(({ id, label, description, icon: Icon }) => {
        const active = id === activeView;
        return (
          <button key={id} type="button" aria-current={active ? 'page' : undefined}
            onClick={() => onViewChange(id)}
            className={`group flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition lg:w-full lg:px-4 ${active ? 'border-bio-plasma/25 bg-bio-plasma/10 text-bio-plasma' : 'border-transparent text-bio-subtle hover:border-bio-lipid hover:bg-bio-membrane hover:text-bio-nucleus'}`}>
            <Icon size={19} strokeWidth={1.8} className="shrink-0" />
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-xs font-bold sm:text-sm">{label}</span>
              <span className={`hidden text-[11px] lg:block ${active ? 'text-bio-plasma/70' : 'text-bio-subtle/65'}`}>{description}</span>
            </span>
            {active && <span aria-hidden className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-bio-plasma lg:block" />}
          </button>
        );
      })}
    </div>
  </nav>
);
