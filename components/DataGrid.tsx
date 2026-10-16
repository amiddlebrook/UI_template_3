import React, { useMemo, useState } from 'react';
import { Activity, ArrowRight, Dna, Filter, RefreshCw, Search } from 'lucide-react';

type Sequence = { id: string; type: 'HELIX' | 'STRAND'; value: number; integrity: number; length: number };
type FilterMode = 'ALL' | 'HELIX' | 'STRAND';

function buildSequences(seed: number): Sequence[] {
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(1664525, state) + 1013904223) >>> 0; return state / 4294967296; };
  return Array.from({ length: 24 }, (_, index) => ({
    id: `SEQ-${String(index + 1).padStart(3, '0')}`,
    type: random() > 0.5 ? 'HELIX' : 'STRAND',
    value: Math.round(24 + random() * 76),
    integrity: Math.round(67 + random() * 32),
    length: Math.round(800 + random() * 3600)
  }));
}

export const DataGrid: React.FC = () => {
  const [seed, setSeed] = useState(47);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterMode>('ALL');
  const [selectedId, setSelectedId] = useState('SEQ-001');
  const items = useMemo(() => buildSequences(seed), [seed]);
  const filtered = items.filter(item => (filter === 'ALL' || item.type === filter) && `${item.id} ${item.type}`.toLowerCase().includes(query.toLowerCase()));
  const selected = items.find(item => item.id === selectedId) ?? items[0];
  const meanIntegrity = Math.round(items.reduce((sum, item) => sum + item.integrity, 0) / items.length);

  return (
    <div className="p-2 sm:p-3">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-bio-plasma"><Dna size={14} /> Sequence library / simulated</div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Gene Sequencer</h1>
          <p className="mt-2 text-sm text-bio-subtle">Explore and regenerate deterministic sample sequences.</p>
        </div>
        <button type="button" className="bio-button bio-button-primary flex items-center gap-2 text-sm" onClick={() => { setSeed(old => old + 1); setSelectedId('SEQ-001'); }}>
          <RefreshCw size={16} /> Resequence data
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Active sequences', value: items.length.toString().padStart(2,'0'), detail: 'Generated in browser' },
          { label: 'Mean integrity', value: meanIntegrity + '%', detail: 'Synthetic indicator' },
          { label: 'Run identifier', value: '#' + seed, detail: 'Local regeneration' }
        ].map(m => (
          <div key={m.label} className="bio-panel rounded-2xl p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-bio-subtle">{m.label}</div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-bio-nucleus">{m.value}</div>
            <div className="mt-1 text-xs text-bio-subtle/80">{m.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="bio-panel min-w-0 overflow-hidden rounded-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bio-lipid/70 p-4 sm:p-5">
            <label className="relative min-w-[180px] flex-1">
              <Search size={16} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-bio-subtle" />
              <span className="sr-only">Search sequences</span>
              <input aria-label="Search sequences" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ID or type" className="bio-input pl-10 text-sm" />
            </label>
            <label className="flex items-center gap-2 text-bio-subtle">
              <Filter size={16} aria-hidden />
              <span className="sr-only">Filter by type</span>
              <select aria-label="Filter by type" value={filter} onChange={e => setFilter(e.target.value as FilterMode)} className="bio-input w-auto text-sm">
                <option value="ALL">All types</option><option value="HELIX">Helix</option><option value="STRAND">Strand</option>
              </select>
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-sm">
              <thead className="bg-white/[0.025] text-[10px] font-semibold uppercase tracking-[.14em] text-bio-subtle">
                <tr><th scope="col" className="px-5 py-4">Sequence</th><th scope="col" className="px-4 py-4">Type</th><th scope="col" className="px-4 py-4">Activity</th><th scope="col" className="px-4 py-4">Integrity</th><th scope="col" className="px-4 py-4"><span className="sr-only">Inspect</span></th></tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className={`cursor-pointer border-t border-bio-lipid/60 transition-colors hover:bg-bio-plasma/[0.06] ${selected.id === item.id ? 'bg-bio-plasma/[0.055]' : ''}`}
                    onClick={() => setSelectedId(item.id)}>
                    <td className="px-5 py-4"><button type="button" className="font-mono text-xs font-bold text-bio-nucleus focus-visible:rounded focus-visible:outline" onClick={() => setSelectedId(item.id)} aria-label={`Inspect ${item.id}`}>{item.id}</button></td>
                    <td className="px-4 py-4"><span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider ${item.type === 'HELIX' ? 'bg-bio-plasma/10 text-bio-plasma' : 'bg-bio-enzyme/10 text-bio-enzyme'}`}>{item.type}</span></td>
                    <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-bio-lipid sm:w-28"><div className="h-full rounded-full bg-bio-plasma" style={{ width: item.value + '%' }} /></div><span className="font-mono text-xs text-bio-subtle">{item.value}%</span></div></td>
                    <td className="px-4 py-4 font-semibold">{item.integrity}%</td>
                    <td className="px-4 py-4 text-bio-plasma"><ArrowRight size={16} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div role="status" className="p-12 text-center text-sm text-bio-subtle">No sequences match that search.</div>}
          </div>
          <div className="border-t border-bio-lipid/70 px-5 py-4 text-xs text-bio-subtle">Showing {filtered.length} of {items.length} generated sequences</div>
        </section>

        <aside className="bio-panel h-fit rounded-3xl p-6" aria-live="polite">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-bio-plasma"><Activity size={14} /> Sequence inspector</div>
          <div className="mt-5 text-2xl font-bold tracking-tight">{selected.id}</div>
          <div className="mt-1 text-sm text-bio-subtle">{selected.type.toLowerCase()} · simulated marker</div>
          <div className="my-7 flex h-28 items-center justify-center gap-2 rounded-2xl border border-bio-lipid/50 bg-[#09120f]">
            {Array.from({ length: 11 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-2" aria-hidden>
                <span className={`h-3 w-3 rounded-full ${i % 2 ? 'bg-bio-enzyme' : 'bg-bio-plasma'}`} style={{ opacity: .5 + (selected.value / 200), transform: `translateY(${Math.sin(i * .82) * 21}px)` }} />
                <span className="h-[1px] w-3 bg-bio-subtle/50" />
                <span className={`h-3 w-3 rounded-full ${i % 2 ? 'bg-bio-plasma' : 'bg-bio-enzyme'}`} style={{ transform: `translateY(${-Math.sin(i * .82) * 21}px)` }} />
              </div>
            ))}
          </div>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-2 border-b border-bio-lipid/70 pb-3"><dt className="text-bio-subtle">Integrity</dt><dd className="font-bold">{selected.integrity}%</dd></div>
            <div className="flex justify-between gap-2 border-b border-bio-lipid/70 pb-3"><dt className="text-bio-subtle">Activity</dt><dd className="font-bold">{selected.value}%</dd></div>
            <div className="flex justify-between gap-2 border-b border-bio-lipid/70 pb-3"><dt className="text-bio-subtle">Sample length</dt><dd className="font-bold">{selected.length.toLocaleString()} bp</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-bio-subtle">Status</dt><dd className="font-bold text-bio-plasma">Demo only</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
};
