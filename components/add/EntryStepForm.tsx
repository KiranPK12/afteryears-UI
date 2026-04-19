'use client';

import { useMemo } from 'react';

import { getEventTypeConfig } from '@/lib/config/event-types';
import { Button } from '@/components/ui/button';
import type { EventType } from '@/types';

function contextualFields(type: EventType) {
  switch (type) {
    case 'TRIP':
      return {
        secondaryLabel: 'From',
        secondaryKey: 'from' as const,
        tertiaryLabel: 'To',
        tertiaryKey: 'to' as const,
      };
    case 'MEMORY':
      return {
        secondaryLabel: 'Where it lives in your mind',
        secondaryKey: 'location' as const,
        tertiaryLabel: 'A line you do not want to forget',
        tertiaryKey: 'note' as const,
      };
    case 'PURCHASE':
    case 'SALARY':
      return {
        secondaryLabel: 'Amount or note',
        secondaryKey: 'price' as const,
        tertiaryLabel: 'Optional detail',
        tertiaryKey: 'note' as const,
      };
    default:
      return {
        secondaryLabel: 'One detail',
        secondaryKey: 'note' as const,
        tertiaryLabel: 'Optional context',
        tertiaryKey: 'context' as const,
      };
  }
}

type EntryStepFormProps = {
  selectedType: EventType;
  title: string;
  secondary: string;
  tertiary: string;
  onTitleChange: (v: string) => void;
  onSecondaryChange: (v: string) => void;
  onTertiaryChange: (v: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
};

export function EntryStepForm({
  selectedType,
  title,
  secondary,
  tertiary,
  onTitleChange,
  onSecondaryChange,
  onTertiaryChange,
  onBack,
  onSubmit,
  isPending,
}: EntryStepFormProps) {
  const fieldConfig = useMemo(() => contextualFields(selectedType), [selectedType]);
  const selected = getEventTypeConfig(selectedType);

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-8">
      {selected ? (
        <div className="flex items-center gap-3 rounded-2xl bg-muted/40 px-4 py-3 ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-soft">
            {selected.icon}
          </div>
          <div>
            <p className="text-meta">{selected.label}</p>
            <p className="text-xs text-muted-foreground">{selected.description}</p>
          </div>
        </div>
      ) : null}

      <div className="space-y-6">
        <div>
          <label htmlFor="entry-title" className="text-meta">
            Title
          </label>
          <input
            id="entry-title"
            autoFocus
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Name this moment"
            className="mt-3 w-full border-none bg-transparent text-2xl font-medium tracking-tight text-foreground outline-none ring-0 placeholder:text-muted-foreground/55 sm:text-3xl"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="entry-secondary" className="text-meta">
              {fieldConfig.secondaryLabel}
            </label>
            <input
              id="entry-secondary"
              value={secondary}
              onChange={(e) => onSecondaryChange(e.target.value)}
              placeholder="Optional"
              className="mt-3 w-full border-b border-foreground/10 bg-transparent pb-3 text-body text-foreground outline-none ring-0 transition-colors duration-200 placeholder:text-muted-foreground/55 focus:border-foreground/35"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="entry-tertiary" className="text-meta">
              {fieldConfig.tertiaryLabel}
            </label>
            <input
              id="entry-tertiary"
              value={tertiary}
              onChange={(e) => onTertiaryChange(e.target.value)}
              placeholder="Optional"
              className="mt-3 w-full border-b border-foreground/10 bg-transparent pb-3 text-body text-foreground outline-none ring-0 transition-colors duration-200 placeholder:text-muted-foreground/55 focus:border-foreground/35"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" className="order-2 sm:order-1" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="order-1 w-full rounded-2xl sm:order-2 sm:w-auto sm:min-w-[200px]"
          disabled={!title.trim() || isPending}
        >
          {isPending ? 'Saving…' : 'Save to life'}
        </Button>
      </div>
    </form>
  );
}
