import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
