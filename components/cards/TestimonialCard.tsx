export default function TestimonialCard({ title, description }: { title: string, description: string }) {
  return (
    <article className="ace-reference-card flex h-full min-h-[190px] flex-col p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-5 h-1 w-10 rounded-full bg-[#1769D2]" />
      <h3 className="font-heading text-[17px] font-semibold tracking-[-0.02em] text-[#172B4D] sm:text-[19px]">{title}</h3>
      <p className="mt-3 flex-1 text-[13px] leading-[1.8] text-[#718096] sm:text-[14px]">{description}</p>
    </article>
  )
}
