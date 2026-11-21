'use client'
import { useState } from 'react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WhatsAppModal from './WhatsAppModal'
export default function FloatingWhatsAppWidget() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Chat with ACE on WhatsApp"
        className="fixed z-[40] bottom-5 right-5 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center transition-transform hover:scale-105 group ace-wa-scale">
        <WhatsAppIcon size={28} />
        <span className="hidden md:group-hover:block absolute right-full mr-3 whitespace-nowrap bg-white border border-[rgba(0,0,0,0.06)] rounded-xl px-3 py-2 text-sm font-semibold text-[rgb(var(--ace-text-primary)/1)]">Chat with ACE</span>
      </button>
      <WhatsAppModal open={open} onClose={() => setOpen(false)} />
      <style jsx global>{`
        @keyframes ace-scale { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .ace-wa-scale { animation: ace-scale 3s ease-in-out infinite; }
        .ace-wa-scale:hover { transform: scale(1.06); animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .ace-wa-scale { animation: none !important; } .ace-wa-scale:hover { transform: none !important; } }
      `}</style>
    </>
  )
}
