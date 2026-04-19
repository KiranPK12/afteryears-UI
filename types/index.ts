export type EventType = 
  | 'TRIP'
  | 'PLACE'
  | 'SOCIAL'
  | 'PURCHASE'
  | 'SALARY'
  | 'WIN'
  | 'MEMORY'
  | 'FITNESS'
  | 'MILESTONE';

export interface EventEntry {
  id: string;
  type: EventType;
  title: string;
  metadata?: Record<string, string | number | boolean>;
  date: string; // ISO format
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
