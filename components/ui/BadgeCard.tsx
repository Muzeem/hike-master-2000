import { Card, CardContent } from '@/components/ui/card';
import type { Badge } from '@/lib/data';
import { formatMonth } from '@/lib/utils';

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const inner = (
    <Card className="group border-border/60 hover:border-border hover:scale-105 transition-all duration-200 cursor-default h-full">
      <CardContent className="pt-5 pb-5 px-5 flex flex-col items-center text-center gap-3">
        {/* Badge image or emoji fallback */}
        <div
          className="w-fit px-4 py-2 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200 group-hover:shadow-lg"
          style={{
            backgroundColor: `color-mix(in oklab, ${badge.color} 15%, transparent)`,
            minHeight: '48px',
          }}
        >
          {badge.imageUrl ? (
            <img
              src={badge.imageUrl}
              alt={badge.title}
              width={badge.imageWidth}
              height={badge.imageHeight}
              className="object-contain"
              style={{
                width: badge.imageWidth ? `${badge.imageWidth}px` : 'auto',
                height: badge.imageHeight ? `${badge.imageHeight}px` : '28px',
              }}
              onError={(e) => {
                // fallback to emoji if image fails
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const next = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (next) next.style.display = 'flex';
              }}
            />
          ) : null}
          <span
            className="text-2xl items-center justify-center"
            style={{ display: badge.imageUrl ? 'none' : 'flex' }}
            aria-hidden="true"
          >
            {badge.icon}
          </span>
        </div>

        <div className="space-y-1 w-full">
          <p className="font-semibold text-sm text-foreground leading-tight">
            {badge.title}
          </p>
          {badge.description && (
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          )}
          {badge.earnedOn && (
            <p className="text-xs font-mono text-muted-foreground">
              {formatMonth(badge.earnedOn)}
            </p>
          )}
          {badge.viewUrl && (
            <a
              href={badge.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              View Badge →
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return inner;
}
