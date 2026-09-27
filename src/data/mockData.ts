export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'sweet' | 'savory' | 'specials' | 'beverages';
  categoryTitle: string;
  image: string;
  badge: "Chef's Choice" | 'Popular' | 'New' | 'None';
  isAvailable: boolean;
  dietaryNotes?: string;
  calories?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', slug: 'all', title: 'All Creations', description: 'Our complete gourmet repertoire' },
  { id: 'sweet', slug: 'sweet', title: 'Sweet Crêpes', description: 'Velvety chocolates, roasted nuts & fruit' },
  { id: 'savory', slug: 'savory', title: 'Savory Galettes', description: 'Crisp buckwheat, melted cheeses & artisan meats' },
  { id: 'specials', slug: 'specials', title: 'House Specials', description: 'Chef limited-batch luxury recipes' },
  { id: 'beverages', slug: 'beverages', title: 'Beverages', description: 'Specialty lattes & rich drinking chocolate' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'nutella-dream',
    name: 'Nutella Dream & Roasted Hazelnut',
    description: 'Golden buttery fold, warm Italian hazelnut cocoa cream, fresh hand-sliced strawberries, toasted Piedmont hazelnuts, and an airy powdered sugar veil.',
    price: 11.5,
    category: 'sweet',
    categoryTitle: 'Sweet Crêpes',
    image: '/images/nutella-dream.jpg',
    badge: 'Popular',
    isAvailable: true,
    dietaryNotes: 'Contains Hazelnuts & Dairy',
    calories: '490 kcal',
  },
  {
    id: 'truffle-melt',
    name: 'Truffle Melt & Wild Chanterelle',
    description: 'Brittany dark buckwheat galette, bubbling melted Swiss Gruyère, pan-seared forest mushrooms, shaved black winter truffle, and aromatic thyme.',
    price: 14.5,
    category: 'savory',
    categoryTitle: 'Savory Galettes',
    image: '/images/truffle-melt.jpg',
    badge: "Chef's Choice",
    isAvailable: true,
    dietaryNotes: 'Gluten-Free Buckwheat Base • Contains Dairy',
    calories: '530 kcal',
  },
  {
    id: 'pistachio-raspberry',
    name: 'Sicilian Pistachio & Raspberry Crema',
    description: 'Stone-ground emerald pistachio velvet, Belgian white chocolate ribbon, tart alpine raspberries, roasted Sicilian crunch, and mint leaves.',
    price: 13.0,
    category: 'specials',
    categoryTitle: 'House Specials',
    image: '/images/pistachio-raspberry.jpg',
    badge: 'New',
    isAvailable: true,
    dietaryNotes: 'Contains Tree Nuts & Dairy',
    calories: '510 kcal',
  },
  {
    id: 'biscoff-banana',
    name: 'Caramelized Biscoff & Banana Silk',
    description: 'Fluffy warm crêpe layered with Belgian speculoos cookie butter, caramelized banana coins, salted Fleur de Sel caramel, and a quenelle of whipped Madagascar cream.',
    price: 12.0,
    category: 'sweet',
    categoryTitle: 'Sweet Crêpes',
    image: '/images/biscoff-banana.jpg',
    badge: 'Popular',
    isAvailable: true,
    dietaryNotes: 'Contains Dairy & Wheat',
    calories: '525 kcal',
  },
  {
    id: 'smoked-salmon-galette',
    name: 'Smoked Salmon & Herbed Crème',
    description: 'Crisp buckwheat galette folded with Norwegian oak-smoked salmon, Meyer lemon whipped crème fraîche, caper berries, and fresh micro dill.',
    price: 15.0,
    category: 'savory',
    categoryTitle: 'Savory Galettes',
    image: '/images/truffle-melt.jpg',
    badge: "Chef's Choice",
    isAvailable: true,
    dietaryNotes: 'Gluten-Free Buckwheat Base • Contains Fish & Dairy',
    calories: '460 kcal',
  },
  {
    id: 'matcha-strawberry-cloud',
    name: 'Ceremonial Uji Matcha Cloud',
    description: 'First-harvest Kyoto Uji matcha cream, macerated wild strawberries, white chocolate silk, and toasted sesame brittle.',
    price: 13.5,
    category: 'specials',
    categoryTitle: 'House Specials',
    image: '/images/pistachio-raspberry.jpg',
    badge: 'New',
    isAvailable: true,
    dietaryNotes: 'Contains Dairy & Sesame',
    calories: '480 kcal',
  },
  {
    id: 'iced-pistachio-latte',
    name: 'Iced Artisanal Pistachio Latte',
    description: 'Double shot of single-origin Brazilian espresso, real Sicilian pistachio butter, and creamy steamed oat milk over clear ice.',
    price: 6.5,
    category: 'beverages',
    categoryTitle: 'Beverages',
    image: '/images/nutella-dream.jpg',
    badge: 'Popular',
    isAvailable: true,
    dietaryNotes: '100% Plant-Based • Dairy-Free',
    calories: '220 kcal',
  },
  {
    id: 'valrhona-drinking-chocolate',
    name: 'Valrhona 70% Dark Sipping Chocolate',
    description: 'French Guanaja 70% dark chocolate slow-melted with organic whole milk, Ceylon cinnamon, and a torched vanilla marshmallow.',
    price: 6.0,
    category: 'beverages',
    categoryTitle: 'Beverages',
    image: '/images/biscoff-banana.jpg',
    badge: "Chef's Choice",
    isAvailable: true,
    dietaryNotes: 'Contains Dairy',
    calories: '340 kcal',
  },
];

export const BESTSELLERS = MENU_ITEMS.filter(
  (item) => item.badge === "Chef's Choice" || item.badge === 'Popular'
).slice(0, 4);

export const SITE_SETTINGS = {
  brandName: 'HOUSE CREPE',
  brandTagline: 'The sweetest place to call home.',
  brandSubhead: 'Artisanal French crêpes crafted with 24-hour rested batter, velvety chocolates, and savory rustic galettes. Delivered warm with Cash on Delivery via WhatsApp.',
  whatsappNumber: '212600000000',
  address: '42 Boulevard de la Gourmandise, Quartier Victoria',
  phone: '+212 6 00 00 00 00',
  email: 'bonjour@housecrepe.com',
  operatingHours: [
    { days: 'Monday – Thursday', hours: '10:00 AM – 11:00 PM' },
    { days: 'Friday – Saturday', hours: '10:00 AM – 01:00 AM' },
    { days: 'Sunday', hours: '11:00 AM – 11:00 PM' },
  ],
  socialLinks: {
    instagram: 'https://instagram.com/housecrepe.official',
    facebook: 'https://facebook.com/housecrepe.official',
  },
};
