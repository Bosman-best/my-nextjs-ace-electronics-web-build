import { WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'
export default function ContactQRBlock() {
  return (
    <section className="py-16 md:py-28">
      <div className="max-w-[720px] mx-auto px-5 xs:px-6 text-center">
        <h2 className="font-heading text-[36px] md:text-[56px] font-semibold text-[rgb(var(--ace-text-primary)/1)]">Need Help Choosing? We Got You.</h2>
        <p className="text-[rgb(var(--ace-text-secondary)/1)] text-[21px] mt-4">Chat with ACE directly. Get a quote in 2 minutes.</p>
        <div className="mx-auto mt-10 p-8 text-center bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] max-w-[680px]">
          <img src="/ace-whatsapp-qr.png" alt="WhatsApp QR – ACE Electronics" width={200} height={200} className="mx-auto rounded-xl bg-white p-3 w-[200px] h-[200px]" />
          <p className="text-ace-silver text-[15px] font-medium mt-4">Scan to chat</p>
          <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="text-[rgb(var(--ace-color-link)/1)] text-[15px] font-medium mt-3 inline-block hover:underline">Join our WhatsApp Group →</a>
        </div>
        <div className="text-ace-silver text-sm mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
          <span>Hours: Mon-Sat 9AM–8PM GMT</span>
        </div>
        <p className="text-[rgb(var(--ace-text-secondary)/1)] text-sm mt-3"><a href="/contact" className="hover:text-[rgb(var(--ace-color-link)/1)] underline underline-offset-4">Prefer email? Send a message</a></p>
      </div>
    </section>
  )
}
