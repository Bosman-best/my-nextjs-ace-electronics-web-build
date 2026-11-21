import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-[60vh] items-center justify-center px-5 py-20 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6E6E73]">ACE Electronics</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-[#1D1D1F]">Product not found</h1>
          <p className="mt-4 text-[#6E6E73]">This product may be unavailable or the link may have changed.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/laptops" className="rounded-full bg-[#0066CC] px-6 py-3 text-sm font-semibold text-white">Browse laptops</Link>
            <Link href="/smartphones" className="rounded-full border border-[#D2D2D7] bg-white px-6 py-3 text-sm font-semibold text-[#1D1D1F]">Browse smartphones</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
