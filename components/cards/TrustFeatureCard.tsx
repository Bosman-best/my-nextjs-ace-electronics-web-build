import { LucideIcon } from 'lucide-react'
export default function TrustFeatureCard({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) {
  return (
    <div className="ace-glass p-8 min-h-[200px] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:border-ace-electric/30 hover:shadow-ace-glow">
      <div className="w-10 h-10 rounded-full bg-ace-electric/10 flex items-center justify-center mb-5">
        <Icon size={24} className="text-ace-electric" strokeWidth={2} />
      </div>
      <h3 className="font-heading text-xl font-medium text-ace-white">{title}</h3>
      <p className="text-ace-silver mt-2 leading-relaxed">{description}</p>
    </div>
  )
}
