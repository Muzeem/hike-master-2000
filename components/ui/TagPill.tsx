import { cn } from '@/lib/utils';

interface TagPillProps {
  label: string;
  color?: string;
  className?: string;
}

export function TagPill({ label, color, className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors',
        'bg-muted text-muted-foreground border-border',
        className,
      )}
      style={color ? { borderColor: color, color } : undefined}
    >
      {label}
    </span>
  );
}
