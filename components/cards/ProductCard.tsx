'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import TrustBadge from '@/components/ui/TrustBadge'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import Toast from '@/components/ui/Toast'
import { WHATSAPP_LINK } from '@/lib/utils'
import { Product, getDisplayPrice, formatGHS, whatsappText } from '@/lib/products'

type Props = {
  product?: Product
  name?: string
  specs?: string
  price?: string
  badge?: string
}

export default function ProductCard({ product, name, specs, badge = 'Verified Authentic' }: Props) {
  const [toast, setToast] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const pName = product?.name ?? name ?? ''
  const pSpecs = product?.specs ?? specs ?? ''
  const waText = product ? whatsappText(product) : `Hi ACE, I'm interested in the ${pName} - ${pSpecs}. Is it in stock? What's the price?`
  const waLink = WHATSAPP_LINK(waText)
  const dp = product ? getDisplayPrice(product) : { show: false }

  const gallery = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : [])
  const hasImage = gallery.length > 0 && !imgError
  const activeSrc = gallery[activeIndex]

  function next(e?: React.MouseEvent) {
    e?.stopPropagation()
    setActiveIndex((i) => (i + 1) % gallery.length)
  }
  function prev(e?: React.MouseEvent) {
    e?.stopPropagation()
    setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length)
  }

  return (
    <>
      <div className="ace-glass overflow-hidden group transition-all duration-[250ms] ease-out hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(59,130,246,0.20)] hover:border-ace-electric/30 shadow-ace-card relative">
        <div className="aspect-square bg-ace-black flex items-center justify-center relative p-6">
          <div className="absolute top-3 right-3 z-10"><TrustBadge>{badge}</TrustBadge></div>

          {hasImage ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 w-full h-full p-6 cursor-zoom-in"
              aria-label={`View larger image of ${pName}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={activeSrc}
                  alt={`${pName} - ${pSpecs}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-4"
                  onError={() => setImgError(true)}
                />
              </div>
            </button>
          ) : (
            <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-ace-midnight to-ace-black border border-ace-glass-border flex flex-col items-center justify-center text-ace-silver text-xs text-center px-2 gap-1">
              <span>Photo coming soon</span>
              <span className="text-ace-electric text-[10px]">Chat on WhatsApp for real photos</span>
            </div>
          )}

          {hasImage && gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-ace-black/70 border border-ace-glass-border flex items-center justify-center text-ace-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-ace-black/70 border border-ace-glass-border flex items-center justify-center text-ace-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? 'bg-ace-electric' : 'bg-ace-glass-border'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-heading text-xl font-medium text-ace-white">{pName}</h3>
          <p className="text-ace-silver text-sm mt-1">{pSpecs}</p>
          <p className="text-ace-white font-semibold mt-3">
            {dp.show && dp.price ? (
              <>
                {dp.wasPrice && (
                  <span className="text-ace-silver line-through text-sm font-normal mr-2">{formatGHS(dp.wasPrice)}</span>
                )}
                {formatGHS(dp.price)}
              </>
            ) : (
              'Ask on WhatsApp'
            )}
          </p>
          <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[250ms] mt-4">
            <ButtonSecondary size="sm" href={waLink} target="_blank" onClick={() => setToast(true)}>Quick Inquiry</ButtonSecondary>
          </div>
        </div>
      </div>

      {lightboxOpen && hasImage && (
        <div
          className="fixed inset-0 z-[1000] bg-ace-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ace-glass border border-ace-glass-border flex items-center justify-center text-ace-white hover:bg-ace-glass-hover"
          >
            <X size={20} />
          </button>

          <div className="relative w-full max-w-2xl aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeSrc}
              alt={`${pName} - ${pSpecs}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-ace-glass border border-ace-glass-border flex items-center justify-center text-ace-white hover:bg-ace-glass-hover"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-ace-glass border border-ace-glass-border flex items-center justify-center text-ace-white hover:bg-ace-glass-hover"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Toast show={toast} onClose={() => setToast(false)} />
    </>
  )
}