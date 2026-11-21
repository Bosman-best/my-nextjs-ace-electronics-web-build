import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import HeroHome from '@/components/sections/HeroHome'
import TrustFeatureCard from '@/components/cards/TrustFeatureCard'
import CategoryCard from '@/components/cards/CategoryCard'
import ProductCard from '@/components/cards/ProductCard'
import TestimonialCard from '@/components/cards/TestimonialCard'
import WhyChooseACE from '@/components/sections/WhyChooseACE'
import ContactQRBlock from '@/components/sections/ContactQRBlock'
import ProductGrid from '@/components/ui/ProductGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import dynamic from 'next/dynamic'
import { ShieldCheck, BadgeCheck, MessageCircle, Tag } from '@/components/ui/IconSet'
import Link from 'next/link'
import { FEATURED_PRODUCTS } from '@/lib/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ACE Electronics – Laptops & Smartphones for Sale in Ghana',
  description: 'Explore laptops and smartphones at ACE Electronics Ghana. Compare device details, ask about current prices and availability, and speak with the team on WhatsApp.',
}

const Reveal = dynamic(() => import('@/components/motion/Reveal'), { ssr: false })
const RevealStagger = dynamic(() => import('@/components/motion/RevealStagger'), { ssr: false })

const trustItems = [
  { icon: ShieldCheck, title: 'Verified Products', description: 'Explore device details and ask our team for help choosing the right option.' },
  { icon: BadgeCheck, title: 'Quality Assurance', description: 'Get clear answers about condition, specifications and warranty before you buy.' },
  { icon: MessageCircle, title: 'Direct WhatsApp Support', description: 'Speak with the ACE team about products, prices and availability.' },
  { icon: Tag, title: 'Competitive Pricing', description: 'Ask about current prices and available options before making your decision.' },
]

const categories = [
  { title: 'Laptops', count: 'Explore available models', href: '/laptops', image: '/hero/hp-elitebook-830-g7.jpg' },
  { title: 'Smartphones', count: 'Explore available models', href: '/smartphones', image: '/hero/google-pixel-9.jpg' },
  { title: 'Accessories', count: 'Ask on WhatsApp', href: '/accessories' },
  { title: 'Gaming Devices', count: 'Ask on WhatsApp', href: '/gaming' },
]

const testimonials = [
  { quote: 'Fast delivery, authentic iPhone. ACE is my plug now.', name: 'Kwame A.', device: 'iPhone 15 Pro' },
  { quote: 'Helped me pick the right laptop for Uni. Great WhatsApp support.', name: 'Ama O.', device: 'HP Pavilion 14' },
  { quote: 'Transparent pricing. No stress.', name: 'Daniel K.', device: 'Samsung Galaxy S24' },
]

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroHome />
        <section className="py-16 md:py-28 bg-ace-gradient">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" stagger={0.08}>
              {trustItems.map(t => <TrustFeatureCard key={t.title} {...t} />)}
            </RevealStagger>
          </div>
        </section>
        <section className="py-16 md:py-28">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="Shop By Category" subtext="Explore the categories and find a device that fits your needs." align="left" /></Reveal>
            <RevealStagger className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-8" stagger={0.08}>
              {categories.map(c => <CategoryCard key={c.title} {...c} />)}
            </RevealStagger>
          </div>
        </section>
        <section className="py-16 md:py-28 bg-ace-gradient">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <SectionHeader title="Featured Devices" align="left" className="!mb-0" />
                <Link href="/laptops" className="text-ace-electric font-medium hover:underline hidden md:block">View All →</Link>
              </div>
            </Reveal>
            <RevealStagger>
              <ProductGrid>
                {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
              </ProductGrid>
            </RevealStagger>
          </div>
        </section>
        <Reveal><WhyChooseACE /></Reveal>
        <section className="py-16 md:py-28">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="Plugged In Customers" subtext="A few words from customers who have connected with ACE." /></Reveal>
            <RevealStagger className="grid md:grid-cols-3 gap-6 md:gap-8" stagger={0.08}>
              {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
            </RevealStagger>
            <Reveal><p className="text-center text-ace-silver text-sm mt-8">
              Connect with ACE Electronics — <a href="https://wa.me/233547981348" className="text-ace-electric hover:underline">Chat now</a>
            </p></Reveal>
          </div>
        </section>
        <Reveal><ContactQRBlock /></Reveal>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
