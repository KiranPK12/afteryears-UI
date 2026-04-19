import type { EventEntry } from '@/types';

function countTripPlaces(entries: EventEntry[]) {
  const codes = new Set<string>();
  for (const e of entries) {
    if (e.type !== 'TRIP') continue;
    const from = e.metadata?.from;
    const to = e.metadata?.to;
    if (typeof from === 'string' && from.length) codes.add(from);
    if (typeof to === 'string' && to.length) codes.add(to);
  }
  return codes.size;
}

export function StatRow({ entries }: { entries?: EventEntry[] }) {
  const total = entries?.length ?? 0;
  const places = entries ? countTripPlaces(entries) : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-surface-elevated px-5 py-6 shadow-soft ring-1 ring-black/[0.03] dark:ring-white/[0.05] sm:px-6 sm:py-7">
        <p className="text-meta">Moments</p>
        <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums sm:text-5xl">{total}</p>
      </div>
      <div className="rounded-2xl bg-surface-elevated px-5 py-6 shadow-soft ring-1 ring-black/[0.03] dark:ring-white/[0.05] sm:px-6 sm:py-7">
        <p className="text-meta">Trip anchors</p>
        <p className="mt-3 text-4xl font-medium tracking-tight tabular-nums sm:text-5xl">{places}</p>
      </div>
    </div>
  );
}
