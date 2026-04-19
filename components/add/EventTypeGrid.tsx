import { EVENT_TYPES } from '@/lib/config/event-types';
import type { EventType } from '@/types';

type EventTypeGridProps = {
  onPick: (type: EventType) => void;
};

export function EventTypeGrid({ onPick }: EventTypeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {EVENT_TYPES.map(({ type, label, description, icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onPick(type)}
          className="group flex flex-col rounded-2xl bg-muted/35 p-4 text-left shadow-none ring-1 ring-black/[0.04] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted/55 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:ring-white/[0.06] sm:p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
            {icon}
          </div>
          <p className="mt-4 text-sm font-medium tracking-tight">{label}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
        </button>
      ))}
    </div>
  );
}
