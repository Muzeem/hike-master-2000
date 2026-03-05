'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TagPill } from '@/components/ui/TagPill';
import { Badge } from '@/components/ui/badge';
import type { Achievement, ImpactLevel } from '@/lib/data';
import { formatMonth, getImpactConfig, getCategoryColor } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TimelineTabProps {
  achievements: Achievement[];
}

export function TimelineTab({ achievements }: TimelineTabProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [impactFilter, setImpactFilter] = useState<string>('all');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(achievements.map((a) => a.category)))],
    [achievements],
  );

  const filtered = useMemo(() => {
    return [...achievements]
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.localeCompare(a.date);
      })
      .filter((a) => {
        if (categoryFilter !== 'all' && a.category !== categoryFilter)
          return false;
        if (impactFilter !== 'all' && a.impact !== impactFilter) return false;
        return true;
      });
  }, [achievements, categoryFilter, impactFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-40 text-xs h-8"
            aria-label="Filter by category"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="text-xs capitalize">
                {c === 'all' ? 'All Categories' : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={impactFilter} onValueChange={setImpactFilter}>
          <SelectTrigger
            className="w-36 text-xs h-8"
            aria-label="Filter by impact"
          >
            <SelectValue placeholder="Impact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Impact
            </SelectItem>
            <SelectItem value="high" className="text-xs">
              High
            </SelectItem>
            <SelectItem value="medium" className="text-xs">
              Medium
            </SelectItem>
            <SelectItem value="low" className="text-xs">
              Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border hidden sm:block" />

        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No achievements match the current filters.
            </p>
          )}
          {filtered.map((achievement) => {
            const impactCfg = getImpactConfig(achievement.impact);
            const catColor = getCategoryColor(achievement.category);
            return (
              <div key={achievement.id} className="relative sm:pl-10">
                {/* Dot */}
                <div className="absolute left-1.5 top-5 w-4 h-4 rounded-full bg-card border-2 border-primary hidden sm:block" />

                <Link href={`/achievements/${achievement.id}`}>
                  <Card className="border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardContent className="pt-4 pb-4 px-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <TagPill
                              label={achievement.category}
                              color={catColor}
                            />
                            <Badge
                              variant={impactCfg.variant}
                              className="text-xs h-5"
                            >
                              {impactCfg.label}
                            </Badge>
                            {achievement.date && (
                              <span className="text-xs font-mono text-muted-foreground">
                                {formatMonth(achievement.date)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-sm text-foreground leading-snug">
                            {achievement.title}
                          </h3>
                          {achievement.metric && (
                            <p className="text-xs font-mono text-muted-foreground">
                              {achievement.metric}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
