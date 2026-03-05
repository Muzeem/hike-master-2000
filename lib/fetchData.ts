// lib/fetchData.ts
// Single entry point for data. In future, replace with a real fetch() call.
// Never import BRAG_DATA directly outside this file.

import { BRAG_DATA } from '@/lib/data';
import type { BragData } from '@/lib/data';

export async function fetchData(): Promise<BragData> {
  return Promise.resolve(BRAG_DATA);
}
