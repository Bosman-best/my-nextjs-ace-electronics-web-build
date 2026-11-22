import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://ace-electronics.com'),
  title: { default: 'ACE Electronics — Your Trusted Tech Plug in Ghana', template: '%s | ACE Electronics' },
  description: 'Explore laptops and smartphones at ACE Electronics Ghana. Compare key specifications, ask about current availability and get friendly support on WhatsApp.',
  keywords: ['laptops for sale Ghana', 'smartphones for sale Ghana', 'tech plug Ghana', 'buy laptops Accra', 'buy phones Accra'],
  openGraph: { type: 'website', locale: 'en_GH', url: 'https://ace-electronics.com', siteName: 'ACE Electronics', title: 'ACE Electronics — Your Trusted Tech Plug in Ghana', description: 'Explore laptops and smartphones at ACE Electronics Ghana. Product details, straightforward enquiries and WhatsApp support.', images: [{ url: '/og-ace.jpg', width: 1200, height: 630, alt: 'ACE Electronics – Your Trusted Tech Plug' }] },
  twitter: { card: 'summary_large_image', title: 'ACE Electronics — Your Trusted Tech Plug in Ghana', description: 'Explore laptops and smartphones at ACE Electronics Ghana.', images: ['/og-ace.jpg'] },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-ace-background text-ace-text-primary antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ElectronicsStore", "name": "ACE Electronics",
          "description": "Laptops, smartphones and technology accessories with customer support in Ghana.",
          "url": "https://ace-electronics.com", "telephone": "+233547981348",
          "areaServed": { "@type": "Country", "name": "Ghana" },
          "address": { "@type": "PostalAddress", "addressCountry": "GH", "addressLocality": "Accra" },
          "sameAs": [], "contactPoint": { "@type": "ContactPoint", "telephone": "+233547981348", "contactType": "customer service", "availableLanguage": ["English"], "areaServed": "GH" }
        }) }} />
      </body>
    </html>
  )
}
