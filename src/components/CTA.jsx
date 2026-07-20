import { motion } from 'framer-motion'

// Substitua "55SEUNUMEROAQUI" pelo número com DDI e DDD, sem espaços ou símbolos.
// Exemplo: 5551999998888
const WHATSAPP_LINK =
  'https://wa.me/55SEUNUMEROAQUI?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20iPhone%2018'

export default function CTA() {
  return (
    <section className="relative flex min-h-[60vh] sm:min-h-[80vh] flex-col items-center justify-center px-6 py-16 sm:py-24 text-center">
      {/* overlay gradient dourado no final da pagina */}
      <div className="pointer-events-none absolute inset-0 bg-gold-gradient-bottom" />

      {/* subtle gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(212,168,52,0.06) 0%, rgba(10,10,10,0) 60%)',
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-display text-2xl font-bold tracking-tightest text-white sm:text-4xl md:text-5xl"
      >
        Garanta o seu
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-5 max-w-md text-base text-neutral-400 sm:text-lg"
      >
        Fale agora com a gente pelo WhatsApp e seja um dos primeiros a receber
        o novo iPhone 18.
      </motion.p>

      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="relative mt-8 sm:mt-10 inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-6 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.2)]"
      >
        Tenho interesse
      </motion.a>
    </section>
  )
}
