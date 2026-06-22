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
      <h2 className="font-heading text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-ace-white tracking-tight leading-tight">{title}</h2>
      {subtext && <p className="text-ace-silver text-lg leading-relaxed mt-4">{subtext}</p>}
    </div>
  )
}
