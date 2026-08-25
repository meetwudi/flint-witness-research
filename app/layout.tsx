import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://flint-witness-research.vercel.app'),
  title: 'Incuvate v. Penumbra | Flint Witness Research',
  description: 'Post-filing technical issue mapping and preliminary expert research for Incuvate v. Penumbra.',
  alternates: { canonical: '/incuvate-v-penumbra' },
  openGraph: {
    title: 'Incuvate v. Penumbra | Flint Witness Research',
    description: 'A post-filing technical issue map and researched slate of ten potential experts.',
    url: '/incuvate-v-penumbra',
    images: ['/incuvate-penumbra-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
