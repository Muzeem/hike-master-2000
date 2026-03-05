'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AchievementChart } from '@/lib/data';

interface ImpactChartProps {
  chart: AchievementChart;
}

const borderColor = 'var(--border)';
const mutedFg = 'var(--muted-foreground)';
const primary = 'var(--primary)';
const destructive = 'var(--destructive)';
const chart2 = 'var(--chart-2)';

const tooltipStyle = {
  backgroundColor: 'var(--card)',
  border: `1px solid ${borderColor}`,
  borderRadius: '8px',
  fontSize: '12px',
  color: 'var(--foreground)',
} as const;

export function ImpactChart({ chart }: ImpactChartProps) {
  if (chart.type === 'line') {
    const data = chart.data.map((d) => ({ label: d.label, value: d.value }));
    return (
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{chart.title}</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: mutedFg }}
              axisLine={{ stroke: borderColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: mutedFg }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => {
                const v = value ?? 0;
                return chart.unit
                  ? [`${v} ${chart.unit}`, 'Value']
                  : [`${v}`, 'Value'];
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={primary}
              strokeWidth={2.5}
              dot={{ fill: primary, r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chart.type === 'bar') {
    const data = chart.data.map((d) => ({ label: d.label, value: d.value }));
    return (
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{chart.title}</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: mutedFg }}
              axisLine={{ stroke: borderColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: mutedFg }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => {
                const v = value ?? 0;
                return chart.unit ? [`${v} ${chart.unit}`, ''] : [`${v}`, ''];
              }}
            />
            <Bar dataKey="value" fill={primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chart.type === 'before-after') {
    const uniqueLabels = chart.data
      .filter((_, i) => i % 2 === 0)
      .map((d) => d.label);
    const paired = uniqueLabels.map((label, i) => ({
      label,
      before: chart.data[i * 2]?.value ?? 0,
      after: chart.data[i * 2 + 1]?.value ?? 0,
    }));

    return (
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{chart.title}</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={paired}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: mutedFg }}
              axisLine={{ stroke: borderColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: mutedFg }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => {
                const v = value ?? 0;
                const nameStr = String(name);
                const displayLabel =
                  nameStr === 'before'
                    ? (chart.beforeLabel ?? 'Before')
                    : (chart.afterLabel ?? 'After');
                return [
                  `${v}${chart.unit ? ` ${chart.unit}` : ''}`,
                  displayLabel,
                ];
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: '11px', color: mutedFg }}>
                  {value === 'before'
                    ? (chart.beforeLabel ?? 'Before')
                    : (chart.afterLabel ?? 'After')}
                </span>
              )}
            />
            <Bar dataKey="before" fill={destructive} radius={[4, 4, 0, 0]} />
            <Bar dataKey="after" fill={chart2} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}
