import Link from 'next/link'
import { ArrowRight } from '@/components/ui/IconSet'
export default function CategoryCard({ title, count, href, emoji }: { title: string, count: string, href: string, emoji?: string }) {
  const isExternal = href.startsWith('http')
  const Comp: any = isExternal ? 'a' : Link
  const props = isExternal ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
  return (
    <Comp {...props} className="relative overflow-hidden rounded-[18px] min-h-[280px] md:min-h-[320px] group transition-transform duration-200 hover:scale-[1.02] block">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative flex h-full flex-col justify-between p-8">
        <div className="text-5xl opacity-90 mb-4">{emoji || '📦'}</div>
        <div>
          <h3 className="font-heading text-[28px] md:text-[32px] font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-200 mt-2">{count}</p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-white font-medium">
          Shop {title}
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Comp>
  )
}
