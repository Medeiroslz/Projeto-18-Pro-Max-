import { motion } from 'framer-motion'

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
            <motion.div
              key={f.key}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-white/10 bg-card p-7 transition-all duration-300 hover:border-gold-400/30 hover:shadow-[0_0_30px_-6px_rgba(212,168,52,0.15)]"
            >
              <div className="mb-5 h-10 w-10 text-neutral-200 transition-colors duration-300 group-hover:text-gold-400">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
