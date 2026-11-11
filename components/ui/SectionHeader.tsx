import { cn } from '@/lib/utils'
export default function SectionHeader({
  title,
  subtext,
  align = 'center',
  className = ''
}: {
  title: string
  subtext?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div className={cn(
      align === 'center' ? 'text-center mx-auto max-w-[720px] mb-16' : 'max-w-[640px] mb-12',
      'px-0',
      className
    )}>
      <h2 className="font-heading text-[36px] md:text-[56px] font-semibold text-[rgb(var(--ace-text-primary)/1)] tracking-tight leading-tight">{title}</h2>
      {subtext && <p className="text-[19px] text-[rgb(var(--ace-text-secondary)/1)] leading-relaxed mt-4 mx-auto max-w-[600px]">{subtext}</p>}
    </div>
  )
}
