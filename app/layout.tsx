import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SITE_URL, SITE_NAME } from '@/lib/site'

// Self-hosted brand typefaces (Inter body / Space Grotesk headings) — no
// build-time or runtime dependency on Google Fonts.
const spaceGrotesk = localFont({
  src: [
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-heading-display',
})
const inter = localFont({
  src: [
    { path: '../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body-display',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    template: '%s | ACE Electronics',
  },
  description: 'Laptops and smartphones for sale in Ghana. Your trusted tech plug in Accra – competitive pricing, tested devices, fast WhatsApp support.',
  keywords: ['laptops for sale Ghana', 'smartphones for sale Ghana', 'tech plug Ghana', 'buy laptops Accra', 'buy phones Accra'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    description: 'Laptops and smartphones for sale in Ghana. Competitive pricing, tested devices, fast WhatsApp support.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630, alt: 'ACE Electronics – Your Trusted Tech Plug' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    description: 'Laptops and smartphones for sale in Ghana.',
    images: ['/og-ace.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-ace-black text-ace-white antialiased">
        {/* Keyboard users can jump straight past the header nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-ace-electric-button focus:px-5 focus:py-3 focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ElectronicsStore",
            "name": "ACE Electronics",
            "description": "Trusted technology plug offering premium laptops, smartphones, and gadgets at competitive prices in Ghana.",
            "url": SITE_URL,
            "telephone": "+233547981348",
            "areaServed": { "@type": "Country", "name": "Ghana" },
            "address": { "@type": "PostalAddress", "addressCountry": "GH", "addressLocality": "Accra" },
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+233547981348",
              "contactType": "customer service",
              "availableLanguage": ["English"],
              "areaServed": "GH"
            }
          })}}
        />
      </body>
    </html>
  )
}
