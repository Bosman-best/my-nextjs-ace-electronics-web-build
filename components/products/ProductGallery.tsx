'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getGalleryImages, getSpecSummary, type Product, type ProductImage } from '@/lib/catalog'

const SWIPE_THRESHOLD = 45 // px horizontal travel to count as a swipe

type Props = {
  product: Product
  className?: string
  /** 'hover' shows arrows on hover (cards); 'always' keeps them visible (detail page). */
  controls?: 'hover' | 'always'
  /** Hint the main image is above the fold (LCP). */
  priority?: boolean
  sizes?: string
}

export default function ProductGallery({
  product,
  className = '',
  controls = 'hover',
  priority = false,
  sizes = '(max-width: 768px) 50vw, 25vw',
}: Props) {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set())
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const lightboxRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const pName = product.name
  const pSpecs = getSpecSummary(product)
  // Canonical image records (sorted, primary first) straight from the product.
  const gallery: ProductImage[] = getGalleryImages(product)
  // Drop any images that genuinely failed to load; only show the fallback tile when ALL images fail.
  const visibleGallery = gallery.filter(img => !failedSrcs.has(img.url))
  const hasImage = visibleGallery.length > 0
  const isMulti = visibleGallery.length > 1
  const safeIndex = hasImage ? Math.min(activeIndex, visibleGallery.length - 1) : 0
  const activeImage = visibleGallery[safeIndex]
  const activeSrc = activeImage?.url

  const markFailed = useCallback((src: string) => {
    setFailedSrcs(prev => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }, [])

  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % visibleGallery.length) + visibleGallery.length) % visibleGallery.length)
  }, [visibleGallery.length])
  const next = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    setActiveIndex(i => (i + 1) % Math.max(visibleGallery.length, 1))
  }, [visibleGallery.length])
  const prev = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation()
    setActiveIndex(i => (i - 1 + visibleGallery.length) % Math.max(visibleGallery.length, 1))
  }, [visibleGallery.length])

  // --- Touch / swipe (mobile) ---
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMulti) return
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current
    touchStart.current = null
    if (!s || !isMulti) return
    const t = e.changedTouches[0]
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      // Swipe left -> next, swipe right -> previous. Suppress the click that follows.
      swiped.current = true
      window.setTimeout(() => { swiped.current = false }, 350)
      if (dx < 0) next()
      else prev()
    }
  }
  const openLightbox = () => {
    if (swiped.current) return
    setLightboxOpen(true)
  }

  // --- Lightbox focus management (transfer, trap, restore), keyboard nav + scroll lock ---
  useEffect(() => {
    if (!lightboxOpen) return
    const trigger = triggerRef.current
    const getFocusable = () =>
      lightboxRef.current
        ? Array.from(lightboxRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null)
        : []
    // Move focus into the dialog (close button is the first focusable element)
    const focusables = getFocusable()
    focusables[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(i => (i + 1) % Math.max(visibleGallery.length, 1))
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(i => (i - 1 + visibleGallery.length) % Math.max(visibleGallery.length, 1))
      } else if (e.key === 'Tab') {
        const f = getFocusable()
        if (f.length < 2) { e.preventDefault(); f[0]?.focus(); return }
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      // Return focus to the image that opened the lightbox
      trigger?.focus()
    }
  }, [lightboxOpen, visibleGallery.length])

  const mediaSwipe = { onTouchStart, onTouchEnd }
  const arrowCls = controls === 'always'
    ? 'opacity-100'
    : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity'

  return (
    <>
      <div className={`group relative aspect-square bg-white flex items-center justify-center ${className}`}>
        {hasImage ? (
          <>
            <button
              ref={triggerRef}
              type="button"
              onClick={openLightbox}
              className="absolute inset-0 w-full h-full p-6 cursor-zoom-in"
              aria-label={`View larger image of ${pName}`}
              aria-haspopup="dialog"
              {...mediaSwipe}
            >
              <div className="relative w-full h-full">
                <div key={activeSrc} className="absolute inset-0 ace-gallery-fade">
                  <Image
                    src={activeSrc}
                    alt={activeImage?.alt || `${pName}${pSpecs ? ` - ${pSpecs}` : ''}`}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className="object-contain p-4"
                    onError={() => markFailed(activeSrc)}
                  />
                </div>
              </div>
            </button>

            {isMulti && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white ${arrowCls}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white ${arrowCls}`}
                >
                  <ChevronRight size={16} />
                </button>

                {/* Thumbnail selector */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 max-w-[92%] overflow-x-auto px-1.5 py-1.5 rounded-full bg-black/50 border border-white/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {visibleGallery.map((img, i) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); goTo(i) }}
                      aria-label={`View image ${i + 1} of ${visibleGallery.length}`}
                      aria-current={i === safeIndex}
                      className={`relative w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === safeIndex ? 'border-ace-electric' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img.url} alt="" fill sizes="48px" className="object-cover" onError={() => markFailed(img.url)} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-32 h-24 rounded-xl bg-ace-black border border-ace-glass-border flex flex-col items-center justify-center text-ace-silver text-xs text-center px-2 gap-1">
            <span>Photo coming soon</span>
            <span className="text-ace-electric text-[10px]">Chat on WhatsApp for real photos</span>
          </div>
        )}
      </div>

      {lightboxOpen && hasImage && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer for ${pName}`}
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 md:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 z-10"
          >
            <X size={20} />
          </button>

          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div
              className="relative w-full aspect-square select-none"
              {...mediaSwipe}
            >
              <div key={activeSrc} className="absolute inset-0 ace-gallery-fade">
                <Image
                  src={activeSrc}
                  alt={activeImage?.alt || `${pName}${pSpecs ? ` - ${pSpecs}` : ''}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onError={() => markFailed(activeSrc)}
                />
              </div>

              {isMulti && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous photo"
                    className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next photo"
                    className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {isMulti && (
              <div className="mt-4 flex justify-center gap-2 max-w-full overflow-x-auto px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {visibleGallery.map((img, i) => (
                  <button
                    key={`lb-${img.id}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`View image ${i + 1} of ${visibleGallery.length}`}
                    aria-current={i === safeIndex}
                    className={`relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === safeIndex ? 'border-ace-electric' : 'border-white/20 opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img.url} alt="" fill sizes="64px" className="object-cover" onError={() => markFailed(img.url)} />
                  </button>
                ))}
              </div>
            )}

            <p className="sr-only" aria-live="polite">Image {safeIndex + 1} of {visibleGallery.length}</p>
          </div>
        </div>
      )}
    </>
  )
}
