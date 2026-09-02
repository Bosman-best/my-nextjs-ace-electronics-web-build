import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import { ShieldCheck, BadgeCheck, MessageCircle } from '@/components/ui/IconSet'

const points = [
  { icon: ShieldCheck, t: 'Authenticity you can verify', d: 'Tested, verified devices — condition confirmed with photos on request before you buy.' },
  { icon: BadgeCheck, t: 'Fair, transparent pricing', d: 'Clear GHS prices on listings under GHS 5,000; premium devices quoted honestly on WhatsApp.' },
  { icon: MessageCircle, t: 'Real help when you need it', d: 'Direct advice on choosing the right spec, Mon–Sat 9AM–8PM GMT.' },
]

export default function WhyChooseACE() {
  return (
    <section className="py-16 md:py-28 bg-ace-gradient">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="ace-glass min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center text-center p-10 gap-5">
            <div className="w-20 h-20 rounded-full bg-ace-electric/10 border border-ace-electric/25 flex items-center justify-center">
              <ShieldCheck size={40} className="text-ace-electric" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-heading text-2xl md:text-3xl font-semibold text-ace-white">Your trusted tech plug in Ghana</p>
              <p className="text-ace-silver mt-2 max-w-sm">Authentic laptops &amp; smartphones, sourced from verified suppliers and backed by honest advice.</p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-ace-white">Why Ghana Trusts ACE</h2>
            <div className="mt-8 space-y-6">
              {points.map(p => (
                <div key={p.t} className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-ace-electric/10 flex items-center justify-center shrink-0 mt-0.5">
                    <p.icon size={22} className="text-ace-electric" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-ace-white font-semibold text-lg">{p.t}</div>
                    <div className="text-ace-silver text-[15px] mt-1 leading-relaxed">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8"><ButtonWhatsApp text="Hi ACE, I need expert advice choosing a device.">Talk to an Expert on WhatsApp</ButtonWhatsApp></div>
          </div>
        </div>
      </div>
    </section>
  )
}
