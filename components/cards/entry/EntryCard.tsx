import {
  Activity,
  Briefcase,
  Landmark,
  MapPin,
  ShoppingBag,
  Trophy,
  Users,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { EventEntry } from '@/types';

const iconMap: Partial<Record<EventEntry['type'], React.ReactNode>> = {
  SALARY: <Briefcase className="h-4 w-4" strokeWidth={1.5} />,
  PURCHASE: <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />,
  WIN: <Trophy className="h-4 w-4" strokeWidth={1.5} />,
  FITNESS: <Activity className="h-4 w-4" strokeWidth={1.5} />,
  PLACE: <MapPin className="h-4 w-4" strokeWidth={1.5} />,
  SOCIAL: <Users className="h-4 w-4" strokeWidth={1.5} />,
  MILESTONE: <Landmark className="h-4 w-4" strokeWidth={1.5} />,
};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function EntryCard({ entry }: { entry: EventEntry }) {
  const icon =
    iconMap[entry.type] ?? <span className="block h-2 w-2 rounded-full bg-foreground/70" />;

  return (
    <Card
      className={cn(
        'flex items-center gap-4 p-5 shadow-soft transition-shadow duration-200 hover:shadow-elevated',
        'ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted/80 text-foreground">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-body font-medium leading-snug">{entry.title}</h3>
        <p className="text-meta mt-1">{entry.type.replaceAll('_', ' ')}</p>
      </div>

      <div className="shrink-0 text-right">
        {entry.metadata?.price ? (
          <p className="text-body font-medium tabular-nums tracking-tight">
            {String(entry.metadata.price)}
          </p>
        ) : null}
        <p className="text-meta mt-1 normal-case tracking-normal text-muted-foreground">
          {formatWhen(entry.date)}
        </p>
      </div>
    </Card>
  );
}
