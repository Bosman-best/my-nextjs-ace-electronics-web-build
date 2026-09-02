'use client'
import { useEffect } from 'react'
import { Check } from '@/components/ui/IconSet'
export default function Toast({ show, message = 'Opening WhatsApp…', onClose }: { show: boolean, message?: string, onClose: () => void }) {
  useEffect(() => { if (show) { const t = setTimeout(onClose, 2200); return () => clearTimeout(t) } }, [show, onClose])
  if (!show) return null
  return (
    <div role="status" aria-live="polite" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1100] px-5 py-3 rounded-xl border border-black/20 text-white text-sm font-medium flex items-center gap-2 shadow-lg bg-ace-white/95">
      <Check size={16} className="text-ace-electric-button" /> {message}
    </div>
  )
}
