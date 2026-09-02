import { Metadata } from 'next'
import CategoryPage from '@/components/products/CategoryPage'

export const metadata: Metadata = {
  title: 'Laptops for Sale Ghana – Gaming, Business, Student | ACE Electronics',
  description: 'Buy laptops in Accra, Ghana. HP EliteBook, Dell Latitude, Lenovo ThinkPad, ZBook – Gaming, Business, Student & Ultrabook. Sourced from verified suppliers, WhatsApp support.',
  alternates: { canonical: '/laptops' },
  openGraph: {
    title: 'Laptops for Sale Ghana | ACE Electronics',
    description: 'HP EliteBook, Dell, Lenovo laptops in Ghana. Sourced from verified suppliers, competitive prices.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return (
    <CategoryPage
      category="laptops"
      heading="Laptops for Sale in Ghana"
      intro="Gaming, Business, Student & Ultrabooks — sourced from verified suppliers, tested before delivery."
      searchPlaceholder="Search laptops…"
      emptyStateMessage="Hi ACE, I'm looking for a laptop you don't currently list."
    />
  )
}
