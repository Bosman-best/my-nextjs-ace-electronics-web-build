'use client'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

const WHATSAPP_URL = 'https://wa.me/233547981348?text=Hi%20ACE%2C%20I%20want%20to%20be%20notified%20when%20Entertainment%20goes%20live.'

const atmosphereCards = [
  'Action Anime',
  'Sci-Fi',
  'Romance',
  'Thriller',
  'Shonen',
  'Drama',
  'Horror',
  'Fantasy',
]

export default function EntertainmentPageClient() {
  return (
    <>
      <NavBar />
      <main className="bg-[#0A0A0A] text-white">
        <section className="relative min-h-[100vh] overflow-hidden px-5 xs:px-6 md:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[#0A0A0A]" />
          <div
            className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-3xl animate-orb-motion"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 55%)' }}
          />
          <div
            className="pointer-events-none absolute right-[-10%] top-[20%] h-[340px] w-[340px] rounded-full opacity-20 blur-3xl animate-orb-motion-delay"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 55%)' }}
          />
          <div className="relative mx-auto flex min-h-[calc(100vh-44px)] max-w-5xl flex-col items-center justify-center gap-10 text-center pt-16 pb-20">
            <div className="space-y-6">
              <h1 className="font-heading text-[48px] md:text-[80px] font-semibold tracking-[-0.02em] text-white">
                Entertainment, Elevated.
              </h1>
              <p className="mx-auto max-w-2xl text-[21px] leading-[1.6] text-white/70">
                Premium streaming subscriptions. Top-tier anime. Blockbuster movies. All coming to ACE.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#2563EB]"
            >
              Get Notified on WhatsApp
            </a>
            <div className="flex flex-col items-center gap-2 text-sm text-white/70">
              <span>Scroll to discover</span>
              <div className="animate-bounceArrow">
                <span className="block h-3 w-3 rotate-45 border-b border-r border-white" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 px-5 xs:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[12px] uppercase tracking-[0.1em] text-[#6E6E73] mb-4">COMING SOON</p>
            <h2 className="font-heading text-[36px] md:text-[56px] font-semibold text-[#1D1D1F] mb-10">
              Your Premium Streaming Life Starts Here.
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <div className="group overflow-hidden rounded-[24px] bg-gradient-to-br from-[#E50914] to-[#B20710] p-8 text-white">
              <div className="flex items-center justify-center rounded-[18px] bg-white/10 p-8 text-[120px] font-black text-white">N</div>
              <div className="mt-8 space-y-4">
                <h3 className="text-[28px] font-semibold">Netflix Premium</h3>
                <p className="text-[16px] text-white/80">Unlimited movies, TV shows & more. Ad-free.</p>
                <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#E50914]">Coming Soon</div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-[#E50914] transition hover:bg-[#f7f7f7]"
              >
                Notify Me on WhatsApp
              </a>
            </div>
            <div className="group overflow-hidden rounded-[24px] bg-gradient-to-br from-[#F47521] to-[#D45E0A] p-8 text-white">
              <div className="flex items-center justify-center rounded-[18px] bg-white/10 p-8 text-[120px] font-black text-white">C</div>
              <div className="mt-8 space-y-4">
                <h3 className="text-[28px] font-semibold">Crunchyroll Premium</h3>
                <p className="text-[16px] text-white/80">The world's largest anime library. Ad-free.</p>
                <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#F47521]">Coming Soon</div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-[#F47521] transition hover:bg-[#f7f7f7]"
              >
                Notify Me on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5F7] py-24 px-5 xs:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl text-center mb-12">
            <p className="text-[12px] uppercase tracking-[0.1em] text-[#6E6E73] mb-4">WHAT'S COMING</p>
            <h2 className="font-heading text-[36px] md:text-[56px] font-semibold text-[#1D1D1F]">Top Anime & Movies.</h2>
          </div>
          <div className="mx-auto grid gap-6 lg:grid-cols-4 md:grid-cols-2">
            {atmosphereCards.map((label, index) => {
              const gradients = [
                'from-[#312E81] to-[#4338CA]',
                'from-[#0F172A] to-[#2563EB]',
                'from-[#0F766E] to-[#134E4A]',
                'from-[#6D28D9] to-[#7C3AED]',
                'from-[#075985] to-[#38BDF8]',
                'from-[#7C2D12] to-[#92400E]',
                'from-[#0F172A] to-[#3B82F6]',
                'from-[#134E4A] to-[#0D3B66]',
              ]
              return (
                <div
                  key={label}
                  className={`group aspect-[2/3] overflow-hidden rounded-[12px] bg-gradient-to-br ${gradients[index % gradients.length]} p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="text-[20px] font-semibold text-white">{label}</div>
                    <div className="text-sm text-white/80">Coming Soon</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="bg-[#1D1D1F] py-20 px-5 xs:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-[32px] md:text-[48px] font-semibold text-white mb-6">Be First to Know.</h2>
            <p className="mx-auto max-w-2xl text-[19px] leading-[1.6] text-white/70 mb-10">
              Drop us a message and we'll notify you the moment Entertainment goes live.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#2563EB]"
            >
              Message ACE on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        @keyframes moveOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-orb-motion {
          animation: moveOrb 18s ease-in-out infinite;
        }
        .animate-orb-motion-delay {
          animation: moveOrb 18s ease-in-out 1.5s infinite;
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounceArrow {
          animation: bounceArrow 2s infinite ease-in-out;
        }
      `}</style>
    </>
  )
}
