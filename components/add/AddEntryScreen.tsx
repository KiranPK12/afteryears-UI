'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import { EntryStepForm } from '@/components/add/EntryStepForm';
import { EventTypeGrid } from '@/components/add/EventTypeGrid';
import { useCreateEntry } from '@/hooks/use-entries';
import { Button } from '@/components/ui/button';
import type { EventType } from '@/types';

function buildMetadata(
  type: EventType,
  secondary: string,
  tertiary: string,
): Record<string, string> {
  const s = secondary.trim();
  const t = tertiary.trim();
  const meta: Record<string, string> = {};
  if (!s && !t) return meta;

  switch (type) {
    case 'TRIP':
      if (s) meta.from = s;
      if (t) meta.to = t;
      break;
    case 'MEMORY':
      if (s) meta.location = s;
      if (t) meta.note = t;
      break;
    case 'PURCHASE':
    case 'SALARY':
      if (s) meta.price = s;
      if (t) meta.note = t;
      break;
    default:
      if (s) meta.note = s;
      if (t) meta.context = t;
  }
  return meta;
}

export function AddEntryScreen() {
  const router = useRouter();
  const { mutateAsync: createEntry, isPending } = useCreateEntry();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [title, setTitle] = useState('');
  const [secondary, setSecondary] = useState('');
  const [tertiary, setTertiary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !title.trim()) return;

    await createEntry({
      type: selectedType,
      title: title.trim(),
      metadata: buildMetadata(selectedType, secondary, tertiary),
      date: new Date().toISOString(),
    });

    router.push('/');
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/80 backdrop-blur-md animate-backdrop-in">
      <div className="mx-auto flex h-full w-full max-w-xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
        <div className="animate-modal-in ds-modal-surface flex h-full flex-col rounded-2xl bg-surface-elevated shadow-elevated ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
          <header className="flex items-center justify-between gap-4 border-b border-foreground/[0.06] px-5 py-5 sm:px-6">
            <div>
              <p className="text-meta">{step === 1 ? 'Step 1' : 'Step 2'}</p>
              <h2 className="mt-1 text-title">
                {step === 1 ? 'What kind of moment?' : 'In a few words'}
              </h2>
            </div>
            <Button
              type="button"
              variant="icon"
              size="icon"
              className="ds-lift rounded-full"
              onClick={() => router.back()}
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </header>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-6 sm:py-8">
            {step === 1 ? (
              <EventTypeGrid
                onPick={(type) => {
                  setSelectedType(type);
                  setStep(2);
                }}
              />
            ) : selectedType ? (
              <EntryStepForm
                selectedType={selectedType}
                title={title}
                secondary={secondary}
                tertiary={tertiary}
                onTitleChange={setTitle}
                onSecondaryChange={setSecondary}
                onTertiaryChange={setTertiary}
                onBack={() => {
                  setStep(1);
                  setSelectedType(null);
                }}
                onSubmit={handleSubmit}
                isPending={isPending}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
