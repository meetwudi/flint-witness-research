import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Incuvate v. Penumbra | Preliminary Expert Research',
  description: 'Independent preliminary research based on public information for Incuvate v. Penumbra.',
  openGraph: {
    title: 'Incuvate v. Penumbra | Preliminary Expert Research',
    description: 'A matter-specific expert map for pressure-based clot detection and aspiration thrombectomy.',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
