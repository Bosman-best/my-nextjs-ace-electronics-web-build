import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
const points = [
  { n: 1, t: 'Authentic Devices Only', d: 'Verified suppliers, every time.' },
  { n: 2, t: 'Expert Advice', d: 'We help you choose right.' },
  { n: 3, t: 'Fast WhatsApp Support', d: 'Response in minutes.' },
  { n: 4, t: 'Transparent Pricing', d: 'No hidden fees.' },
]
export default function WhyChooseACE() {
  return (
    <section className="py-16 md:py-28 bg-ace-gradient">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="ace-glass min-h-[360px] md:min-h-[440px] flex items-center justify-center">
            <div className="text-6xl opacity-70">🔌✨</div>
          </div>
          <div>
            <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-ace-white">Why Ghana Trusts ACE</h2>
            <div className="mt-8 space-y-6">
              {points.map(p => (
                <div key={p.n} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-ace-electric/10 text-ace-electric font-bold flex items-center justify-center shrink-0 mt-0.5">{p.n}</div>
                  <div>
                    <div className="text-ace-white font-semibold text-lg">{p.t}</div>
                    <div className="text-ace-silver text-[15px] mt-1">{p.d}</div>
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
