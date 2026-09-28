import type { Metadata } from 'next';
import { Fredoka, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { FloatingCartDrawer } from '@/components/cart/FloatingCartDrawer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HOUSE CREPE | Gourmet Crêpes & Cash on Delivery WhatsApp Orders',
  description:
    'Experience artisanal French crêpes crafted with 24-hour rested batter, authentic Belgian chocolates, and savory buckwheat galettes. Order seamlessly via WhatsApp with Cash on Delivery.',
  keywords: [
    'House Crepe',
    'Gourmet Crepes',
    'Cash on Delivery Crepes',
    'WhatsApp Food Order',
    'Sweet Crepes',
    'Buckwheat Galettes',
    'Artisanal Desserts',
  ],
  authors: [{ name: 'HOUSE CREPE Artisanal Desserts' }],
  openGraph: {
    title: 'HOUSE CREPE — The Sweetest Place to Call Home',
    description:
      'Gourmet French crêpes and savory galettes routed directly to WhatsApp. Cash on delivery guaranteed.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fredoka.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col font-body selection:bg-crepe-gold selection:text-chocolate-glaze">
        <ThemeProvider>
          <SmoothScroll>
            <div className="flex-1 flex flex-col relative crepe-pattern">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <FloatingCartDrawer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
