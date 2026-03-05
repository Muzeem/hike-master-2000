'use client';

import { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import type { BragData } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatCarouselProps {
  metrics: BragData['metrics'];
  badgesCount: number;
  certCount: number;
}

interface SlideConfig {
  icon: string;
  label: string;
  value: number | string;
  accent: string;
}

export function StatCarousel({
  metrics,
  badgesCount,
  certCount,
}: StatCarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: 2800, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplay.current],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slides: SlideConfig[] = [
    {
      icon: '🚀',
      label: 'Projects Shipped',
      value: metrics.projectsShipped,
      accent: 'var(--chart-1)',
    },
    {
      icon: '🔍',
      label: 'PRs Reviewed',
      value: metrics.prsReviewed,
      accent: 'var(--chart-2)',
    },
    {
      icon: '✅',
      label: 'PRs Merged',
      value: metrics.prsMerged,
      accent: 'var(--chart-2)',
    },
    {
      icon: '💬',
      label: 'Tech Discussions',
      value: metrics.techDiscussions,
      accent: 'var(--chart-3)',
    },
    {
      icon: '⚡',
      label: 'Badges Earned',
      value: badgesCount,
      accent: 'var(--chart-4)',
    },
    {
      icon: '🏆',
      label: 'Certifications',
      value: certCount,
      accent: 'var(--chart-5)',
    },
  ];

  return (
    <div className="relative mb-6 group">
      {/* Prev button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 h-7 w-7 rounded-full bg-card/80 backdrop-blur border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollPrev}
        aria-label="Previous"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex py-1 -ml-3">
          {slides.map(({ icon, label, value, accent }) => (
            <div key={label} className="flex-none pl-3 w-1/2 sm:w-1/4">
              <Card className="border-border/60 hover:border-border transition-colors h-full">
                <CardContent className="pt-4 pb-4 px-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-lg w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)`,
                      }}
                    >
                      {icon}
                    </span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground leading-none mb-1">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 h-7 w-7 rounded-full bg-card/80 backdrop-blur border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={scrollNext}
        aria-label="Next"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
