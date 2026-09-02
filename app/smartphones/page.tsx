import { Metadata } from 'next'
import CategoryPage from '@/components/products/CategoryPage'

export const metadata: Metadata = {
  title: 'Smartphones for Sale Ghana – Samsung, Google Pixel',
  description: 'Buy smartphones in Accra, Ghana. Samsung Galaxy S24/S25, Google Pixel 10/9/8 – Flagship, Mid-range & Budget. Tested devices, WhatsApp support.',
  alternates: { canonical: '/smartphones' },
  openGraph: {
    title: 'Smartphones for Sale Ghana',
    description: 'Samsung Galaxy, Google Pixel phones in Ghana. Sourced from verified suppliers.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return (
    <CategoryPage
      category="smartphones"
      heading="Smartphones for Sale in Ghana"
      intro="Flagship, Mid-range & Budget — sourced from verified suppliers, tested before delivery."
      searchPlaceholder="Search phones…"
      emptyStateMessage="Hi ACE, I'm looking for a phone you don't currently list."
    />
  )
}
