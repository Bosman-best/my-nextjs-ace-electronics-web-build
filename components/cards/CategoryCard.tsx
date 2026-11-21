import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@/components/ui/IconSet'

export default function CategoryCard({ title, count, href, image }: { title: string, count: string, href: string, image?: string }) {
  return (
    <Link href={href} className="group block min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[linear-gradient(145deg,#F4F8FF_0%,#EEF3F8_100%)] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
        {image ? (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <div className="h-[55%] w-[55%] rounded-full bg-[#DCEBFF]" />
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-3 px-1">
        <div>
          <h3 className="font-heading text-[18px] font-semibold text-[#142759]">{title}</h3>
          <p className="mt-1 text-[12px] text-[#6E6E73]">{count}</p>
        </div>
        <ArrowRight size={18} className="mb-1 shrink-0 text-[#0066CC] transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
