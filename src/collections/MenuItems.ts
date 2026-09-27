import type { CollectionConfig } from 'payload';

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'badge', 'isAvailable'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Item Name',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description & Flavor Notes',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price ($)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Dish Image',
    },
    {
      name: 'badge',
      type: 'select',
      defaultValue: 'None',
      options: [
        { label: "Chef's Choice", value: "Chef's Choice" },
        { label: 'Popular', value: 'Popular' },
        { label: 'New', value: 'New' },
        { label: 'None', value: 'None' },
      ],
      label: 'Promotional Badge',
    },
    {
      name: 'isAvailable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Is Available For Order',
    },
  ],
};
