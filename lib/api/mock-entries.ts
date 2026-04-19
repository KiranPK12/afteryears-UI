import type { EventEntry } from '@/types';

export const MOCK_ENTRIES: EventEntry[] = [
  {
    id: '1',
    type: 'TRIP',
    title: 'Spring in Tokyo',
    metadata: {
      from: 'JFK',
      to: 'HND',
      airline: 'JAL',
    },
    date: '2026-03-12T00:00:00Z',
    createdAt: '2026-03-15T12:00:00Z',
  },
  {
    id: '2',
    type: 'WIN',
    title: 'Promoted to senior designer',
    metadata: {},
    date: '2026-02-15T00:00:00Z',
    createdAt: '2026-02-15T09:00:00Z',
  },
  {
    id: '3',
    type: 'MEMORY',
    title: 'Brought Luna home',
    metadata: {
      location: 'City shelter',
      note: 'She slept the whole ride.',
    },
    date: '2025-11-10T00:00:00Z',
    createdAt: '2025-11-12T10:00:00Z',
  },
  {
    id: '4',
    type: 'PURCHASE',
    title: 'New machine for deep work',
    metadata: {
      price: '$4,200',
    },
    date: '2025-10-05T00:00:00Z',
    createdAt: '2025-10-06T15:00:00Z',
  },
];
