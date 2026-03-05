'use client';

import type { Skill } from '@/lib/data';
import { SkillBar } from '@/components/ui/SkillBar';

interface SkillsTabProps {
  skills: Skill[];
}

export function SkillsTab({ skills }: SkillsTabProps) {
  const improved = skills.filter(
    (s) => !s.category || s.category === 'improved',
  );
  const newSkills = skills.filter((s) => s.category === 'new');

  return (
    <div className="space-y-8 max-w-lg">
      {improved.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-base">📈</span>
            <h3 className="text-sm font-semibold text-foreground">
              Improved Skills
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({improved.length})
            </span>
          </div>
          <div className="space-y-5">
            {improved.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {newSkills.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <h3 className="text-sm font-semibold text-foreground">
              New Skills
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({newSkills.length})
            </span>
          </div>
          <div className="space-y-5">
            {newSkills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {improved.length === 0 && newSkills.length === 0 && (
        <p className="text-sm text-muted-foreground">No skills added yet.</p>
      )}
    </div>
  );
}
