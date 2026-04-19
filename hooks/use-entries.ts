import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createEntry, fetchEntries } from '@/lib/api/entries';
import { getEntriesResourcePath } from '@/lib/api/backend-config';
import type { EventEntry } from '@/types';

export function useEntries() {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  return useQuery({
    queryKey: ['entries', getEntriesResourcePath()],
    queryFn: () => fetchEntries(getAccessTokenSilently),
    enabled: !isLoading && isAuthenticated,
  });
}

export function useCreateEntry() {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: (entry: Omit<EventEntry, 'id' | 'createdAt'>) =>
      createEntry(getAccessTokenSilently, entry),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}
