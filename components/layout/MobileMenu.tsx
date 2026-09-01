'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { X } from '@/components/ui/IconSet'
import LogoACE from './LogoACE'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import { SITE_NAV_LINKS } from '@/lib/nav'

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power2.out' })
      }
    })
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { ctx.revert(); document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div ref={overlayRef} className="absolute inset-0 bg-ace-black/95 backdrop-blur-[20px]" onClick={onClose} />
      <div ref={panelRef} className="relative h-full px-6 py-8 flex flex-col bg-transparent ml-auto max-w-sm w-full">
        <div className="flex items-center justify-between">
          <LogoACE />
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close menu" className="p-2 text-ace-silver hover:text-ace-white"><X size={24} /></button>
        </div>
        <nav className="mt-12 flex flex-col">
          {SITE_NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={onClose} className="font-heading text-[32px] font-medium text-ace-white py-4 border-b border-ace-glass-border hover:text-ace-electric transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="mt-auto pb-8">
          <ButtonWhatsApp size="lg" className="w-full justify-center" text="Hi ACE, I need help choosing a device.">Talk to ACE on WhatsApp</ButtonWhatsApp>
        </div>
      </div>
    </div>
  )
}
