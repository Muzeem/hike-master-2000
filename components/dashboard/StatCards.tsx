import { Card, CardContent } from '@/components/ui/card';
import type { ProfileMetrics } from '@/lib/data';

interface StatCardsProps {
  metrics: ProfileMetrics;
}

const STAT_ITEMS: Array<{
  key: keyof ProfileMetrics;
  label: string;
  icon: string;
}> = [
  { key: 'projectsShipped', label: 'Projects Shipped', icon: '🚀' },
  { key: 'experimentsRun', label: 'A/B Tests Run', icon: '🧪' },
  { key: 'revenueImpact', label: 'Incremental Revenue Impact', icon: '📈' },
  {
    key: 'entrepreneurshipAndCerts',
    label: 'Entrepreneurship & Certifications',
    icon: '🎓',
  },
];

export function StatCards({ metrics }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {STAT_ITEMS.map(({ key, label, icon }) => (
        <Card
          key={key}
          className="border-border/60 hover:border-border transition-colors"
        >
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl">{icon}</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground leading-none mb-1">
              {metrics[key]}
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              {label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
