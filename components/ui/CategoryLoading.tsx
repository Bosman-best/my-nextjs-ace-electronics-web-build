import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import { Skeleton, ProductGridSkeleton } from '@/components/ui/Skeleton'

/** Shared route-level loading skeleton for category listing pages. */
export default function CategoryLoading({ count = 8 }: { count?: number }) {
  return (
    <>
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <span className="sr-only" role="status">Loading devices…</span>
          <Skeleton className="h-10 w-3/4 max-w-md mb-4" />
          <Skeleton className="h-5 w-full max-w-xl mb-10" />
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-8">
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-11 w-24 rounded-full" />)}
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-11 w-full lg:w-[280px] rounded-xl" />
              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>
          </div>
          <ProductGridSkeleton count={count} />
        </PageContainer>
      </main>
      <Footer />
    </>
  )
}
