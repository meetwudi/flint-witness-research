import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const GOOGLE_ANALYTICS_ID = 'G-N01KGDT1FY';

export const metadata: Metadata = {
  metadataBase: new URL('https://flint-witness-research.vercel.app'),
  title: 'Flint Witness Research',
  description: 'Post-filing technical issue mapping and preliminary expert research for technically complex litigation.',
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
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
