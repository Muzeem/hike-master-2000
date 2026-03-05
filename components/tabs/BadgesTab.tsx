'use client';

import type { Badge } from '@/lib/data';
import { BadgeCard } from '@/components/ui/BadgeCard';

interface BadgesTabProps {
  badges: Badge[];
}

export function BadgesTab({ badges }: BadgesTabProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((b) => (
        <BadgeCard key={b.id} badge={b} />
      ))}
    </div>
  );
}
