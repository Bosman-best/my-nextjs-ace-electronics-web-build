import ButtonPrimary from './ButtonPrimary'
import { MessageCircle } from './IconSet'
import { WHATSAPP_LINK } from '@/lib/utils'
export default function ButtonWhatsApp({
  text = "Hi ACE, I'm interested in a device. Is it in stock?",
  children = 'Talk to an Expert on WhatsApp',
  size = 'md' as 'sm'|'md'|'lg',
  className = '',
}: { text?: string, children?: React.ReactNode, size?: 'sm' | 'md' | 'lg', className?: string }) {
  return (
    <ButtonPrimary href={WHATSAPP_LINK(text)} size={size} className={className}>
      <MessageCircle size={20} className="mr-2" strokeWidth={2} />
      {children}
    </ButtonPrimary>
  )
}
