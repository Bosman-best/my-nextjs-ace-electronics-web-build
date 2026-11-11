import { ShieldCheck } from '@/components/ui/IconSet'
export default function TrustBadge({ children = 'Verified Authentic', className = '' }: { children?: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[#6E6E73] tracking-wide bg-[#F5F5F7] border border-[#D2D2D7] ${className}`}>
      <ShieldCheck size={12} />{children}
    </span>
  )
}
