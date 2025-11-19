

'use client'; // This must be a Client Component

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { type ReactNode } from 'react';

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};