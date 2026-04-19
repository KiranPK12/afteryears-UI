import { RequireAuth } from '@/components/auth/RequireAuth';
import { SettingsScreen } from '@/components/settings/SettingsScreen';

export default function SettingsPage() {
  return (
    <RequireAuth>
      <SettingsScreen />
    </RequireAuth>
  );
}
