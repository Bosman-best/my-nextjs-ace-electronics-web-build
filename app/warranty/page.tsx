import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warranty Policy | ACE Electronics Ghana',
  description: 'ACE Electronics warranty terms for laptops and smartphones in Ghana. Authentic devices, verified condition grading, and clear claim process via WhatsApp.',
}

export default function WarrantyPage() {
  return (
    <>
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <div className="max-w-[800px]">
            <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-6">Warranty Policy</h1>
            <p className="text-ace-silver text-lg mb-8">Every device from ACE Electronics is sourced from verified suppliers and tested before delivery.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-10 mb-3">Condition Grading</h2>
            <ul className="text-ace-silver space-y-3">
              <li><span className="text-ace-white font-medium">Brand New Sealed</span> — Factory-sealed, never opened. Full manufacturer box and accessories.</li>
              <li><span className="text-ace-white font-medium">99.99% Clean</span> — Near-mint condition. No visible scratches, fully functional. May be open-box.</li>
              <li><span className="text-ace-white font-medium">Fairly Used</span> — Pre-owned, tested and fully functional. May show light cosmetic wear. Priced accordingly.</li>
            </ul>
            <p className="text-ace-silver text-sm mt-3">Condition is always stated clearly on each product listing and confirmed via WhatsApp before purchase.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-10 mb-3">What&apos;s Covered</h2>
            <p className="text-ace-silver">Hardware defects that were present at time of sale and not caused by user damage. Dead-on-arrival replacement within the claim window.</p>
            <div className="bg-ace-glass border-l-[3px] border-ace-electric rounded-r-2xl p-5 my-6">
              <p className="text-ace-electric text-sm font-semibold uppercase tracking-wide mb-1">Warranty Period</p>
              <p className="text-ace-white">All devices sold by ACE Electronics come with a <strong>1-month warranty</strong> from the date of purchase, covering hardware defects present at time of sale. Warranty terms are confirmed via WhatsApp before every purchase.</p>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-10 mb-3">What&apos;s Not Covered</h2>
            <ul className="text-ace-silver space-y-2 list-disc pl-5">
              <li>Physical damage, liquid damage, or drops after delivery</li>
              <li>Software issues, viruses, or user-installed modifications</li>
              <li>Battery wear on fairly-used devices (normal degradation)</li>
              <li>Accessories unless stated otherwise (chargers are tested at sale)</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-10 mb-3">How to Claim</h2>
            <ol className="text-ace-silver space-y-2 list-decimal pl-5">
              <li>Message ACE on WhatsApp with your order details and a description/video of the issue</li>
              <li>We&apos;ll diagnose remotely within 24 hours</li>
              <li>If covered, we&apos;ll arrange repair, replacement, or refund per the terms confirmed at purchase</li>
            </ol>

            <p className="text-ace-silver text-sm mt-8 italic">ACE Electronics is an independent third-party retailer, not affiliated with Apple, Samsung, HP, Google, or other manufacturers. Manufacturer warranties, where applicable, are separate and subject to manufacturer terms.</p>

            <div className="mt-8">
              <ButtonWhatsApp text="Hi ACE, I have a warranty question.">Chat About Warranty on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
