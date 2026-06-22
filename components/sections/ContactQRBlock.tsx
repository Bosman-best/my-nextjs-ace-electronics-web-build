import { WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'
export default function ContactQRBlock() {
  return (
    <section className="py-16 md:py-28">
      <div className="max-w-[720px] mx-auto px-5 xs:px-6 text-center">
        <h2 className="font-heading text-[32px] md:text-[40px] font-semibold text-ace-white">Need Help Choosing? We Got You.</h2>
        <p className="text-ace-silver text-lg mt-4">Chat with ACE directly. Get a quote in 2 minutes.</p>
        <div className="ace-glass mt-10 p-10 text-center shadow-ace-glow border-ace-electric/30">
          <img src="/ace-whatsapp-qr.png" alt="WhatsApp QR – ACE Electronics" width={220} height={220} className="mx-auto rounded-xl bg-white p-3 w-[220px] h-[220px]" />
          <p className="text-ace-silver text-[15px] font-medium mt-4">Scan to chat</p>
          <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="text-ace-electric text-[15px] font-medium mt-3 inline-block hover:underline">Join our WhatsApp Group →</a>
        </div>
        <div className="text-ace-silver text-sm mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
          <span>Hours: Mon-Sat 9AM–8PM GMT</span>
        </div>
        <p className="text-ace-silver text-sm mt-3"><a href="/contact" className="hover:text-ace-electric underline underline-offset-4">Prefer email? Send a message</a></p>
      </div>
    </section>
  )
}
