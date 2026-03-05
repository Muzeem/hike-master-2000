'use client';

import type { MiscItem } from '@/lib/data';
import { MiscCard } from '@/components/ui/MiscCard';

interface MiscTabProps {
  misc: MiscItem[];
}

export function MiscTab({ misc }: MiscTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {misc.map((item) => (
        <MiscCard key={item.id} item={item} />
      ))}
    </div>
  );
}
