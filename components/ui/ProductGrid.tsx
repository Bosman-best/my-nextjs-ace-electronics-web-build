export default function ProductGrid({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:gap-x-6 lg:gap-y-10 ' + className}>
      {children}
    </div>
  )
}
