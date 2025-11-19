
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  // Initialize QueryClient only once on mount
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // stale data is better than no data, keeps UI fast
            staleTime: 60 * 1000, 
            // don't refetch on window focus by default, improves performance
            refetchOnWindowFocus: false, 
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};