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
  { icon: ShieldCheck, title: 'Product guidance', description: 'Explore device details and get help choosing an option that suits your needs.' },
  { icon: BadgeCheck, title: 'Clear information', description: 'Ask about condition, specifications and warranty before making a decision.' },
  { icon: MessageCircle, title: 'Direct WhatsApp support', description: 'Speak with the ACE team about products, prices and availability.' },
  { icon: Tag, title: 'Straightforward pricing', description: 'Check current prices and available options directly with our team.' },
]

const categories = [
  { title: 'Laptops', count: 'Explore available models', href: '/laptops', image: '/hero/hp-elitebook-830-g7.jpg' },
  { title: 'Smartphones', count: 'Explore available models', href: '/smartphones', image: '/hero/google-pixel-9.jpg' },
  { title: 'Accessories', count: 'Explore accessories', href: '/accessories' },
  { title: 'Gaming Devices', count: 'Explore gaming devices', href: '/gaming' },
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

        <section className="ace-section-space bg-white">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal>
              <SectionHeader title="Shop by category" subtext="Find the kind of tech you are looking for." align="left" />
            </Reveal>
            <RevealStagger className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8" stagger={0.08}>
              {categories.map(c => <CategoryCard key={c.title} {...c} />)}
            </RevealStagger>
          </div>
        </section>

        <section className="ace-section-space bg-[#F5F7FB]">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-9 md:mb-12">
                <SectionHeader title="Featured devices" subtext="A closer look at selected devices from our catalogue." align="left" className="!mb-0" />
                <Link href="/laptops" className="text-[#0066CC] font-semibold text-sm hover:underline hidden md:block">Explore catalogue →</Link>
              </div>
            </Reveal>
            <RevealStagger>
              <ProductGrid>
                {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
              </ProductGrid>
            </RevealStagger>
            <div className="mt-8 text-center md:hidden">
              <Link href="/laptops" className="text-[#0066CC] font-semibold text-sm">Explore catalogue →</Link>
            </div>
          </div>
        </section>

        <Reveal><WhyChooseACE /></Reveal>

        <section className="py-16 md:py-20 bg-[#F5F7FB]">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="The ACE experience" subtext="Helpful service at every step, from browsing to asking the right questions." /></Reveal>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" stagger={0.08}>
              {trustItems.map(t => <TrustFeatureCard key={t.title} {...t} />)}
            </RevealStagger>
          </div>
        </section>

        <section className="ace-section-space bg-white">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="Plugged in customers" subtext="A few words from customers who have connected with ACE." /></Reveal>
            <RevealStagger className="grid md:grid-cols-3 gap-5 md:gap-7" stagger={0.08}>
              {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
            </RevealStagger>
            <Reveal><p className="text-center text-[#718096] text-sm mt-8">
              Have a question? <a href="https://wa.me/233547981348" className="text-[#0066CC] font-semibold hover:underline">Chat with ACE on WhatsApp</a>
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
