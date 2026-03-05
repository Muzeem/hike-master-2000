import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ImpactLevel, SupportingDoc } from '@/lib/data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonth(date: string): string {
  const [year, month] = date.split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export function computeCertStatus(
  expiresOn: string | null | undefined,
): 'valid' | 'expiring-soon' | 'expired' | 'no-expiry' {
  if (!expiresOn) return 'no-expiry';
  const expiry = new Date(`${expiresOn}-01`);
  const now = new Date();
  if (expiry < now) return 'expired';
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  if (expiry <= sixMonthsFromNow) return 'expiring-soon';
  return 'valid';
}

export function getImpactConfig(impact: ImpactLevel): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  cssVar: string;
} {
  switch (impact) {
    case 'high':
      return {
        label: 'High Impact',
        variant: 'default',
        cssVar: 'var(--chart-1)',
      };
    case 'medium':
      return {
        label: 'Medium Impact',
        variant: 'secondary',
        cssVar: 'var(--chart-4)',
      };
    case 'low':
      return {
        label: 'Low Impact',
        variant: 'outline',
        cssVar: 'var(--muted-foreground)',
      };
  }
}

const CATEGORY_CHART_VARS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function getCategoryColor(category: string): string {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CATEGORY_CHART_VARS.length;
  return CATEGORY_CHART_VARS[index];
}

export function getDocTypeIcon(type: SupportingDoc['type']): string {
  switch (type) {
    case 'doc':
      return '📄';
    case 'design':
      return '🎨';
    case 'recording':
      return '🎬';
    case 'report':
      return '📊';
    case 'other':
      return '📎';
  }
}
