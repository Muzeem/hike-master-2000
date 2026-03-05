import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Testimonial, AchievementTestimonial } from '@/lib/data';

interface TestimonialCardProps {
  testimonial: Testimonial | AchievementTestimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="border-border/60 hover:border-border transition-colors">
      <CardContent className="pt-5 pb-5 px-5 space-y-4">
        <div className="relative">
          <span
            className="absolute -top-1 -left-1 text-5xl leading-none font-serif text-muted-foreground/30 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="italic text-sm text-foreground/90 leading-relaxed pl-5 pt-3">
            {testimonial.comment}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            {testimonial.image && (
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
            )}
            <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.designation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
