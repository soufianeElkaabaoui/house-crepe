import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BestsellersShelf } from '@/components/home/BestsellersShelf';
import { HouseStandard } from '@/components/home/HouseStandard';
import { CodCallout } from '@/components/home/CodCallout';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BestsellersShelf />
      <HouseStandard />
      <CodCallout />
    </div>
  );
}
