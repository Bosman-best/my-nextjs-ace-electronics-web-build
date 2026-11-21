import { Star } from '@/components/ui/IconSet'
export default function TestimonialCard({ quote, name, device }: { quote: string, name: string, device: string }) {
  return (
    <article className="ace-reference-card flex h-full min-h-[220px] flex-col p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex gap-1 text-[#F5AE24]" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_,i)=><Star key={i} size={16} fill="currentColor" />)}
      </div>
      <p className="mt-5 flex-1 text-[14px] sm:text-[15px] leading-[1.8] text-[#34445F]">“{quote}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-[#EDF0F5] pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1FC] font-heading text-sm font-semibold text-[#1769D2]">{name.split(' ').map(part => part[0]).join('').replace('.', '').slice(0,2)}</div>
        <div>
          <p className="text-[13px] font-semibold text-[#172B4D]">{name}</p>
          <p className="mt-0.5 text-[12px] text-[#8190A5]">{device}</p>
        </div>
      </div>
    </article>
  )
}
