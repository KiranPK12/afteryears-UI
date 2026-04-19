import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { EventEntry } from '@/types';

function formatWhen(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  });
}

export function MemoryCard({ entry }: { entry: EventEntry }) {
  const imageUrl = entry.metadata?.imageUrl as string | undefined;
  const location = entry.metadata?.location as string | undefined;
  const note = entry.metadata?.note as string | undefined;

  return (
    <Card
      className={cn(
        'overflow-hidden shadow-soft transition-shadow duration-200 hover:shadow-elevated',
        'ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-[16/9] w-full bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className={cn('p-6', imageUrl && 'pt-5')}>
        <div className="flex items-start justify-between gap-4">
          <p className="text-meta">Memory</p>
          <p className="text-meta normal-case tracking-normal text-muted-foreground">
            {formatWhen(entry.date)}
          </p>
        </div>

        <h3 className="mt-4 text-title leading-snug">{entry.title}</h3>

        {location ? (
          <p className="mt-3 text-body text-muted-foreground">{location}</p>
        ) : null}

        {note ? <p className="mt-4 text-body text-muted-foreground">{note}</p> : null}
      </div>
    </Card>
  );
}
