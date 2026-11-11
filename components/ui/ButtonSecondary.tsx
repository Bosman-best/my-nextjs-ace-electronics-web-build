import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string; size?: 'sm' | 'md' | 'lg'; children: React.ReactNode; target?: string
}
const sizes = { sm: 'px-5 py-2.5 text-sm', md: 'px-7 py-3.5 text-base', lg: 'px-9 py-[18px] text-base' }
export default function ButtonSecondary({ href, size = 'md', className, children, target, ...props }: Props) {
  const classes = cn(
    'inline-flex items-center justify-center font-body font-medium rounded-full text-[#0066CC]',
    'bg-transparent border border-[#0066CC] transition-all duration-200',
    'hover:bg-[#0066CC] hover:text-white active:scale-[0.98]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0066CC] focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizes[size], className
  )
  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) return <a href={href} target={target || '_blank'} rel="noopener noreferrer" className={classes}>{children}</a>
    return <Link href={href} className={classes}>{children}</Link>
  }
  return <button className={classes} {...props}>{children}</button>
}
