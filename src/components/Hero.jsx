import { useCallback, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ── Partículas flutuantes (poeira de luz) ─────────────────────────────── */
const PARTICLE_COUNT = 15
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,             // % horizontal
  y: 70 + Math.random() * 30,          // começa entre 70%–100% do topo
  size: 3 + Math.random() * 4,         // 3–7px (aumentado)
  duration: 4 + Math.random() * 5,     // 4–9s
  delay: Math.random() * 5,            // 0–5s
}))

/* ── Componente principal ──────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)

  /* ── Spotlight que segue o cursor ──────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 100
    const my = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${mx}%`)
    el.style.setProperty('--my', `${my}%`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = sectionRef.current
    if (!el) return
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '45%')
  }, [])

  /* ── Parallax no título (usa useScroll / useTransform) ─────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen w-full flex-col items-center justify-center bg-base px-6 text-center overflow-hidden"
    >
      {/* ── Partículas flutuantes ────────────────────────────────────── */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-gold-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* ── Spotlight dinâmico (cursor) ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 will-change-[background]"
        style={{
          background:
            'radial-gradient(circle at var(--mx, 50%) var(--my, 45%), rgba(212,168,52,0.10) 0%, rgba(10,10,10,0) 50%)',
        }}
      />

      {/* ── Subtítulo ────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white sm:text-base"
      >
        
      </motion.p>

      {/* ── Título com parallax ──────────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: titleY }}
        className="relative z-10 max-w-5xl font-display text-[28px] font-bold leading-[1.05] tracking-tightest text-white sm:text-[52px] md:text-[68px] lg:text-[84px]"
      >
        Conheça o novo iPhone&nbsp;18
      </motion.h1>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
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
