export default function ProductGrid({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  )
}
