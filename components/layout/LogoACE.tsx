import Link from 'next/link'
export default function LogoACE({ className = '', size = 'header' }: { className?: string, size?: 'header' | 'footer' }) {
  const aceSize = size === 'header' ? 'text-2xl' : 'text-xl'
  const subSize = size === 'header' ? 'text-sm' : 'text-sm'
  return (
    <Link href="/" className={`font-heading flex items-baseline gap-2 hover:opacity-90 transition-opacity ${className}`} aria-label="ACE Electronics Home">
      <span className={`${aceSize} font-bold text-ace-white tracking-tight`}>ACE</span>
      <span className={`${subSize} font-medium text-ace-silver`}>Electronics</span>
    </Link>
  )
}
