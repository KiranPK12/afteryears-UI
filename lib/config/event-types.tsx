import type { EventType } from '@/types';
import {
  Activity,
  Briefcase,
  Heart,
  Landmark,
  MapPin,
  Plane,
  ShoppingBag,
  Trophy,
  Users,
} from 'lucide-react';

export type EventTypeConfig = {
  type: EventType;
  label: string;
  description: string;
  icon: React.ReactNode;
};

export const EVENT_TYPES: EventTypeConfig[] = [
  {
    type: 'TRIP',
    label: 'Trip',
    description: 'A move between places',
    icon: <Plane className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'PLACE',
    label: 'Place',
    description: 'Somewhere that mattered',
    icon: <MapPin className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'SOCIAL',
    label: 'Social',
    description: 'People, presence, laughter',
    icon: <Users className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'PURCHASE',
    label: 'Purchase',
    description: 'Something you chose carefully',
    icon: <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'SALARY',
    label: 'Salary',
    description: 'Income, rhythm, stability',
    icon: <Briefcase className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'WIN',
    label: 'Win',
    description: 'A small or large victory',
    icon: <Trophy className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'MEMORY',
    label: 'Memory',
    description: 'A feeling worth keeping',
    icon: <Heart className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'FITNESS',
    label: 'Fitness',
    description: 'Body, breath, momentum',
    icon: <Activity className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    type: 'MILESTONE',
    label: 'Milestone',
    description: 'A chapter marker',
    icon: <Landmark className="h-6 w-6" strokeWidth={1.5} />,
  },
];

export function getEventTypeConfig(type: EventType) {
  return EVENT_TYPES.find((t) => t.type === type);
}
