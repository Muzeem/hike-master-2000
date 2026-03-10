'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((api: any) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
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
      icon: '🧪',
      label: 'A/B Tests Run',
      value: metrics.experimentsRun,
      accent: 'var(--chart-2)',
    },
    {
      icon: '📈',
      label: 'Incremental Revenue Impact',
      value: metrics.revenueImpact,
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
    <div className="relative mb-6">
      {/* Viewport */}
      <div className="overflow-hidden -mx-2 px-2 -my-2 py-2" ref={emblaRef}>
        <div className="flex -ml-3">
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

      {/* Controls: Arrows and Dots */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent border-muted-foreground/30 hover:bg-accent/50"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent border-muted-foreground/30 hover:bg-accent/50"
            onClick={scrollNext}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all ${
                index === selectedIndex
                  ? 'h-[10px] w-[10px] border-[1.5px] border-foreground bg-transparent'
                  : 'h-2 w-2 border border-muted-foreground/40 bg-transparent'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
