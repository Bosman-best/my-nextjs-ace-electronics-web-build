import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const categories = [
  { title:'Laptops', note:'Work, study & create', href:'/laptops', image:'https://dlcdnwebimgs.asus.com/gain/9067C94B-5DDF-4052-A5A3-140E8FF7979D/w1000/h732', alt:'ASUS ROG Strix SCAR 16 gaming laptop', kind:'remote' },
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
      <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[.94fr_1.06fr] lg:gap-2 lg:px-12 lg:py-12">
        <div className="relative z-10 max-w-[610px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#BBD5F2] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#2466A8]"><Sparkles size={14} /> Your tech plug in Ghana</div>
          <h1 className="font-heading text-[clamp(2.8rem,5.4vw,5.35rem)] font-bold leading-[.99] tracking-[-.065em] text-[#14233B]">Find the tech<br />that moves <span className="text-[#0066CC]">you.</span></h1>
          <p className="mt-7 max-w-[500px] text-base leading-8 text-[#53647B] md:text-[18px]">From powerful laptops to everyday smartphones and the gear around them, discover your next device with clear information and helpful, direct support.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/laptops" className="inline-flex items-center gap-3 rounded-full bg-[#0066CC] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,102,204,.22)] transition hover:-translate-y-1 hover:bg-[#0055AD]">Explore devices <ArrowRight size={17} /></Link><a href="https://wa.me/233547981348?text=Hello%20ACE%20Electronics%2C%20I%20need%20help%20choosing%20a%20device." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white"><WhatsAppIcon size={18} /> Ask ACE</a></div>
          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-[#63758B]"><span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1673C9]" /> Helpful product guidance</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#1673C9]" /> Direct WhatsApp support</span></div>
        </div>
        <div className="relative mx-auto mt-2 h-[390px] w-full max-w-[690px] sm:h-[500px] lg:mt-0 lg:h-[570px]">
          <div className="absolute left-[12%] top-[8%] h-[78%] w-[78%] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute left-[3%] top-[17%] z-10 w-[77%] drop-shadow-[0_28px_28px_rgba(38,64,100,.16)] sm:left-[1%] sm:w-[78%]"><Image src="/hero/hp-elitebook-830-g7.jpg" alt="HP EliteBook laptop" width={697} height={596} priority className="h-auto w-full object-contain" /></div>
          <div className="absolute right-[4%] top-[19%] z-20 w-[25%] drop-shadow-[0_24px_24px_rgba(38,64,100,.2)] sm:right-[6%] sm:w-[24%]"><Image src="/hero/google-pixel-9.jpg" alt="Google Pixel smartphone" width={549} height={849} priority className="h-auto w-full object-contain" /></div>
          <div className="absolute bottom-[7%] right-[4%] z-30 w-[30%] overflow-hidden rounded-[24px] border border-white/80 bg-white/90 p-2 shadow-[0_18px_44px_rgba(34,67,110,.16)] backdrop-blur sm:bottom-[4%] sm:right-[8%] sm:w-[31%]"><img src="https://images.unsplash.com/photo-1713511129992-a9320f883070?auto=format&fit=crop&w=700&q=85" alt="Black gaming controller" className="h-[100px] w-full rounded-[17px] object-cover sm:h-[130px]" /><p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#53647B]">Gaming gear</p></div>
          <div className="absolute bottom-[18%] left-[2%] z-30 hidden w-[25%] overflow-hidden rounded-[22px] border border-white/80 bg-white/90 p-2 shadow-[0_18px_44px_rgba(34,67,110,.14)] backdrop-blur sm:block"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85" alt="Over-ear headphones" className="h-[105px] w-full rounded-[15px] object-cover" /><p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#53647B]">Audio gear</p></div>
          <div className="absolute right-[3%] top-[7%] rounded-full border border-white/80 bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#2868A8] shadow-sm">Tech, made easier</div>
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
