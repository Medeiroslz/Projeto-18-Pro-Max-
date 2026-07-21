import { useCallback, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const features = [
  {
    key: 'marca',
    title: 'Sobre a marca',
    copy: 'A Apple redefine o impossível a cada lançamento. Design, inovação e excelência que transformam a forma como você vive e se conecta com o mundo.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4C16 4 8 10 8 20c0 8 6 14 16 24 10-10 16-16 16-24 0-10-8-16-16-16z" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="4" />
        <path d="M19 28l5-8 5 8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 28v-4h6v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'pagamento',
    title: 'Formas de pagamento',
    copy: 'Parcele em até 12x sem juros no cartão de crédito, compre à vista com 10% de desconto no PIX ou boleto bancário. Aceitamos todos os cartões.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="10" width="40" height="28" rx="3" strokeLinejoin="round" />
        <path d="M4 18h40" strokeLinecap="round" />
        <path d="M14 28h8" strokeLinecap="round" />
        <circle cx="32" cy="28" r="4" />
      </svg>
    ),
  },
  {
    key: 'lancamento',
    title: 'Condição especial',
    copy: 'Pré-venda exclusiva com condições especiais de lançamento. Garanta o seu iPhone 18 com brindes e vantagens apenas para os primeiros compradores.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6L28 16h10l-8 6 3 10-9-6-9 6 3-10-8-6h10L24 6z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'brinde',
    title: 'Brinde especial',
    copy: 'Ao comprar na pré-venda, você ganha um Apple Watch Ultra 2 de presente* e ainda concorre a uma viagem para o Apple Park. *Estoque limitado.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="10" width="32" height="28" rx="4" strokeLinejoin="round" />
        <path d="M16 24h16" strokeLinecap="round" />
        <path d="M24 16v16" strokeLinecap="round" />
      </svg>
    ),
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
}

/* ── Card individual com tilt 3D + spotlight + ícone animado ─────────── */
function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)

// Tilt 3D (com spring suave embutido no motion value)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 120, damping: 12, mass: 0.5 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 12, mass: 0.5 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])

  // Ícone animation
  const iconScale = useMotionValue(1)
  const iconRotate = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()

      // Spotlight position (percent)
      const mx = ((e.clientX - rect.left) / rect.width) * 100
      const my = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${mx}%`)
      el.style.setProperty('--my', `${my}%`)

      // Tilt (normalized -0.5 .. 0.5)
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      x.set(nx)
      y.set(ny)
    },
    [x, y],
  )

  const handleMouseEnter = useCallback(() => {
    iconScale.set(1.1)
    iconRotate.set(5)
  }, [iconScale, iconRotate])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
    x.set(0)
    y.set(0)
    iconScale.set(1)
    iconRotate.set(0)
  }, [x, y, iconScale, iconRotate])

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="group relative rounded-2xl border border-white/10 bg-card p-5 sm:p-7 transition-colors duration-300 hover:border-gold-400/30 hover:shadow-[0_0_30px_-6px_rgba(212,168,52,0.15)]"
    >
      {/* Spotlight interno (dourado, segue o cursor) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl will-change-[background]"
        style={{
          background:
            'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(212,168,52,0.10) 0%, rgba(26,26,26,0) 60%)',
        }}
      />

      {/* Ícone com micro-interação */}
      <motion.div
        className="relative z-10 mb-4 h-8 w-8 sm:mb-5 sm:h-10 sm:w-10 text-neutral-200 transition-colors duration-300 group-hover:text-gold-400"
        style={{ scale: iconScale, rotate: iconRotate }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
      >
        {feature.icon}
      </motion.div>

      <h3 className="relative z-10 mb-1.5 text-base font-semibold text-white sm:mb-2 sm:text-lg">
        {feature.title}
      </h3>
      <p className="relative z-10 text-xs leading-relaxed text-neutral-400 sm:text-sm">
        {feature.copy}
      </p>
    </motion.div>
  )
}

/* ── Grid principal ───────────────────────────────────────────────────── */
export default function Features() {
  return (
    <section className="bg-panel px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center font-display text-3xl font-bold tracking-tightest text-white sm:text-4xl md:text-5xl"
        >
          Evolução em cada detalhe
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.key} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
