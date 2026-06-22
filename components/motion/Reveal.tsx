'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
let registered = false
export default function Reveal({ children, delay = 0, y = 32, className = '' }: { children: React.ReactNode, delay?: number, y?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!registered) { gsap.registerPlugin(ScrollTrigger); registered = true }
    const el = ref.current; if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true }
      })
    }, el)
    return () => ctx.revert()
  }, [delay, y])
  return <div ref={ref} className={className}>{children}</div>
}
