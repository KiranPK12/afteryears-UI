import { ArrowRight, Plane } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { EventEntry } from '@/types';

function formatWhen(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function TravelPassCard({ entry }: { entry: EventEntry }) {
  const from = (entry.metadata?.from as string) || 'From';
  const to = (entry.metadata?.to as string) || 'To';
  const carrier = (entry.metadata?.airline as string) || 'Trip';

  return (
    <Card
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-card to-muted/25 shadow-elevated',
        'ring-1 ring-black/[0.03] dark:ring-white/[0.06]',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_20%_0%,rgba(17,17,19,0.06),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(17,17,19,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_50%)]"
      />

      <div className="absolute left-0 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-soft" />
      <div className="absolute right-0 top-1/2 z-10 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-soft" />

      <div className="relative px-6 pb-6 pt-7">
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="text-meta">Travel pass</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 text-foreground">
            <Plane className="h-4 w-4" strokeWidth={1.5} />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div className="min-w-0 text-left">
            <p className="text-meta mb-2">From</p>
            <p className="truncate text-3xl font-medium tracking-tight sm:text-4xl">{from}</p>
          </div>

          <div className="flex translate-y-[-10px] items-center gap-2 px-1 text-muted-foreground">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-muted-foreground/35" />
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.5} />
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-muted-foreground/35" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-meta mb-2">To</p>
            <p className="truncate text-3xl font-medium tracking-tight sm:text-4xl">{to}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-muted-foreground/25"
              aria-hidden
            />
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between gap-6 border-t border-dashed border-foreground/10 pt-6">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-body font-medium">{entry.title}</p>
            <p className="text-meta normal-case tracking-normal text-muted-foreground">
              {formatWhen(entry.date)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-meta">Carrier</p>
            <p className="mt-1 text-sm font-medium tracking-tight">{carrier}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
