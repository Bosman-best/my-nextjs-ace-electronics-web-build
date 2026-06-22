import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body-display' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ace-electronics.com'),
  title: {
    default: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    template: '%s | ACE Electronics',
  },
  description: 'Authentic laptops and smartphones for sale in Ghana. Your trusted tech plug in Accra – competitive pricing, verified devices, fast WhatsApp support.',
  keywords: ['laptops for sale Ghana', 'smartphones for sale Ghana', 'tech plug Ghana', 'buy laptops Accra', 'buy phones Accra'],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://ace-electronics.com',
    siteName: 'ACE Electronics',
    title: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    description: 'Authentic laptops and smartphones for sale in Ghana. Competitive pricing, verified devices, fast WhatsApp support.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630, alt: 'ACE Electronics – Your Trusted Tech Plug' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACE Electronics — Your Trusted Tech Plug in Ghana',
    description: 'Authentic laptops and smartphones for sale in Ghana.',
    images: ['/og-ace.jpg'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body bg-ace-black text-ace-white antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ElectronicsStore",
            "name": "ACE Electronics",
            "description": "Trusted technology plug offering premium laptops, smartphones, and gadgets at competitive prices in Ghana.",
            "url": "https://ace-electronics.com",
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
