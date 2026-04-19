import { AddEntryScreen } from '@/components/add/AddEntryScreen';
import { RequireAuth } from '@/components/auth/RequireAuth';

export default function AddEntryPage() {
  return (
    <RequireAuth>
      <AddEntryScreen />
    </RequireAuth>
  );
}
