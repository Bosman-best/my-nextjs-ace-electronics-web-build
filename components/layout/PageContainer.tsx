import { cn } from '@/lib/utils'
export default function PageContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12 w-full', className)}>
      {children}
    </div>
  )
}
