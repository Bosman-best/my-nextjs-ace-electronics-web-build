import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ProductDetailClient from './ProductDetailClient'
import { getCatalogProducts } from '@/lib/catalog'

export async function generateStaticParams() {
  const products = await getCatalogProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const products = await getCatalogProducts()
  const product = products.find((item) => item.slug === params.slug)
  if (!product) return { title: 'Product not found | ACE Electronics' }

  return {
    title: `${product.name} | ACE Electronics Ghana`,
    description: `${product.name} for sale in Ghana. ${product.category}. Enquire through WhatsApp for availability and delivery.`,
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const products = await getCatalogProducts()
  const product = products.find((item) => item.slug === params.slug)
  if (!product) notFound()

  return (
    <>
      <NavBar />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
