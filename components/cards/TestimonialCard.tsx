import { Star } from '@/components/ui/IconSet'
export default function TestimonialCard({ quote, name, device }: { quote: string, name: string, device: string }) {
  return (
    <div className="ace-glass p-8 h-full">
      <div className="text-ace-electric text-3xl opacity-80 mb-2">“</div>
      <p className="text-ace-white italic leading-relaxed">{quote}</p>
      <div className="flex gap-0.5 mt-4 text-ace-electric opacity-90">
        {[...Array(5)].map((_,i)=><Star key={i} size={16} fill="currentColor" />)}
      </div>
      <p className="text-ace-white font-semibold text-[15px] mt-4">{name}</p>
      <p className="text-ace-silver text-sm">{device}</p>
    </div>
  )
}
