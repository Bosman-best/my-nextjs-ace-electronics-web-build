import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  target?: string
  /** Fires for button, internal link and external link variants alike. */
  onClick?: React.MouseEventHandler<HTMLElement>
}

const sizes = { sm: 'px-5 py-2.5 text-sm', md: 'px-7 py-3.5 text-base', lg: 'px-9 py-[18px] text-base' }

export default function ButtonPrimary({ href, size = 'md', className, children, target, onClick, ...props }: Props) {
  const classes = cn(
    'inline-flex items-center justify-center font-body font-semibold text-white text-center',
    'bg-ace-electric-button rounded-full shadow-ace-glow',
    'transition-all duration-200',
    'hover:bg-ace-electric-dark hover:-translate-y-0.5 hover:shadow-ace-glow-strong',
    'active:translate-y-0 active:scale-[0.98]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-ace-electric focus-visible:outline-offset-2',
    'disabled:bg-ace-electric/40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none',
    // Guarantee a comfortable tap target on touch devices.
    'min-h-[44px]',
    sizes[size], className
  )
  if (href) {
    const isExternal = href.startsWith('http')
    // onClick must be forwarded so callers can react to the click even though
    // navigation itself is handled by the link.
    if (isExternal) {
      return (
        <a href={href} target={target || '_blank'} rel="noopener noreferrer" className={classes} onClick={onClick}>
          {children}
        </a>
      )
    }
    return <Link href={href} className={classes} onClick={onClick}>{children}</Link>
  }
  return <button className={classes} onClick={onClick} {...props}>{children}</button>
}
