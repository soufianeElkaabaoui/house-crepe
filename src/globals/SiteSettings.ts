import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandTagline',
      type: 'text',
      defaultValue: 'The sweetest place to call home.',
      required: true,
      label: 'Brand Tagline',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '212600000000',
      required: true,
      label: 'WhatsApp Ordering Phone Number (No + or spaces)',
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: '42 Boulevard de la Gourmandise, Quartier Victoria',
      label: 'Physical Store Address',
    },
    {
      name: 'operatingHours',
      type: 'array',
      label: 'Operating Hours',
      defaultValue: [
        { days: 'Monday – Thursday', hours: '10:00 AM – 11:00 PM' },
        { days: 'Friday – Saturday', hours: '10:00 AM – 1:00 AM' },
        { days: 'Sunday', hours: '11:00 AM – 11:00 PM' },
      ],
      fields: [
        {
          name: 'days',
          type: 'text',
          required: true,
          label: 'Days',
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Hours',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://instagram.com/housecrepe.official',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://facebook.com/housecrepe.official',
          label: 'Facebook URL',
        },
      ],
    },
  ],
};
