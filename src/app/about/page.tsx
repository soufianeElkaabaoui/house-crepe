import React from 'react';
import { OriginScrubHero } from '@/components/about/OriginScrubHero';
import { PinnedCraftSection } from '@/components/about/PinnedCraftSection';
import { FoundersValues } from '@/components/about/FoundersValues';

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-24 md:pt-32">
      <OriginScrubHero />
      <PinnedCraftSection />
      <FoundersValues />
    </div>
  );
}
