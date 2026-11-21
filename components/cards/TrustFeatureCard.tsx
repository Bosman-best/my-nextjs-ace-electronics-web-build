import { LucideIcon } from 'lucide-react'
export default function TrustFeatureCard({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) {
  return (
    <article className="group h-full rounded-[20px] border border-[#E8EDF5] bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D5E3F8] hover:shadow-[0_16px_38px_rgba(25,65,120,0.07)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#1265CF] transition-colors group-hover:bg-[#1265CF] group-hover:text-white">
        <Icon size={23} strokeWidth={1.8} />
      </div>
      <h3 className="font-heading text-[17px] sm:text-[18px] font-semibold tracking-[-0.02em] text-[#172B4D]">{title}</h3>
      <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.75] text-[#718096]">{description}</p>
    </article>
  )
}
