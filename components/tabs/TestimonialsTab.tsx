'use client';

import type { Testimonial } from '@/lib/data';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

interface TestimonialsTabProps {
  testimonials: Testimonial[];
}

export function TestimonialsTab({ testimonials }: TestimonialsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {testimonials.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}
