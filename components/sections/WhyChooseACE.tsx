import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
const points = [
  { n: 1, t: 'Authentic Devices Only', d: 'Verified suppliers, every time.' },
  { n: 2, t: 'Expert Advice', d: 'We help you choose right.' },
  { n: 3, t: 'Fast WhatsApp Support', d: 'Response in minutes.' },
  { n: 4, t: 'Transparent Pricing', d: 'No hidden fees.' },
]
export default function WhyChooseACE() {
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="min-h-[360px] md:min-h-[440px] flex items-center justify-center">
            <div className="text-6xl opacity-70">🔌✨</div>
          </div>
          <div>
            <h2 className="font-heading text-[36px] md:text-[56px] font-semibold text-[rgb(var(--ace-text-primary)/1)]">Why Ghana Trusts ACE</h2>
            <div className="mt-8 space-y-6">
              {points.map(p => (
                <div key={p.n} className="flex gap-4">
                  <div className="w-[92px] flex items-center justify-center shrink-0">
                      <div className="text-[80px] leading-none font-bold text-[rgb(var(--ace-color-link)/1)]">{p.n}</div>
                    </div>
                  <div>
                                      <div className="text-[19px] font-semibold text-[rgb(var(--ace-text-primary)/1)]">{p.t}</div>
                                      <div className="text-[14px] text-[rgb(var(--ace-text-secondary)/1)] mt-1">{p.d}</div>
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
