import { EntryCard } from '@/components/cards/entry/EntryCard';
import { MemoryCard } from '@/components/cards/memory/MemoryCard';
import { TravelPassCard } from '@/components/cards/travel-pass/TravelPassCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { EventEntry } from '@/types';

type LifeFeedProps = {
  entries?: EventEntry[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export function LifeFeed({ entries, isLoading, isError, onRetry }: LifeFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-muted/40 px-6 py-12 text-center">
        <p className="text-title text-balance">Your feed paused for a breath</p>
        <p className="mx-auto mt-3 max-w-sm text-body text-muted-foreground">
          We could not reach your journal. Check your connection and try again.
        </p>
        <Button type="button" className="mt-8" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  if (!entries?.length) {
    return (
      <div className="rounded-2xl bg-muted/30 px-6 py-16 text-center sm:px-10 sm:py-20">
        <p className="text-title text-balance">Begin with one honest line</p>
        <p className="mx-auto mt-3 max-w-md text-body text-muted-foreground">
          This space stays quiet on purpose. Log a trip, a win, or a small memory — the feed will
          grow around your life, not the other way around.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {entries.map((entry) => {
        switch (entry.type) {
          case 'TRIP':
            return <TravelPassCard key={entry.id} entry={entry} />;
          case 'MEMORY':
            return <MemoryCard key={entry.id} entry={entry} />;
          default:
            return <EntryCard key={entry.id} entry={entry} />;
        }
      })}
    </div>
  );
}
