import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const categories = [
  { title:'Laptops', note:'Work, study & create', href:'/laptops', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90', alt:'Apple MacBook laptop', kind:'remote' },
  { title:'Smartphones', note:'Find your next phone', href:'/smartphones', image:'https://images.samsung.com/is/image/samsung/assets/uk/2401/mktpd/163x346_Titanium-Black_Galaxy_S24_Ultra.jpg?%24LazyLoad_Home_JPG%24=', alt:'Samsung Galaxy S24 Ultra in Titanium Black', kind:'remote' },
  { title:'Audio & accessories', note:'The details that complete your setup', href:'/accessories', image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85', alt:'Studio photograph of premium headphones', kind:'remote' },
  { title:'Gaming', note:'Gear up and play', href:'/gaming', image:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=85', alt:'Gaming setup with monitor and peripherals', kind:'remote' },
]
const products = [
  { name: 'HP EliteBook 830 G7', type: 'Business laptop', image: '/products/laptops/hp-elitebook-830-g7.jpg', href: '/laptops' },
  { name: 'HP EliteBook 840 G7', type: 'Business laptop', image: '/products/laptops/hp-elitebook-840-g7.jpg', href: '/laptops' },
  { name: 'Google Pixel 10 Pro', type: 'Google smartphone', image: '/products/smartphones/google-pixel-10-pro.jpg', href: '/smartphones' },
  { name: 'Samsung Galaxy S24 Ultra', type: 'Samsung smartphone', image: '/products/smartphones/samsung-galaxy-s24-ultra.jpg', href: '/smartphones' },
]


export default function StorefrontHome() {
  return <main className="overflow-hidden bg-[#F5F5F7] text-[#17243A]">
    <section className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#F4F8FF_0%,#E6F0FF_52%,#D9E9FF_100%)]">
      <div className="pointer-events-none absolute -right-32 top-[-18rem] h-[42rem] w-[42rem] rounded-full bg-white/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-12rem] left-[30%] h-[26rem] w-[26rem] rounded-full bg-[#A9D0FF]/30 blur-3xl" />
      <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-2 lg:px-12 lg:py-12">
        <div className="relative z-10 max-w-[610px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#2466A8]"><Sparkles size={14} /> Your tech plug in Ghana</div>
          <h1 className="font-heading text-[clamp(2.8rem,5.4vw,5.35rem)] font-bold leading-[.99] tracking-[-.065em] text-[#14233B]">Find the tech<br />that moves <span className="text-[#0066CC]">you.</span></h1>
          <p className="mt-7 max-w-[500px] text-base leading-8 text-[#53647B] md:text-[18px]">From powerful laptops to everyday smartphones and the gear around them, discover your next device with clear information and helpful, direct support.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/laptops" className="inline-flex items-center gap-3 rounded-full bg-[#0066CC] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,102,204,.22)] transition hover:-translate-y-1 hover:bg-[#0055AD]">Explore devices <ArrowRight size={17} /></Link><a href="https://wa.me/233547981348?text=Hello%20ACE%20Electronics%2C%20I%20need%20help%20choosing%20a%20device." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/65 px-6 py-4 text-sm font-semibold text-[#1769D2] transition hover:bg-white"><WhatsAppIcon size={18} /> Ask ACE</a></div>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-[#63758B]"><span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1673C9]" /> Helpful product guidance</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1673C9]" /> Direct WhatsApp support</span></div>
        </div>
        <div className="ace-device-stage relative mx-auto mt-4 h-[430px] w-full max-w-[700px] sm:h-[520px] lg:mt-0 lg:h-[570px]" aria-label="MacBook, Galaxy S24 Ultra, tabletop speaker, headphones and gaming controller">
          <div className="ace-device ace-device-laptop"><img src="https://www.webmobilefirst.com/img/mockups/mockup-apple-macbook-pro-16-2021-transparent.png" alt="Apple MacBook Pro isolated transparent cutout" /></div>
          <div className="ace-device ace-device-phone"><img src="https://www.webmobilefirst.com/img/mockups/mockup-samsung-galaxy-s24-ultra-2024-transparent.png" alt="Samsung Galaxy S24 Ultra isolated transparent cutout" /></div>
          <div className="ace-device ace-device-speaker"><img src="https://purepng.com/download/qQ1ILpGujlKGnmMr1IMMW8DAezRq39jKwexkhN9wVwyiWzi8sO7zaeiRD1g3OnqGGQtMncSFiTDixSr2Q4mm6n8VEvgKEL1BGWfV1yFQRClflFmK5bpANU1gj6kz3HlyxwnHdYLgDCMMlRjcrAvu1LhDTIe0XvoVi3rbhzhH2fwrqonknfpyDSsYYfPnbycBUi6EbQ8R/large" alt="Tabletop speaker" /></div>
          <div className="ace-device ace-device-headphones"><img src="https://purepng.com/download/7196ocQW28IGjREFnhg7JGP4fVzmkiphnMgOyBWXkPiujkiJUgNsLFJntLXue6SQ9P5x3koKThtznmq5psi7akseo0o39fNWgLG2UwWcAtDGGtAUcCZP6t5z9OItCRhjxGCHZRdsuv48lSTlbnThcdwOp16xr9tAesKZRw2BZ79pjutOIRgjXUmLbVrSwf6nEicE16cB/large" alt="Over-ear headphones" /></div>
          <div className="ace-device ace-device-controller"><img src="https://purepng.com/download/RNsEh2LMtPJ9SEuPSKjKYFN9kJRjA1dvDPW2vWdtVVRpuLhLdtUg15RS8iBOwQxRbTSqx3Pk2FcjYhUtpV2x6uICt9IbxW72BhGil4XxsEVykhNJsgoqQndvSduvhcqjL0eFCB6I0rxfv54ow9Lg5lbdJS1RGIoBJlx4MWQldbYqZtHezai2Hkhv3PMgJYwBtvKeE3Lf/large" alt="Gaming controller" /></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#0066CC]">Find your category</p><h2 className="font-heading text-3xl font-bold tracking-[-.05em] text-[#14233B] md:text-[42px]">What are you looking for?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">Explore the collection by the devices and accessories you use every day.</p></div><Link href="/laptops" className="inline-flex items-center gap-2 text-sm font-bold text-[#0066CC] hover:gap-3">Browse all devices <ArrowUpRight size={17}/></Link></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">{categories.map((c,i)=><Link href={c.href} key={c.title} className="group min-w-0"><div className="relative aspect-[.92/1] overflow-hidden rounded-[22px] bg-[#E9EFF7] sm:rounded-[28px]">{c.kind==='photo'?<Image src={c.image} alt={c.alt} fill sizes="(max-width:768px) 50vw,25vw" className="object-contain p-4 transition duration-700 group-hover:scale-105 sm:p-7"/>:<img src={c.image} alt={c.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>}<div className="absolute inset-0 bg-gradient-to-t from-[#10233D]/55 via-transparent to-transparent"/><span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white sm:bottom-5 sm:left-5"><span className="font-heading text-sm font-bold sm:text-lg">{c.title}</span><span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 backdrop-blur"><ArrowUpRight size={16}/></span></span></div><p className="mt-3 px-1 text-[11px] text-slate-500 sm:text-sm">{c.note}</p></Link>)}</div>
    </section>
    <section className="bg-white py-16 lg:py-20"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#0066CC]">A closer look</p><h2 className="font-heading text-3xl font-bold tracking-[-.05em] text-[#14233B] md:text-[42px]">Featured devices</h2><p className="mt-3 text-sm leading-7 text-slate-500">Explore selected devices from the ACE catalogue.</p></div><Link href="/laptops" className="inline-flex items-center gap-2 text-sm font-bold text-[#0066CC]">Explore catalogue <ArrowRight size={16} /></Link></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{products.map(p => <Link href={p.href} key={p.name} className="group min-w-0"><div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[22px] border border-[#EDF0F4] bg-white p-4 sm:rounded-[26px] sm:p-6">{<Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 50vw,25vw" className="object-contain p-3 transition duration-500 group-hover:scale-[1.035]" />}</div><div className="px-1 pt-4"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-slate-400 sm:text-[10px]">{p.type}</p><h3 className="mt-1 font-heading text-sm font-semibold text-[#17243A] sm:text-base">{p.name}</h3><p className="mt-2 text-xs font-semibold text-[#0066CC]">Ask for current price <ArrowRight size={12} className="ml-1 inline" /></p></div></Link>)}</div></div></section>

    <section className="mx-auto grid max-w-[1240px] items-center gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-12 lg:px-12 lg:py-16">
      <div className="mx-auto w-full max-w-[390px]"><Image src="/trust-shield.svg" alt="Blue shield illustration with a white checkmark and gold stars" width={520} height={520} className="h-auto w-full object-contain" /></div>
      <div className="max-w-[620px]"><h2 className="font-heading text-3xl font-bold tracking-[-.05em] text-[#14233B] md:text-[42px]">Why Ghana Trusts ACE</h2><p className="mt-4 max-w-lg text-base leading-7 text-[#53647B]">Quality products. Reliable service. Helpful, straightforward support.</p><Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0066CC]">Learn More <ArrowRight size={16} /></Link></div>
    </section>
  </main>
}
