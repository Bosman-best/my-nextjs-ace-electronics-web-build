import Link from 'next/link'
import { ArrowRight } from '@/components/ui/IconSet'
export default function CategoryCard({ title, count, href, emoji }: { title: string, count: string, href: string, emoji?: string }) {
  const isExternal = href.startsWith('http')
  const Comp: any = isExternal ? 'a' : Link
  const props = isExternal ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
  return (
    <Comp {...props} className="ace-glass p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-between group transition-all duration-[250ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_48px_rgba(59,130,246,0.20)] hover:border-ace-electric/30 block">
      <div>
        <div className="text-5xl opacity-80 mb-4">{emoji || '📦'}</div>
        <h3 className="font-heading text-[28px] md:text-[32px] font-semibold text-ace-white">{title}</h3>
        <p className="text-ace-silver text-sm mt-2">{count}</p>
      </div>
      <div className="flex items-center gap-2 text-ace-electric font-medium mt-6">
        Shop {title} <ArrowRight size={18} className="transition-transform duration-[250ms] group-hover:translate-x-1" />
      </div>
    </Comp>
  )
}
