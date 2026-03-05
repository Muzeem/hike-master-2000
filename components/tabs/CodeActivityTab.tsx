'use client';

import { useTheme } from 'next-themes';
import { ActivityCalendar, type Activity } from 'react-activity-calendar';
import { Tooltip } from 'react-tooltip';
import type { CodeActivity } from '@/lib/data';
import React from 'react';

interface CodeActivityTabProps {
  activities: CodeActivity[];
  year: string;
}

export function CodeActivityTab({ activities, year }: CodeActivityTabProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const totalContributions = activities.reduce((s, a) => s + a.count, 0);
  const activeDays = activities.filter((a) => a.count > 0).length;
  const maxStreak = (() => {
    let max = 0,
      cur = 0;
    for (const a of activities) {
      if (a.count > 0) {
        cur++;
        max = Math.max(max, cur);
      } else cur = 0;
    }
    return max;
  })();

  const months = [
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
  const monthlyCounts = months.map((_, i) => {
    const prefix = `${year}-${String(i + 1).padStart(2, '0')}`;
    return activities
      .filter((a) => a.date.startsWith(prefix))
      .reduce((s, a) => s + a.count, 0);
  });
  const maxMonthly = Math.max(...monthlyCounts, 1);

  return (
    <div className="space-y-6">
      {/* Stat chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Contributions', value: totalContributions },
          { label: 'Active Days', value: activeDays },
          { label: 'Longest Streak', value: `${maxStreak} days` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 min-w-28 rounded-xl border border-border bg-card px-4 py-3 text-center"
          >
            <p className="text-xl font-bold font-mono text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Activity Calendar */}
      <div className="rounded-xl border border-border bg-card p-5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {year} Contribution Activity
        </h3>
        <ActivityCalendar
          data={activities as Activity[]}
          colorScheme={isDark ? 'dark' : 'light'}
          theme={{
            light: [
              'hsl(0 0% 92%)',
              '#bfdbfe',
              '#93c5fd',
              '#3b82f6',
              '#1d4ed8',
            ],
            dark: ['hsl(0 0% 12%)', '#1e3a5f', '#1e40af', '#2563eb', '#60a5fa'],
          }}
          labels={{
            months,
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            totalCount: `{{count}} contributions in ${year}`,
            legend: { less: 'Less', more: 'More' },
          }}
          fontSize={11}
          blockSize={11}
          blockMargin={3}
          showWeekdayLabels
          renderBlock={(block: React.ReactElement, activity: Activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'activity-cal-tip',
              'data-tooltip-content': `${activity.count} contributions · ${activity.date}`,
            } as React.HTMLAttributes<HTMLElement>)
          }
        />
        <Tooltip id="activity-cal-tip" />
      </div>

      {/* Monthly bar chart */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Monthly Breakdown
        </h3>
        <div className="flex items-end gap-1.5 h-20">
          {monthlyCounts.map((count, i) => (
            <div
              key={months[i]}
              className="flex flex-col items-center flex-1 gap-1"
            >
              <div
                className="w-full flex flex-col justify-end"
                style={{ height: '56px' }}
              >
                <div
                  className="w-full rounded-t-sm bg-primary/70 hover:bg-primary transition-colors"
                  style={{
                    height: `${(count / maxMonthly) * 100}%`,
                    minHeight: count > 0 ? '4px' : '0',
                  }}
                />
              </div>
              <span className="text-[9px] font-mono text-muted-foreground">
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
