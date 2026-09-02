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
    <div className="w-full h-[260px] xs:h-[320px] lg:h-[480px] flex items-center justify-center">
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

  useEffect(() => {
    const els = [h1Ref.current, subRef.current, ctaRef.current, trustRef.current, visualRef.current]

    // Reduced motion: reveal everything immediately (markup starts at opacity-0).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => { if (el) el.style.opacity = '1' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="pt-24 md:pt-36 pb-20 md:pb-28 bg-ace-surface-primary">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[52%_48%] gap-10 md:gap-12 lg:gap-16 items-center">

          {/* TEXT */}
          <div>
            <h1
              ref={h1Ref}
              className="font-heading text-[36px] md:text-[52px] lg:text-[64px] font-semibold tracking-tight leading-[1.05] text-ace-text-primary opacity-0"
            >
              Premium Laptops & Smartphones in Ghana
            </h1>

            <p
              ref={subRef}
              className="text-ace-text-secondary text-base md:text-lg leading-relaxed mt-6 max-w-[520px] opacity-0"
            >
              Authentic devices from verified suppliers. Transparent pricing, reliable delivery, and dedicated WhatsApp support.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10 opacity-0">
              <ButtonPrimary href="/laptops">
                Shop Devices
              </ButtonPrimary>

              <ButtonWhatsApp text="Hi ACE, I need help choosing a device.">
                Chat on WhatsApp
              </ButtonWhatsApp>
            </div>

            <div
              ref={trustRef}
              className="flex flex-wrap gap-x-6 gap-y-3 text-ace-text-secondary text-sm mt-8 opacity-0"
            >
              <span className="flex items-center gap-2">
                <Check size={16} className="text-ace-electric" />
                Verified suppliers
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-ace-electric" />
                WhatsApp Support
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-ace-electric" />
                Fast Delivery
              </span>
            </div>
          </div>

          {/* VISUAL */}
          <div
            ref={visualRef}
            className="min-h-[260px] xs:min-h-[320px] lg:min-h-[480px] flex items-center justify-center opacity-0"
          >
            <div className="w-full">
              <HeroDeviceScene />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}