import { LucideIcon } from 'lucide-react'
export default function TrustFeatureCard({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) {
  return (
    <div className="bg-white rounded-[18px] p-8 min-h-[200px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5">
      <div className="w-12 h-12 flex items-center justify-center mb-5">
        <Icon size={28} className="text-[#0066CC]" strokeWidth={2} />
      </div>
      <h3 className="font-heading text-[19px] font-semibold text-[#1D1D1F]">{title}</h3>
      <p className="text-[14px] text-[#6E6E73] mt-2 leading-relaxed">{description}</p>
    </div>
  )
}
