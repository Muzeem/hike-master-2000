import type { AchievementTestimonial } from '@/lib/data';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

interface AchievementTestimonialsProps {
  testimonials: AchievementTestimonial[];
}

export function AchievementTestimonials({
  testimonials,
}: AchievementTestimonialsProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">
        What teammates said
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </div>
  );
}
