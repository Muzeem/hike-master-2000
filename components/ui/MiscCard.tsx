import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { MiscItem } from '@/lib/data';

interface MiscCardProps {
  item: MiscItem;
}

const STATUS_CONFIG: Record<
  MiscItem['status'],
  { label: string; className: string }
> = {
  'in-progress': {
    label: 'In Progress',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  },
  planned: {
    label: 'Planned',
    className: 'bg-muted text-muted-foreground border-border',
  },
  completed: {
    label: 'Completed',
    className: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  },
};

export function MiscCard({ item }: MiscCardProps) {
  const config = STATUS_CONFIG[item.status];

  return (
    <Card className="border-border/60 hover:border-border transition-colors">
      <CardContent className="pt-4 pb-4 px-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {item.icon && (
              <span className="text-xl flex-shrink-0">{item.icon}</span>
            )}
            <p className="font-semibold text-sm text-foreground leading-tight">
              {item.title}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shrink-0 ${config.className}`}
          >
            {config.label}
          </span>
        </div>
        {typeof item.progress === 'number' && (
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-mono text-muted-foreground">
                {item.progress}%
              </span>
            </div>
            <Progress value={item.progress} className="h-1.5" />
          </div>
        )}
        {item.note && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {item.note}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
