'use client';

import type { Certification } from '@/lib/data';
import { CertCard } from '@/components/ui/CertCard';

interface CertificationsTabProps {
  certifications: Certification[];
}

export function CertificationsTab({ certifications }: CertificationsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {certifications.map((c) => (
        <CertCard key={c.id} cert={c} />
      ))}
    </div>
  );
}
