export default function BrandStoryBlock() {
  return (
    <div className="max-w-[900px] mx-auto">
      <h2 className="font-heading text-[28px] md:text-[28px] lg:text-[28px] font-semibold text-[rgb(var(--ace-text-primary)/1)] mb-6">Our Story</h2>
      <p className="text-[17px] text-[rgb(var(--ace-text-secondary)/1)] leading-relaxed mb-5">
        Tech should be simple, reliable, and accessible.
      </p>
      <p className="text-[17px] text-[rgb(var(--ace-text-secondary)/1)] leading-relaxed mb-5">
        ACE Electronics was built to be the plug you can trust. We're not a manufacturer — we're your expert curator. We source premium laptops, smartphones, and gadgets exclusively from verified suppliers, so you get authentic quality, competitive pricing, and zero guesswork.
      </p>
      <p className="text-[17px] text-[rgb(var(--ace-text-secondary)/1)] leading-relaxed mb-8">
        We back every device with honest advice, fast WhatsApp support, and transparent pricing. No hype. No fakes. Just ACE.
      </p>

      <blockquote className="bg-white rounded-[18px] p-6 my-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div style={{ borderLeft: '3px solid rgb(var(--ace-color-link)/1)' }} className="pl-4">
          <div className="text-[28px] leading-tight font-semibold text-[rgb(var(--ace-text-primary)/1)]">Make quality tech accessible.</div>
          <p className="text-[17px] text-[rgb(var(--ace-text-secondary)/1)] mt-3">Our mission is to make premium devices easy to find, understand, and own.</p>
        </div>
      </blockquote>

      <blockquote className="bg-white rounded-[18px] p-6 my-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div style={{ borderLeft: '3px solid rgb(var(--ace-color-link)/1)' }} className="pl-4">
          <div className="text-[28px] leading-tight font-semibold text-[rgb(var(--ace-text-primary)/1)]">Become a trusted tech plug in Ghana &amp; beyond.</div>
          <p className="text-[17px] text-[rgb(var(--ace-text-secondary)/1)] mt-3">We pair expert curation with local support to earn trust every day.</p>
        </div>
      </blockquote>
    </div>
  )
}
