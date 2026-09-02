export default function ProductGrid({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    // items-stretch (grid default) + h-full on cards keeps every card in a row
    // the same height, so CTA rows line up across the grid.
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-stretch ${className}`}>
      {children}
    </div>
  )
}
