/**
 * Brand story. `as` controls the top heading level so the block can supply the
 * page <h1> on /about while remaining reusable as a section elsewhere.
 */
export default function BrandStoryBlock({ as: Heading = 'h2' }: { as?: 'h1' | 'h2' }) {
  return (
    <div className="max-w-[800px]">
      <Heading className="font-heading text-[32px] xs:text-[36px] md:text-[44px] font-semibold text-ace-white mb-6 tracking-tight">Our Story</Heading>
      <p className="text-ace-silver text-lg leading-relaxed mb-5">
        Tech should be simple, reliable, and accessible.
      </p>
      <p className="text-ace-silver text-lg leading-relaxed mb-5">
        ACE Electronics was built to be the plug you can trust. We&apos;re not a manufacturer — we&apos;re your expert curator. We source premium laptops, smartphones, and gadgets exclusively from verified suppliers, so you get authentic quality, competitive pricing, and zero guesswork.
      </p>
      <p className="text-ace-silver text-lg leading-relaxed mb-8">
        We back every device with honest advice, fast WhatsApp support, and transparent pricing. No hype. No fakes. Just ACE.
      </p>
      <div className="bg-ace-glass border-l-[3px] border-ace-electric rounded-r-2xl p-6 my-8">
        <div className="text-ace-electric text-[13px] font-semibold uppercase tracking-wide mb-2">Mission</div>
        <p className="text-ace-white text-xl font-medium">Make quality tech accessible.</p>
      </div>
      <div className="bg-ace-glass border-l-[3px] border-ace-electric rounded-r-2xl p-6 my-8">
        <div className="text-ace-electric text-[13px] font-semibold uppercase tracking-wide mb-2">Vision</div>
        <p className="text-ace-white text-xl font-medium">Become a trusted tech plug in Ghana &amp; beyond.</p>
      </div>
    </div>
  )
}
