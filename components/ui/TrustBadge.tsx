import { ShieldCheck } from '@/components/ui/IconSet'
export default function TrustBadge({ children = 'Verified Authentic', className = '' }: { children?: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-ace-electric tracking-wide bg-ace-electric/10 border border-ace-electric/25 ${className}`}>
      <ShieldCheck size={12} />{children}
    </span>
  )
}
