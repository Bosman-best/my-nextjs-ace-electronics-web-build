import type { BadgeTone, ProductBadge } from '@/lib/catalog'

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-ace-glass border-ace-glass-border text-ace-silver',
  accent: 'bg-ace-electric/10 border-ace-electric/25 text-ace-electric',
  positive: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600',
  warning: 'bg-amber-500/10 border-amber-500/25 text-amber-600',
}

/** Renders the product's data-driven badges. Adding a badge is a data change. */
export default function ProductBadges({
  badges,
  className = '',
  size = 'sm',
}: {
  badges: ProductBadge[]
  className?: string
  size?: 'xs' | 'sm'
}) {
  if (!badges.length) return null
  const sizeCls = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map(b => (
        <span
          key={b.id}
          className={`inline-flex items-center rounded-full border font-medium ${sizeCls} ${TONE_CLASSES[b.tone]}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  )
}
