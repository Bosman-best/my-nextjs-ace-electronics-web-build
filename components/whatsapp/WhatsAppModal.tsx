'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { X } from '@/components/ui/IconSet'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import { WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'

export default function WhatsAppModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        gsap.fromTo(cardRef.current, { y: 16, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' })
      }
    })
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && cardRef.current) {
        const focusable = cardRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable.length) return
        const first = focusable[0], last = focusable[focusable.length-1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { ctx.revert(); document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title">
      <div ref={overlayRef} className="absolute inset-0 bg-ace-black/70 backdrop-blur-[8px]" onClick={onClose} />
      <div ref={cardRef} className="relative w-full max-w-[420px] rounded-2xl border border-ace-glass-border p-10 text-center bg-ace-midnight/90 backdrop-blur-[24px]">
        <button ref={closeBtnRef} onClick={onClose} className="absolute top-5 right-5 text-ace-silver hover:text-ace-white" aria-label="Close">
          <X size={24} />
        </button>
        <h3 id="wa-modal-title" className="font-heading text-2xl font-semibold text-ace-white">Talk to ACE</h3>
        <p className="text-ace-silver text-sm mt-2">Fast response, Mon-Sat 9AM–8PM</p>
        <div className="mx-auto my-6">
          <img src="/ace-whatsapp-qr.png" alt="WhatsApp QR code for ACE Electronics – scan to chat at wa.me/233547981348" width={180} height={180} className="mx-auto rounded-xl bg-white p-3 shadow-ace-glow w-[180px] h-[180px]" />
        </div>
        <p className="text-ace-silver text-sm mb-4">Scan to chat instantly</p>
        <ButtonWhatsApp size="lg" className="w-full justify-center">Open WhatsApp</ButtonWhatsApp>
        <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="block text-ace-electric text-[15px] font-medium mt-4 hover:underline">Join our WhatsApp Group</a>
        <div className="text-ace-silver text-[13px] leading-relaxed mt-6">
          Phone: {WHATSAPP_DISPLAY}<br/>Hours: Mon–Sat 9AM – 8PM GMT<br/>Response time: ~2 minutes
        </div>
      </div>
    </div>
  )
}
