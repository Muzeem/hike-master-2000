'use client';

import React, { createContext, useContext } from 'react';
import type { BragData } from '@/lib/data';

const DataContext = createContext<BragData | null>(null);

export function DataProvider({
  initialData,
  children,
}: {
  initialData: BragData;
  children: React.ReactNode;
}) {
  return (
    <DataContext.Provider value={initialData}>{children}</DataContext.Provider>
  );
}

export function useData(): BragData {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
}
