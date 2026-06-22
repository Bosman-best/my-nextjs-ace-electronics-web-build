'use client'
import { useEffect, useRef, Children } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
let registered = false
export default function RevealStagger({ children, stagger = 0.08, className = '' }: { children: React.ReactNode, stagger?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!registered) { gsap.registerPlugin(ScrollTrigger); registered = true }
    const el = ref.current; if (!el) return
    const items = el.querySelectorAll('[data-reveal-item]')
    const ctx = gsap.context(() => {
      gsap.fromTo(items, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true }})
    }, el)
    return () => ctx.revert()
  }, [stagger])
  const wrapped = Children.map(children, (child) => <div data-reveal-item>{child}</div>)
  return <div ref={ref} className={className}>{wrapped}</div>
}
