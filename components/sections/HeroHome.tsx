'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import { Check } from '@/components/ui/IconSet'

const HeroDeviceScene = dynamic(() => import('@/components/three/HeroDeviceScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] md:h-[480px] flex items-center justify-center">
      <div className="bg-ace-surface-secondary border border-ace-border-light rounded-2xl p-10 text-center">
        <div className="text-4xl mb-2">💻📱</div>
        <p className="text-ace-text-muted text-xs">Loading devices…</p>
      </div>
    </div>
  )
})

export default function HeroHome() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [h1Ref.current, subRef.current, ctaRef.current, trustRef.current, visualRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="h-screen flex items-center justify-center bg-[linear-gradient(180deg,#E8F4FD_0%,#F5F5F7_100%)]">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[52%_48%] gap-16 items-center">

          {/* TEXT */}
          <div>
            <h1
              ref={h1Ref}
              className="font-heading text-[48px] md:text-[80px] font-semibold tracking-tight leading-[1.02] text-[rgb(var(--ace-text-primary)/1)]"
            >
              Premium Laptops & Smartphones in Ghana
            </h1>

            <p
              ref={subRef}
              className="text-[21px] text-[rgb(var(--ace-text-secondary)/1)] leading-relaxed mt-6 max-w-[600px] mx-auto opacity-0"
            >
              Authentic devices from verified suppliers. Transparent pricing, reliable delivery, and dedicated WhatsApp support.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mt-8 opacity-0 items-center justify-center">
              <ButtonPrimary href="/laptops">
                Shop Devices
              </ButtonPrimary>

              <ButtonWhatsApp text="Hi ACE, I need help choosing a device.">
                Chat on WhatsApp
              </ButtonWhatsApp>
            </div>

            <div
              ref={trustRef}
              className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-[rgb(var(--ace-text-secondary)/1)] mt-6 opacity-0"
            >
              <span className="flex items-center gap-2">
                              <Check size={16} className="text-[rgb(var(--ace-color-link)/1)]" />
                Verified Products
              </span>

              <span className="flex items-center gap-2">
                              <Check size={16} className="text-[rgb(var(--ace-color-link)/1)]" />
                WhatsApp Support
              </span>

              <span className="flex items-center gap-2">
                              <Check size={16} className="text-[rgb(var(--ace-color-link)/1)]" />
                Fast Delivery
              </span>
            </div>
          </div>

          {/* VISUAL */}
          <div ref={parallaxRef} className="w-full flex items-center justify-center will-change-transform">
            <div ref={visualRef} className="min-h-[320px] md:min-h-[480px] opacity-0 w-full">
              <HeroDeviceScene />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}