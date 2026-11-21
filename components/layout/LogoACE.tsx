import Link from 'next/link'

export default function LogoACE({ className = '', size = 'header' }: { className?: string, size?: 'header' | 'footer' }) {
  const aceSize = size === 'header' ? 'text-[30px]' : 'text-2xl'
  const subSize = size === 'header' ? 'text-[10px]' : 'text-xs'
  return (
    <Link href="/" className={`font-heading flex items-end gap-2 leading-none hover:opacity-90 transition-opacity ${className}`} aria-label="ACE Electronics Home">
      <span className={`${aceSize} font-bold text-[#142759] tracking-tight`}>ACE</span>
      <span className={`${subSize} mb-1 font-bold uppercase tracking-[0.18em] text-[#142759]`}>Electronics</span>
    </Link>
  )
}
