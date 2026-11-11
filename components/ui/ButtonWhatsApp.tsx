import { MessageCircle } from './IconSet'
import { WHATSAPP_LINK } from '@/lib/utils'
export default function ButtonWhatsApp({
  text = "Hi ACE, I'm interested in a device. Is it in stock?",
  children = 'Talk to an Expert on WhatsApp',
  size = 'md' as 'sm'|'md'|'lg',
  className = '',
}: { text?: string, children?: React.ReactNode, size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-[18px] text-base',
  }

  const classes = `inline-flex items-center justify-center font-body font-semibold rounded-full text-white bg-[#3B82F6] transition-all duration-200 hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] focus-visible:outline-offset-2 disabled:bg-[#3B82F6]/40 disabled:cursor-not-allowed ${sizes[size]} ${className}`

  return (
    <a
      href={WHATSAPP_LINK(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      <MessageCircle size={20} className="mr-2" strokeWidth={2} />
      {children}
    </a>
  )
}
