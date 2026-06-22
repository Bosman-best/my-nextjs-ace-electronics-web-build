'use client'
import { useState } from 'react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WhatsAppModal from './WhatsAppModal'
export default function FloatingWhatsAppWidget() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Chat with ACE on WhatsApp"
        className="fixed z-[999] bottom-5 right-5 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-ace-electric-button text-ace-white flex items-center justify-center shadow-[0_8px_32px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 group ace-wa-float">
        <WhatsAppIcon size={28} />
        <span className="hidden md:group-hover:block absolute right-full mr-3 whitespace-nowrap bg-ace-midnight/95 border border-ace-glass-border rounded-xl px-3 py-2 text-sm font-semibold">Chat with ACE</span>
      </button>
      <WhatsAppModal open={open} onClose={() => setOpen(false)} />
      <style jsx global>{`
        @keyframes ace-pulse { 0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4), 0 8px 32px rgba(59,130,246,0.35); } 70% { box-shadow: 0 0 0 16px rgba(59,130,246,0), 0 8px 32px rgba(59,130,246,0.35); } 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0), 0 8px 32px rgba(59,130,246,0.35); } }
        @keyframes ace-float { 0% { transform: translateY(0px); } 100% { transform: translateY(-3px); } }
        .ace-wa-float { animation: ace-pulse 3s ease-out infinite, ace-float 2.5s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .ace-wa-float { animation: none !important; } }
        .ace-wa-float:hover { animation: ace-pulse 3s ease-out infinite !important; }
        @media (prefers-reduced-motion: reduce) { .ace-wa-float:hover { animation: none !important; } }
      `}</style>
    </>
  )
}
