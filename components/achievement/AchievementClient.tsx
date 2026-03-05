'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import type { Achievement } from '@/lib/data';
import { formatMonth, getImpactConfig, getCategoryColor } from '@/lib/utils';
import { TagPill } from '@/components/ui/TagPill';
import { ImpactChart } from '@/components/achievement/ImpactChart';
import { SupportingDocs } from '@/components/achievement/SupportingDocs';
import { AchievementTestimonials } from '@/components/achievement/AchievementTestimonials';

interface AchievementClientProps {
  achievement: Achievement;
}

export function AchievementClient({ achievement }: AchievementClientProps) {
  const impactCfg = getImpactConfig(achievement.impact);
  const catColor = getCategoryColor(achievement.category);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Achievement Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <TagPill label={achievement.category} color={catColor} />
            <Badge variant={impactCfg.variant}>{impactCfg.label}</Badge>
            {achievement.date && (
              <span className="text-xs font-mono text-muted-foreground">
                {formatMonth(achievement.date)}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
            {achievement.title}
          </h1>
          {achievement.metric && (
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
              <span className="text-sm font-mono font-semibold text-primary">
                {achievement.metric}
              </span>
            </div>
          )}
        </div>

        {/* Chart */}
        {achievement.chart && <ImpactChart chart={achievement.chart} />}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Description + Tickets + PRs */}
          <div className="space-y-5">
            {achievement.description && (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Description
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            )}

            {achievement.tickets && achievement.tickets.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Tickets
                </h2>
                <div className="flex flex-wrap gap-2">
                  {achievement.tickets.map((t) => (
                    <a
                      key={t.label}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border hover:border-primary/50 bg-muted hover:bg-muted/80 px-3 py-1 text-xs font-mono text-foreground hover:text-primary transition-all"
                    >
                      🎫 {t.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {achievement.prs && achievement.prs.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-foreground">
                  Pull Requests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {achievement.prs.map((pr) => (
                    <a
                      key={pr.label}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border hover:border-primary/50 bg-muted hover:bg-muted/80 px-3 py-1 text-xs font-mono text-foreground hover:text-primary transition-all"
                    >
                      ⤴ {pr.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Supporting Docs */}
          {achievement.supportingDocs &&
            achievement.supportingDocs.length > 0 && (
              <SupportingDocs docs={achievement.supportingDocs} />
            )}
        </div>

        {/* Testimonials */}
        {achievement.testimonials && achievement.testimonials.length > 0 && (
          <AchievementTestimonials testimonials={achievement.testimonials} />
        )}
      </div>
    </div>
  );
}
