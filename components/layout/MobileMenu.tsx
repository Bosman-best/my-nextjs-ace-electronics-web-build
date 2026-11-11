'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { X } from '@/components/ui/IconSet'
import LogoACE from './LogoACE'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'

const navLinks = [
  { href: '/', label: 'Home' },
  { 
    label: 'Laptops', 
    categories: [
      { label: 'Business', href: '/laptops?category=Business' },
      { label: 'Gaming', href: '/laptops?category=Gaming' },
      { label: 'Student', href: '/laptops?category=Student' },
      { label: 'Ultrabook', href: '/laptops?category=Ultrabook' },
    ]
  },
  { 
    label: 'Smartphones', 
    categories: [
      { label: 'Flagship', href: '/smartphones?category=Flagship' },
      { label: 'Mid-range', href: '/smartphones?category=Mid-range' },
      { label: 'Budget', href: '/smartphones?category=Budget' },
    ]
  },
  { href: '/accessories', label: 'Accessories' },
  { href: '/entertainment', label: 'Entertainment' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose }: { open: boolean, onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

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
      <div ref={overlayRef} className="absolute inset-0 bg-black/25" onClick={onClose} />
      <div ref={panelRef} className="relative h-full px-6 py-8 flex flex-col bg-white ml-auto w-full max-w-md overflow-y-auto">
        <div className="flex items-center justify-between">
          <LogoACE />
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close menu" className="p-2 text-[rgb(var(--ace-text-secondary)/1)] hover:text-[rgb(var(--ace-text-primary)/1)]"><X size={24} /></button>
        </div>
        <nav className="mt-12 flex flex-col space-y-2">
          {navLinks.map((l, idx) => {
            const isExpandable = 'categories' in l
            const isExpanded = expandedCategory === l.label
            
            if (isExpandable) {
              const categories = (l as any).categories
              return (
                <div key={idx}>
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : l.label)}
                    className="font-heading text-[24px] font-medium text-[rgb(var(--ace-text-primary)/1)] py-4 w-full text-left"
                  >
                    {l.label}
                  </button>
                  {isExpanded && (
                    <div className="pl-6 space-y-2">
                      {categories.map((cat: any, catIdx: number) => (
                        <Link
                          key={catIdx}
                          href={cat.href}
                          onClick={onClose}
                          className="block text-[16px] text-[#6E6E73] hover:text-[#0066CC] py-2"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <Link 
                key={(l as any).href} 
                href={(l as any).href} 
                onClick={onClose} 
                className="font-heading text-[24px] font-medium text-[rgb(var(--ace-text-primary)/1)] py-4"
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto pb-8">
          <ButtonWhatsApp size="lg" className="w-full justify-center bg-[#3B82F6] text-white">Talk to ACE on WhatsApp</ButtonWhatsApp>
        </div>
      </div>
    </div>
  )
}
