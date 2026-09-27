import React from 'react';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { LocationMapCard } from '@/components/contact/LocationMapCard';
import { CodStepFlow } from '@/components/contact/CodStepFlow';

export default function ContactPage() {
  return (
    <div className="py-8 md:py-14 px-4 md:px-8 max-w-7xl mx-auto">
      <ContactInfo />
      <LocationMapCard />
      <CodStepFlow />
    </div>
  );
}
