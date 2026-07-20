import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center bg-base px-6 text-center">
      {/* subtle gold-tinted vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(212,168,52,0.08) 0%, rgba(10,10,10,0) 60%)',
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold-200 sm:text-base"
      >
        
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl font-display text-[28px] font-bold leading-[1.05] tracking-tightest text-white sm:text-[52px] md:text-[68px] lg:text-[84px]"
      >
        Conheça o novo iPhone&nbsp;18
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-gold-400/60"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Role para continuar</span>
        <svg
          className="h-5 w-5 animate-bounce-y"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 4v14" strokeLinecap="round" />
          <path d="M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
