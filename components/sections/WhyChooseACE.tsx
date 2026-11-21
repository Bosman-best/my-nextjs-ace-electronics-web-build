import Image from 'next/image'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
const points = [
  { n: '01', t: 'Explore with confidence', d: 'Browse clear product information and compare the details that matter.' },
  { n: '02', t: 'Get practical advice', d: 'Talk through your needs before choosing your next device.' },
  { n: '03', t: 'Speak to a real person', d: 'Ask the ACE team about current prices, condition and availability.' },
]
export default function WhyChooseACE() {
  return (
    <section className="overflow-hidden bg-white py-16 md:py-24">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="relative flex min-h-[300px] items-center justify-center rounded-[28px] bg-[radial-gradient(circle_at_50%_45%,#FFFFFF_0%,#EDF4FF_58%,#E4EEFC_100%)] sm:min-h-[420px]">
            <div className="absolute h-[68%] w-[68%] rounded-full border border-white/90" />
            <div className="absolute h-[82%] w-[82%] rounded-full border border-white/70" />
            <Image
              src="/trust-shield.svg"
              alt="Blue shield representing the ACE customer experience"
              width={520}
              height={520}
              sizes="(max-width: 768px) 75vw, 440px"
              className="relative z-10 h-auto w-[230px] max-w-[68%] drop-shadow-[0_28px_30px_rgba(20,85,217,0.2)] sm:w-[340px]"
            />
          </div>
          <div className="py-2">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1769D2]">The ACE difference</p>
            <h2 className="max-w-[560px] font-heading text-[34px] font-bold leading-[1.08] tracking-[-0.045em] text-[#142759] sm:text-[46px] md:text-[54px]">A smarter way to choose your next device.</h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.8] text-[#718096]">Good tech choices start with the right information. We make it easier to explore your options and get answers directly from our team.</p>
            <div className="mt-8 space-y-6">
              {points.map(p => (
                <div key={p.n} className="flex gap-4">
                  <span className="pt-0.5 font-heading text-[13px] font-bold tracking-wider text-[#1769D2]">{p.n}</span>
                  <div>
                    <div className="text-[16px] font-semibold text-[#172B4D]">{p.t}</div>
                    <div className="mt-1 text-[13px] leading-relaxed text-[#8190A5]">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ButtonWhatsApp text="Hi ACE, I need help choosing a device.">Talk to ACE on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
