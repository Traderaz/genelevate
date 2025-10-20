'use client';

import { LifeSkillsBanner } from './life-skills-banner';
import { LifeSkillsModules } from '../wellbeing/life-skills-modules';
import { LifeSkillsProgress } from './life-skills-progress';

export function LifeSkillsView() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <LifeSkillsBanner />

      {/* Progress Overview */}
      <LifeSkillsProgress />

      {/* Life Skills Modules */}
      <LifeSkillsModules />
    </div>
  );
}

