import { Star } from '@/components/ui/IconSet'
export default function TestimonialCard({ quote, name, device }: { quote: string, name: string, device: string }) {
  return (
    <div className="ace-reference-card h-full min-h-[190px] p-7">
      <div className="flex gap-1 text-[#FFB400]">
        {[...Array(5)].map((_,i)=><Star key={i} size={17} fill="currentColor" />)}
      </div>
      <p className="mt-4 text-[15px] leading-7 text-[#142759]">“{quote}”</p>
      <div className="mt-5">
        <p className="text-[14px] font-semibold text-[#142759]">{name}</p>
        <p className="mt-0.5 text-[12px] text-[#6E6E73]">{device}</p>
      </div>
    </div>
  )
}
