'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import PageContainer from '@/components/layout/PageContainer'
import { getDisplayPrice, type Product } from '@/lib/products'
import { WHATSAPP_LINK } from '@/lib/utils'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const gallery = product.images?.length ? product.images : (product.image ? [product.image] : [])
  const dp = getDisplayPrice(product)
  const backHref = product.type === 'laptop' ? '/laptops' : '/smartphones'
  const backLabel = product.type === 'laptop' ? 'Laptops' : 'Smartphones'

  const move = (direction: number) => {
    if (!gallery.length) return
    setActiveIndex((index) => (index + direction + gallery.length) % gallery.length)
  }

  return (
    <section className="ace-page min-h-screen pt-[104px] pb-12 md:pt-[120px] md:pb-16">
      <PageContainer>
        <Link href={backHref} className="relative z-10 mb-8 inline-flex items-center gap-2 py-2 text-sm font-medium text-[#718096] transition-colors hover:text-[#0066CC]">
          <ArrowLeft size={16} /> Back to {backLabel}
        </Link>

        <div className="grid gap-7 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-10">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-transparent touch-pan-y" onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const delta = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); touchStartX.current = null }}>
              {gallery[activeIndex] ? (
                <Image
                  src={gallery[activeIndex]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain p-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-[#6E6E73]">Photo coming soon</div>
              )}

              {gallery.length > 1 && (
                <>
                  <button type="button" onClick={() => move(-1)} aria-label="Previous product photo" className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D2D2D7] bg-white/95 shadow-sm">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => move(1)} aria-label="Next product photo" className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D2D2D7] bg-white/95 shadow-sm">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View product photo ${index + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-[14px] bg-transparent transition-opacity ${index === activeIndex ? 'opacity-100' : 'opacity-55 hover:opacity-85'}`}
                  >
                    <Image src={image} alt="" fill sizes="120px" className="object-contain p-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[26px] border border-[#E6ECF4] bg-white p-6 shadow-[0_12px_38px_rgba(23,43,77,0.045)] sm:p-8 lg:sticky lg:top-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6E6E73]">{product.brand} · {product.category}</p>
            <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] tracking-tight text-[#172B4D] md:text-[44px]">
              {product.name}
            </h1>

            <div className="mt-6 border-y border-[#E8EDF4] py-5">
              {dp.show ? (
                <div className="flex flex-wrap items-baseline gap-3">
                  {dp.wasPrice && <span className="text-[18px] text-[#6E6E73] line-through">{dp.wasPrice}</span>}
                  <span className="text-[28px] font-semibold text-[#1D1D1F]">{dp.price}</span>
                  {dp.wasPrice && <span className="rounded-full bg-[#E8F4FD] px-3 py-1 text-xs font-semibold text-[#0066CC]">Sale</span>}
                </div>
              ) : (
                <p className="text-[24px] font-semibold text-[#0066CC]">Enquire for price</p>
              )}
            </div>

            <p className="mt-6 text-[16px] leading-7 text-[#6E6E73]">
              {product.type === 'laptop'
                ? `A ${product.category.toLowerCase()} laptop from ${product.brand}, selected for everyday productivity and dependable performance.`
                : `A ${product.category.toLowerCase()} smartphone from ${product.brand}, available for purchase through ACE Electronics in Ghana.`}
            </p>

            <dl className="mt-7 grid grid-cols-2 divide-x divide-[#E8EDF4] border-y border-[#E8EDF4]">
              <div className="py-4 pr-4">
                <dt className="text-xs text-[#6E6E73]">Availability</dt>
                <dd className="mt-1 text-sm font-semibold text-[#1D1D1F]">Confirm with ACE</dd>
              </div>
              <div className="py-4 pl-4">
                <dt className="text-xs text-[#6E6E73]">Condition</dt>
                <dd className="mt-1 text-sm font-semibold text-[#1D1D1F]">{product.name.toLowerCase().includes('renewed') ? 'Renewed Premium' : 'Confirm with ACE'}</dd>
              </div>
              <div className="col-span-2 border-t border-[#E8EDF4] py-4">
                <dt className="text-xs text-[#6E6E73]">Warranty</dt>
                <dd className="mt-1 text-sm font-semibold text-[#1D1D1F]">Confirm warranty with ACE</dd>
              </div>
            </dl>

            <p className="mt-5 text-sm text-[#6E6E73]">For detailed enquiries about this product, please contact us directly.</p>

            <div className="mt-6 flex gap-4">
              <a
                href={WHATSAPP_LINK(`Hi ACE, I'm interested in the ${product.name}. Please confirm availability, warranty, price and delivery.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-[#0066CC] px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,102,204,0.16)] transition-all hover:bg-[#0055AD] active:bg-[#004B99]"
              >
                <MessageCircle size={16} className="mr-2 inline-block" /> Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {product.specs.length > 0 && (
          <div className="mt-12 bg-transparent py-2 md:mt-16">
            <h2 className="font-heading text-[28px] font-semibold text-[#1D1D1F] md:text-[36px]">Technical specifications</h2>
            <ul className="mt-7 divide-y divide-[#E8EDF4]">
              {product.specs.map((value, index) => (
                <li key={index + "-" + value} className="flex items-start gap-3 py-4 text-[15px] leading-7 text-[#1D1D1F]">
                  <Check size={16} className="mt-1.5 shrink-0 text-[#0066CC]" /> <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageContainer>
    </section>
  )
}
