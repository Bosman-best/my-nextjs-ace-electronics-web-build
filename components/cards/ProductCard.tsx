'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
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
  const dp = product ? getDisplayPrice(product) : { show: false, price: "", wasPrice: undefined };

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
      <div className="bg-white rounded-[18px] overflow-hidden transition-transform duration-200 hover:scale-[1.02] shadow-[0_2px_12px_rgba(0,0,0,0.08)] relative group">
        <div className="aspect-square bg-[#F5F5F7] rounded-[18px] overflow-hidden flex items-center justify-center relative">
          {hasImage ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 w-full h-full p-6 cursor-zoom-in"
            aria-label={`View larger image of ${pName}`}
          >
            <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-[#F5F5F7]">
              <Image
                src={activeSrc}
                alt={`${pName} - ${pSpecs}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain rounded-[18px]"
                onError={() => setImgError(true)}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </button>
       ) : (
          <div className="absolute inset-0 rounded-[18px] bg-[#F5F5F7] flex flex-col items-center justify-center text-[#6E6E73] text-xs text-center px-3 gap-2">
            <span>Photo coming soon</span>
            <span className="text-[10px]">Chat on WhatsApp for real photos</span>
          </div>
        )}

          {hasImage && gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${i === activeIndex ? 'bg-[#1D1D1F]' : 'bg-[#D2D2D7]'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-heading text-[19px] font-semibold text-[#1D1D1F]">{pName}</h3>
          <p className="text-[14px] text-[#6E6E73] mt-2">{pSpecs}</p>
         <p className={`${dp.show ? 'text-[17px] font-normal text-[#1D1D1F]' : 'text-[#0066CC] text-[17px] font-medium'} mt-4`}>
  {dp.show && dp.price ? (
    <>
      {dp.wasPrice && (
        <span className="text-[#6E6E73] line-through text-[14px] font-normal mr-2">
          {dp.wasPrice}
        </span>
      )}
      {dp.price}
    </>
  ) : (
    "Ask on WhatsApp"
  )}
</p>
          <div className="mt-6">
            <ButtonWhatsApp size="sm" className="w-full justify-center" text={waText}>
              Quick Inquiry
            </ButtonWhatsApp>
          </div>
        </div>
      </div>

      {lightboxOpen && hasImage && (
        <div
          className="fixed inset-0 z-[1000] bg-black/85 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1D1D1F]"
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1D1D1F]"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1D1D1F]"
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