'use client'
import { useState } from 'react'
import Link from 'next/link'
import TrustBadge from '@/components/ui/TrustBadge'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import Toast from '@/components/ui/Toast'
import ProductGallery from '@/components/products/ProductGallery'
import { WHATSAPP_LINK } from '@/lib/utils'
import { Product, getDisplayPrice, formatGHS, whatsappText } from '@/lib/products'

type Props = {
  product?: Product
  name?: string
  specs?: string
  badge?: string
  /** Mark the main image as the LCP/above-the-fold image (use sparingly). */
  priority?: boolean
}

export default function ProductCard({ product, name, specs, badge = 'Verified Authentic', priority = false }: Props) {
  const [toast, setToast] = useState(false)

  const pName = product?.name ?? name ?? ''
  const pSpecs = product?.specs ?? specs ?? ''
  const waText = product ? whatsappText(product) : `Hi ACE, I'm interested in the ${pName} - ${pSpecs}. Is it in stock? What's the price?`
  const waLink = WHATSAPP_LINK(waText)
  const dp = product ? getDisplayPrice(product) : { show: false }
  const detailHref = product ? `/products/${product.id}` : undefined

  return (
    <>
      <div className="ace-glass overflow-hidden group transition-all duration-[250ms] ease-out hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(59,130,246,0.20)] hover:border-ace-electric/30 shadow-ace-card relative">
        {product ? (
          <ProductGallery product={product} priority={priority} badge={<TrustBadge>{badge}</TrustBadge>} />
        ) : (
          <div className="aspect-square bg-ace-black flex items-center justify-center">
            <TrustBadge>{badge}</TrustBadge>
          </div>
        )}

        <div className="p-6">
          {detailHref ? (
            <Link href={detailHref} className="font-heading text-xl font-medium text-ace-white hover:text-ace-electric transition-colors block">
              {pName}
            </Link>
          ) : (
            <h3 className="font-heading text-xl font-medium text-ace-white">{pName}</h3>
          )}
          <p className="text-ace-silver text-sm mt-1">{pSpecs}</p>
          {product?.notes && (
            <p className="mt-2 inline-flex items-center w-full rounded-lg bg-ace-glass border border-ace-glass-border px-3 py-1.5 text-ace-silver text-xs">
              {product.notes}
            </p>
          )}
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
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {detailHref && (
              <ButtonPrimary size="sm" href={detailHref}>View Details</ButtonPrimary>
            )}
            <ButtonSecondary size="sm" href={waLink} target="_blank" onClick={() => setToast(true)}>Quick Inquiry</ButtonSecondary>
          </div>
        </div>
      </div>

      <Toast show={toast} onClose={() => setToast(false)} />
    </>
  )
}
