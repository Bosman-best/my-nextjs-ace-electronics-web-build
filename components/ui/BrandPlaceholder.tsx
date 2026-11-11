'use client'

interface BrandPlaceholderProps {
  name: string
  logo?: string | null
  size?: number
}

export default function BrandPlaceholder({ name, logo, size = 56 }: BrandPlaceholderProps) {
  const initials = name.charAt(0).toUpperCase()

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-[18px] bg-[#F5F5F7] border border-[#E5E5E5] text-[#1D1D1F] text-[18px] font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
      aria-label={name}
      title={name}
    >
      {logo ? (
        <img src={logo} alt={name} className="h-full w-full rounded-[18px] object-contain" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
