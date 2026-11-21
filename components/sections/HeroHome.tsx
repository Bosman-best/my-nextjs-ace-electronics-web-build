'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import HeroShowcase from '@/components/sections/HeroShowcase'

export default function HeroHome() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-text',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 }
      )

      gsap.to('.hero-shadow', { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2 })

      gsap.fromTo(
        '.hero-device',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.12, delay: 0.2 }
      )

      gsap.utils.toArray<HTMLElement>('.hero-device').forEach((element, index) => {
        gsap.to(element, {
          yPercent: -3,
          duration: 3 + index * 0.7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.2 + index * 0.4,
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="ace-reference-hero relative min-h-[520px] lg:min-h-[520px] py-12 md:py-16 lg:py-10 overflow-hidden"
    >
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[52%_48%] gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <h1 className="hero-text hero-anim max-w-[620px] font-heading text-[44px] md:text-[58px] lg:text-[64px] font-bold tracking-tight leading-[1.02] text-[#142759]">
              Premium Electronics.<br /><span className="text-[#1455D9]">Smarter Choices.</span>
            </h1>

            <p className="hero-text hero-anim mt-5 max-w-[500px] text-[17px] leading-relaxed text-[#4F5B72] md:text-[19px]">
              Explore laptops and smartphones, compare the details that matter, and get straightforward help from the ACE team.
            </p>

            <div className="hero-text hero-anim mt-8 flex flex-wrap items-center gap-3">
              <ButtonPrimary href="/laptops" size="md" className="rounded-full bg-[#0066CC] px-7 shadow-[0_10px_24px_rgba(0,102,204,0.2)]">Explore devices <span aria-hidden="true" className="ml-2">→</span></ButtonPrimary>
              <ButtonWhatsApp size="md" className="rounded-full bg-white px-6 text-[#1769D2] ring-1 ring-[#C9D9EF] hover:bg-[#F5F9FF] hover:text-[#0055AD]">Ask us a question</ButtonWhatsApp>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </div>
    </section>
  )
}