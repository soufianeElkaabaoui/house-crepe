import React from 'react';
import { OriginScrubHero } from '@/components/about/OriginScrubHero';
import { PinnedCraftSection } from '@/components/about/PinnedCraftSection';
import { FoundersValues } from '@/components/about/FoundersValues';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <OriginScrubHero />
      <PinnedCraftSection />
      <FoundersValues />
    </div>
  );
}
