'use client';

import { useMemo } from 'react';
import type { Achievement } from '@/lib/data';
import { getCategoryColor } from '@/lib/utils';

interface ChartsTabProps {
  achievements: Achievement[];
}

function getCSSVar(v: string) {
  if (typeof document !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(v.replace('var(', '').replace(')', ''))
      .trim();
  }
  return v;
}

export function ChartsTab({ achievements }: ChartsTabProps) {
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of achievements) {
      map[a.category] = (map[a.category] ?? 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [achievements]);

  const impactCounts = useMemo(() => {
    const map: Record<string, number> = { high: 0, medium: 0, low: 0 };
    for (const a of achievements) map[a.impact]++;
    return map;
  }, [achievements]);

  const monthlyCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of achievements) {
      if (a.date) {
        const month = a.date.slice(0, 7);
        map[month] = (map[month] ?? 0) + 1;
      }
    }
    // Build 12-month Jan–Dec 2024 view
    const months = [];
    for (let m = 1; m <= 12; m++) {
      const key = `2024-${String(m).padStart(2, '0')}`;
      const short = [
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
      ][m - 1];
      months.push({ key, short, count: map[key] ?? 0 });
    }
    return months;
  }, [achievements]);

  const catMax = Math.max(...categoryCounts.map(([, n]) => n), 1);
  const monthMax = Math.max(...monthlyCounts.map((m) => m.count), 1);
  const total = achievements.length;
  const impactColors: Record<string, string> = {
    high: 'var(--chart-1)',
    medium: 'var(--chart-4)',
    low: 'var(--muted-foreground)',
  };

  // Compute donut segments
  const CIRCUMFERENCE = 2 * Math.PI * 38;
  let offset = 0;
  const segments = Object.entries(impactCounts).map(([level, count]) => {
    const percent = total > 0 ? count / total : 0;
    const dash = percent * CIRCUMFERENCE;
    const seg = { level, count, percent, dash, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="space-y-8">
      {/* Category Bar Chart */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Achievements by Category
        </h3>
        <div className="space-y-2">
          {categoryCounts.map(([category, count]) => {
            const color = getCategoryColor(category);
            const pct = (count / catMax) * 100;
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground font-medium">
                    {category}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {count}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Impact Donut */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Impact Distribution
          </h3>
          <div className="flex items-center gap-6">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              className="flex-shrink-0"
            >
              <circle
                cx="48"
                cy="48"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="16"
              />
              {segments.map((seg) => (
                <circle
                  key={seg.level}
                  cx="48"
                  cy="48"
                  r="38"
                  fill="none"
                  stroke={impactColors[seg.level]}
                  strokeWidth="16"
                  strokeDasharray={`${seg.dash} ${CIRCUMFERENCE - seg.dash}`}
                  strokeDashoffset={-seg.offset + CIRCUMFERENCE * 0.25}
                  className="transition-all duration-500"
                />
              ))}
              <text
                x="48"
                y="52"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="currentColor"
              >
                {total}
              </text>
            </svg>
            <div className="space-y-2">
              {Object.entries(impactCounts).map(([level, count]) => (
                <div key={level} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: impactColors[level] }}
                  />
                  <span className="text-foreground capitalize">{level}</span>
                  <span className="font-mono text-muted-foreground ml-auto">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Activity */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            Monthly Activity
          </h3>
          <div className="flex items-end gap-1 h-20">
            {monthlyCounts.map(({ key, short, count }) => {
              const pct = monthMax > 0 ? (count / monthMax) * 100 : 0;
              return (
                <div
                  key={key}
                  className="flex flex-col items-center flex-1 gap-1"
                >
                  <div
                    className="w-full flex flex-col justify-end"
                    style={{ height: '56px' }}
                  >
                    <div
                      className="w-full rounded-t-sm bg-primary/70 hover:bg-primary transition-colors"
                      style={{
                        height: `${pct}%`,
                        minHeight: count > 0 ? '4px' : '0',
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
