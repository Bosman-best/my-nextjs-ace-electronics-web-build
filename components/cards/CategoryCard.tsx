import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@/components/ui/IconSet'
import { Gamepad2, Headphones } from 'lucide-react'

export default function CategoryCard({ title, count, href, image }: { title: string, count: string, href: string, image?: string }) {
  const CategoryIcon = title === 'Gaming Devices' ? Gamepad2 : Headphones

  return (
    <Link href={href} className="group block min-w-0">
      <div className="relative aspect-[1.18/1] overflow-hidden rounded-[20px] bg-[#F3F6FA] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#EDF3FC]">
        {image ? (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-5 sm:p-7 transition-transform duration-500 group-hover:scale-[1.045]" />
        ) : (
          <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full bg-white text-[#1769D2] shadow-[0_12px_35px_rgba(24,75,145,0.08)] transition-transform duration-300 group-hover:scale-105 sm:h-[124px] sm:w-[124px]">
            <CategoryIcon size={54} strokeWidth={1.35} />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="font-heading text-[16px] sm:text-[19px] font-semibold tracking-[-0.02em] text-[#172B4D]">{title}</h3>
          <p className="mt-1 text-[11px] sm:text-[13px] text-[#7A8799]">{count}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FD] text-[#0066CC] transition-all group-hover:bg-[#0066CC] group-hover:text-white">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
